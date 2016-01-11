_.extend(ReactionCore, {
  existingPages: function () {
    return Page.find({}, {
      sort: {
        position: 1
      }
    });
  }
});
