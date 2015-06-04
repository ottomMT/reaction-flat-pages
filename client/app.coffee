_.extend ReactionCore, existingPages: ->
  returnPage.find { }, { sort: { position: 1 } }
