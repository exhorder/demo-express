var express = require('express');
var raven = require('raven');

var app = express();

function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry+'\n');
}

app.use(raven.middleware.express.requestHandler('https://41746ddd0a9a463bb795fc0dfdcfd3a0:2b3a13edb30c4579b2b5c4b69571a76f@app.getsentry.com/76024'));

app.get('/', function (req, res) {
  throw new Error('Broke!');
  res.send('Hello World!');
});

// The error handler must be before any other error middleware
app.use(raven.middleware.express.errorHandler('https://41746ddd0a9a463bb795fc0dfdcfd3a0:2b3a13edb30c4579b2b5c4b69571a76f@app.getsentry.com/76024'));

// Optional fallthrough error handler
app.use(onError);

app.listen(3000, function () {
  console.log('Example app with Sentry listening on port 3000!');
});
