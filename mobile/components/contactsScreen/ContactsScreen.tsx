import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createStackNavigator } from '@react-navigation/stack';

import ContactList from './ContactList';
import SearchClient from './SearchClient';
import { Contact } from '../../types/Contact';
import setActiveContact from '../../redux/actions/setActiveContact';


const Stack = createStackNavigator();


type Props = {
  navigation: any;
  setActiveContact(activeContact: Contact): void;
};

type State = {};

class ContactsScreen extends React.Component<Props, State> {

  componentDidMount() {
    this.props.navigation.addListener('focus', () => this.props.setActiveContact(null));
  }

  render() {
    const screenOptions: Object = {
      headerShown: false
    };

    return (
      <Stack.Navigator screenOptions={screenOptions} >
        <Stack.Screen name='Contacts' component={ContactList} />
        <Stack.Screen name='SearchContact' component={SearchClient} />
      </Stack.Navigator>
    );
  }
}



const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveContact: (activeContact: Contact) => dispatch(setActiveContact(activeContact))
});

export default connect(null, mapDispatchToProps)(ContactsScreen);