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
import { BODY_BACKGROUND_COLOR, COMMON_TEXT_STYLE, COMMON_INPUT_STYLE } from '../styles/styles';
import greenButton from './../assets/greenButton.png';



type Props = {
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
        return <div style={styles.container}>

            <div style={styles.welcomeImage}>
                <span style={COMMON_TEXT_STYLE}>Welcome to</span>
                <img src={require('./../assets/greenchat4.png')} style={styles.welcomeImageImg}></img>
            </div>

            <div style={styles.midContainer}>
                <span style={COMMON_TEXT_STYLE}>It looks like you are the first time here!</span>
                <span style={COMMON_TEXT_STYLE}>Your ID is &nbsp;<input type='text' value={this.state.clientId} style={COMMON_INPUT_STYLE} disabled /></span>

                <div style={styles.signUpContainer}>
                    <span style={COMMON_TEXT_STYLE}>Please tell us your preferrable name&nbsp;&nbsp;</span>

                    <input type='text' value={this.state.clientName} style={COMMON_INPUT_STYLE} onChange={e => this.setState({ clientName: e.target.value })} />

                    <div style={styles.signUpButton}>
                        <img src={require('./../assets/letsgo.png')}
                            style={styles.signUpButtonImg}
                            onClick={this.onLoginClick}></img>
                    </div>
                </div>
            </div>

            <div style={styles.bottomContainer}>
                <span style={COMMON_TEXT_STYLE}>If you have an existent account</span>
                <div style={styles.signInButton} onClick={() => this.props.setActiveScreen(Screen.SIGNIN)}>
                    <span style={styles.signInButtonText}>Log In</span>
                </div>

            </div>
        </div>;
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
    setActiveScreen: (activeScreen: Screen) => dispatch(setActiveScreen(activeScreen)),
    setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails))
});

export default connect(null, mapDispatchToProps)(SignUp);


const styles = {
    container: {
        backgroundColor: BODY_BACKGROUND_COLOR,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100vh'
    } as CSSProperties,

    welcomeImage: {
        display: 'flex',
        flex: '1 0',
        justifyContent: 'center',
        alignItems: 'center'
    } as CSSProperties,
    welcomeImageImg: {
        width: '300px',
        marginLeft: '5px'
    } as CSSProperties,

    midContainer: {
        //flex: '1 0',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    } as CSSProperties,

    signUpContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    } as CSSProperties,

    signUpButton: {
        marginLeft: '10px',
        display: 'inline'
    } as CSSProperties,
    signUpButtonImg: {
        width: '60px',
        cursor: 'pointer'
    } as CSSProperties,

    bottomContainer: {
        flex: '1 0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    } as CSSProperties,

    signInButton: {
        //width: '145px',
        height: '40px',
        cursor: 'pointer',
        backgroundImage: `url(${greenButton})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    } as CSSProperties,
    signInButtonText: {
        display: 'block',
        width: '150px',
        color: '#EEEEEE',
        fontSize: '18px',
        marginTop: '8px',
        fontFamily: 'sans-serif'
    } as CSSProperties
};