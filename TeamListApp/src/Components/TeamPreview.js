import React from 'react';
import PropTypes from 'prop-types';

class TeamPreview extends React.Component {

  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  render(){
    return (
      <div className=".link text-center" onClick={this.handleClick}>
        <div>
          {this.props.teamName}
        </div>
        <div>
          {this.props.teamLeague}
        </div>
      </div>
    );
  }
}

TeamPreview.propTypes = {
  id: PropTypes.number.isRequired,
  teamName: PropTypes.string.isRequired,
  teamLeague: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TeamPreview;
