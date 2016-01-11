Package.describe({
  summary: "Flat pages for reactioncommerce",
  name: "ramusus:reaction-flat-pages",
  version: "0.0.7",
  git: "https://github.com/ramusus/reaction-flat-pages.git"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.2");
  // Reaction Core
  api.use("reactioncommerce:core");
  api.use("meteor-platform");
  api.use("templating");

  api.use("less@2.5.1", "client");
  //api.use("jquery", "client");
  //api.use("underscore", "client");
  api.use("blaze", "client");
  api.use("aldeed:autoform", "client");
  //api.use("jimmiebtlr:bootstrap-wysihtml5", "client");

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
  //api.addFiles("client/templates/staticPagesConfig/staticPagesConfig.html", "client");
  //api.addFiles("client/templates/staticPagesConfig/staticPagesConfig.coffee", "client");

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
