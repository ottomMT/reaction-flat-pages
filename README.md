
Installation:
=============

[![Join the chat at https://gitter.im/dukeondope/reaction-static-pages](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dukeondope/reaction-static-pages?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Copy to packages folder (prefered) or

```
meteor add dukeondope:reaction-static-pages
```

.html
=====
somewhere in app
```html
<template name="staticPagesLinks">
    {{#each staticPagesList}}
        <li><a id="{{_id}}-link" href="{{pathFor 'page' route=this.route}}">{{title}}</a></li>
    {{/each}}
</template>
```
.coffee
=======
same
```coffee
Template.staticPagesLinks.helpers
    staticPagesList: ->
        return ReactionCore.existingPages()
```
