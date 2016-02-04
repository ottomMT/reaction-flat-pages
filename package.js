Package.describe({
  summary: "Flat pages for Reaction Commerce",
  name: "ramusus:reaction-flat-pages",
  version: "0.1.0",
  git: "https://github.com/ramusus/reaction-flat-pages.git"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.2");

  // meteor base packages
  api.use("meteor-base");
  api.use("mongo");
  api.use("ecmascript");
  api.use("es5-shim");
  api.use("blaze-html-templates");
  api.use("session");
  api.use("jquery");
  api.use("tracker");

  // meteor add-on packages
  api.use("random");
  api.use("check");
  api.use("ejson");

  // add-on packages
  api.use("reactioncommerce:core@0.11.0");
  api.use("reactioncommerce:reaction-router@1.0.0");
  api.use("mquandalle:bower@1.5.2_1");
  api.use("cfs:ejson-file@0.0.0");

  api.addFiles("lib/bower.json", "client");
  api.addFiles("lib/trumbowyg.js", "client");
  api.addFiles("lib/trumbowyg.upload.js", "client");
  api.addFiles("lib/bower/trumbowyg/dist/ui/trumbowyg.css", "client");
  api.addFiles("lib/bower/trumbowyg/dist/langs/ru.min.js", "client");
  api.addAssets("lib/bower/trumbowyg/dist/ui/images/icons-black-2x.png", "client");
  api.addAssets("lib/bower/trumbowyg/dist/ui/images/icons-black.png", "client");

  api.addFiles("common/collections.js");
  api.addFiles("routes/pages.js");

  api.addFiles("client/app.js", "client");
  //api.addFiles("client/subscriptions.js", "client");
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

  // TODO: Find another way to use this files, look https://github.com/reactioncommerce/reaction/issues/696
  // for now need to add content of this files to the end of reaction-code/private/data/i18n/*.json files
  //api.addAssets("private/data/i18n/en.json", "server");
  //api.addAssets("private/data/i18n/ru.json", "server");

  // security
  api.addFiles("server/browserPolicy.js", "server");

  // exports
  api.export("currentPage", ["client", "server"]);
  api.export("ReactionPage");
});

Package.onTest(function (api) {
  api.use("underscore");
  api.use("random");
  api.use("sanjo:jasmine@0.20.3");
  api.use("velocity:html-reporter@0.9.1");
  api.use("velocity:console-reporter@0.1.4");

  api.use("accounts-base");
  api.use("accounts-password");

  // reaction core
  api.use("reactioncommerce:core@0.11.0");
  api.use("reactioncommerce:reaction-factories@0.3.7");
  api.use("ramusus:reaction-flat-pages@0.0.9");

  // factories
  api.addFiles("common/factories/pages.js", "server");

  // server integration tests
  api.addFiles("tests/jasmine/server/integration/pages.js", "server");
  api.export("faker", ["server"]);
});
