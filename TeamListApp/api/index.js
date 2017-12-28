import express from 'express';
import data from '../src/testData'

const router = express.Router();
const teamObj = data.Teams.reduce((obj, team) => {
  obj[team.id] = team;
  return obj;
}, {});

router.get('/Teams', (req, res) => {
  res.send({ teamNames : teamObj });
});

router.get('/Teams/:teamId', (req, res) => {
  // to get value passed to express we pushState
  // req.params.teamId
  let Team = teamObj[req.params.teamId];
  Team.description = "I dont know what text to add so I am writing this huge text which should be huge if I start writing anything in it and eventually it will become huge thanks to whatever I am saying right now which is also huge as I keep on speaking about anything which is not related to the API call at all."
  res.send(Team);
});

export default router;
