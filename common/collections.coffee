#share.Page = @Page = new Meteor.Collection("Page")

ReactionStaticPage.Schemas.Page = new SimpleSchema
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

ReactionStaticPage.Collections.Page = Page = @Page = new Meteor.Collection "Page"
ReactionStaticPage.Collections.Page.attachSchema ReactionStaticPage.Schemas.Page
