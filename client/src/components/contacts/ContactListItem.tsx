import React, { Component, CSSProperties } from 'react';
import { Contact } from '../../types/Contact';
import { ClientStatus } from '../../enums/ClientStatus';


const styles = {
  container: {
    textAlign: 'left',
    color: 'green',
    fontWeight: 'bold',
    marginBottom: '0.1em',
    paddingBottom: '0.3em',
    cursor: 'pointer'
  } as CSSProperties,
  envelope: {
    verticalAlign: 'middle',
    marginLeft: '5px',
    marginBottom: '2px'
  } as CSSProperties,
  buttonRemove: {
    marginLeft: '15px'
  } as CSSProperties
};


type Props = {
  contact: Contact;
  activeContact: Contact;
  clickContact(contact: Contact): void;
  removeContact(clientId: string): void;
};

type State = {
  hasNewMessages: boolean;
  messagesNumber: number;
};

export default class ContactListItem extends Component<Props, State> {
  state = {
    hasNewMessages: false,
    messagesNumber: this.props.contact.messages ? this.props.contact.messages.length : 0
  };

  onContactClick = () => {
    this.setState({ hasNewMessages: false });
    this.props.clickContact(this.props.contact);
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.contact.messages && nextProps.contact.messages.length > prevState.messagesNumber) {
      return { hasNewMessages: true, messagesNumber: nextProps.contact.messages.length };
    }
    return null;
  }

  render() {
    let status = this.props.contact.status;
    if (status == ClientStatus.INVISIBLE) status = ClientStatus.ONLINE;

    return (
      <div style={styles.container}>
        <img src={require(`./../../assets/${status}.png`)} width={20} />
        <span onClick={this.onContactClick}>
          {`${this.props.contact.clientName}  `}
          {this.state.hasNewMessages && this.props.activeContact != this.props.contact && <img src={require('./../../assets/envelope.png')} width={20} style={styles.envelope}></img>}
        </span>
        <button style={styles.buttonRemove} onClick={() => this.props.removeContact(this.props.contact.clientId)}> X </button>
      </div>
    );
  }
}


