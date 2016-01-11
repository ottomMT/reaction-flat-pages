/**
 * Reaction Flat Page Methods
 */
Meteor.methods({

  /**
   * page/createPage
   * @summary when we create a new page, we create it with
   * an empty fields
   * @param {Object} page - optional page object
   * @return {String} return insert result
   */
  "pages/createPage": function (page) {
    check(page, Match.Optional(Object));
    // must have createPage permission
    if (!ReactionCore.hasPermission("createPage")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    this.unblock();
    // if a page object was provided
    if (page) {
      return ReactionCore.Collections.Pages.insert(page);
    }
    // default page
    return ReactionCore.Collections.Pages.insert({
      _id: Random.id(),
      title: "",
      content: ""
    }, {
      validate: false
    });
  },

  /**
   * pages/deletePage
   * @summary delete a page
   * @param {String} pageId - pageId to delete
   * @returns {Boolean} returns delete result
   */
  "pages/deletePage": function (pageId) {
    check(pageId, Match.OneOf(Array, String));
    // must have admin permission to delete
    if (!ReactionCore.hasAdminAccess()) {
      throw new Meteor.Error(403, "Access Denied");
    }
    this.unblock();

    let pageIds;

    if (_.isString(pageId)) {
      pageIds = [pageId];
    } else {
      pageIds = pageId;
    }

    let numRemoved = ReactionCore.Collections.Pages.remove({
      _id: {
        $in: pageIds
      }
    });

    if (numRemoved > 0) {
      return true;
    }
    // return false if unable to delete
    return false;
  },

  /**
   * pages/updatePageField
   * @summary update single page field
   * @param {String} pageId - pageId to update
   * @param {String} field - key to update
   * @param {String} value - update property value
   * @return {String} returns update result
   */
  "pages/updatePageField": function (pageId, field, value) {
    check(pageId, String);
    check(field, String);
    check(value, Match.OneOf(String, Object, Array, Boolean));
    // must have createPage permission
    if (!ReactionCore.hasPermission("createPage")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    this.unblock();

    let stringValue = EJSON.stringify(value);
    let update = EJSON.parse("{\"" + field + "\":" + stringValue + "}");

    return ReactionCore.Collections.Pages.update(pageId, {
      $set: update
    });
  },

  /**
   * pages/publishPage
   * @summary publish (visibility) of page
   * @todo hook into publishing flow
   * @param {String} pageId - pageId
   * @return {String} return
   */
  "pages/publishPage": function (pageId) {
    check(pageId, String);
    if (!ReactionCore.hasPermission("createPage")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    this.unblock();

    let page = ReactionCore.Collections.Pages.findOne(pageId);

    if ((page !== null ? page.title : void 0) && (page !== null ? page.content : void 0)) {
      // update page visibility
      ReactionCore.Log.info("toggle page visibility ", page._id, !page.isVisible);

      ReactionCore.Collections.Pages.update(page._id, {
        $set: {
          isVisible: !page.isVisible
        }
      });
      return ReactionCore.Collections.Pages.findOne(page._id).isVisible;
    }
    ReactionCore.Log.debug("invalid page visibility ", pageId);
    throw new Meteor.Error(400, "Bad Request");
  }

});
