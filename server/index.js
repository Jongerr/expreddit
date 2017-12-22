const express = require('express');
const path = require('path');
const app = express();

const distPath = path.join(__dirname, '../client/dist');
console.log('Dir path:', distPath);
app.use(express.static(distPath));


app.listen(3000, function() {
  console.log('Listening on port 3000');
});