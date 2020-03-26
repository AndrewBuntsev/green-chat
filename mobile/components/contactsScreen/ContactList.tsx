import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';


import * as api from '../../api';
import ContactListItem from './ContactListItem';
import * as store from '../../redux/store';
import { Dispatch } from 'redux';
import { ClientDetails } from '../../types/ClientDetails';
import { ResponseStatus } from '../../enums/ResponseStatus';
import { Response } from '../../types/Response';
import setClientDetails from '../../redux/actions/setClientDetails';
import getTypeFromObject from '../../helpers/getTypeFromObject';
import { Contact } from '../../types/Contact';
import setActiveContact from '../../redux/actions/setActiveContact';
import CircleButton from '../CircleButton';


type Props = {
  navigation: any;
  clientDetails: ClientDetails;
  setClientDetails(clientDetails: ClientDetails): void;
  setActiveContact(activeContact: Contact): void;
};

type State = {
  highlightedContactId?: string;
};

class ContactList extends React.Component<Props, State> {

  state = { highlightedContactId: null };

  isHighlightedChange = (contactId: string) => {
    if (this.state.highlightedContactId == contactId) {
      this.setState({ highlightedContactId: null });
    } else {
      this.setState({ highlightedContactId: contactId });
    }
  };

  onAddContactClick = () => {
    this.props.navigation.navigate('SearchContact');
  };

  selectContact = async (contact: Contact) => {
    this.props.setActiveContact(contact);
    this.props.navigation.navigate('Chats');
  };

  removeContact = async (contactId: string) => {
    const response: Response = await api.removeContact(this.props.clientDetails.clientId, contactId);
    if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
      this.props.setClientDetails(getTypeFromObject<ClientDetails>(response.payload));
    }
  };

  render() {
    const renderItem = ({ item }) => {
      return <ContactListItem
        contact={item}
        isHighlighted={item.clientId == this.state.highlightedContactId}
        isHighlightedChange={this.isHighlightedChange}
        selectContact={this.selectContact}
        removeContact={this.removeContact}
        key={item.clientId} />;
    };

    const contacts = this.props.clientDetails.contacts;

    return (
      <View style={styles.container}>
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={item => item.clientId}
          style={styles.contacts} />

        {(!contacts || contacts.length == 0) && <Text style={styles.emptyListMessage}>Your contact list is empty. Start your journey with adding new contacts!</Text>}

        <View style={styles.addContactButton}>
          <CircleButton onPress={this.onAddContactClick} imageSource={require('./../../assets/plus.png')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'space-around',
    backgroundColor: '#C5E5A5'
  },
  contacts: {
    flex: 1
  },
  emptyListMessage: {
    flex: 1.8,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'serif',
    color: '#2F5233',
    fontSize: 20,
    fontWeight: 'bold'
  },
  addContactButton: {
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});


const mapStateToProps = (state: store.State): object => ({
  clientDetails: state.clientDetails
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails)),
  setActiveContact: (activeContact: Contact) => dispatch(setActiveContact(activeContact))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
