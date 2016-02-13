/**
 *  currentPage
 *  @summary Reactive current page dependency, ensuring reactive pages, without session
 *  @todo rename as this can easily be confused with ReactionCore.setPage
 *  @todo this is a messy class implementation, normalize it.
 *  @description
 *  pages:
 */
ReactionPage = new ReactiveDict("currentPage");

Tracker.autorun(function () {
  ReactionRouter.watchPathChange();
  if (ReactionRouter.getParam("handle")) {
    const pageSub = ReactionSubMan.subscribe("Page", ReactionRouter.getParam("handle"));
    if (pageSub.ready()) {
      return ReactionPage.setPage(ReactionRouter.getParam("handle"));
    }
  }
});

/**
 * ReactionPage.setPage
 * @summary method to set default/parameterized page variant
 * @param {String} currentPageId - set current pageId
 * @return {undefined} return nothing, sets in session
 */
ReactionPage.setPage = (currentPageId) => {
  let pageId = currentPageId;
  if (!pageId.match(/^[A-Za-z0-9]{17}$/)) {
    let page = ReactionCore.Collections.Pages.findOne({
      handle: pageId.toLowerCase()
    });
    if (page) {
      pageId = page._id;
    }
  }
  ReactionPage.set("pageId", pageId);
};

/**
 * selectedPage
 * @summary get the currently active/requested page object
 * @return {Object|undefined} currently selected page cursor
 */
ReactionPage.selectedPage = () => {
  return ReactionCore.Collections.Pages.findOne(ReactionPage.get("pageId"));
};

/**
 * selectedPageId
 * @summary get the currently active/requested page
 * @return {String} currently selected page id
 */
ReactionPage.selectedPageId = () => {
  return ReactionPage.get("pageId");
};

/**
 * maybeDeletePage
 * @summary confirm page deletion, delete, and alert
 * @todo - refactor this back into templates. this is bad.
 * @param {Object} page - page Object
 * @return {Object} - returns nothing, and alerts,happen here
 */
ReactionPage.maybeDeletePage = (page) => {
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
    return Reaction.FlatPages.methods.deletePage.call({pageIds}, (error, result) => {
      let id = "page";
      if (error || !result) {
        Alerts.toast("There was an error deleting " + title, "danger", {
          i18nKey: "pageDetail.pageDeleteError"
        });
        throw new Meteor.Error("Error deleting page " + id, error);
      } else {
        ReactionPage.setPage(null);
        return Alerts.toast(`Deleted ${title}`, "info");
      }
    });
  }
};
