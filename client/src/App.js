import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import * as api from './api';
import * as responseStatus from './const/responseStatus';
import * as screens from './const/screens';
import Splash from './components/Splash';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainContainer from './components/MainContainer';
import * as cookiesHelper from './helpers/cookiesHelper';
import setActiveScreen from './redux/actions/setActiveScreen';
import setClientDetails from './redux/actions/setClientDetails';
import dispatchCombinedAction from './redux/actions/dispatchCombinedAction';
import SettingsScreen from './components/SettingsScreen';


//TODO: TypeScript
class App extends React.Component {
  //TODO: add error handlig from the API calls

  //TODO: add cookie manager
  async componentDidMount() {

    // try to get saved client ID
    const clientId = cookiesHelper.getClietnId();
    if (clientId) {
      const response = await api.getClient(clientId);
      if (response && response.status == responseStatus.SUCCESS && response.payload) {
        this.props.dispatchCombinedAction([setClientDetails(response.payload), setActiveScreen(screens.MAIN)]);
        return;
      }
    }

    // display the SignUp screen
    this.props.setActiveScreen(screens.SIGNIN);
  }

  render() {
    return (
      <div className="App">
        {this.props.activeScreen == screens.SPLASH && <Splash />}
        {this.props.activeScreen == screens.SIGNIN && <SignIn />}
        {this.props.activeScreen == screens.SIGNUP && <SignUp />}
        {this.props.activeScreen == screens.MAIN && <MainContainer />}
        {this.props.activeScreen == screens.SETTINGS && <SettingsScreen />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeScreen: state.activeScreen
});

const mapDispatchToProps = dispatch => ({
  dispatchCombinedAction: actions => dispatch(dispatchCombinedAction(actions)),
  setActiveScreen: activeScreen => dispatch(setActiveScreen(activeScreen)),
  setClientDetails: clientDetails => dispatch(setClientDetails(clientDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
