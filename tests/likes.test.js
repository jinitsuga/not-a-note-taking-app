const blogs = require("./blogs").blogs;
const listHelper = require("../utils/list_helper");

// console.log(blogs);

describe("total likes", () => {
  test("when list only has 1 blog, equals the likes of that blog", () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(7);
  });
});

describe("show favorite blog", () => {
  test("blog with highest likes", () => {
    const result = listHelper.favoriteBlog(blogs)[0].likes;
    console.log(result);
    expect(result).toEqual(12);
  });
});
