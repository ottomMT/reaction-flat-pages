#share.Page = @Page = new Meteor.Collection("Page")
ReactionCore.Schemas.Page = new SimpleSchema
#    _id:
#        type: String
#        optional: true
    title:
        type: String
        optional: true
    pageTitle:
        type: String
        optional: true
    position:
        type: Number
        defaultValue: 1
    route:
        type: String
        optional: true
    content:
        type: String
        optional: true
        autoform: {
            rows: 30
        }

ReactionCore.Collections.Page = Page = @Page = new Meteor.Collection "Page"
ReactionCore.Collections.Page.attachSchema ReactionCore.Schemas.Page