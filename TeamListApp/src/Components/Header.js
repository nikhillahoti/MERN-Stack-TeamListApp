import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {

  render(){
    return (
      <h2 className="text-center">
        {this.props.projectHeader}
      </h2>
    );
  }
}

export default Header;
