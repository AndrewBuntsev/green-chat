import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StyleSheet, Text, View, Button } from 'react-native';
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
        return <View>
            <Text>It looks like you are the first time here!</Text>
            <Text>Your ID is {this.props.clientId}</Text>

            <Text>Please tell us your preferrable name</Text>
            <TextInput value={this.state.clientName}
                placeholder='Your Name'
                style={styles.nameInput}
                onChangeText={value => this.setState({ clientName: value })} />

            <Button title='Start Chatting!' onPress={this.onLoginClick} />
        </View>;
    }
}

const styles = StyleSheet.create({
    nameInput: {
        backgroundColor: '#EEEEEE',
        borderColor: '#A3EBB1',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 5
    }
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions))
    //setActiveScreen: (activeScreen: Screen) => dispatch(setActiveScreen(activeScreen))
    //setClientDetails: clientDetails => dispatch(setClientDetails(clientDetails))
});

export default connect(null, mapDispatchToProps)(SignUp);