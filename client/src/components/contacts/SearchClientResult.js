import React, { Component } from 'react';

const resultItemStyle = {
    textAlign: 'left',
    borderBottom: '1px gray dashed',
    marginBottom: '0.1em',
    paddingBottom: '0.3em'
};

export default class SearchClientResult extends Component {
    render() {
        return <div style={resultItemStyle}>
            <span>{this.props.clientName}</span>
            <span>{this.props.clientId}</span>
            <button>Add to contact list</button>
            <button>Send message</button>
        </div>;
    }
}