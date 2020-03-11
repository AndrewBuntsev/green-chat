import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as api from './../api';
import * as screens from '../const/screens';
import * as responseStatus from './../const/responseStatus';
import setActiveScreen from '../redux/actions/setActiveScreen';
import setClientDetails from '../redux/actions/setClientDetails';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: ''
        }
    }

    //TODO: Login spinner
    //TODO: Login failure
    onLoginClick = async () => {
        if (this.state.clientId) {
            const response = await api.getClient(this.state.clientId);
            console.log(response);
            if (response && response.status == responseStatus.SUCCESS && response.payload) {
                this.props.dispatchCombinedAction([setClientDetails(response.payload), setActiveScreen(screens.MAIN)]);
                return;
            }
        }
    };

    render() {
        return <div>
            Enter your ID to Sign In
            <input type='text' value={this.state.clientId} style={{ width: '280px' }} onChange={e => this.setState({ clientId: e.target.value })} /> <br />
            <div>
                <button onClick={this.onLoginClick}>Sign In</button>
            </div>
            <div>or create new account</div>
            <div>
                <button onClick={() => this.props.setActiveScreen(screens.SIGNUP)}>Sign Up</button>
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

export default connect(null, mapDispatchToProps)(SignIn);