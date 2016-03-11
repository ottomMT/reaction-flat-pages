
/**
 * uploadHandler method
 */

function uploadHandler(event) {
  const Media = ReactionCore.Collections.Media;
  const pageId = ReactionPage.selectedPageId();
  const shopId = ReactionPage.selectedPage().shopId || ReactionCore.getShopId();
  const userId = Meteor.userId();
  let count = Media.find({
    "metadata.pageId": pageId
  }).count();

  Session.set("files-uploaded", []);
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
    if ($("." + prefix + "progress").length === 0) {
      $("." + prefix + "modal-title").after(
        $("<div/>").attr("class", prefix + "progress").append(
          $("<div/>").attr("class", prefix + "progress-bar").css("width", 0)
        )
      );
    } else {
      $("." + prefix + "progress-bar").css("width", 0);
    }

    Media.insert(fileObj, function (err, fileUploaded) {
      // progress bar
      let myInterval = setInterval(function () {
        let progress = fileUploaded.uploadProgress();
        $("." + prefix + "progress-bar").stop().animate({
          width: progress + "%"
        });
        if(progress === 100) {
          clearInterval(myInterval);
        }
      }, 1);

      let filesUploaded = Session.get("files-uploaded");
      filesUploaded.push(fileUploaded);
      Session.set("files-uploaded", filesUploaded);
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
  "click .toggle-page-isVisible-link": function () {
    ReactionPage.publishPage(this, "detail");
  },
  "click .delete-page-link": function () {
    ReactionPage.maybeDeletePage(this);
  },
  "change input:file": uploadHandler
});
