import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import App from './Components/App';

ReactDOM.hydrate(
  <App initialData={window.initialData}/>,
  document.getElementById('root')
);

/*
Axios.get('/api/Teams')
.then(resp => {
  /*this.setState({
    teamNames: resp.data.teamNames
  });*/
  /*ReactDOM.hydrate(
    <App initialData={resp.data}/>,
    document.getElementById('root')
  );
})
.catch(console.error);*/
