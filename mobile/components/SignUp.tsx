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
import { BODY_BACKGROUND_COLOR } from '../styles/styles';


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
                    <Text style={styles.subCaption}>Welcome to</Text>
                    <Text style={styles.caption}>GreenChat</Text>
                </View>

                <View style={styles.welcomeTextContainer}>
                    <Text style={styles.welcomeText}>It looks like your first time here!</Text>
                    <Text style={styles.welcomeText}>Your ID is {this.props.clientId}</Text>
                    <Text style={styles.welcomeText}>Please tell us your name</Text>
                </View>

                <View style={styles.nameInputContainer}>
                    <TextInput value={this.state.clientName}
                        placeholder='Your Name'
                        style={styles.nameInput}
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
        alignSelf: 'center',
        fontFamily: 'serif',
        color: '#2F5233',
        fontSize: 20,
        fontWeight: 'bold'
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
    welcomeText: {
        fontFamily: 'serif',
        color: '#2F5233',
        fontSize: 20,
        fontWeight: 'bold'
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
        height: 45,
        fontSize: 20,
        backgroundColor: '#EEEEEE',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 7,
        paddingHorizontal: 5
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