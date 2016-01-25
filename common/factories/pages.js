/**
 * Page factory
 * @summary define product Factory
 */
Factory.define("page", ReactionCore.Collections.Pages, {
  shopId: faker.reaction.shops.getShop()._id,
  title: faker.lorem.sentence(),
  pageTitle: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  isVisible: faker.random.boolean(),
  publishedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
});
