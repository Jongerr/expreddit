const request = require('request');
const subredditData = require('./testDataSubreddit');
const replyOne = require('./testDataSubmission1');
const replyTwo = require('./testDataSubmission2');

module.exports.fetchSubredditPostData = (subreddit, callback) => {
  //Query given subreddit
  //invoke callback on top 2 non-stickied posts
  let topTwoPosts = subredditData.data.children.filter((post) => {
    return !post.data.stickied;
  })
  .slice(0,2)
  .map((post) => {
    return post.data.permalink;
  })
  console.log(topTwoPosts);
};

const fetchPostReplyData = (postUrl, callback) => {
  //Query post url
  //get top three replies from post
  //format replies
  //invoke callback on array of replies
};

const formatPostReplies = (reply) => {
  //pluck desired fields from reply obj
}