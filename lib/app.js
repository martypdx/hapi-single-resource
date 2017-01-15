'use strict';

const hapi = require('hapi');
const app = hapi();
const errorHandler = require('./error-handler');
const breeds = require('./routes/breeds');

app.use('/breeds', breeds);
app.use(errorHandler);

module.exports = app;
