_.extend ReactionCore, existingPages: ->
  return Page.find { }, { sort: { position: 1 } }
