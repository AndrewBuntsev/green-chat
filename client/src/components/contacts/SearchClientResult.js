import React, { Component } from 'react';

const resultItemStyle = {
    textAlign: 'left',
    borderBottom: '1px gray dashed',
    marginBottom: '0.1em',
    paddingBottom: '0.3em'
};

export default function SearchClientResult(props) {
    return <div style={resultItemStyle}>
        <span>{props.clientName}</span>
        <span>{props.clientId}</span>
        <button onClick={() => props.addContact(props.clientId, props.clientName)}>Add to contact list</button>
        <button>Send message</button>
    </div>;

}