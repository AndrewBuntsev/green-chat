import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import './App.css';
import * as api from './api';
import Splash from './components/Splash';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainContainer from './components/MainContainer';
import * as cookiesHelper from './helpers/cookiesHelper';
import setActiveScreen from './redux/actions/setActiveScreen';
import setClientDetails from './redux/actions/setClientDetails';
import dispatchCombinedAction from './redux/actions/dispatchCombinedAction';
import SettingsScreen from './components/SettingsScreen';
import { Action } from './redux/Action';
import { Screen } from './enums/Screen';
import { ResponseStatus } from './enums/ResponseStatus';
import { AppState } from './types/AppState';


type Props = {
  activeScreen: Screen;
  dispatchCombinedAction(actions: Array<Action>): Action;
  setActiveScreen(activeScreen: Screen): void;
};
type State = {
  hasError: boolean;
};


class App extends React.Component<Props, State> {
  state = {
    hasError: false
  }

  //TODO: add cookie manager
  async componentDidMount() {
    // try to get saved client ID
    const clientId = cookiesHelper.getClietnId();
    if (clientId) {
      const response = await api.getClient(clientId);
      if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
        this.props.dispatchCombinedAction([setClientDetails(response.payload), setActiveScreen(Screen.MAIN)]);
        return;
      }
    }

    this.props.setActiveScreen(Screen.SIGNIN);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something is wrong</div>;
    }

    return (
      <div className="App">
        {this.props.activeScreen == Screen.SPLASH && <Splash />}
        {this.props.activeScreen == Screen.SIGNIN && <SignIn />}
        {this.props.activeScreen == Screen.SIGNUP && <SignUp />}
        {this.props.activeScreen == Screen.MAIN && <MainContainer />}
        {this.props.activeScreen == Screen.SETTINGS && <SettingsScreen />}
      </div>
    );
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error(error);
    console.warn(info);
  }
}

const mapStateToProps = (state: AppState) => ({
  activeScreen: state.activeScreen
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
  setActiveScreen: (activeScreen: Screen) => dispatch(setActiveScreen(activeScreen))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
