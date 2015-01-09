Package.describe({
    name: 'teachmefly:reaction-static-pages',
    summary: 'Static pages for reactioncommerce',
    version: '0.0.6',
    git: 'https://github.com/TeachMeFly/reaction-static-pages.git'
});

Package.onUse(function(api, where) {
    api.versionsFrom('1.0');
    // Reaction Core
    api.use([
        'reactioncommerce:core@0.2.0',
        'templating',
        'coffeescript',
        'meteor-platform',
    ], ['server', 'client']);

    api.use([
        'less',
        'jquery',
        'underscore',
        'blaze',
        'aldeed:autoform@4.0.7',
        'jimmiebtlr:bootstrap-wysihtml5',
		
    ], 'client');

    api.addFiles([
        'common/register.coffee',
        'common/collections.coffee',
    ]);

    api.addFiles([
        'client/app.coffee',
        'client/routing.coffee',
        'client/subscriptions.coffee',

        'client/templates/coreStaticPageLayout/coreStaticPageLayout.html',
        'client/templates/coreStaticPageLayout/coreStaticPageLayout.coffee',
        'client/templates/singlePage/singlePage.html',
        'client/templates/singlePage/singlePage.coffee',

    ], 'client');

    api.addFiles([
        'server/methods/pages.coffee',
        'server/publications.coffee',
    ], 'server');

    api.export([
        "ReactionStaticPage",
        "StaticPageController",
    ]);
});
