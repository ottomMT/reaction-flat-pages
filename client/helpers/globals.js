/**
 * maybeDeletePage
 * @summary confirm page deletion, delete, and alert
 * @todo - refactor this back into templates. this is bad.
 * @param {Object} page - page Object
 * @return {Object} - returns nothing, and alerts,happen here
 */
this.maybeDeletePage = function (page) {
  let pageIds;
  let title;
  let confirmTitle = "Delete this page?";

  if (_.isArray(page)) {
    if (page.length === 1) {
      title = page[0].title || "the page";
      pageIds = [page[0]._id];
    } else {
      title = "the selected pages";
      confirmTitle = "Delete selected pages?";

      pageIds = _.map(page, (item) => {
        return item._id;
      });
    }
  } else {
    title = page.title || "the page";
    pageIds = [page._id];
  }

  if (confirm(confirmTitle)) {
    return Meteor.call("pages/deletePage", pageIds, function (error, result) {
      let id = "page";
      if (error || !result) {
        Alerts.add("There was an error deleting " + title, "danger", {
          type: "prod-delete-" + id,
          i18nKey: "pageDetail.pageDeleteError"
        });
        throw new Meteor.Error("Error deleting page " + id, error);
      } else {
        setCurrentPage(null);
        Router.go("/");
        return Alerts.add("Deleted " + title, "info", {
          type: "prod-delete-" + id
        });
      }
    });
  }
};
