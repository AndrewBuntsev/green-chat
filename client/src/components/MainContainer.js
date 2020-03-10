import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactList from './contacts/ContactList';

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr'//,
        //gridTemplateRows: ''
    }
};

class MainContainer extends Component {
    render() {
        return <div style={styles.container}>
            {/* <div>
                <button>Log Out</button>
            </div> */}
            <ContactList contacts={this.props.clientDetails.contacts} />

            {/* <MessageListComponent />
            <SendMessageComponent />
            <ClientListComponent /> */}


        </div>;
    }
}

const mapStateToProps = state => ({
    clientDetails: state.clientDetails
});

export default connect(mapStateToProps)(MainContainer);