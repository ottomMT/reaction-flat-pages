_.extend ReactionStaticPage,
    existingPages: ->
        return Page.find {}, {sort: {position: 1}}
