let express    = require('express');
let Webtask    = require('webtask-tools');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendStatus(200);
});

app.get('/food', (req, res) => {
  req.webtaskContext.storage.get((err, data) => {
    if (err) res.sendStatus(500);
    res.json(data.foodPlaces);
  });
});

app.get('/attendees', (req, res) => {
  req.webtaskContext.storage.get((err, data) => {
    if (err) res.sendStatus(500);
    res.json(data.lunchAttendees);
  });
});

app.post('/addFood', (req, res) => {
  console.log(req.body);
  req.webtaskContext.storage.get((err, data) => {
    if (err) res.sendStatus(500);
    let food = data.foodPlaces;

    if (typeof req.body.name === 'string') {
      food.push({
        name: req.body.name,
        okOption: true
      });
    }
    data.foodPlaces = food;
    req.webtaskContext.storage.set(data, (error) => {
      if (error) res.sendStatus(500);
      res.sendStatus(200);
    });
  })
});

module.exports = Webtask.fromExpress(app);
