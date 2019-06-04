const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('../zoos/zoos-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
      res.send(`<h1>are we there yet?</h1>`).json({ message: "nailed it."})
      .catch(err => {
            console.log(`\nERROR`, err);
            res.status(500).json({ error: 'cannot. even.' });
      })
});


server.use('/api/zoos', zoosRouter);

module.exports = server;
