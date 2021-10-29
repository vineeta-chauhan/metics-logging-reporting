const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const app = express();
const port = 3000;
const {
  getTimeStampOfBeforeNHour,
  isDateBefore,
} = require("./utils/dateUtils");

const inMemoryCache = {};

setInterval(() => {
  const timeStampOfBeforeOneHour = getTimeStampOfBeforeNHour();
  const memoryKeys = Object.keys(inMemoryCache);
  memoryKeys.map((key) => {
    [...inMemoryCache[key]].map((ele, index) => {
      if (!isDateBefore(timeStampOfBeforeOneHour, ele.timeStamp)) {
        inMemoryCache[key].splice(index, 1);
      }
    });
  });
  console.log(inMemoryCache, "inMemoryCache in setInterval")
}, 10 * 60 * 1000); // this function will run on every 10 mins time interval

const setMetricsHandler = (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  const timeStamp = moment().valueOf();

  if (inMemoryCache[key]) {
    inMemoryCache[key].push({ timeStamp, value });
  } else {
    inMemoryCache[key] = [{ timeStamp, value }];
  }
  console.log(inMemoryCache, "inMemoryCache in setMetricsHandler");
  res.status(200).send({ sucess: true });
};

const getSumOfMetricsHandler = (req, res) => {
  const { key } = req.params;
  console.log(inMemoryCache, "inMemoryCache in getSumOfMetricsHandler");
  if (inMemoryCache[key]) {
    const timeStampOfBeforeOneHour = getTimeStampOfBeforeNHour();
    const sumOfMetricsValue = inMemoryCache[key].reduce((acc, curr) => {
      if (isDateBefore(timeStampOfBeforeOneHour, curr.timeStamp)) {
        acc += curr.value;
      }

      return acc;
    }, 0);
    res.send({ value: sumOfMetricsValue, success: true });
  } else {
    res.send({ success: false, message: "No key found" });
  }
};

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/metric/:key", setMetricsHandler);

app.get("/metric/:key/sum", getSumOfMetricsHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
