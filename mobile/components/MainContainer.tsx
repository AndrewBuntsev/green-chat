import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Device from 'expo-device';

import * as api from '../api';
import * as store from '../redux/store';
import Splash from './Splash';
import { Screen } from '../enums/Screen';
import SignUp from './SignUp';
import { Response } from '../types/Response';
import { ResponseStatus } from '../enums/ResponseStatus';
import { Action } from '../redux/Action';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';
import setClientDetails from '../redux/actions/setClientDetails';
import setActiveScreen from '../redux/actions/setActiveScreen';
import { ClientDetails } from '../types/ClientDetails';
import TabNavigator from './TabNavigator';
import getTypeFromObject from '../helpers/getTypeFromObject';
import Header from './Header';


type Props = {
  activeScreen: Screen;
  clientDetails: ClientDetails;
  setActiveScreen(activeScreen: Screen): void;
  dispatchCombinedAction(actions: Array<Action>): void;
};

type State = {};

class MainContainer extends React.Component<Props, State> {

  async componentDidMount() {
    let response: Response = await api.getClient(Device.osInternalBuildId);

    console.log(response);
    if (response && response.status == ResponseStatus.SUCCESS) {
      if (response.payload) {
        const { clientId, clientName, showNotifications, gender } = getTypeFromObject<ClientDetails>(response.payload);
        response = await api.updateClient({ clientId, clientName, showNotifications, gender, status: 'on' });
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
          this.props.dispatchCombinedAction([setClientDetails(getTypeFromObject<ClientDetails>(response.payload)), setActiveScreen(Screen.MAIN)]);
        }
      } else {
        this.props.setActiveScreen(Screen.SIGNUP);
      }

      return;
    }
  }

  getActiveComponent = (): JSX.Element => {
    switch (this.props.activeScreen) {
      case Screen.SPLASH:
        return <View style={styles.splashScreen}>
          <Splash />
        </View>;
      case Screen.MAIN:
        return <View style={styles.tabNavigator}>
          <View style={styles.header}>
            <Header />
          </View>
          <TabNavigator />
        </View>;
      case Screen.SIGNUP:
        return <SignUp clientId={Device.osInternalBuildId ? Device.osInternalBuildId : 'guest123'} />;

      default:
        return <View><Text>Cannot find the active screen</Text></View>;
    }
  };

  render() {

    return (
      <View style={styles.container}>
        {this.getActiveComponent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  splashScreen: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#B1D8B7',
    height: 70
  },
  tabNavigator: {
    flex: 1,
    width: '100%'
  }
});


const mapStateToProps = (state: store.State): object => ({
  activeScreen: state.activeScreen,
  clientDetails: state.clientDetails
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
  setActiveScreen: (activeScreen: Screen) => dispatch(setActiveScreen(activeScreen))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
