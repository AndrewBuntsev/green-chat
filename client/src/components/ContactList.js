import React, { Component } from 'react';

/* #region Styles */
const containerStyle = {
  float: 'right',
  position: 'fixed',
  top: '5px',
  right: '50px',
  width: '150px'
};

const listStyle = {
  width: '60%',
  height: '100px',
  overflow: 'auto',
  listStyle: 'none',
  fontFamily: 'Garamond, serif',
  fontSize: '1.8rem',
  padding: '0.5em'
};

const listItemStyle = {
  textAlign: 'left',
  color: 'green',
  fontWeight: 'bold',
  marginBottom: '0.1em',
  paddingBottom: '0.3em'
};
/* #endregion Styles */

export default class ContactList extends Component {
  state = { clients: [] };

  render() {
    let clients = this.state.clients.map((el, i) => (
      <li key={i} tabIndex="1" style={listItemStyle}>
        {el}
      </li>
    ));
    return (
      <div style={containerStyle}>
        <ul style={listStyle}>{clients}</ul>
      </div>
    );
  }
}

export default ClientListComponent;
