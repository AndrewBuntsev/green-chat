import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Button } from 'react-native';
import { Contact } from '../types/Contact';

type Props = {
  contact: Contact;
  removeContact(clientId: string): void;
};

type State = {
  hasNewMessages: boolean;
};

export default class ContactListItem extends React.Component<Props, State> {
  state = {
    hasNewMessages: false //,
    //messagesNumber: this.props.contact.messages ? this.props.contact.messages.length : 0
  };

  onContactClick = () => {
    this.setState({ hasNewMessages: false });
    //this.props.clickContact(this.props.contact);
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.contact.messages && nextProps.contact.messages.length > prevState.messagesNumber) {
  //     return { hasNewMessages: true, messagesNumber: nextProps.contact.messages.length };
  //   }
  //   return null;
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.contactName}>
          {this.props.contact.clientName}
        </Text>
        <Button title='X' onPress={() => this.props.removeContact(this.props.contact.clientId)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contactName: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
