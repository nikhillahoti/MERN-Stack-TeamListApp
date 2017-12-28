import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import TeamList from './TeamList';
import Team from './Team';

// Creating a separate file for hanlding all the api requests
import * as api from '../api';

// This is used to modify and handle the history entries of the browser
// Takes two parameters the obj to be stored against the entered url
const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};

// This fucntion is used to handle the browsers back button
// window.onpopstate is the event which is handled and when this event occurs, handler is executed
const onPopState = (handler) => {
  window.onpopstate = handler;
};

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = this.props.initialData;
  }

  componentDidMount(){
    onPopState((event) => {
      this.setState({
        // we have to handle the case when there is currentTeamId available and when its absent.
        // if currentTeamId is null, we have to load the list of Teams or else have to load the Team data
        currentTeamId: (event.state || {}).currentTeamId
      });
    });
  }

  componentWillUnmount(){
    // clearing all the states registered when the app the leaves
    onPopState(null);
  }

  // function to get the data for the particular team and by changing the currentTeamId the view is rendered again
  fetchTeam = (teamId) => {
    pushState(
      { currentTeamId: teamId },
      '/team/' + teamId
    );

    api.fetchTeam(teamId).then(Team => {
        this.setState({
          currentTeamId: Team.id,
          teamNames: {
            ...this.state.teamNames,
            // this data fetches the description field as well so we need to update the current teamNames object with the new object for the current
            // selected team
            [Team.id]: Team
          }
        });
      }
    );
  }

  fetchTeamList = () => {
    pushState(
      { currentTeamId: null },
      '/'
    );
    api.fetchTeamList().then(teamNames => {
        this.setState({
          currentTeamId: null,
          teamNames
        });
      }
    );
  }

  // This is computed everytime based on whether we have a team selected or not
  pageHeader(){
    if(this.state.currentTeamId){
        return this.currentTeam().teamLeague;
    }
    return "Team Listing";
  }

  // function to return the current object selected
  currentTeam(){
    return this.state.teamNames[this.state.currentTeamId];
  }

  // checking whether to render single Team view or the list of teams
  displayTeam(){
    if (this.state.currentTeamId){
      return <Team teamListClicked={this.fetchTeamList} {...this.currentTeam()}/>;
    }
    return <TeamList teamNames={this.state.teamNames}
                     OnTeamClicked={this.fetchTeam}
           />
  }

  render(){
    return (
      <div>
        // calling the pageHeader method to compute the header value
        <Header projectHeader={this.pageHeader()}/>
        {this.displayTeam()}
      </div>
    );
  }
}

export default App;
