page = ReactionRouter.group({
  prefix: "/page"
});

//
//  page detail page
//

page.route("/:handle", {
  name: "page",
  action: function (params) {
    ReactionPage.setPage(params.handle);
    // initialize reaction layout
    renderLayout({
      workflow: "corePageWorkflow"
    });
  },
  subscriptions: function(params) {
    this.register('page', Meteor.subscribe('Page', params.handle));
  }
});
