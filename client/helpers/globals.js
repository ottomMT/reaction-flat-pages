/**
 * publishPage
 * @summary page publishing and alert
 * @param {Object} pageOrArray - page Object
 * @return {Object} - returns nothing, and alerts,happen here
 */
ReactionPage.publishPage = (pageOrArray, alertPlacement) => {
  const pages = !_.isArray(pageOrArray) ? [pageOrArray] : pageOrArray;
  for (let page of pages) {
    let errors = [];
    let alertSuccess = (title, code) => Alerts.toast(title, code, {autoHide: true, dismissable: false});
    let alertError;
    if (alertPlacement === "detail") {
      alertError = (title, code) => Alerts.inline(title, code, {placement: "pageManagement"});
    } else if (alertPlacement === "settings") {
      alertError = alertSuccess;
    }
    if (!page.title) {
      errors.push("Page title is required.");
    }
    if (!page.content) {
      errors.push("Page content is required.");
    }
    if (errors.length > 0) {
      alertError(errors.join(" "), "error");
    } else {
      ReactionFlatPages.methods.publishPage.call({pageId: page._id}, (error, result) => {
        if (error) {
          alertError(error.reason, "error");
        } else if (result === true) {
          // TOOD: use sprintf module for i18n strings
          alertSuccess(page.title + " " + i18n.t("pageDetail.publishPageVisible"), "success");
        } else {
          // TOOD: use sprintf module for i18n strings
          alertSuccess(page.title + " " + i18n.t("pageDetail.publishPageHidden"), "warning");
        }
      });
    }
  }
};

/**
 * maybeDeletePage
 * @summary confirm page deletion, delete, and alert
 * @param {Object} pageOrArray - page Object
 * @return {undefined} - returns nothing, and alerts,happen here
 */
ReactionPage.maybeDeletePage = (pageOrArray) => {
  const pages = !_.isArray(pageOrArray) ? [pageOrArray] : pageOrArray;
  const pageIds = _.map(pages, page => page._id);
  let title;
  let confirmTitle;
  if (pages.length === 1) {
    title = pages[0].title || "the page";
    confirmTitle = "Delete this page?";
  } else {
    title = "the selected pages";
    confirmTitle = "Delete selected pages?";
  }

  if (confirm(confirmTitle)) {
    return ReactionFlatPages.methods.deletePage.call({pageId: pageIds}, (error, result) => {
      if (error !== undefined || !result) {
        Alerts.toast(`There was an error deleting ${title}`, "error");
        throw new Meteor.Error(`Error deleting page ${title}`, error);
      } else {
        Alerts.toast(i18n.t("productDetail.deletedAlert") + " " + title, "info");
      }
    });
  }
};
