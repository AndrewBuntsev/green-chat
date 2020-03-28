import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import * as api from '../api';
import { Action } from '../redux/Action';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';
import { Response } from '../types/Response';
import { ResponseStatus } from '../enums/ResponseStatus';
import setClientDetails from '../redux/actions/setClientDetails';
import setActiveScreen from '../redux/actions/setActiveScreen';
import { Screen } from '../enums/Screen';
import getTypeFromObject from '../helpers/getTypeFromObject';
import { ClientDetails } from '../types/ClientDetails';
import { BODY_BACKGROUND_COLOR, COMMON_TEXT_STYLE, COMMON_INPUT_STYLE } from '../styles/styles';


type Props = {
    clientId: string;
    dispatchCombinedAction(actions: Array<Action>): void;
};

type State = {
    clientName: string;
};

class SignUp extends React.Component<Props, State> {
    state = { clientName: '' };

    onLoginClick = async () => {

        if (this.state.clientName) {
            const response: Response = await api.addClient({ clientId: this.props.clientId, clientName: this.state.clientName });
            if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
                this.props.dispatchCombinedAction([setClientDetails(getTypeFromObject<ClientDetails>(response.payload)), setActiveScreen(Screen.MAIN)]);
                return;
            }
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.welcomeImage}>
                    <Text style={{ ...styles.subCaption, ...StyleSheet.flatten(COMMON_TEXT_STYLE) }}>Welcome to</Text>
                    <Text style={styles.caption}>GreenChat</Text>
                </View>

                <View style={styles.welcomeTextContainer}>
                    <Text style={COMMON_TEXT_STYLE}>It looks like your first time here!</Text>
                    <Text style={COMMON_TEXT_STYLE}>Your ID is {this.props.clientId}</Text>
                    <Text style={COMMON_TEXT_STYLE}>Please tell us your name</Text>
                </View>

                <View style={styles.nameInputContainer}>
                    <TextInput value={this.state.clientName}
                        placeholder='Your Name'
                        style={{ ...styles.nameInput, ...COMMON_INPUT_STYLE }}
                        onChangeText={value => this.setState({ clientName: value })} />
                    <TouchableOpacity onPress={this.onLoginClick}>
                        <Image source={require('../assets/letsgo.png')} style={styles.buttonStart} />
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomContainer}>
                    <Image source={require('../assets/splash.gif')} width={30} style={styles.bottomImage} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        backgroundColor: BODY_BACKGROUND_COLOR
    },
    welcomeImage: {
        flex: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subCaption: {
        alignSelf: 'center'
    },
    caption: {
        alignSelf: 'center',
        color: '#2F5233',
        fontSize: 50,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'serif'
    },
    welcomeTextContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    nameInputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginTop: 10
    },
    nameInput: {
        alignSelf: 'flex-start',
        width: '70%',
        marginTop: 17,
        height: 45
    },
    buttonStart: {
        alignSelf: 'flex-start',
        width: 80,
        height: 80
    },
    bottomContainer: {
        flex: 2,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginBottom: 30
    },
    bottomImage: {

    }
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions))
});

export default connect(null, mapDispatchToProps)(SignUp);