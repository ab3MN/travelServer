const express = require('express');
require('dotenv').config();

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(require('morgan')(formatsLogger));

/* ==================== PUBLIC ==================== */
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
  res.sendFile(path.resolve() + '/public/instruction/instruction.html');
});

/* ==================== CORS COOKIE JSON ==================== */
const cors = require('cors');
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(require('cookie-parser')());
app.use(express.json());

/* ==================== ROUTES ==================== */
app.use('/users', require('./routes/api/usersRouter')); /* USERS */

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
