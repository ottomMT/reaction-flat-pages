/**
 * Filtration dashboard helpers
 */

Template.flatpagesDashboardControls.events({
  "click [data-event-action=showFlatPagesOptions]": () => {
    ReactionCore.showActionView({
      label: "Flat Pages",
      i18nKey: "admin.settings.flatPagesSettingsLabel",
      template: "flatPagesSettings"
    });
  }
});
