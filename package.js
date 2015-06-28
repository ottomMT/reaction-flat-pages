Package.describe({
    name: 'dukeondope:reaction-static-pages',
    summary: 'Static pages for reactioncommerce',
    version: '0.0.6',
//    git: 'https://github.com/dukeondope/reaction-static-pages.git'
});

Package.onUse(function(api, where) {
    api.versionsFrom('1.0');
    // Reaction Core
    api.use([
	'meteor-platform',
	'coffeescript',
	'templating',
	'reactioncommerce:core',
    ], ['server', 'client']);

    api.use([
        'less',
        //'jquery',
        //'underscore',
        'blaze',
        'aldeed:autoform',
        //'jimmiebtlr:bootstrap-wysihtml5',
    ], 'client');

    api.addFiles([
        'common/collections.coffee',
        'common/routing.coffee',
    ]);

    api.addFiles([
        'client/app.coffee',
        'client/subscriptions.coffee',

        'client/templates/singlePage/singlePage.html',
        'client/templates/singlePage/singlePage.coffee',

        'client/templates/staticPagesConfig/staticPagesConfig.html',
        'client/templates/staticPagesConfig/staticPagesConfig.coffee',

    ], 'client');

    api.addFiles([
        'server/register.coffee',
        'server/methods/pages.coffee',
        'server/publications.coffee',
    ], 'server');

    api.export([
        "ReactionStaticPage",
        "StaticPageController",
    ]);
});
