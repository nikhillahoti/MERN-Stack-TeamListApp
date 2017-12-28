// axios is used to make async requests and fetching data through API
import Axios from 'axios';
import config from './config';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/Components/App';

const getApiUrl = teamId => {
  if(teamId){
      return config.serverUrl + '/api/Teams/' + teamId;
  }
  return config.serverUrl + '/api/Teams';
};

const getInitialData = (teamId, apiData) => {
  if(teamId){
    return {
      currentTeamId: apiData.id,
      teamNames: {
        [apiData.id]: apiData
      }
    }
  }
  return {
    teamNames: apiData.teamNames
  }
};

// Creating a promise which is exported and used in server.js file
const serverRender = (teamId) =>
  Axios.get(getApiUrl(teamId))
  .then(resp => {
    const initialData = getInitialData(teamId, resp.data);
    return {
      initialMarkup: ReactDOMServer.renderToString(
        // data is passed to App React Component which calls other Components internally
        <App initialData={initialData} />
      ),
      initialData: initialData
    }
  });

export default serverRender;
