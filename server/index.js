const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const getSubredditData = require('./helpers/getSubredditData').fetchSubredditPostData;
const getSentimentOfText = require('./helpers/getSentimentData.js').getSentimentOfText;

const app = express();

const distPath = path.join(__dirname, '../client/dist');

app.use(express.static(distPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/subreddit', function(req, res) {
  console.log('REQ body:', req.body);
  getSubredditData(req.body.subredditName, (replies) => {
    console.log('REPLIES IN SERVER:\n------------------------------\n', replies, '\n------------------------------');
    getSentimentOfText(replies);
    res.json(replies);
  });
});


app.listen(3000, function() {
  console.log('Listening on port 3000');
});