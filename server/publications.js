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
  let shop = ReactionCore.getCurrentShop(this);
  let Pages = ReactionCore.Collections.Pages;
  let limit = pageScrollLimit || 10;
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
  check(pageId, String);
  let shop = ReactionCore.getCurrentShop(this);
  let Pages = ReactionCore.Collections.Pages;
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
  return Pages.find(selector);
});
