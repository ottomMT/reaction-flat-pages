/**
 * pages publication
 * @param {Number} pageScrollLimit - optional, defaults to 20
 * @param {Array} shops - array of shopId to retrieve page from.
 * @return {Object} return page cursor
 */
Meteor.publish('Pages', function (pageScrollLimit, shops) {
  check(pageScrollLimit, Match.OneOf(null, undefined, Number));
  check(shops, Match.Optional(Array));

  let shopAdmin;
  const limit = pageScrollLimit || 99;
  const shop = ReactionCore.getCurrentShop();
  const Pages = ReactionCore.Collections.Pages;

  if (typeof shop !== "object") {
    return this.ready();
  }

  if (shop) {
    let selector = {
      shopId: shop._id
    };
    // handle multiple shops
    if (shops) {
      selector = {
        shopId: {
          $in: shops
        }
      };
      // check if this user is a shopAdmin
      for (let thisShop of shops) {
        if (Roles.userIsInRole(this.userId, ["admin", "createPage"],
            thisShop._id)) {
          shopAdmin = true;
        }
      }
    }

    // pages are always visible to owners
    if (!(Roles.userIsInRole(this.userId, ["owner"], shop._id) || shopAdmin)) {
      selector.isVisible = true;
    }

    return Pages.find(selector, {
      sort: {
        title: 1
      },
      limit: limit
    });
  }
  this.ready();
});

/**
 * page detail publication
 * @param {String} pageId - pageId
 * @return {Object} return page cursor
 */
Meteor.publish("Page", function (pageId) {
  check(pageId, Match.Optional(String));
  if (!pageId) {
    ReactionCore.Log.info("ignoring null request on Page subscription");
    return this.ready();
  }

  let shop = ReactionCore.getCurrentShop();
  // verify that shop is ready
  if (typeof shop !== "object") {
    return this.ready();
  }

  let selector = {};
  selector.isVisible = true;

  if (Roles.userIsInRole(this.userId, ["owner", "admin", "createPage"], shop._id)) {
    selector.isVisible = {
      $in: [true, false]
    };
  }
  // TODO review for REGEX / DOS vulnerabilities.
  if (pageId.match(/^[A-Za-z0-9]{17}$/)) {
    selector._id = pageId;
  } else {
    selector.handle = {
      $regex: pageId,
      $options: "i"
    };
  }
  return ReactionCore.Collections.Pages.find(selector);
});
