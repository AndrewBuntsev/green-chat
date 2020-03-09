import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uuid from 'uuid';

import * as api from './../api';
import * as responseStatus from './../const/responseStatus';
import createAction from './../redux/createAction';
import * as actionTypes from "./../redux/actionTypes";





class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: uuid.v4(),
            clientName: ''
        }
    }

    onLoginClick = async () => {

        if (this.state.clientName) {
            const response = await api.addClient({ clientId: this.state.clientId, clientName: this.state.clientName });
            if (response && response.status == responseStatus.SUCCESS && response.payload) {
                //cookies.set(COOKIES.CLIENT_ID, clientDetails.clientId);
                this.props.setClientDetails(response.payload);

                //this.props.setActiveScreen(screens.MAIN);
                return;
            }
        }
    };

    render() {
        return <div>
            It looks like you are the first time here!<br /><br />
            Your ID is <input type='text' value={this.state.clientId} style={{ width: '280px' }} disabled /> <br /><br />
            Please tell us your preferrable name<br />
            <input type='text' value={this.state.clientName} style={{ width: '280px' }} onChange={e => this.setState({ clientName: e.target.value })} /><br /><br />
            <div>
                <button onClick={this.onLoginClick}>Start Chatting</button>
            </div>
        </div>;
    }
}

// const mapStateToProps = state => ({
//     activeScreen: state.activeScreen
//   });

const mapDispatchToProps = dispatch => ({
    setActiveScreen: activeScreen => dispatch(createAction(actionTypes.SET_ACTIVE_SCREEN, { activeScreen: activeScreen })),
    setClientDetails: clientDetails => dispatch(createAction(actionTypes.SET_CLIENT_DETAILS, { clientDetails: clientDetails }))
});

export default connect(null, mapDispatchToProps)(SignUp);