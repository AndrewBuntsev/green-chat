import React, { Component } from 'react';
import SearchClientResult from './SearchClientResult';

const listStyle = {
    overflow: 'auto',
    background: '#d4f3e6',
    fontFamily: 'Garamond, serif',
    fontSize: '1.2rem',
    border: '1px #a59b15 solid',
    padding: '0.5em',
    boxShadow: '5px 5px #d9d9d9',
    borderRadius: '3px'
};
export default class SearchClientResults extends Component {
    render() {
        return <div>
            <div style={{ fontSize: '18px' }}>{`Found ${this.props.clients.length} clients`}</div>
            <div style={listStyle}>
                {this.props.clients.map(client => <SearchClientResult clientName={client.clientName} clientId={client.clientId} addContact={this.props.addContact} key={client.clientId} />)}
            </div>
        </div>;
    }
}