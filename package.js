Package.describe({
  summary: "Flat pages for reactioncommerce",
  name: "ramusus:reaction-flat-pages",
  version: "0.0.8",
  git: "https://github.com/ramusus/reaction-flat-pages.git"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.2");

  api.use("reactioncommerce:core@0.10.2");
  api.use("meteor-platform");
  api.use("mquandalle:bower@1.5.2_1");

  api.addFiles("lib/bower.json", "client");
  api.addFiles("lib/bower/trumbowyg/dist/trumbowyg.js", "client");
  api.addFiles("lib/bower/trumbowyg/dist/plugins/upload/trumbowyg.upload.min.js", "client");
  api.addFiles("lib/bower/trumbowyg/dist/ui/trumbowyg.min.css", "client");
  api.addFiles("lib/bower/trumbowyg/dist/langs/ru.min.js", "client");
  api.addAssets("lib/bower/trumbowyg/dist/ui/images/icons-black-2x.png", "client");
  api.addAssets("lib/bower/trumbowyg/dist/ui/images/icons-black.png", "client");

  api.addFiles("common/collections.js");
  api.addFiles("common/routing.js");
  api.addFiles("common/common.js");

  api.addFiles("client/app.js", "client");
  api.addFiles("client/subscriptions.js", "client");
  api.addFiles("client/helpers/globals.js", "client");
  api.addFiles("client/helpers/pages.js", "client");

  api.addFiles("client/templates/pageDetail/pageDetail.html", "client");
  api.addFiles("client/templates/pageDetail/pageDetail.js", "client");
  api.addFiles("client/templates/pageDetail/edit/edit.html", "client");
  api.addFiles("client/templates/pageDetail/edit/edit.js", "client");
  api.addFiles("client/templates/settings/settings.html", "client");
  api.addFiles("client/templates/settings/settings.js", "client");

  api.addFiles("server/register.js", "server");
  api.addFiles("server/methods/pages.js", "server");
  api.addFiles("server/publications.js", "server");

  // TODO: Find another way to use this files
  // for now need to add content of this files to the end of reaction-code/private/data/i18n/*.json files
  //api.addAssets("private/data/i18n/en.json", "server");
  //api.addAssets("private/data/i18n/ru.json", "server");

  api.export([
    "ReactionStaticPage",
    "StaticPageController"
  ]);
});
