import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';

import ChatList from './ChatList';
import Messages from './Messages';
import * as store from '../../redux/store';
import { Dispatch } from 'redux';
import { Contact } from '../../types/Contact';



type Props = {
  activeContact: Contact;
};

type State = {
  //contacts: Array<Contact>;
};

class ChatsScreen extends React.Component<Props, State> {


  render() {

    const screenOptions: Object = {
      headerShown: false
    };


    return this.props.activeContact ? <Messages /> : <ChatList />;
  }
}


const mapStateToProps = (state: store.State): object => ({
  activeContact: state.activeContact
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  //setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails)),
  //setActiveContact: (activeContact: Contact) => dispatch(setActiveContact(activeContact))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen);

