import axios from 'axios';

export const fetchTeam = teamId => {
  return axios.get('/api/Teams/' + teamId).then(resp => resp.data);
};

export const fetchTeamList = () => {
  return axios.get('/api/Teams').then(resp => resp.data.teamNames);
};
