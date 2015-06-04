ReactionCore.registerPackage
  name: 'reaction-static-pages' # usually same as meteor package
  autoEnable: false # auto-enable in dashboard
  settings:
    url: ""
  
  registry: [
    # all options except route and template
    # are used to describe the
    # dashboard 'app card'.
    {
      provides: 'dashboard'
      label: 'Static Pages'
      description: "Easily add static pages anywhere into Reaction Commerce"
      icon: 'fa fa-text' # glyphicon/fa
      cycle: '3' # Core, Stable, Testing (currently testing)
      container: 'dashboard'  #group this with settings
    }
    # configures settings link for app card
    # use 'group' to link to dashboard card
    {
      route: 'static-pages'
      provides: 'settings'
      container: 'dashboard'
    }
    {
      template: 'staticPagesConfig'
      provides: 'settings'
    }
  ]
  # array of permission objects
  permissions: [
    {
      label: "Static Pages"
      permission: "dashboard/settings"
      group: "Shop Settings"
    }
  ]