import React, { Component, CSSProperties } from 'react';
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
import { COMMON_INPUT_STYLE, BODY_BACKGROUND_COLOR, COMMON_TEXT_STYLE } from '../styles/styles';


type Props = {
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
        return (
            <div style={styles.container}>

                <div style={styles.welcomeImage}>
                    <span style={COMMON_TEXT_STYLE}>Welcome to</span>
                    {/* <span style={styles.caption}>GreenChat</span> */}
                    <img src={require('./../assets/greenchat4.png')}
                        style={styles.welcomeImageImg}></img>
                </div>

                <div style={styles.midContainer}>
                    <div style={styles.signInContainer}>
                        <span style={COMMON_TEXT_STYLE}>Enter your ID</span>
                        <input type='text' value={this.state.clientId} style={{ ...COMMON_INPUT_STYLE, ...styles.signInTextBox }} onChange={e => this.setState({ clientId: e.target.value })} /> <br />
                        <div style={styles.signInButton}>
                            <img src={require('./../assets/letsgo.png')}
                                style={styles.signInButtonImg}
                                onClick={this.onLoginClick}></img>
                        </div>
                    </div>

                    <div style={styles.signUpContainer}>
                        <span style={COMMON_TEXT_STYLE}>or create new account</span>
                        <div style={styles.signUpButton}>
                            <img src={require('./../assets/signup-md.png')}
                                style={styles.signUpButtonImg}
                                onClick={() => this.props.setActiveScreen(Screen.SIGNUP)}></img>
                        </div>
                    </div>
                </div>

                <img src={require('./../assets/splash.gif')} style={styles.splashImg}></img>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
    setActiveScreen: (activeScreen: Screen) => dispatch(setActiveScreen(activeScreen)),
    setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails))
});

export default connect(null, mapDispatchToProps)(SignIn);


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
        justifyContent: 'center',
        alignItems: 'center'
    } as CSSProperties,
    subCaption: {
        alignSelf: 'center'
    } as CSSProperties,
    caption: {
        marginLeft: '10px',
        alignSelf: 'center',
        color: '#2F5233',
        fontSize: 50,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'serif'
    } as CSSProperties,
    welcomeImageImg: {
        width: '300px',
        marginLeft: '5px'
    } as CSSProperties,

    midContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    } as CSSProperties,

    signInContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10px'
    } as CSSProperties,
    signInTextBox: {
        marginLeft: '10px'
    } as CSSProperties,
    signInButton: {
        marginLeft: '10px'
    } as CSSProperties,
    signInButtonImg: {
        width: '60px',
        cursor: 'pointer'
    } as CSSProperties,

    signUpContainer: {
        display: 'flex',
        alignItems: 'center'
    } as CSSProperties,
    signUpButton: {
        marginLeft: '10px'
    } as CSSProperties,
    signUpButtonImg: {
        width: '110px',
        cursor: 'pointer',
        marginTop: '8px'
    } as CSSProperties,

    splashImg: {
        width: '30%',
        //marginTop: '-25%'
    } as CSSProperties,
};