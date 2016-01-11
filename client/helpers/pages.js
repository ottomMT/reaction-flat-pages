/**
 *  currentPage
 *  @summary Reactive current page dependency, ensuring reactive pages, without session
 *  @todo rename as this can easily be confused with ReactionCore.setCurrentPage
 *  @todo this is a messy class implementation, normalize it.
 *  @description
 *  pages:
 *  set usage: currentPage.set "pageId",string
 *  get usage: currentPage.get "pageId"
 */
this.currentPage = {
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
currentPage = this.currentPage;

/**
 * setCurrentPage
 * @param {String} pageId - set current pageId
 * @return {undefined}
 */
this.setCurrentPage = function (pageId) {
  let currentId;
  if (pageId === null) {
    currentPage.set("pageId", null);
  }
  if (!pageId) {
    return;
  }
  currentId = selectedPageId();
  if (currentId === pageId) {
    return;
  }
  currentPage.set("pageId", pageId);
};

/**
 * selectedPage
 * @summary get the currently active/requested page object
 * @return {Object|undefined} currently selected page cursor
 */
this.selectedPage = function () {
  const id = selectedPageId();
  if (typeof id === "string") {
    return ReactionCore.Collections.Pages.findOne(id);
  }
};

/**
 * selectedPageId
 * @summary get the currently active/requested page
 * @return {String} currently selected page id
 */
this.selectedPageId = function () {
  return currentPage.get("pageId");
};
