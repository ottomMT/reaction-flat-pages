Template.flatPagesSettings.helpers({
  pages() {
    return ReactionCore.Collections.Pages.find({}, {sort: {position: 1, title: -1}});
  },
  pageLink() {
    return this.title || i18n.t("pageDetail.noTitle");
  }
});

Template.flatPagesSettings.onCreated(function () {
  let self = this;
  self.autorun(function () {
    self.subscribe("Pages");
  });
});

Template.flatPagesSettings.events({
  "click [data-event-action=publishPage]": function () {
    ReactionPage.publishPage(this, 'settings');
  },
  "click [data-event-action=deletePage]": function () {
    ReactionPage.maybeDeletePage(this);
  }
});
