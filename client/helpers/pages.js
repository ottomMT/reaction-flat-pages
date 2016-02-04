/**
 *  currentPage
 *  @summary Reactive current page dependency, ensuring reactive pages, without session
 *  @todo rename as this can easily be confused with ReactionCore.setCurrentPage
 *  @todo this is a messy class implementation, normalize it.
 *  @description
 *  pages:
 *  set usage: ReactionPage.currentPage.set "pageId",string
 *  get usage: ReactionPage.currentPage.get "pageId"
 */
ReactionPage = {};
ReactionPage.currentPage = {
  keys: {},
  deps: {},
  equals: function (key) {
    return this.keys[key];
  },
  get: function (key) {
    this.ensureDeps(key);
    this.deps[key].depend();
    return this.keys[key];
  },
  set: function (key, value) {
    this.ensureDeps(key);
    this.keys[key] = value;
    return this.deps[key].changed();
  },
  changed: function (key) {
    this.ensureDeps(key);
    return this.deps[key].changed();
  },
  ensureDeps: function (key) {
    if (!this.deps[key]) {
      this.deps[key] = new Tracker.Dependency();
      return this.deps[key];
    }
  }
};

// export currentPage
// ReactionCore.currentPage = currentPage = this.currentPage;

/**
 * setCurrentPage
 * @param {String} pageId - set current pageId
 * @return {undefined}
 */
ReactionPage.setCurrentPage = (pageId) => {
  let currentId;
  if (pageId === null) {
    ReactionPage.currentPage.set("pageId", null);
  }
  if (!pageId) {
    return;
  }
  currentId = ReactionPage.selectedPageId();
  if (currentId === pageId) {
    return;
  }
  ReactionPage.currentPage.set("pageId", pageId);
};

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
  ReactionPage.setCurrentPage(pageId);
};

/**
 * selectedPage
 * @summary get the currently active/requested page object
 * @return {Object|undefined} currently selected page cursor
 */
ReactionPage.selectedPage = () => {
  const id = ReactionPage.selectedPageId();
  if (typeof id === "string") {
    return ReactionCore.Collections.Pages.findOne(id);
  }
};

/**
 * selectedPageId
 * @summary get the currently active/requested page
 * @return {String} currently selected page id
 */
ReactionPage.selectedPageId = () => {
  return ReactionPage.currentPage.get("pageId");
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
    return Meteor.call("pages/deletePage", pageIds, function (error, result) {
      let id = "page";
      if (error || !result) {
        Alerts.add("There was an error deleting " + title, "danger", {
          type: "prod-delete-" + id,
          i18nKey: "pageDetail.pageDeleteError"
        });
        throw new Meteor.Error("Error deleting page " + id, error);
      } else {
        ReactionPage.setCurrentPage(null);
        //Router.go("/");
        return Alerts.add("Deleted " + title, "info", {
          type: "prod-delete-" + id
        });
      }
    });
  }
};
