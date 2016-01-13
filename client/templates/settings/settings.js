Template.flatPagesSettings.helpers({
  pages: function () {
    return ReactionCore.Collections.Pages.find({}, {sort: {position: 1, title: -1}});
  },
  pageLink: function() {
    return this.title || i18n.t("pageSettings.noTitle", "No title");
  }
});

Template.flatPagesSettings.onCreated(function () {
  let self = this;
  self.autorun(function () {
    self.subscribe("Pages");
  });
});

Template.flatPagesSettings.events({
  "click [data-event-action=deletePage]": function () {
    maybeDeletePage(this);
  }
});
