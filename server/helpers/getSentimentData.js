const request = require('request');

const TOKEN = process.env.COGNATIVE_KEY_1;
const endpoint = 'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';

let testData = {
  'documents': [
    { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
    { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
  ]
};

module.exports.getSentimentOfText = (subredditData) => {
  let text = formatSubredditData(subredditData);
  console.log('Text after formatting:', text);
  request({
    method: 'POST',
    url: endpoint,
    Accept: 'application/json',
    headers: {
      'Ocp-Apim-Subscription-Key': TOKEN,
    },
    body: JSON.stringify(text)
  }, (err, res, body) => {
    console.log(body);
  });
}


const formatSubredditData = (data) => {
  let text = { documents: [] };
  let id = 1;
  Object.keys(data).forEach((key) => {
    let postBody = data[key].selftext;
    if(postBody) {
      text.documents.push({id: id.toString(), text: postBody});
      id++;
    }
    data[key].replies.forEach((reply) => {
      text.documents.push({id: id.toString(), text: reply.body});
      id++;
    });
  });
  return text;
}

// Post:
// t3_7lpwlb:
// {
//   title: 'The only cryptocurrency you should care about.',
//     url: 'https://www.reddit.com/r/DotA2/comments/7lpwlb/the_only_cryptocurrency_you_should_care_about/',
//       selftext: '',
//         subreddit: 'DotA2',
//           replies: [[Object], [Object], [Object]]
// } } 

//Reply:
// {
//   author: 'mrmeme2988',
//     body: 'Thumb was broken in the smashing of the keyboard \n',
//       score: 152
// }

// export default getSentimentOfText;