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
    return {url: post.data.permalink, id: post.data.name};
  })
  console.log(topTwoPosts);
  fetchPostReplyData(topTwoPosts, () => {});
};

const fetchPostReplyData = (posts, callback) => {
  let repliesPerPost = {};
  let postsToQuery = posts.length;

  posts.forEach((post) => {
    request('https://www.reddit.com' + post.url + '.json', (err, res, body) => {
      if(err) console.log(err);
      else {
        repliesPerPost[post.id] = JSON.parse(body)[1].data.children.slice(0,3);
        if(--postsToQuery === 0) {
          formatPostReplies(repliesPerPost);
          console.log(repliesPerPost);

        }
      }
    });
  });


  //Query post urls
  //get top three replies from post
  //format replies
  //invoke callback on array of replies
  
};

const formatPostReplies = (replies) => {
  //pluck desired fields from reply obj
  for(let key in replies) {
    replies[key] = replies[key].map((reply) => {
      return {
        author: reply.data.author,
        body: reply.data.body,
        score: reply.data.score
      };
    });
  }
  return replies;
}