import React, { Component } from 'react';
import SearchClient from './SearchClient';
import ContactListItem from './ContactListItem';


const styles = {
  container: {
    overflow: 'auto',
    listStyle: 'none',
    fontFamily: 'Garamond, serif',
    padding: '0.5em',
    gridColumn: '1',
    gridRow: '2'
  },
  addContactButton: {
    width: '100%'
  }
};

export default class ContactList extends Component {
  state = { displaySearchClientsPanel: false };

  addContact = (clientId, clientName) => {
    this.props.addContact(clientId, clientName);
    this.setState({ displaySearchClientsPanel: false });
  };

  render() {
    let listItems = !this.props.contacts ? [] : this.props.contacts.map(contact =>
      <ContactListItem contact={contact} key={contact.clientId} removeContact={this.props.removeContact} clickContact={this.props.setActiveContact} />);

    const contactsPanel = (
      <div>
        {listItems.length == 0 && <span>Your contact list is empty. <br />Start your journey with adding new contacts!</span>}
        <div>{listItems}</div>
        <div>
          <button style={styles.addContactButton} onClick={() => this.setState({ displaySearchClientsPanel: true })}>+ Add Contact</button>
        </div>
      </div>);

    return (
      <div style={styles.container}>
        {!this.state.displaySearchClientsPanel && contactsPanel}
        {this.state.displaySearchClientsPanel && <SearchClient addContact={this.addContact} cancelSearch={() => this.setState({ displaySearchClientsPanel: false })} />}
      </div>
    );
  }
}


