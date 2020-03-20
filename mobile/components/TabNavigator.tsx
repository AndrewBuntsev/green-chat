//https://reactnative.dev/docs/using-a-listview
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Device from 'expo-device';

import * as api from '../api';
import * as store from '../redux/store';
import ContactsScreen from './ContactsScreen';
import ChatList from './ChatList';
import Settings from './Settings';
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
import getTypeFromObject from '../helpers/getTypeFromObject';

//const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

type Props = {
  clientDetails: ClientDetails;
  setClientDetails(clientDetails: ClientDetails): void;
  // dispatchCombinedAction(actions: Array<Action>): void;
};

type State = {

};

class TabNavigator extends React.Component<Props, State> {

  refreshTimer: number;

  async componentDidMount() {
    this.refreshTimer = setInterval(this.reloadClientDetails, 4000);
    // const response: Response = await api.getClient(Device.osInternalBuildId);
    // if (response && response.status == ResponseStatus.SUCCESS) {
    //   if (response.payload) {
    //     this.props.dispatchCombinedAction([setClientDetails(getClientDetailsFromObject(response.payload)), setActiveScreen(Screen.MAIN)]);
    //   } else {
    //     this.props.setActiveScreen(Screen.SIGNUP);
    //   }
    //   return;
    // }
    // console.warn(response)
  }

  reloadClientDetails = async () => {
    const response: Response = await api.getClient(this.props.clientDetails.clientId);
    if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
      this.refreshClientScreen(getTypeFromObject<ClientDetails>(response.payload));
    }
  };

  refreshClientScreen = (clientDetails: ClientDetails) => {
    this.props.setClientDetails(clientDetails);
    // refresh clientDetails & activeContact
    // const activeContact = (clientDetails.contacts && this.props.activeContact)
    //     ? clientDetails.contacts.find(c => c.clientId == this.props.activeContact.clientId)
    //     : null;
    // this.props.dispatchCombinedAction([setClientDetails(clientDetails), setActiveContact(activeContact)]);
  };



  render() {

    return (
      <Tab.Navigator>
        <Tab.Screen name="Contacts" component={ContactsScreen} />
        <Tab.Screen name="Chats" component={ChatList} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
  }
}

const styles = StyleSheet.create({

});


const mapStateToProps = (state: store.State): object => ({
  clientDetails: state.clientDetails
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  //dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
  setClientDetails: clientDetails => dispatch(setClientDetails(clientDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);
