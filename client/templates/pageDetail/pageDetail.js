/**
 * pageDetail helpers
 */
Template.pageDetail.helpers({
  fieldComponent: function () {
    if (ReactionCore.hasPermission("createPage")) {
      return Template.pageDetailEdit;
    }
    return Template.pageDetailField;
  },
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


//--------------



/**
 * singlePage helpers
 */
Template.singlePage.helpers({
  contentComponent: function() {
    if ((_.isEmpty(this)) && ReactionCore.hasOwnerAccess()) {
      return Template.singlePageCreate;
    }
    if ((_.isEmpty(this)) && !ReactionCore.hasOwnerAccess()) {
      return Template.notFound;
    }
    if (ReactionCore.hasOwnerAccess() && Session.get("editCurrentPage")) {
      return Template.singlePageEdit;
    } else {
      return Template.singlePageShow;
    }
  }
});

Template.singlePageShow.events({
  'click #showingPage': function(event, template) {
    return Session.set("editCurrentPage", true);
  }
});

Template.singlePageEdit.events({
  'click .save-page-link': function(event, template) {
    var content, pageTitle, position, title;
    title = $('input#' + this._id + '_title').get(0).value;
    pageTitle = $('input#' + this._id + '_pageTitle').get(0).value;
    position = $('input#' + this._id + '_position').get(0).value;
    content = $('textarea#' + this._id + '_content.singlePageContentEditField').get(0).value;
    if (title !== this.title) {
      Meteor.call("updatePage", this._id, 'title', title, function(error, response) {
        if (!error) {

        }
      });
    }
    if (pageTitle !== this.pageTitle) {
      Meteor.call("updatePage", this._id, 'pageTitle', pageTitle, function(error, response) {
        if (!error) {

        }
      });
    }
    if (position !== this.position) {
      Meteor.call("updatePage", this._id, 'position', position, function(error, response) {
        if (!error) {

        }
      });
    }
    if (content !== this.content) {
      Meteor.call("updatePage", this._id, 'content', content, function(error, response) {
        if (!error) {

        }
      });
    }
    return Session.set("editCurrentPage", false);
  },
  'click .delete-page-link': function(event, template) {
    return Meteor.call("deletePage", this, function(error, response) {
      if (!error) {
        console.log(error);
        return;
      }
      if (response) {
        return Session.set("editCurrentPage", false);
      }
    });
  }
});

Template.singlePageCreate.events({
  'click .create-page-link': function(event, template) {
    console.log('click');
    return Meteor.call("createPage", Router.current().params.route, function(error, response) {
      if (!error) {
        console.log(123);
        return;
      }
      return Session.set("editCurrentPage", true);
    });
  }
});

Template.singlePageEdit.helpers({
  routeId: function() {
    return this._id + "_route";
  },
  titleId: function() {
    return this._id + "_title";
  },
  pageTitleId: function() {
    return this._id + "_pageTitle";
  },
  positionId: function() {
    return this._id + "_position";
  },
  contentId: function() {
    return this._id + "_content";
  }
});

Template.singlePageEdit.rendered = function() {
  var wysivig;
  return wysivig = $('.singlePageContentEditField').wysihtml5({
    'html': true
  });
};

Template.singlePageEdit.destroyed = function() {
  return Session.set("editCurrentPage", false);
};
