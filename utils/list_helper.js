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
  console.log(posts);
  return posts.length === 0
    ? 0
    : posts.reduce((sum, post) => {
        return sum + post.likes;
      }, 0);
};

module.exports = {
  dummy,
  reverse,
  average,
  totalLikes,
};
