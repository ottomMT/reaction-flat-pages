#share.Page = @Page = new Meteor.Collection("Page")

ReactionCore.Schemas.Page = new SimpleSchema
#    _id:
#        type: String
#        optional: true
    title:
        type: String
    route:
        type: String
    content:
        type: String
        autoform: {
            rows: 10
        }

ReactionCore.Collections.Page = Page = @Page = new Meteor.Collection "Page"
ReactionCore.Collections.Page.attachSchema ReactionCore.Schemas.Page
