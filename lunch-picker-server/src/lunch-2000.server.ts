import {Express} from 'express';
import {UpdateDislikesRequest, WebtaskRequest} from './api';

let express = require('express'); // tslint:disable-line
let bodyParser = require('body-parser'); // tslint:disable-line
let Webtask = require('webtask-tools'); // tslint:disable-line
const app: Express = express();

app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.sendStatus(200);
// });

app.get('/food', (req: WebtaskRequest, res) => {
  req.webtaskContext.storage.get((err, data) => {
    if (err) {
        res.sendStatus(500);
    }
    res.json(data.foodPlaces);
  });
});

app.get('/attendees', (req: WebtaskRequest, res) => {
  req.webtaskContext.storage.get((err, data) => {
    if (err) {
        res.sendStatus(500);
    }
    res.json(data.lunchAttendees);
  });
});

app.post('/addFood', (req: WebtaskRequest, res) => {
  console.log(req.body);
  req.webtaskContext.storage.get((err, data) => {
    if (err) {
        res.sendStatus(500);
    }
    const food = data.foodPlaces;

    if (typeof req.body.name === 'string') {
      food.push({
        name: req.body.name,
        okOption: true,
      });
    }
    data.foodPlaces = food;
    req.webtaskContext.storage.set(data, (error) => {
      if (error) {
          res.sendStatus(500);
      }
      res.sendStatus(200);
    });
  });
});

app.put('/updateDislikes', (req: UpdateDislikesRequest, res) => {
    req.webtaskContext.storage.get((error, data) => {
        if (error) {
            res.sendStatus(500);
        }
        const attendeeInfo = data.lunchAttendees.find((attendee) => attendee.name === req.body.attendeeName);
        attendeeInfo.dislikes = req.body.newDislikeList;

        req.webtaskContext.storage.set(data, (err) => {
            if (err) {
                res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });
});

module.exports = Webtask.fromExpress(app);
