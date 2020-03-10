import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

import './App.css';
import * as COOKIES from './const/cookies';
import * as api from './api';
import * as responseStatus from './const/responseStatus';
import * as screens from './const/screens';
import * as actionTypes from "./redux/actionTypes";
import Splash from './components/Splash';
import SignUp from './components/SignUp';
import MainContainer from './components/MainContainer';
import createAction from './redux/createAction';
import delay from './helpers/delay';


const cookies = new Cookies();

class App extends React.Component {
  //TODO: add error handlig from the API calls
  async componentDidMount() {

    //await delay(1000);

    // try to get saved client ID
    const clientId = cookies.get(COOKIES.CLIENT_ID);
    if (clientId) {
      const response = await api.getClient(clientId);
      if (response && response.status == responseStatus.SUCCESS && response.payload) {
        //cookies.set(COOKIES.CLIENT_ID, clientDetails.clientId);
        this.props.setClientDetails(response.payload);
        //this.props.setActiveScreen(screens.MAIN);
        return;
      }
    }

    // display the SignUp screen
    this.props.setActiveScreen(screens.SIGNUP);
  }

  render() {
    return (
      <div className="App">
        {this.props.activeScreen == screens.SPLASH && <Splash />}
        {this.props.activeScreen == screens.SIGNUP && <SignUp />}
        {this.props.activeScreen == screens.MAIN && <MainContainer />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeScreen: state.activeScreen
});

const mapDispatchToProps = dispatch => ({
  setActiveScreen: activeScreen => dispatch(createAction(actionTypes.SET_ACTIVE_SCREEN, { activeScreen: activeScreen })),
  setClientDetails: clientDetails => dispatch(createAction(actionTypes.SET_CLIENT_DETAILS, { clientDetails: clientDetails }))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
