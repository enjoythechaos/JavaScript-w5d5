function ourTimeToSeconds(h, m, s) {
  return s + 60 * m + 3600 * h;
}

function ourSecondsToHMS(seconds) {
  var h = Math.floor(seconds / 3600);
  seconds -= (h * 3600);
  var m = Math.floor(seconds / 60);
  seconds -= (m * 60);
  var s = seconds;

  return [h, m, s];
}

function Clock () {
  // 1. Create a Date object.
  this.initializedTime = new Date();
  // 2. Store the hours, minutes, and seconds.
  this.hours = this.initializedTime.getHours();
  this.minutes = this.initializedTime.getMinutes();
  this.seconds = this.initializedTime.getSeconds();
  // 3. Call printTime.
  this.printTime();
  // 4. Schedule the tick at 1 second intervals.
  var boundTick = this._tick.bind(this);
  setInterval(boundTick, 1000);
}

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  // Use console.log to print it.
  console.log(this.hours + ":" + this.minutes + ":" + this.seconds);
};

Clock.prototype._tick = function () {
  // 1. Increment the time by one second.
  var seconds = ourTimeToSeconds(this.hours, this.minutes, this.seconds);
  seconds += 1;
  var resultsOfTimeConversion = ourSecondsToHMS(seconds);
  this.hours = resultsOfTimeConversion[0];
  this.minutes = resultsOfTimeConversion[1];
  this.seconds = resultsOfTimeConversion[2];
  // 2. Call printTime.
  this.printTime();
};

var clock = new Clock();
