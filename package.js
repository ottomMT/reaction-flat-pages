Package.describe({
    name: 'reaction-static-pages',
    summary: 'Static pages for reactioncommerce',
    version: '0.0.1',
    //git: ' /* Fill me in! */ '
});

Package.onUse(function(api, where) {
    api.versionsFrom('1.0');
    // Reaction Core
    api.use([
        'reactioncommerce:core',
        'templating',
        'coffeescript',
        'meteor-platform',
    ], ['server', 'client']);

    api.use([
        'less',
        'jquery',
        'underscore',
        'blaze',
        'iron:router',
        'aldeed:autoform',
    ], 'client');

    api.addFiles([
        'common/register.coffee',
        'common/collections.coffee',
    ]);

    api.addFiles([
        'client/routing.coffee',
        'client/subscriptions.coffee',

        'client/templates/coreStaticPageLayout/coreStaticPageLayout.html',
        'client/templates/coreStaticPageLayout/coreStaticPageLayout.coffee',

        'client/templates/singlePage/contact.css',
        'client/templates/singlePage/contact.html',
        'client/templates/singlePage/contact.js',

        'client/templates/singlePage/singlePage.html',
        'client/templates/singlePage/singlePage.coffee',

        'client/templates/staticPagesConfig/staticPagesConfig.html',
        'client/templates/staticPagesConfig/staticPagesConfig.coffee',

        // Not need, I think
        //'client/core-replaced-templates/userDropdown.html',
        //'client/core-replaced-templates/userDropdown.coffee',

    ], 'client');

    api.addFiles([
        'server/methods/contact.js',

        'server/methods/pages.coffee',
        'server/publications.coffee',
    ], 'server');
});
