const request = require('request');

module.exports.fetchSubredditPostData = (subreddit, callback) => {
  //Query given subreddit
  //invoke callback on top 3 non-stickied posts
};

module.exports.fetchTopRepliesToPost = (postUrl, callback) => {
  //Query post url
  //get top three replies from post
  //format replies
  //invoke callback on array of replies
};

module.exports.formatPostReplies = (reply) => {
  //pluck desired fields from reply obj
}