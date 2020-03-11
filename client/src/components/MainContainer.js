import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactList from './contacts/ContactList';
import * as api from '../api';
import TopMenu from './TopMenu';
import * as responseStatus from '../const/responseStatus';
import setClientDetails from '../redux/actions/setClientDetails';

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr'//,
        //gridTemplateRows: ''
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

    render() {
        return <div style={styles.container}>
            <TopMenu />
            {/* <div>
                <button>Log Out</button>
            </div> */}
            <ContactList contacts={this.props.clientDetails.contacts} addContact={this.addContact} removeContact={this.removeContact} />

            {/* <MessageListComponent />
            <SendMessageComponent />
            <ClientListComponent /> */}


        </div>;
    }
}

const mapStateToProps = state => ({
    clientDetails: state.clientDetails
});

const mapDispatchToProps = dispatch => ({
    setClientDetails: clientDetails => dispatch(setClientDetails(clientDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);