Reaction Flat Pages [![Build Status](https://travis-ci.org/ramusus/reaction-flat-pages.png?branch=master)](https://travis-ci.org/ramusus/reaction-flat-pages)
===================

This package lets you store simple “flat” HTML content in a database and handles the management in Reaction Commerce
style in place. A flatpage is a simple object with a URL, title and content. Use it for one-off, special-case pages,
such as “About” or “Privacy Policy” pages, that you want to store in a database.

Django-like contrib flatpages package. All interfaces of pages management is completely reactive.

Installation
------------

    meteor add ramusus:reaction-flat-pages

**Important** Right now Reaction Core doesn't support integration with this package out of the box. It's necessary to do 
slight changes. I opened this [Pull Request](https://github.com/reactioncommerce/reaction/pull/805) 
to show how to integrate it with latest development 0.12 version of Reaction Core. You can merge it to you local 
installation. You can check what changes are necessary 
[here](https://github.com/reactioncommerce/reaction/pull/805/files).

To enable link "Flat Pages" in right-side bar, it's required to remove all shops from database. They will be
created again by inner logic of Reaction with updated layout with this link. It will appear in the bottom of right-side bar
on index and product tag pages.

Screencast
----------

![Page](https://s3.amazonaws.com/f.cl.ly/items/160r1h2F162d2Y0J3L0Z/Screen%20Recording%202016-03-11%20at%2005.38%20PM.gif?v=1c4a217a)

Features
--------

* Link "Add Page" in right sidebar;
* Link "Flat Pages" with all pages in the bottom of right sidebar;
* Reactive Page form with ability to change fields in place (Reaction product form style);
* Dashboard integration - all pages list, delete, show, hide, reorder (in plans) options;
* All pages lives under `/page` URL-prefix;
* WYSIWYG content field with ability to upload multiple images at once.

You are welcome to submit any issues or ideas [here](https://github.com/ramusus/reaction-flat-pages/issues/)
