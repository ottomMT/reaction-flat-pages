Package.describe({
    name: 'teachmefly:reaction-static-pages',
    summary: 'Static pages for reactioncommerce',
    version: '0.0.3',
    git: 'git@github.com:TeachMeFly/reaction-static-pages.git'
});

Package.onUse(function(api, where) {
    api.versionsFrom('1.0');
    // Reaction Core
    api.use([
        'reactioncommerce:core@0.1.7',
        'templating',
        'coffeescript',
        'meteor-platform',
    ], ['server', 'client']);

    api.use([
        'less',
        'jquery',
        'underscore',
        'blaze',
        'iron:router@0.9.4',
        'aldeed:autoform@3.2.0',
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
