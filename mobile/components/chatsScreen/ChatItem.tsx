import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Button, TouchableOpacity } from 'react-native';

import { Contact } from '../../types/Contact';
import { MessageType } from '../../enums/MessageType';

const LAST_MESSAGE_LIMIT = 100;

type Props = {
  contact: Contact;
  isFirstChat: boolean;
  selectContact(contact: Contact): void;
};

type State = {};

export default class ChatItem extends React.Component<Props, State> {

  onContactClick = () => {
    this.props.selectContact(this.props.contact);
  };

  render() {
    const { contact } = this.props;
    const hasMessages = contact.messages && contact.messages.length > 0;
    const lastMessage = hasMessages ? contact.messages.slice(-1)[0] : null;
    const lastMessageStyle = lastMessage.type == MessageType.IN ? styles.lastMessageIn : styles.lastMessageOut;

    let lastMessageText = hasMessages ? lastMessage.msg : 'No messages';
    if (lastMessageText.length > LAST_MESSAGE_LIMIT) {
      lastMessageText = `${lastMessageText.slice(0, LAST_MESSAGE_LIMIT)} ...`;
    }
    console.log(lastMessage)


    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onContactClick}>
          <View>

            {!this.props.isFirstChat && <View style={styles.topLine} />}

            <Text style={styles.contactName}>
              {`${this.props.contact.clientName}`}
            </Text>

            <Text style={{ ...styles.lastMessage, ...lastMessageStyle }}>
              {lastMessageText}
            </Text>

            <Text style={styles.lastMessageTime}>
              {`Sent at: ${(new Date(lastMessage.time.toString())).toLocaleString()}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  topLine: {
    borderWidth: 0.5,
    width: '80%',
    alignSelf: 'center',
    marginTop: 5,
    borderColor: 'gray'
  },
  contactName: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 18
  },
  lastMessage: {
    fontSize: 13,
    paddingLeft: 20
  },
  lastMessageIn: {
    color: '#B175FF'
  },
  lastMessageOut: {
    color: '#2E8BC0'
  },
  lastMessageTime: {
    color: '#3D550C',
    fontSize: 13,
    paddingLeft: 20,
    alignSelf: 'center'
  }
});
