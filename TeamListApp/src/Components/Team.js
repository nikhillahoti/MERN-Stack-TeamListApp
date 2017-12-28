import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Team extends Component {

  render(){
  return(<div>
        <div>{this.props.description}</div>
        <div onClick={this.props.teamListClicked}>Team List</div>
    </div>)
  }
}

Team.propTypes = {
  teamName: PropTypes.string.isRequired,
  teamLeague: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  teamListClicked: PropTypes.func.isRequired,
}

export default Team;
