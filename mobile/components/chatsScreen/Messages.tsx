import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, FlatList, Keyboard, EmitterSubscription } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as api from '../../api';
import * as store from '../../redux/store';
import { Response } from '../../types/Response';
import { ResponseStatus } from '../../enums/ResponseStatus';
import { Contact } from '../../types/Contact';
import getTypeFromObject from '../../helpers/getTypeFromObject';
import setClientDetails from '../../redux/actions/setClientDetails';
import { ClientDetails } from '../../types/ClientDetails';
import MessageItem from './MessageItem';
import { Action } from '../../redux/Action';
import dispatchCombinedAction from '../../redux/actions/dispatchCombinedAction';
import setActiveContact from '../../redux/actions/setActiveContact';
import { BODY_BACKGROUND_COLOR, COMMON_TEXT_STYLE, COMMON_INPUT_STYLE } from '../../styles/styles';
import CircleButton from '../CircleButton';


const MESSAGES_FLAT_LIST = 'messagesFlatList';

type Props = {
    clientDetails: ClientDetails;
    activeContact: Contact;
    dispatchCombinedAction(actions: Array<Action>): void;
    setClientDetails(clientDetails: ClientDetails): void;
    setActiveContact(activeContact: Contact): void;
};

type State = {
    newMessage: string;
    isKeyboardShown: boolean;
    keyboardHeight: number;
};

class Messages extends React.Component<Props, State>{
    state = {
        newMessage: '',
        isKeyboardShown: false,
        keyboardHeight: 0
    };

    keyboardDidShowListener: EmitterSubscription;
    keyboardDidHideListener: EmitterSubscription;

    scrollViewRef = React.createRef();

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
        if (this.props.activeContact.messages && this.props.activeContact.messages.length > 0) {
            setTimeout(() => { (this.refs[MESSAGES_FLAT_LIST] as any).scrollToEnd() }, 1000);
        }
    }

    keyboardDidShow = (e: object) => {
        this.setState({ isKeyboardShown: true, keyboardHeight: e['endCoordinates'].height });
    };
    keyboardDidHide = () => this.setState({ isKeyboardShown: false });


    sendMessage = async () => {
        if (!this.state.newMessage) return;

        const response: Response = await api.sendMessage(this.props.clientDetails.clientId, this.props.activeContact.clientId, this.state.newMessage);
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            const clientDetails = getTypeFromObject<ClientDetails>(response.payload);
            // refresh clientDetails & activeContact
            const activeContact = (clientDetails.contacts && this.props.activeContact)
                ? clientDetails.contacts.find(c => c.clientId == this.props.activeContact.clientId)
                : null;
            this.props.dispatchCombinedAction([setClientDetails(clientDetails), setActiveContact(activeContact)]);
        }

        this.setState({ newMessage: '' });
        Keyboard.dismiss();
    };

    goBack = () => this.props.setActiveContact(null);

    render() {
        const renderItem = ({ item }) => <MessageItem message={item} key={item.time} />;
        const messages = this.props.activeContact.messages;

        return (
            <View style={styles.container}>

                <View style={styles.messagesContainer}>
                    {(!messages || messages.length == 0) && <View style={styles.noMessagesTextContainer}><Text style={COMMON_TEXT_STYLE}>No conversation here yet!</Text></View>}
                    <FlatList
                        data={this.props.activeContact.messages}
                        renderItem={renderItem}
                        keyExtractor={item => item.time}
                        ref={MESSAGES_FLAT_LIST} />
                </View>

                <View style={styles.newMessageContainer}>
                    <TextInput
                        style={{ ...styles.newMessage, ...COMMON_INPUT_STYLE }}
                        value={this.state.newMessage}
                        onChangeText={newMessage => this.setState({ newMessage })}
                        multiline={true}
                        numberOfLines={2} />
                    <CircleButton imageSource={require('./../../assets/plane.png')} onPress={this.sendMessage} style={styles.sendButton} />
                </View>

                <View style={{ height: this.state.isKeyboardShown ? this.state.keyboardHeight : 0 }} />
            </View>
        );
    }


    componentDidUpdate(prevProps: Props) {
        const prevMessagesNumber = prevProps.activeContact.messages ? prevProps.activeContact.messages.length : 0;
        const messagesNumber = this.props.activeContact.messages ? this.props.activeContact.messages.length : 0;
        if (messagesNumber != prevMessagesNumber) {
            setTimeout(() => { (this.refs[MESSAGES_FLAT_LIST] as any).scrollToEnd() }, 100);
        }
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BODY_BACKGROUND_COLOR
    },
    messagesContainer: {
        flex: 1,
        margin: 6
    },
    noMessagesTextContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    newMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    newMessage: {
        width: '80%',
        margin: 6
    },
    sendButton: {
        width: 60,
        height: 60
    }
});



const mapStateToProps = (state: store.State): object => ({
    clientDetails: state.clientDetails,
    activeContact: state.activeContact
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
    setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails)),
    setActiveContact: (activeContact: Contact) => dispatch(setActiveContact(activeContact))
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
