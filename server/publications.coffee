Page = ReactionCore.Collections.Page

Meteor.publish 'pagesList', ->
    return Page.find({}, {fields: {route: 1, title: 1, position: 1}})

Meteor.publish 'singlePage', (route) ->
    check route, String
    return Page.find({'route' : route})
