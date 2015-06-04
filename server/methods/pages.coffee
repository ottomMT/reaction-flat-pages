Meteor.methods
    createPage: (data) ->
        unless Roles.userIsInRole(Meteor.userId(), ['admin'])
            return false
        return Page.insert({
            _id: Random.id()
            title: data
            content: "<h1>some new content</h1>"
            route: data
        }, {validate: false})

    updatePage: (productId, field,value) ->
        unless Roles.userIsInRole(Meteor.userId(), ['admin'])
            return false
        value  = EJSON.stringify value
        update = EJSON.parse "{\"" + field + "\":" + value + "}"

        return Page.update productId, $set: update

    deletePage: (data) ->
        unless Roles.userIsInRole(Meteor.userId(), ['admin'])
            return false
        if Page.remove data
            return true
        return false
