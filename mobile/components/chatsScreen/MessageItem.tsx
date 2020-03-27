import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Button } from 'react-native';
import { Message } from '../../types/Message';
import { MessageType } from '../../enums/MessageType';

type Props = {
  message: Message;
};

type State = {};

export default class MessageItem extends React.Component<Props, State> {
  render() {
    const { message } = this.props;
    const messageStyle = message.type == MessageType.IN ? styles.messageIn : styles.messageOut;
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.message, ...messageStyle }}>{message.msg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 3
  },
  message: {
    borderColor: '#AAAAAA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 3
  },
  messageIn: {
    backgroundColor: '#DDDDDD',
    marginRight: 60
  },
  messageOut: {
    marginLeft: 60,
    backgroundColor: '#A4E8E0'
  }
});
