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
    const pageSub = ReactionSubscriptions.subscribe("Page", ReactionRouter.getParam("handle"));
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
