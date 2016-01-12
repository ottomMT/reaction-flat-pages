/**
 * pageDetail helpers
 */
Template.pageDetail.helpers({
  fieldComponent: function () {
    if (ReactionCore.hasPermission("createPage")) {
      return Template.pageDetailEdit;
    }
    return Template.pageDetailField;
  }
});

/**
 * pageDetail events
 */

Template.pageDetail.events({
  "click .toggle-page-isVisible-link": function (event, template) {
    let errorMsg = "";
    const self = this;
    if (!self.title) {
      errorMsg += "Page title is required. ";
      template.$(".title-edit-input").focus();
    }
    if (!self.content) {
      errorMsg += "Page content is required. ";
      template.$(".content-edit-input").focus();
    }
    if (errorMsg.length > 0) {
      Alerts.add(errorMsg, "danger", {
        placement: "pageManagement",
        i18nKey: "pageDetail.errorMsg"
      });
    } else {
      Meteor.call("pages/publishPage", self._id, function (error) {
        if (error) {
          return Alerts.add(error.reason, "danger", {
            placement: "pageManagement",
            id: self._id,
            i18nKey: "pageDetail.errorMsg"
          });
        }
      });
    }
  },
  "click .delete-page-link": function () {
    maybeDeletePage(this);
  }
});

Template.pageDetail.onRendered(function () {
  this.autorun((function (_this) {
    return function () {
      $('.content-edit-input').trumbowyg({
        removeformatPasted: true,
        autogrow: true,
        lang: Session.get("language")
      });
      // TODO: move to CSS changing default width
      $('.trumbowyg-box').width('100%');
    };
  })(this));
});
