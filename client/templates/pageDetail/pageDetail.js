/**
 * productImageGallery helpers
 */

let Media = ReactionCore.Collections.Media;

/**
 * uploadHandler method
 */

function uploadHandler(event) {
  const pageId = ReactionPage.selectedPageId();
  const shopId = ReactionPage.selectedPage().shopId || ReactionCore.getShopId();
  const userId = Meteor.userId();
  let count = Media.find({
    "metadata.pageId": pageId
  }).count();

  Session.set('files-uploaded', []);
  return FS.Utility.eachFile(event, function (file) {
    let fileObj;
    fileObj = new FS.File(file);
    fileObj.metadata = {
      ownerId: userId,
      pageId: pageId,
      shopId: shopId
    };

    // progress bar
    let prefix = "trumbowyg-";
    if ($('.' + prefix + 'progress').length === 0) {
      $('.' + prefix + 'modal-title').after(
        $('<div/>').attr('class', prefix + 'progress').append(
          $('<div/>').attr('class', prefix + 'progress-bar').css('width', 0)
        )
      );
    } else {
      $('.' + prefix + 'progress-bar').css('width', 0);
    }

    Media.insert(fileObj, function (err, fileObj) {

      // progress bar
      let myInterval = setInterval(function () {
        let progress = fileObj.uploadProgress();
        $('.' + prefix + 'progress-bar').stop().animate({
          width: progress + '%'
        });
        if(progress === 100) {
          clearInterval(myInterval);
        }
      }, 1);

      let filesUploaded = Session.get('files-uploaded');
      filesUploaded.push(fileObj);
      Session.set('files-uploaded', filesUploaded);
    });
    return count++;
  });
}

/**
 * pageDetail helpers
 */

Template.pageDetail.helpers({
  page: function () {
    return ReactionPage.selectedPage();
  },
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
      Alerts.inline(errorMsg, "danger", {
        placement: "pageManagement",
        i18nKey: "pageDetail.errorMsg"
      });
    } else {
      Meteor.call("pages/publishPage", self._id, function (error) {
        if (error) {
          return Alerts.inline(error.reason, "danger", {
            placement: "pageManagement",
            id: self._id,
            i18nKey: "pageDetail.errorMsg"
          });
        }
      });
    }
  },
  "click .delete-page-link": function () {
    ReactionPage.maybeDeletePage(this);
  },
  "change input:file": uploadHandler
});
