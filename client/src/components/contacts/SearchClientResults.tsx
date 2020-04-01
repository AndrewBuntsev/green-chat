import React, { Component, CSSProperties } from 'react';
import SearchClientResult from './SearchClientResult';
import { Contact } from '../../types/Contact';


type Props = {
    clients: Array<Contact>;
    addContact(clientId: string, clientName: string): void;
};
type State = {};

export default class SearchClientResults extends Component<Props, State> {
    render() {
        return (
            <div>
                <div style={{ fontSize: '18px' }}>{`Found ${this.props.clients.length} clients`}</div>
                <div style={listStyle}>
                    {this.props.clients.map(client => <SearchClientResult clientName={client.clientName} clientId={client.clientId} addContact={this.props.addContact} key={client.clientId} />)}
                </div>
            </div>
        );
    }
}



const listStyle = {
    overflow: 'auto',
    background: '#d4f3e6',
    fontFamily: 'Garamond, serif',
    fontSize: '1.2rem',
    border: '1px #a59b15 solid',
    padding: '0.5em',
    boxShadow: '5px 5px #d9d9d9',
    borderRadius: '3px'
} as CSSProperties;