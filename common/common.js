/*
 * extend ReactionCore and add common methods
 */
_.extend(ReactionCore, {
  /**
   * ReactionCore.setPage
   * @summary method to set default/parameterized page variant
   * @param {String} currentPageId - set current pageId
   * @return {undefined} return nothing, sets in session
   */
  setPage: function (currentPageId) {
    let pageId = currentPageId;
    if (!pageId.match(/^[A-Za-z0-9]{17}$/)) {
      let page = ReactionCore.Collections.Pages.findOne({
        handle: pageId.toLowerCase()
      });
      if (page) {
        pageId = page._id;
      }
    }
    setCurrentPage(pageId);
  }
});
