import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
import ContactList from './ContactList';
import ChatList from './ChatList';
import Settings from './Settings';

const Tab = createMaterialTopTabNavigator();

type Props = {};
type State = {};

class MainContainer extends React.Component<Props, State> {
  render() {
    return (

      <Tab.Navigator initialRouteName="Contacts"
        tabBarOptions={{
          activeTintColor: '#e91e63',
          labelStyle: { fontSize: 12 },
          style: { backgroundColor: 'powderblue' },
        }}>
        <Tab.Screen name='Contacts' component={ContactList} options={{ tabBarLabel: 'Contacts' }}></Tab.Screen>
        <Tab.Screen name='Chats' component={ChatList} options={{ tabBarLabel: 'Chats' }}></Tab.Screen>
        <Tab.Screen name='Settings' component={Settings} options={{ tabBarLabel: 'Settings' }}></Tab.Screen>
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default connect(null, null)(MainContainer);