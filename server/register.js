/*
 * register reaction-flat-pages components as reaction packages
 */

ReactionCore.registerPackage({
  label: "Flat Pages",
  name: "flat-pages",
  autoEnable: true,
  settings: {
    url: ""
  },
  registry: [{
    provides: "dashboard",
    label: "Flat Pages",
    description: "Easily add flat pages anywhere into Reaction Commerce",
    i18nKeyLabel: "admin.dashboard.flatPagesLabel",
    i18nKeyDescription: "admin.dashboard.flatPagesDescription",
    icon: "fa fa-file-text-o",
    cycle: 3,
    container: "dashboard"
  }, {
    route: "createPage",
    label: "Add Page",
    i18nKeyLabel: "admin.shortcuts.addPage",
    icon: "fa fa-plus",
    provides: "shortcut"
  }, {
    route: "dashboard/flat-pages",
    template: "flatPagesSettings",
    label: "Flat Pages Settings",
    provides: "settings",
    icon: "fa fa-cog fa-2x fa-fw",
    container: "dashboard"
  }],
  permissions: [{
    label: "Flat Pages",
    permission: "dashboard/settings",
    group: "Shop Settings"
  }]
});
