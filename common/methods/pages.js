/**
 * Reaction Flat Page Methods
 */

ReactionFlatPages = {};
ReactionFlatPages.methods = {};

/**
 * ReactionFlatPages.methods.createPage
 * @summary when we create a new page, we create it with an empty fields
 * @param {Object} page - optional page object
 * @return {String} return insert result
 */
ReactionFlatPages.methods.createPage = new ValidatedMethod({
  name: "ReactionFlatPages.methods.createPage",
  validate(args) {
    check(args && args.page, Match.Optional(Object));
    if (!ReactionCore.hasPermission("createPage")) {
      throw new Meteor.Error(403, "Access Denied");
    }
  },
  run(args) {
    let page = args && args.page;
    let options = {};
    if (!page) {
      page = {
        _id: Random.id(),
        title: "",
        content: ""
      };
      options = { validate: false };
    }
    return ReactionCore.Collections.Pages.insert(page, options);
  }
});

/**
 * ReactionFlatPages.methods.deletePage
 * @summary delete a page
 * @param {String} pageId - pageId to delete
 * @returns {Boolean} returns delete result
 */
ReactionFlatPages.methods.deletePage = new ValidatedMethod({
  name: "ReactionFlatPages.methods.deletePage",
  validate({ pageId }) {
    check(pageId, Match.OneOf(Array, String));
    // must have admin permission to delete
    if (!ReactionCore.hasAdminAccess()) {
      throw new Meteor.Error(403, "Access Denied");
    }
  },
  run({ pageId }) {
    let pageIds = _.isString(pageId) ? [pageId] : pageId;
    let numRemoved = ReactionCore.Collections.Pages.remove({
      _id: {
        $in: pageIds
      }
    });
    // return false if unable to delete
    return numRemoved > 0;
  }
});

/**
 * ReactionFlatPages.methods.updatePageField
 * @summary update single page field
 * @param {String} pageId - pageId to update
 * @param {String} field - key to update
 * @param {String} value - update property value
 * @return {String} returns update result
 */
ReactionFlatPages.methods.updatePageField = new ValidatedMethod({
  name: "ReactionFlatPages.methods.updatePageField",
  validate({ pageId, field, value }) {
    check(pageId, String);
    check(field, String);
    check(value, Match.OneOf(String, Object, Array, Boolean));
    if (!ReactionCore.hasPermission("createPage")) {
      throw new Meteor.Error(403, "Access Denied");
    }
  },
  run({ pageId, field, value }) {
    if(field === "handle" && ReactionCore.Collections.Pages.findOne({handle: value})) {
      throw new Meteor.Error(403, "The page with this handle already exists");
    }
    const stringValue = EJSON.stringify(value);
    const update = EJSON.parse("{\"" + field + "\":" + stringValue + "}");
    ReactionCore.Log.debug(`Change page ${pageId} field ${field} = "${value}"`);
    return ReactionCore.Collections.Pages.update(pageId, {
      $set: update
    });
  }
});

/**
 * ReactionFlatPages.methods.publishPage
 * @summary publish (visibility) of page
 * @todo hook into publishing flow
 * @param {String} pageId - pageId
 * @return {String} return
 */
ReactionFlatPages.methods.publishPage = new ValidatedMethod({
  name: "ReactionFlatPages.methods.publishPage",
  permission: "createPage",
  validate({ pageId }) {
    check(pageId, String);
    if (!ReactionCore.hasPermission("createPage")) {
      throw new Meteor.Error(403, "Access Denied");
    }
  },
  run({ pageId }) {
    const page = ReactionCore.Collections.Pages.findOne(pageId);
    if (page && page.title && page.content) {
      // update page visibility
      ReactionCore.Log.debug(`Toggle page ${pageId} visibility = ${!page.isVisible}`);
      ReactionCore.Collections.Pages.update(page._id, {
        $set: {
          isVisible: !page.isVisible
        }
      });
      return ReactionCore.Collections.Pages.findOne(page._id).isVisible;
    } else {
      ReactionCore.Log.debug(`Invalid page ${pageId} visibility`);
      throw new Meteor.Error(400, "Bad Request");
    }
  }
});
