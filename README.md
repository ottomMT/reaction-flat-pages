Reaction Flat Pages [![Build Status](https://travis-ci.org/ramusus/reaction-flat-pages.png?branch=master)](https://travis-ci.org/ramusus/reaction-flat-pages)
===================

This package lets you store simple “flat” HTML content in a database and handles the management in Reactioncommerce
style in place. A flatpage is a simple object with a URL, title and content. Use it for one-off, special-case pages,
such as “About” or “Privacy Policy” pages, that you want to store in a database.

Django-like contrib flatpages package. All interfaces of pages management is completely reactive.

Installation
------------

    meteor add ramusus:reaction-flat-pages

Screenshots
-----------

Page:

![Page](https://s3.amazonaws.com/f.cl.ly/items/1L000k2E3L2m0U2T2W30/Image%202016-01-25%20at%205.15.53%20PM.png?v=8bc0fc05)

Page Form:

![Page Form](https://s3.amazonaws.com/f.cl.ly/items/2s2q213o0L3V2G310n47/Image%202016-01-25%20at%205.17.37%20PM.png?v=fb84adbe)

Dashboard Flat Pages settings 

![Page Form](https://s3.amazonaws.com/f.cl.ly/items/0e3S292v2r250u3N422v/Image%202016-01-25%20at%205.14.39%20PM.png?v=c602fb89)

Features
--------

* Link "Add Page" in right sidebar;
* Reactive Page form with ability to change fields in place (Product form style);
* Dashboard integration - all pages list, deleting, reordering (in plans) options;
* All pages lives under `/page` URL-prefix;
* WYSIWYG content field with ability to upload multiple images at once.

You are welcome to submit any issues or ideas [here](https://github.com/ramusus/reaction-flat-pages/issues/)
