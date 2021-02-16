const express = require('express');
const Pattern = require('../database/Pattern.js');

let app = express();
let port = 3000;

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.get('/api/patterns/:name', (req, res) => {
  const { name } = req.params;
  Pattern.find({
    "name": name
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
})

app.post('/api/patterns/', (req, res) => {
  const pattern = req.body;
  Pattern.create(pattern)
    .then(res.send(200))
    .catch((err) => res.send(err));
})

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
