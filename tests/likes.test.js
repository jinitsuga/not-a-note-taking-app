const blogs = require("./blogs").blogs;
const listHelper = require("../utils/list_helper");

console.log(blogs);

describe("total likes", () => {
  test("when list only has 1 blog, equals the likes of that blog", () => {
    const result = listHelper.totalLikes([blogs[1]]);
    expect(result).toBe(5);
  });
});
