const request = require('request');

const TOKEN = process.env.COGNATIVE_KEY_1;
const endpoint = 'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';

let testData = {
  'documents': [
    { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
    { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
  ]
};

request({
  method: 'POST',
  url: endpoint,
  Accept: 'application/json',
  headers: {
    'Ocp-Apim-Subscription-Key': TOKEN,
  },
  body: JSON.stringify(testData)
}, (err, res, body) => {
  console.log(body);
});



