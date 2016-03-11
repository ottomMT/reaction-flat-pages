ReactionCore.registerPackage({
  label: "Flat Pages",
  name: "reaction-flat-pages",
  icon: "fa fa-cubes",
  autoEnable: true,
  settings: {},
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
    priority: 2,
    permissions: [{
      label: "Create Page",
      permission: "createPage"
    }]
  }, {
    provides: "dashboard",
    name: "reaction-flat-pages",
    label: "Flat Pages",
    description: "Easily add flat pages anywhere into Reaction Commerce",
    icon: "fa fa-file-text-o",
    priority: 2,
    container: "core",
  }, {
    provides: "settings",
    template: "flatPagesSettings",
    label: "Flat Pages",
    icon: "fa fa-file-text-o",
    workflow: "corePageWorkflow",
    container: "page",
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
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
