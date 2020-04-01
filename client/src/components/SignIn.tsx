import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as api from '../api';
import setActiveScreen from '../redux/actions/setActiveScreen';
import setClientDetails from '../redux/actions/setClientDetails';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';
import { ResponseStatus } from '../enums/ResponseStatus';
import { Response } from '../types/Response';
import { Screen } from '../enums/Screen';
import getTypeFromObject from '../helpers/getTypeFromObject';
import { ClientDetails } from '../types/ClientDetails';
import { Action } from '../redux/Action';
import { Dispatch } from 'redux';


type Props = {
    //activeScreen: Screen;
    dispatchCombinedAction(actions: Array<Action>): Action;
    setActiveScreen(activeScreen: Screen): void;
};

type State = {
    clientId: string;
};

class SignIn extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clientId: ''
        }
    }

    //TODO: Login spinner
    //TODO: Login failure
    onLoginClick = async () => {
        if (this.state.clientId) {
            let response: Response = await api.getClient(this.state.clientId);
            if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
                const { clientId, clientName, showNotifications, gender } = getTypeFromObject<ClientDetails>(response.payload);
                response = await api.updateClient({ clientId, clientName, showNotifications, gender, status: 'on' });
                if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
                    this.props.dispatchCombinedAction([setClientDetails(getTypeFromObject<ClientDetails>(response.payload)), setActiveScreen(Screen.MAIN)]);
                }
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
                <button onClick={() => this.props.setActiveScreen(Screen.SIGNUP)}>Sign Up</button>
            </div>
        </div>;
    }
}

// const mapStateToProps = state => ({
//     activeScreen: state.activeScreen
//   });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
    setActiveScreen: (activeScreen: Screen) => dispatch(setActiveScreen(activeScreen)),
    setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails))
});

export default connect(null, mapDispatchToProps)(SignIn);