import React from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ContactList from './ContactList';
import SearchClient from './SearchClient';
import Messages from '../chatsScreen/Messages';


const Stack = createStackNavigator();


type Props = {
  //clientDetails: ClientDetails;
};

type State = {
  //contacts: Array<Contact>;
};

export default class ContactsScreen extends React.Component<Props, State> {


  render() {

    const screenOptions: Object = {
      headerShown: false
    };

    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name='Contacts' component={ContactList} />
        <Stack.Screen name='SearchContact' component={SearchClient} />
      </Stack.Navigator>

    );
  }
}

