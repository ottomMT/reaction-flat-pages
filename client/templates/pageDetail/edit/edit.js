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
  "change input:text,textarea, blur textarea, tbwblur, tbwchange": function (event) {
    const self = this;
    const pageId = selectedPageId();
    const value = $(event.currentTarget).val();

    if (this.field === 'handle' && value === 'create') {
      return Alerts.add(i18n.t("pageDetailEdit.handleReservedError"), "danger", {
        placement: "pageManagement",
        id: this._id
      });
    } else if (this.field === 'content' && event.type.indexOf('change') != -1) {
      // save every 5 sec during content changing in textarea field
      let key = `editing-${this.field}-savetime`;
      let now = Number(new Date());
      let prev = Session.get(key);
      if (now - prev < 5000) {
        return
      }
      Session.set(key, now);
      // return if this is initial event for content field
      if (!prev) {
        return
      }
    } else if (this.field === 'content' && event.type == 'tbwblur') {
      // on loosing focus, check and delete all Media, which are not in the current content
      let Media = ReactionCore.Collections.Media;
      let pageMedia = Media.find({"metadata.pageId": pageId});
      Media.find({"metadata.pageId": pageId}).forEach(function(media) {
        if (value.indexOf(media.url()) == -1) {
          Media.remove({"_id": media._id}, 1);
        }
      });
    }

    Meteor.call("pages/updatePageField", pageId, this.field, value,
      function (error) {
        if (error) {
          return Alerts.add(error.reason, "danger", {
            placement: "pageManagement",
            i18nKey: "pageDetail.errorMsg",
            id: this._id
          });
        }
        // go to new url of page
        if (self.field === 'handle') {
          return Router.go("page", {
            _id: value
          });
        }
        // animate updated field
        return $(event.currentTarget).animate({
          backgroundColor: "#e2f2e2"
        }).animate({
          backgroundColor: "#fff"
        });
      });

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
