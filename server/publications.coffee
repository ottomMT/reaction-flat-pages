Page = ReactionStaticPage.Collections.Page

Meteor.publish 'pagesList', ->
    return Page.find({}, {fields: {route: 1, title: 1, position: 1}})

Meteor.publish 'singlePage', (route) ->
    return Page.find({'route' : route})
