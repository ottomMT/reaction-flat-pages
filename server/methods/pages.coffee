Meteor.methods
    createPage: (data) ->
        unless Roles.userIsInRole(Meteor.userId(), ['admin'])
            return false
        Page.insert({
            _id: Random.id()
            title: data.title
            route: data.route
        }, {validate: false})
        console.log data
        return "transfer compleate"
