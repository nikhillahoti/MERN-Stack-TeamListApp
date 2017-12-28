import PropTypes from 'prop-types';
import TeamPreview from './TeamPreview';
import React from 'react';

const TeamList = ({ teamNames, OnTeamClicked }) => (
  <div>
    {Object.keys(teamNames).map(teamid =>
      <TeamPreview key={teamid} {...teamNames[teamid]}
        onClick={OnTeamClicked}
       />
    )}
  </div>
);

TeamList.propTypes = {
  OnTeamClicked: PropTypes.func.isRequired,
  teamNames: PropTypes.object
};

export default TeamList;
