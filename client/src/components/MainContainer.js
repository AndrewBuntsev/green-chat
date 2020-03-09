import React, { Component } from 'react';
import ContactList from './contacts/ContactList';

export default class MainContainer extends Component {
    render() {
        return <div>
            <div>
                <button>Log Out</button>
            </div>
            <ContactList />

            {/* <MessageListComponent />
            <SendMessageComponent />
            <ClientListComponent /> */}
        </div>;
    }
}