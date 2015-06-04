@StaticPageController = RouteController.extend
    waitOn: ->
        @subscribe "pagesList"
    onBeforeAction: 'loading'
    onAfterAction: ->
        ReactionCore.MetaData.clear(@route, @params)
        ReactionCore.MetaData.title = @params.title
        ReactionCore.MetaData.render(@route, @params)
    layoutTemplate: "coreLayout"
    yieldTemplates:
        layoutHeader:
            to: "layoutHeader"
        layoutFooter:
            to: "layoutFooter"
        dashboard:
            to: "dashboard"
StaticPageController = @StaticPageController

Router.map ->
    @route 'page',
        controller: StaticPageController
        path: 'page/:route'
        template: 'singlePage'
        waitOn: ->
            @subscribe "singlePage", @params.route
        data: ->
            return Page.findOne({'route' : @params.route})

    @route 'static-pages',
        controller: ShopAdminController
        path: 'dashboard/settings/static-pages'
        template: "staticPagesConfig"
        waitOn: ->
            @subscribe "products"
            @subscribe "tags"
            return ReactionCore.Subscriptions.Packages
