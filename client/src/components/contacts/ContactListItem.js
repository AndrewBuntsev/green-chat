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
      {`${props.clientName} (${props.clientId})`}
    </div>
  );

}


