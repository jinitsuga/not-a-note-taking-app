const dummy = (blogs) => {
  return 1;
};

const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.reduce(reducer, 0) / array.length;
};

const totalLikes = (posts) => {
  return posts.length === 0
    ? 0
    : posts.reduce((sum, post) => {
        return sum + post.likes;
      }, 0);
};

const favoriteBlog = (posts) => {
  return posts.sort((a, b) => b.likes - a.likes);
};

// Auth related helpers

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

module.exports = {
  dummy,
  reverse,
  average,
  totalLikes,
  favoriteBlog,
  getTokenFrom,
};
