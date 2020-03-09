import React, { Component } from 'react';
import ContactList from './contacts/ContactList';

export default class MainContainer extends Component {
    render() {
        return <div>
            Test text
            <ContactList />
            {/* <MessageListComponent />
            <SendMessageComponent />
            <ClientListComponent /> */}
        </div>;
    }
}