import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, FlatList } from 'react-native';
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
import { Message } from '../../types/Message';
import MessageItem from './MessageItem';
import { Action } from '../../redux/Action';
import dispatchCombinedAction from '../../redux/actions/dispatchCombinedAction';
import setActiveContact from '../../redux/actions/setActiveContact';


type Props = {
    //navigation: any;
    clientDetails: ClientDetails;
    activeContact: Contact;
    dispatchCombinedAction(actions: Array<Action>): void;
    setClientDetails(clientDetails: ClientDetails): void;
    setActiveContact(activeContact: Contact): void;
};

type State = {
    newMessage: string;
};

class Messages extends React.Component<Props, State>{
    state = {
        newMessage: ''
    };

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
    };

    render() {
        const renderItem = ({ item }) => <MessageItem message={item} key={item.time} />;
        const messages = this.props.activeContact.messages;

        return (
            <View style={styles.container}>
                <FlatList data={this.props.activeContact.messages} renderItem={renderItem} keyExtractor={item => item.time} />
                {(!messages || messages.length == 0) && <Text>No conversation here yet!</Text>}
                <View style={styles.newMessageBox}>
                    <TextInput
                        value={this.state.newMessage}
                        onChangeText={newMessage => this.setState({ newMessage })}
                        multiline={true}
                        numberOfLines={4} />
                </View>
                <View>
                    <Button title='Send Message' onPress={this.sendMessage} />
                </View>
                <View>
                    <Button title='All Chats' onPress={() => this.props.setActiveContact(null)} />
                </View>
            </View>
        );


    }


}

const styles = StyleSheet.create({
    container: {
    },
    newMessageBox: {
        borderRadius: 5,
        borderWidth: 1
    },
    sendMessageButton: {
        backgroundColor: '#9999FF'
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
