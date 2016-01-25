/*
 * FlatPageController Controller
 * flat pages controller
 */

let FlatPageController = RouteController.extend({
  waitOn: function () {
    return this.subscribe("Pages");
  },
  onAfterAction: function () {
    return ReactionCore.MetaData.refresh(this.route, this.params);
  },
  yieldTemplates: {
    layoutHeader: {
      to: "layoutHeader"
    },
    layoutFooter: {
      to: "layoutFooter"
    },
    dashboard: {
      to: "dashboard"
    }
  }
});

this.FlatPageController = FlatPageController;

/*
 * Page Route Declarations
 */

Router.map(function () {

  this.route("createPage", {
    // TODO: deprecated route, exists until issue is open https://github.com/ramusus/reaction-flat-pages/issues/5
    path: "page/create",
    action: function () {
      Meteor.call("pages/createPage", (error, pageId) => {
        if (error) {
          throw new Meteor.Error("createPage error", error);
        } else if (pageId) {
          Router.go("page", {
            _id: pageId
          });
        }
      });
    }
  });

  this.route("page", {
    controller: FlatPageController,
    path: "page/:_id",
    template: "pageDetail",
    subscriptions: function () {
      return this.subscribe("Page", this.params._id);
    },
    onBeforeAction: function () {
      ReactionCore.setPage(this.params._id);
      return this.next();
    },
    data: function () {
      let page;
      page = selectedPage();
      if (this.ready() && page) {
        if (!page.isVisible) {
          if (!ReactionCore.hasPermission("createPage")) {
            this.render("unauthorized");
          }
        }
        if (page._id === page.handle) {
          page.handle = "";
        }
        return page;
      }
      if (this.ready() && !page) {
        return this.render("pageNotFound");
      }
    }
  });

});
