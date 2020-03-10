import React, { Component } from 'react';
import SearchClientResults from './SearchClientResults';
import * as api from './../../api';
import * as responseStatus from './../../const/responseStatus';

export default class SearchClient extends Component {
    state = {
        searchTerm: '',
        clients: [],
        searchPerformed: false,
        searchInProgress: false
    };

    onSearchButtonClick = async () => {
        if (this.state.searchInProgress) return;

        this.setState({ searchInProgress: true });
        const response = await api.searchClients(this.state.searchTerm);
        if (response && response.status == responseStatus.SUCCESS && response.payload) {
            this.setState({ searchInProgress: false, searchPerformed: true, clients: response.payload });
        } else {
            this.setState({ searchInProgress: false, searchPerformed: true });
        }
    };

    render() {
        return <div>
            <div style={{ fontSize: '18px' }}>Find new contact</div>
            <div>
                <input type='text' value={this.state.searchTerm} onChange={e => this.setState({ searchTerm: e.target.value })}></input>
                <span> Client ID or Name</span>
            </div>
            <div>
                <button onClick={this.onSearchButtonClick}>Search</button>
            </div>
            <div>
                {this.state.searchInProgress && <img src={require('./../../assets/spinner.gif')} width={70}></img>}
                {this.state.searchPerformed && <SearchClientResults clients={this.state.clients} addContact={this.props.addContact} />}
            </div>
        </div>;
    }
}