import config from './config';
import apiRouter from './api';

import  express from 'express';
const server = express();

// setting the view engine as ejs.
// ejs searches for views folder in root directory and that is the reason index has relative paths
// as ejs will find index in views folder in root directory
server.set('view engine','ejs');

// serverRender is a promise which fetches data from the api file
// that data is passed to the ejs for displaying
import serverRender from './serverRender';

server.get(['/','/team/:teamId'],(req,res) => {
  serverRender(req.params.teamId)
    .then(({initialMarkup, initialData}) => {
      // ejs receives data from server in Content variable and thus we pass content from promise to ejs here
      res.render('index', {
        initialMarkup,
        initialData
      })
    })
    .catch(console.error);
});


// setting up api requests at /localhost/api path.
// /api/teams --- (/teams) path will be handled by the api file
server.use('/api', apiRouter);

// we can register static pages using express.static(folder_name)
server.use(express.static('public'));

// server is listen function
server.listen(config.port, config.host, () => {
  console.info('Express listening on port ', config.port);
});
