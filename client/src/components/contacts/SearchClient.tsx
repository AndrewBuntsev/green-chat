import React, { Component } from 'react';

import SearchClientResults from './SearchClientResults';
import * as api from '../../api';
import { Contact } from '../../types/Contact';
import { ResponseStatus } from '../../enums/ResponseStatus';


type Props = {
    cancelSearch(): void;
    addContact(clientId: string, clientName: string): void;
};

type State = {
    searchTerm: string;
    clients: Array<Contact>;
    searchPerformed: boolean;
    searchInProgress: boolean;
};

export default class SearchClient extends Component<Props, State> {
    state = {
        searchTerm: '',
        clients: [],
        searchPerformed: false,
        searchInProgress: false
    };

    onSearchButtonClick = async () => {
        if (!this.state.searchTerm) return;
        if (this.state.searchInProgress) return;

        this.setState({ searchInProgress: true });
        const response = await api.searchClients(this.state.searchTerm);
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            this.setState({ searchInProgress: false, searchPerformed: true, clients: response.payload });
        } else {
            this.setState({ searchInProgress: false, searchPerformed: true });
        }
    };

    render() {
        return (
            <div>
                <div style={{ fontSize: '18px' }}>Find new contact</div>
                <div>
                    <input type='text' value={this.state.searchTerm} placeholder='Client ID or Name' onChange={e => this.setState({ searchTerm: e.target.value })}></input>
                </div>
                <div>
                    <button onClick={this.onSearchButtonClick}>Search</button>
                    <button onClick={this.props.cancelSearch}>Cancel</button>
                </div>
                <div>
                    {this.state.searchInProgress && <img src={require('./../../assets/spinner.gif')} width={70}></img>}
                    {this.state.searchPerformed && <SearchClientResults clients={this.state.clients} addContact={this.props.addContact} />}
                </div>
            </div>
        );
    }
}