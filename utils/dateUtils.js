const moment = require('moment');

const getTimeStampOfBeforeNHour = (numOfHours = 1) => {
  return moment().subtract(numOfHours, "minutes").valueOf();
}

const isDateBefore = (date1, date2) => {
  return moment(date1).isBefore(date2);
}

module.exports = { getTimeStampOfBeforeNHour,isDateBefore };


