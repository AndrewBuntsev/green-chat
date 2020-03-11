import React, { Component } from 'react';


const itemStyle = {
  textAlign: 'left',
  color: 'green',
  fontWeight: 'bold',
  marginBottom: '0.1em',
  paddingBottom: '0.3em'
};


export default function ContactListItem(props) {
  return (
    <div style={itemStyle}>
      {`${props.contact.clientName}  `}
      <button onClick={() => props.removeContact(props.contact.clientId)}> X </button>
    </div>
  );

}


