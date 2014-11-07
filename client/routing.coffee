@StaticPageController = RouteController.extend
    waitOn: ->
        @subscribe "pagesList"
    onBeforeAction: 'loading'
    layoutTemplate: "coreStaticPageLayout"
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
        path: '/:route'
        template: 'singlePage'
        data: ->
            page = Page.findOne({'route' : @params.route})
            return page

    @route 'staticpages',
        controller: ShopAdminController
        path: 'dashboard/settings/staticpages',
        template: 'staticPagesConfig'
        waitOn: ->
            return ReactionCore.Subscriptions.Packages
