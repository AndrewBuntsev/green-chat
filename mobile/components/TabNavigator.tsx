import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as api from '../api';
import * as store from '../redux/store';
import ContactsScreen from './contactsScreen/ContactsScreen';
import { Response } from '../types/Response';
import { ResponseStatus } from '../enums/ResponseStatus';
import { Action } from '../redux/Action';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';
import setClientDetails from '../redux/actions/setClientDetails';
import { ClientDetails } from '../types/ClientDetails';
import getTypeFromObject from '../helpers/getTypeFromObject';
import ChatsScreen from './chatsScreen/ChatsScreen';
import { Contact } from '../types/Contact';
import setActiveContact from '../redux/actions/setActiveContact';
import SettingsScreen from './settingsScreen/SettingsScreen';

const Tab = createMaterialTopTabNavigator();

type Props = {
  clientDetails: ClientDetails;
  activeContact: Contact;
  setClientDetails(clientDetails: ClientDetails): void;
  dispatchCombinedAction(actions: Array<Action>): void;
};

type State = {

};


class TabNavigator extends React.Component<Props, State> {

  refreshTimer: number;

  async componentDidMount() {
    this.refreshTimer = setInterval(this.reloadClientDetails, 4000);
  }

  reloadClientDetails = async () => {
    const response: Response = await api.getClient(this.props.clientDetails.clientId);
    if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
      const clientDetails = getTypeFromObject<ClientDetails>(response.payload);
      // refresh clientDetails & activeContact
      const activeContact = (clientDetails.contacts && this.props.activeContact)
        ? clientDetails.contacts.find(c => c.clientId == this.props.activeContact.clientId)
        : null;
      this.props.dispatchCombinedAction([setClientDetails(clientDetails), setActiveContact(activeContact)]);
    }
  };

  render() {
    return (
      <Tab.Navigator tabBarOptions={{ style: styles.header }} >
        <Tab.Screen name="Contacts" component={ContactsScreen} />
        <Tab.Screen name="Chats" component={ChatsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#B1D8B7'
  }
});


const mapStateToProps = (state: store.State): object => ({
  clientDetails: state.clientDetails,
  activeContact: state.activeContact
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
  setClientDetails: clientDetails => dispatch(setClientDetails(clientDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);
