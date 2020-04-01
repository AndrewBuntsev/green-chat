import React, { Component, CSSProperties } from 'react';
import { connect } from 'react-redux';
import * as uuid from 'uuid';

import * as api from '../api';
import setActiveScreen from '../redux/actions/setActiveScreen';
import setClientDetails from '../redux/actions/setClientDetails';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';
import { Dispatch } from 'redux';
import { Action } from '../redux/Action';
import { Screen } from '../enums/Screen';
import { ClientDetails } from '../types/ClientDetails';
import { Response } from '../types/Response';
import { ResponseStatus } from '../enums/ResponseStatus';
import getTypeFromObject from '../helpers/getTypeFromObject';



type Props = {
    //activeScreen: Screen;
    dispatchCombinedAction(actions: Array<Action>): Action;
    setActiveScreen(activeScreen: Screen): void;
};

type State = {
    clientId: string;
    clientName: string;
};

class SignUp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clientId: uuid.v4().slice(0, 9),
            clientName: ''
        }
    }

    onLoginClick = async () => {

        if (this.state.clientName) {
            const response: Response = await api.addClient({ clientId: this.state.clientId, clientName: this.state.clientName });
            if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
                this.props.dispatchCombinedAction([setClientDetails(getTypeFromObject<ClientDetails>(response.payload)), setActiveScreen(Screen.MAIN)]);
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
                <button onClick={() => this.props.setActiveScreen(Screen.SIGNIN)}>Sign In</button>
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

export default connect(null, mapDispatchToProps)(SignUp);