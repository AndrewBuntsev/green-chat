import React, { Component, CSSProperties } from 'react';
import { connect } from 'react-redux';

import { Screen } from './../enums/Screen';
import setActiveScreen from '../redux/actions/setActiveScreen';
import setClientDetails from '../redux/actions/setClientDetails';
import setActiveContact from '../redux/actions/setActiveContact';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';
import { Action } from '../redux/Action';
import { ActionType } from '../redux/ActionType';
import { ClientDetails } from '../types/ClientDetails';
import { AppState } from '../types/AppState';
import { Dispatch } from 'redux';
import { Contact } from '../types/Contact';


const styles = {
    container: {
        position: 'fixed',
        right: '10px',
        top: '10px'
    } as CSSProperties
};

type Props = {
    clientDetails: ClientDetails;
    dispatchCombinedAction(actions: Array<Action>): Action;
    setActiveScreen(activeScreen: Screen): void;
};
type State = {};

class TopMenu extends Component<Props, State> {
    logOut = () => {
        this.props.dispatchCombinedAction([setClientDetails(null), setActiveScreen(Screen.SIGNIN), setActiveContact(null)]);
    };

    showSettings = () => {
        this.props.setActiveScreen(Screen.SETTINGS);
    };

    render() {
        return (
            <div>
                <div>
                    {`Hello, ${this.props.clientDetails.clientName}! `}
                    <button onClick={this.logOut}> Log Out </button>
                </div>
                <button onClick={this.showSettings}> Settings </button>
                <div> {`Your ID is: ${this.props.clientDetails.clientId}!`}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    clientDetails: state.clientDetails
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
    setActiveScreen: (activeScreen: Screen) => dispatch(setActiveScreen(activeScreen)),
    setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails)),
    setActiveContact: (activeContact: Contact) => dispatch(setActiveContact(activeContact))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);