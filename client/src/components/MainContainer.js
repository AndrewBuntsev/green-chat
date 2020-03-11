import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactList from './contacts/ContactList';
import * as api from '../api';
import TopMenu from './TopMenu';
import * as responseStatus from '../const/responseStatus';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';
import setClientDetails from '../redux/actions/setClientDetails';
import setActiveContact from '../redux/actions/setActiveContact';
import MessagingArea from './messaging/MessagingArea';

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gridTemplateRows: '100px 1fr 100px'
    }
};

class MainContainer extends Component {

    addContact = async (clientId, clientName) => {
        const response = await api.addContact(this.props.clientDetails.clientId, { clientId, clientName });
        if (response && response.status == responseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(response.payload);
        }
    };

    removeContact = async contactId => {
        const response = await api.removeContact(this.props.clientDetails.clientId, contactId);
        if (response && response.status == responseStatus.SUCCESS && response.payload) {

            this.props.setClientDetails(response.payload);
        }
    };

    setActiveContact = contact => {
        if (contact != this.props.activeContact) {
            this.props.setActiveContact(contact);
        }
    };

    sendMessage = async message => {
        const response = await api.sendMessage(this.props.clientDetails.clientId, this.props.activeContact.clientId, message);
        if (response && response.status == responseStatus.SUCCESS && response.payload) {
            // refresh clientDetails & activeContact
            const activeContact = response.payload.contacts.find(c => c.clientId == this.props.activeContact.clientId);
            this.props.dispatchCombinedAction([setClientDetails(response.payload), setActiveContact(activeContact)]);
        }
    };

    render() {
        return <div style={styles.container}>
            <TopMenu />
            <ContactList
                contacts={this.props.clientDetails.contacts}
                addContact={this.addContact}
                removeContact={this.removeContact}
                setActiveContact={this.setActiveContact} />
            {this.props.activeContact && <MessagingArea
                contact={this.props.activeContact}
                sendMessage={this.sendMessage} />}
        </div>;
    }
}

const mapStateToProps = state => ({
    clientDetails: state.clientDetails,
    activeContact: state.activeContact
});

const mapDispatchToProps = dispatch => ({
    dispatchCombinedAction: actions => dispatch(dispatchCombinedAction(actions)),
    setClientDetails: clientDetails => dispatch(setClientDetails(clientDetails)),
    setActiveContact: activeContact => dispatch(setActiveContact(activeContact))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);