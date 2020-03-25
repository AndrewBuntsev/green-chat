import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Button, Image, Alert } from 'react-native';
import { Contact } from '../../types/Contact';
import { getStatusImage } from '../../helpers/getStatusImage';
import ContactListItemMenu from './ContactListItemMenu';


type Props = {
  contact: Contact;
  isHighlighted: boolean;
  isHighlightedChange(contactId: string): void;
  removeContact(clientId: string): void;
  selectContact(contact: Contact): void;
};

type State = {
  hasNewMessages: boolean;
};

export default class ContactListItem extends React.Component<Props, State> {
  state = {
    hasNewMessages: false
  };

  onContactClick = () => {
    this.setState({ hasNewMessages: false });
    this.props.selectContact(this.props.contact);
  };

  onContactLongClick = () => {
    this.props.isHighlightedChange(this.props.contact.clientId);
  };

  deleteContact = () => {
    Alert.alert('Delete Contact', `Are you sure you want to delete '${this.props.contact.clientName}'?`, [
      { text: 'Yes', onPress: () => this.props.removeContact(this.props.contact.clientId) },
      { text: 'Cancel', onPress: () => { }, style: 'cancel' }
    ],
      { cancelable: true });
  };


  render() {
    return (
      <View>
        <TouchableHighlight onLongPress={this.onContactLongClick} onPress={this.onContactClick}>
          <View style={this.props.isHighlighted ? { ...styles.container, ...styles.containerExtendedMode } : styles.container}>
            <Image source={getStatusImage(this.props.contact.status)} style={styles.statusImage} />
            <Text style={styles.contactName}>
              {this.props.contact.clientName}
            </Text>
            <View></View>
            {this.props.isHighlighted && <ContactListItemMenu deleteButtonClick={this.deleteContact} cancelButtonClick={this.onContactLongClick} />}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 55,
    alignContent: 'center',
    backgroundColor: '#D2FBA4'
  },
  containerExtendedMode: {
    backgroundColor: '#B1D8B7'
  },
  statusImage: {
    alignSelf: 'center',
    width: 20,
    height: 20
  },
  contactName: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 18,

    marginStart: 5,
    marginVertical: -3
  },
  buttonDelete: {
    flex: 1
  }
});
