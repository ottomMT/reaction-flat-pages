/* eslint dot-notation: 0 */
describe("core page methods", function () {
  describe("createPage", function () {
    beforeEach(function () {
      return ReactionCore.Collections.Pages.remove({});
    });

    it("should throw 403 error by non admin", function (done) {
      spyOn(Roles, "userIsInRole").and.returnValue(false);
      spyOn(ReactionCore.Collections.Pages, "insert");
      expect(function () {
        return ReactionFlatPages.methods.createPage.call();
      }).toThrow(new Meteor.Error(403, "Access Denied"));
      expect(ReactionCore.Collections.Pages.insert).not.toHaveBeenCalled();
      return done();
    });

    it("should create new page by admin", function (done) {
      spyOn(Roles, "userIsInRole").and.returnValue(true);
      spyOn(ReactionCore.Collections.Pages, "insert").and.returnValue(1);
      expect(ReactionFlatPages.methods.createPage.call()).toEqual(1);
      expect(ReactionCore.Collections.Pages.insert).toHaveBeenCalled();
      return done();
    });
  });

  describe("deletePage", function () {
    beforeEach(function () {
      return ReactionCore.Collections.Pages.remove({});
    });
    it("should throw 403 error by non admin", function (done) {
      let page;
      spyOn(Roles, "userIsInRole").and.returnValue(false);
      spyOn(ReactionCore.Collections.Pages, "remove");
      page = Factory.create("page");
      expect(function () {
        return ReactionFlatPages.methods.deletePage.call({pageId: page._id});
      }).toThrow(new Meteor.Error(403, "Access Denied"));
      expect(ReactionCore.Collections.Pages.remove).not.toHaveBeenCalled();
      return done();
    });

    it("should delete page by admin", function (done) {
      let page;
      spyOn(Roles, "userIsInRole").and.returnValue(true);
      page = Factory.create("page");
      expect(ReactionCore.Collections.Pages.find().count()).toEqual(1);
      expect(ReactionFlatPages.methods.deletePage.call({pageId: page._id})).toBe(true);
      expect(ReactionCore.Collections.Pages.find().count()).toEqual(0);
      return done();
    });
  });

  describe("updatePageField", function () {
    beforeEach(function () {
      return ReactionCore.Collections.Pages.remove({});
    });
    it("should throw 403 error by non admin", function (done) {
      let page;
      spyOn(Roles, "userIsInRole").and.returnValue(false);
      page = Factory.create("page");
      spyOn(ReactionCore.Collections.Pages, "update");
      expect(function () {
        return ReactionFlatPages.methods.updatePageField.call({pageId: page._id, field: "title", value: "Updated Title"});
      }).toThrow(new Meteor.Error(403, "Access Denied"));
      expect(ReactionCore.Collections.Pages.update).not.toHaveBeenCalled();
      return done();
    });

    it("should update page field by admin", function (done) {
      let page;
      spyOn(Roles, "userIsInRole").and.returnValue(true);
      page = Factory.create("page");
      ReactionFlatPages.methods.updatePageField.call(
        {pageId: page._id, field: "title", value: "Updated Title"});
      page = ReactionCore.Collections.Pages.findOne({
        _id: page._id
      });
      expect(page.title).toEqual("Updated Title");
      return done();
    });
  });

  describe("publishPage", function () {
    beforeEach(function () {
      return ReactionCore.Collections.Pages.remove({});
    });

    it("should throw 403 error by non admin", function (done) {
      let page;
      spyOn(Roles, "userIsInRole").and.returnValue(false);
      page = Factory.create("page");
      spyOn(ReactionCore.Collections.Pages, "update");
      expect(function () {
        return ReactionFlatPages.methods.publishPage.call({pageId: page._id});
      }).toThrow(new Meteor.Error(403, "Access Denied"));
      expect(ReactionCore.Collections.Pages.update).not.toHaveBeenCalled();
      return done();
    });

    it("should let admin publish page", function (done) {
      let isVisible;
      let page;
      spyOn(Roles, "userIsInRole").and.returnValue(true);
      page = Factory.create("page");
      isVisible = page.isVisible;
      expect(function () {
        return ReactionFlatPages.methods.publishPage.call({pageId: page._id});
      }).not.toThrow(new Meteor.Error(403, "Access Denied"));
      page = ReactionCore.Collections.Pages.findOne(page._id);
      expect(page.isVisible).toEqual(!isVisible);
      return done();
    });

    it("should let admin toggle page visibility", function (done) {
      let isVisible;
      let page;
      spyOn(Roles, "userIsInRole").and.returnValue(true);
      page = Factory.create("page");
      isVisible = page.isVisible;
      expect(function () {
        return ReactionFlatPages.methods.publishPage.call({pageId: page._id});
      }).not.toThrow(new Meteor.Error(403, "Access Denied"));
      page = ReactionCore.Collections.Pages.findOne(page._id);
      expect(page.isVisible).toEqual(!isVisible);
      expect(function () {
        return ReactionFlatPages.methods.publishPage.call({pageId: page._id});
      }).not.toThrow(new Meteor.Error(400, "Bad Request"));
      page = ReactionCore.Collections.Pages.findOne(page._id);
      expect(page.isVisible).toEqual(isVisible);
      return done();
    });

    it("should not publish page when missing title", function (done) {
      let isVisible;
      let page;
      spyOn(Roles, "userIsInRole").and.returnValue(true);
      page = Factory.create("page");
      isVisible = page.isVisible;
      ReactionCore.Collections.Pages.direct.update(page._id, {
        $set: {
          title: ""
        }
      }, {
        validate: false
      });
      expect(function () {
        return ReactionFlatPages.methods.publishPage.call({pageId: page._id});
      }).not.toThrow(new Meteor.Error(403, "Access Denied"));
      page = ReactionCore.Collections.Pages.findOne(page._id);
      expect(page.isVisible).toEqual(isVisible);
      return done();
    });
  });
});
