import React, { Component } from 'react';

export default class FindClient extends Component {
    state = {
        searchTerm: ''
    };

    onFindButtonClick = () => {

    };

    render() {
        return <div>
            <div style={{ fontSize: '18px' }}>Find new contact</div>
            <div>
                <input type='text' value={this.state.searchTerm} onChange={e => this.setState({ searchTerm: e.target.value })}></input>
                <span> Client ID or Name</span>
            </div>
            <div>
                <button onClick={onFindButtonClick}>Find</button>
            </div>
        </div>;
    }
}