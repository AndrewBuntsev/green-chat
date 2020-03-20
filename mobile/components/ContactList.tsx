import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { Constants } from 'expo';


import * as api from '../api';
import ContactListItem from './ContactListItem';
import { Contact } from '../types/Contact';
import * as store from '../redux/store';
import { Dispatch } from 'redux';
import { ClientDetails } from '../types/ClientDetails';
import { ResponseStatus } from '../enums/ResponseStatus';
import { Response } from '../types/Response';
import setClientDetails from '../redux/actions/setClientDetails';
import getTypeFromObject from '../helpers/getTypeFromObject';


type Props = {
  clientDetails: ClientDetails;
  setClientDetails(clientDetails: ClientDetails): void;
  navigation: any;
};

type State = {
  //contacts: Array<Contact>;
};

class ContactList extends React.Component<Props, State> {
  //state = { contacts: [] };

  async componentDidMount() {

  }

  onAddContactClick = () => {
    this.props.navigation.navigate('SearchContact', { name: 'John' });
  };

  removeContact = async (contactId: string) => {
    const response: Response = await api.removeContact(this.props.clientDetails.clientId, contactId);
    if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
      this.props.setClientDetails(getTypeFromObject<ClientDetails>(response.payload));
    }
  };

  render() {
    const renderItem = ({ item }) => {
      return <ContactListItem contact={item} removeContact={this.removeContact} key={item.clientId} />;
    };

    const contacts = this.props.clientDetails.contacts;

    return (
      <View style={styles.container}>
        <FlatList data={contacts} renderItem={renderItem} keyExtractor={item => item.clientId} style={styles.contacts} />
        {(!contacts || contacts.length == 0) && <Text>Your contact list is empty. Start your journey with adding new contacts!</Text>}
        <Button title='+ Add Contact' onPress={this.onAddContactClick} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    justifyContent: 'space-around'
  },
  contacts: {
    flex: 1
  },
  addContactButton: {
    flex: 1
  }
});


const mapStateToProps = (state: store.State): object => ({
  clientDetails: state.clientDetails
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  //dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
  setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
