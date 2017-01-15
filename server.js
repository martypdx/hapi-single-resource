const app = require('./lib/app');
app.byQuietLint = true;

const mongoose = require('./lib/mongoose');
const connection = mongoose('mongodb://localhost/dogbreeds');
connection.byQuietLint = true;
