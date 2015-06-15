Template.singlePage.helpers
    contentComponent: ->
        if (_.isEmpty @) and ReactionCore.hasOwnerAccess()
            return Template.singlePageCreate
        if (_.isEmpty @) and !ReactionCore.hasOwnerAccess()
            return Template.notFound
        if ReactionCore.hasOwnerAccess() and Session.get "editCurrentPage"
            return Template.singlePageEdit
        else
            return Template.singlePageShow

Template.singlePageShow.events
    'click #showingPage': (event, template) ->
        Session.set "editCurrentPage", true

Template.singlePageEdit.events
    'click .save-page-link': (event, template) ->
        title = $('input#' + @_id + '_title').get(0).value
        pageTitle = $('input#' + @_id + '_pageTitle').get(0).value
        position = $('input#' + @_id + '_position').get(0).value
        content = $('textarea#' + @_id + '_content.singlePageContentEditField').get(0).value

        if (title != @title)
            Meteor.call "updatePage", @_id, 'title', title, (error, response) ->
                unless error
                    return
        if (pageTitle != @pageTitle)
            Meteor.call "updatePage", @_id, 'pageTitle', pageTitle, (error, response) ->
                unless error
                    return
        if (position != @position)
            Meteor.call "updatePage", @_id, 'position', position, (error, response) ->
                unless error
                    return
        if (content != @content)
            Meteor.call "updatePage", @_id, 'content', content, (error, response) ->
                unless error
                    return
        Session.set "editCurrentPage", false

    'click .delete-page-link': (event, template) ->
        Meteor.call "deletePage", @, (error, response) ->
            unless error
                console.log error
                return
            if response
                Session.set "editCurrentPage", false

Template.singlePageCreate.events
    'click .create-page-link': (event, template) ->
        Meteor.call "createPage", Router.current().params.route, (error, response) ->
            unless error
                return
            Session.set "editCurrentPage", true


Template.singlePageEdit.helpers
    routeId: ->
        return @_id + "_route"
    titleId: ->
        return @_id + "_title"
    pageTitleId: ->
        return @_id + "_pageTitle"
    positionId: ->
        return @_id + "_position"
    contentId: ->
        return @_id + "_content"

Template.singlePageEdit.rendered = () ->
    wysivig = $('.singlePageContentEditField').wysihtml5 { 'html': true }

Template.singlePageEdit.destroyed = () ->
    Session.set "editCurrentPage", false