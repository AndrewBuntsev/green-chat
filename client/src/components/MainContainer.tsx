import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ContactList from './contacts/ContactList';
import * as api from '../api';
import TopMenu from './TopMenu';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';
import setClientDetails from '../redux/actions/setClientDetails';
import setActiveContact from '../redux/actions/setActiveContact';
import MessagingArea from './messaging/MessagingArea';
import { Response } from '../types/Response';
import { ClientDetails } from '../types/ClientDetails';
import { ResponseStatus } from '../enums/ResponseStatus';
import getTypeFromObject from '../helpers/getTypeFromObject';
import { Contact } from '../types/Contact';
import { AppState } from '../types/AppState';
import { Action } from '../redux/Action';
import { ActionType } from '../redux/ActionType';

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gridTemplateRows: '100px 1fr 100px'
    }
};

type Props = {
    //activeScreen: Screen;
    clientDetails: ClientDetails;
    activeContact: Contact;
    dispatchCombinedAction(actions: Array<Action>): Action;
    setClientDetails(clientDetails: ClientDetails): void;
    setActiveContact(activeContact: Contact): void;
    //setActiveScreen(activeScreen: Screen): void;
};
type State = {};

class MainContainer extends Component<Props, State> {

    addContact = async (clientId: string, clientName: string) => {
        const response: Response = await api.addContact(this.props.clientDetails.clientId, { clientId, clientName });
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(getTypeFromObject<ClientDetails>(response.payload));
        }
    };

    removeContact = async (contactId: string) => {
        const response: Response = await api.removeContact(this.props.clientDetails.clientId, contactId);
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {

            this.props.setClientDetails(getTypeFromObject<ClientDetails>(response.payload));
        }
    };

    setActiveContact = (contact: Contact) => {
        if (contact != this.props.activeContact) {
            this.props.setActiveContact(contact);
        }
    };

    refreshClientScreen = (clientDetails: ClientDetails) => {
        // refresh clientDetails & activeContact
        const activeContact = (clientDetails.contacts && this.props.activeContact)
            ? clientDetails.contacts.find(c => c.clientId == this.props.activeContact.clientId)
            : null;
        this.props.dispatchCombinedAction([setClientDetails(clientDetails), setActiveContact(activeContact)]);
    };

    sendMessage = async (message: string) => {
        const response = await api.sendMessage(this.props.clientDetails.clientId, this.props.activeContact.clientId, message);
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            this.refreshClientScreen(response.payload);
        }
    };

    reloadClientDetails = async () => {
        const response = await api.getClient(this.props.clientDetails.clientId);
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            this.refreshClientScreen(response.payload);
        }
    };

    refreshTimer: number = 0;

    componentDidMount() {
        this.refreshTimer = window.setInterval(this.reloadClientDetails, 4000);
    }

    render() {
        return <div style={styles.container}>
            <TopMenu />
            <ContactList
                contacts={this.props.clientDetails.contacts}
                activeContact={this.props.activeContact}
                addContact={this.addContact}
                removeContact={this.removeContact}
                setActiveContact={this.setActiveContact} />
            {this.props.activeContact && <MessagingArea
                contact={this.props.activeContact}
                key={this.props.activeContact.clientId}
                sendMessage={this.sendMessage} />}
        </div>;
    }

    componentWillUnmount() {
        clearInterval(this.refreshTimer);
    }
}

const mapStateToProps = (state: AppState) => ({
    clientDetails: state.clientDetails,
    activeContact: state.activeContact
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
    setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails)),
    setActiveContact: (activeContact: Contact) => dispatch(setActiveContact(activeContact))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);