import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Button } from 'react-native';
import { Message } from '../../types/Message';
import { MessageType } from '../../enums/MessageType';

type Props = {
  message: Message;
};

type State = {

};

export default class MessageItem extends React.Component<Props, State> {
  render() {
    const { message } = this.props;
    return (
      <View style={styles.container}>
        <Text style={message.type == MessageType.IN ? styles.messageIn : styles.messageOut}>{message.msg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#AAAAAA',
    borderRadius: 5,
    borderWidth: 1
  },
  messageIn: {
    backgroundColor: '#DDDDDD'
  },
  messageOut: {
    backgroundColor: '#FADCD9'
  }
});
