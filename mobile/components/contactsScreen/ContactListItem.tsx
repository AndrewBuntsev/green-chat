import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Button, Image } from 'react-native';
import { Contact } from '../../types/Contact';
import { ClientStatus } from '../../enums/ClientStatus';


type Props = {
  contact: Contact;
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

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.contact.messages && nextProps.contact.messages.length > prevState.messagesNumber) {
  //     return { hasNewMessages: true, messagesNumber: nextProps.contact.messages.length };
  //   }
  //   return null;
  // }

  render() {


    return (



      <View style={styles.container}>
        <TouchableHighlight onPress={this.onContactClick}>
          <View>
            <Image source={getStatusImage(this.props.contact.status)} style={styles.statusImage} />
            <Text style={styles.contactName}>
              {this.props.contact.clientName}
            </Text>
            <Button title='X' onPress={() => this.props.removeContact(this.props.contact.clientId)} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }




}

function getStatusImage(status: ClientStatus): any {
  switch (status) {
    case ClientStatus.ONLINE:
      return require('./../../assets/on.png');
    case ClientStatus.OFFLINE:
      return require('./../../assets/off.png');
    case ClientStatus.AWAY:
      return require('./../../assets/away.png');
    case ClientStatus.INVISIBLE:
      return require('./../../assets/off.png');
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  contactName: {
    width: 100,
    //padding: 10,
    fontSize: 18,
    height: 44
  },
  statusImage: {
    width: 20,
    height: 20
  }
});
