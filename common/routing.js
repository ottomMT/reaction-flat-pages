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
 * General Route Declarations
 */

Router.map(function () {
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
        return page;
      }
      if (this.ready() && !page) {
        return this.render("notFound");
      }
    }
  })

  //this.route("flat-pages", {
  //  controller: ShopAdminController,
  //  path: "dashboard/settings/flat-pages",
  //  template: "flatPagesConfig",
  //  waitOn: function() {
  //    this.subscribe("products");
  //    this.subscribe("tags");
  //    return ReactionCore.Subscriptions.Packages;
  //  }
  //});
});
