//Template.flatPagesSettings.helpers
//
//Template.flatPagesSettings.events
//    "click #add-page-link": (event, template) ->
//        event.preventDefault()
//        event.stopPropagation()
//        #$('.dropdown-toggle').dropdown('toggle') #close the menu
//        Meteor.call "createPage", {title: "testPage", route: "testpage"}, (error, page) ->
//            if error
//                console.log error
//            else if page
//                console.log page
//                #Router.go "page",
//                #   _id: productId
