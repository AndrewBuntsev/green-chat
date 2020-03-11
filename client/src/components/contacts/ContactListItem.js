import React, { Component } from 'react';


const itemStyle = {
  textAlign: 'left',
  color: 'green',
  fontWeight: 'bold',
  marginBottom: '0.1em',
  paddingBottom: '0.3em',
  cursor: 'pointer'
};


export default function ContactListItem(props) {
  return (
    <div style={itemStyle}>
      <span onClick={() => props.clickContact(props.contact)}>{`${props.contact.clientName}  `}</span>
      <button onClick={() => props.removeContact(props.contact.clientId)}> X </button>
    </div>
  );

}


