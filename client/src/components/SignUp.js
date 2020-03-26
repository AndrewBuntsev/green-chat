import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uuid from 'uuid';

import * as api from './../api';
import * as screens from '../const/screens';
import * as responseStatus from './../const/responseStatus';
import setActiveScreen from '../redux/actions/setActiveScreen';
import setClientDetails from '../redux/actions/setClientDetails';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';





class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: uuid.v4().slice(0, 9),
            clientName: ''
        }
    }

    onLoginClick = async () => {

        if (this.state.clientName) {
            const response = await api.addClient({ clientId: this.state.clientId, clientName: this.state.clientName });
            if (response && response.status == responseStatus.SUCCESS && response.payload) {
                this.props.dispatchCombinedAction([setClientDetails(response.payload), setActiveScreen(screens.MAIN)]);
                return;
            }
        }
    };

    render() {
        return <div>
            It looks like you are the first time here!<br /><br />
            Your ID is <input type='text' value={this.state.clientId} style={{ width: '280px' }} disabled /> <br /><br />
            Please tell us your preferrable name<br />
            <input type='text' value={this.state.clientName} style={{ width: '280px' }} onChange={e => this.setState({ clientName: e.target.value })} /><br />
            <div>
                <button onClick={this.onLoginClick}>Start Chatting</button>
            </div>
            <div>
                If you have an existent account
                <button onClick={() => this.props.setActiveScreen(screens.SIGNIN)}>Sign In</button>
            </div>
        </div>;
    }
}

// const mapStateToProps = state => ({
//     activeScreen: state.activeScreen
//   });

const mapDispatchToProps = dispatch => ({
    dispatchCombinedAction: actions => dispatch(dispatchCombinedAction(actions)),
    setActiveScreen: activeScreen => dispatch(setActiveScreen(activeScreen)),
    setClientDetails: clientDetails => dispatch(setClientDetails(clientDetails))
});

export default connect(null, mapDispatchToProps)(SignUp);