'use strict';
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false);

(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})().then(() =>
  app.listen(PORT, () => {
    console.log('server is started on PORT ' + PORT);
  })
);
