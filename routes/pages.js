//
// page route group
//

page = ReactionRouter.group({
  prefix: "/page"
});

//
//  page detail page
//

page.route("/:handle", {
  name: "page",
  action: function (params) {
    // initialize reaction layout
    renderLayout({
      workflow: "corePageWorkflow"
    });
  }
});
