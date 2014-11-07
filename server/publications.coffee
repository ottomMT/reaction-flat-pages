Page = ReactionCore.Collections.Page

# ACHTUNG! Very bad validators
Page.allow
    insert: (userId, doc) ->
        return true

    update: (userId, doc, fields, modifier) ->
        return true

Meteor.publish 'pagesList', ->
    return Page.find()

#Meteor.publish 'singlePage', (route) ->
#    return Page.findOne({'route' : route})
