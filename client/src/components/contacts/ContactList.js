import React, { Component } from 'react';
import SearchClient from './SearchClient';
import ContactListItem from './ContactListItem';

/* #region Styles */
const containerStyle = {
  //float: 'right',
  //position: 'fixed',
  //top: '5px',
  //right: '50px',
  //width: '150px'
  //width: '60%',
  //height: '80%',
  overflow: 'auto',
  listStyle: 'none',
  fontFamily: 'Garamond, serif',
  //fontSize: '1.8rem',
  padding: '0.5em',
  gridColumn: '1'
};

const addContactButtonStyle = {
  width: '100%'
};

// const listStyle = {
//   width: '60%',
//   height: '100px',
//   overflow: 'auto',
//   listStyle: 'none',
//   fontFamily: 'Garamond, serif',
//   fontSize: '1.8rem',
//   padding: '0.5em'
// };

// const listItemStyle = {
//   textAlign: 'left',
//   color: 'green',
//   fontWeight: 'bold',
//   marginBottom: '0.1em',
//   paddingBottom: '0.3em'
// };
/* #endregion Styles */

export default class ContactList extends Component {
  state = { displaySearchClientsPanel: false };

  addContact = (clientId, clientName) => {

  };

  render() {
    let listItems = !this.props.contacts ? [] : this.props.contacts.map(contact => <ContactListItem contact={contact} />);

    const contactsPanel = (
      <div>{listItems}
        <div>
          <button style={addContactButtonStyle} onClick={() => this.setState({ displaySearchClientsPanel: true })}>+ Add Contact</button>
        </div>
      </div>);

    return (
      <div style={containerStyle}>
        {!this.state.displaySearchClientsPanel && contactsPanel}
        {this.state.displaySearchClientsPanel && <SearchClient addContact={this.addContact} />}
      </div>
    );
  }
}


