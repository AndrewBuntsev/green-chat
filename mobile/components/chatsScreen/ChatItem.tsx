import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Button } from 'react-native';
import { Contact } from '../../types/Contact';

type Props = {
  contact: Contact;
  selectContact(contact: Contact): void;
};

type State = {
  //hasNewMessages: boolean;
};

export default class ChatItem extends React.Component<Props, State> {
  // state = {
  //   hasNewMessages: false
  // };

  onContactClick = () => {
    //this.setState({ hasNewMessages: false });
    this.props.selectContact(this.props.contact);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onContactClick}>
          <View>
            <Text style={styles.contactName}>
              {`${this.props.contact.clientName} (${this.props.contact.messages.length})`}
            </Text>
          </View>
        </TouchableHighlight>
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
