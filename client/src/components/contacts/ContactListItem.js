import React, { Component } from 'react';


const styles = {
  container: {
    textAlign: 'left',
    color: 'green',
    fontWeight: 'bold',
    marginBottom: '0.1em',
    paddingBottom: '0.3em',
    cursor: 'pointer'
  },
  envelope: {
    verticalAlign: 'middle',
    marginLeft: '5px',
    marginBottom: '2px'
  },
  buttonRemove: {
    marginLeft: '15px'
  }
};


export default class ContactListItem extends Component {
  state = {
    hasNewMessages: false,
    messagesNumber: this.props.contact.messages ? this.props.contact.messages.length : 0
  };

  onContactClick = () => {
    this.setState({ hasNewMessages: false });
    this.props.clickContact(this.props.contact);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.contact.messages && nextProps.contact.messages.length > prevState.messagesNumber) {
      return { hasNewMessages: true, messagesNumber: nextProps.contact.messages.length };
    }
    return null;
  }

  render() {
    let status = this.props.contact.status;
    if (status == 'inv') status = 'off';

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


