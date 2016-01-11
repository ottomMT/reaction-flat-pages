/**
 * pageDetailEdit helpers
 */

Template.pageDetailEdit.helpers({
  i18nPlaceholder: function () {
    i18nextDep.depend();
    let i18nKey = `pageDetailEdit.${this.field}`;
    if (i18n.t(i18nKey) === i18nKey) {
      ReactionCore.Log.info(`returning empty placeholder pageDetailEdit: ${i18nKey} no i18n key found.`);
    } else {
      return i18n.t(i18nKey);
    }
  }
});

/**
 * pageDetailEdit events
 */

Template.pageDetailEdit.events({
  "change input,textarea": function (event) {
    const self = this;
    const pageId = selectedPageId();
    Meteor.call("pages/updatePageField", pageId, this.field,
      $(event.currentTarget).val(),
      function (error) {
        if (error) {
          return Alerts.add(error.reason, "danger", {
            placement: "pageManagement",
            i18nKey: "pageDetail.errorMsg",
            id: this._id
          });
        }
        //
        if (self.field === 'handle') {
          return Router.go("page", {
            _id: $(event.currentTarget).val()
          });
        }
        // animate updated field
        return $(event.currentTarget).animate({
          backgroundColor: "#e2f2e2"
        }).animate({
          backgroundColor: "#fff"
        });
      });

    if (this.type === "textarea") {
      autosize($(event.currentTarget));
    }

    return Session.set("editing-" + this.field, false);
  }
});

/**
 * pageDetailField events
 */

Template.pageDetailField.events({
  "click .page-detail-field": function () {
    if (ReactionCore.hasOwnerAccess()) {
      let fieldClass = "editing-" + this.field;
      Session.set(fieldClass, true);
      Tracker.flush();
      return $(`.${this.field}-edit-input`).focus();
    }
  }
});

/**
 * pageDetailEdit onRendered
 */

Template.pageDetailEdit.onRendered(function () {
  return autosize($("textarea"));
});
