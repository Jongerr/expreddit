const request = require('request');
const subredditData = require('./testDataSubreddit');
const replyOne = require('./testDataSubmission1');
const replyTwo = require('./testDataSubmission2');

module.exports.fetchSubredditPostData = (subreddit, callback, postAmmount=5) => {
  subreddit = !subreddit.length ? 'random' : subreddit;
  request('https://www.reddit.com/r/'+ subreddit + '.json?sort=top&t=week', (err, res, body) => {
    console.log('Reddit response body:', JSON.parse(body));
    //filter out stickied posts
    let topPosts = JSON.parse(body).data.children.filter((post) => {
      return !post.data.stickied;
    })
    .slice(0, postAmmount)
    .map((post) => {
      return {
        url: post.data.permalink,
        id: post.data.name,
        title: post.data.title,
        selftext: post.data.selftext,
        subreddit: post.data.subreddit
      };
    });
    fetchPostReplyData(topPosts, (replies) => {
      callback(replies);
    });
  });
};


const fetchPostReplyData = (posts, callback) => {
  let repliesPerPost = {};
  let postsToQuery = posts.length;

  posts.forEach((post) => {
    //Query post urls
    request('https://www.reddit.com' + post.url + '.json', (err, res, body) => {
      if(err) console.log(err);
      else {
        repliesPerPost[post.id] = {};
        repliesPerPost[post.id].title = post.title;
        repliesPerPost[post.id].url = 'https://www.reddit.com' + post.url;
        repliesPerPost[post.id].selftext = post.selftext;
        repliesPerPost[post.id].subreddit = post.subreddit;
        //get top three replies from post
        repliesPerPost[post.id].replies = JSON.parse(body)[1].data.children.slice(0,3);
        if(--postsToQuery === 0) {
          formatPostReplies(repliesPerPost);
          callback(repliesPerPost);
        }
      }
    });
  });
};

const formatPostReplies = (posts) => {
  //pluck desired fields from reply obj
  for (let key in posts) {
    posts[key].replies = posts[key].replies.map((reply) => {
      return {
        author: reply.data.author,
        body: reply.data.body,
        score: reply.data.score
      };
    });
  }
  return posts;
}