Meteor.methods
    createPage: (data) ->
        check data, String
        unless Roles.userIsInRole(Meteor.userId(), ['admin'])
            return false
        return Page.insert({
            _id: Random.id()
            title: data
            content: "<h1>Заголовок</h1><p>Текст</p>"
            route: data
        }, {validate: false})

    updatePage: (productId, field, value) ->
        check productId, String
        check field, String
        check value, String
        unless Roles.userIsInRole(Meteor.userId(), ['admin'])
            return false
        value  = EJSON.stringify value
        update = EJSON.parse "{\"" + field + "\":" + value + "}"

        return Page.update productId, $set: update

    deletePage: (data) ->
        check data, String
        unless Roles.userIsInRole(Meteor.userId(), ['admin'])
            return false
        if Page.remove data
            return true
        return false
