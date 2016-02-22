ReactionCore.registerPackage({
  label: "Flat Pages",
  name: "reaction-flat-pages",
  icon: "fa fa-cubes",
  autoEnable: true,
  registry: [{
    route: "/page/:handle",
    name: "page",
    template: "pageDetail",
    workflow: "corePageWorkflow"
  }, {
    route: "/pages/createPage",
    name: "createPage",
    label: "Add Page",
    icon: "fa fa-file-text-o",
    template: "pageDetail",
    provides: "shortcut",
    container: "addItem",
    priority: 3,
    permissions: [{
      label: "Create Page",
      permission: "createPage"
    }]
  }, {
    provides: "dashboard",
    name: "flatpages",
    label: "Flat Pages",
    description: "Easily add flat pages anywhere into Reaction Commerce",
    icon: "fa fa-file-text-o",
    priority: 2,
    container: "core",
  }, {
    label: "Flat Pages",
    route: "/dashboard/flatpages/settings",
    name: "flatpages/settings",
    provides: "settings",
    template: "flatPagesSettings"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "corePageWorkflow",
    collection: "Pages",
    theme: "default",
    enabled: true,
    structure: {
      template: "pageDetail",
      layoutHeader: "layoutHeader",
      layoutFooter: "",
      notFound: "pageNotFound",
      dashboardHeader: "",
      dashboardControls: "flatpagesDashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
