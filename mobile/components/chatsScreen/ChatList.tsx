import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import * as store from '../../redux/store';
import { Dispatch } from 'redux';
import { Contact } from '../../types/Contact';
import setActiveContact from '../../redux/actions/setActiveContact';
import { ClientDetails } from '../../types/ClientDetails';
import ChatItem from './ChatItem';
import { BODY_BACKGROUND_COLOR, COMMON_TEXT_STYLE } from '../../styles/styles';


type Props = {
    clientDetails: ClientDetails;
    setClientDetails(clientDetails: ClientDetails): void;
    setActiveContact(activeContact: Contact): void;
};

type State = {};

class ChatList extends React.Component<Props, State> {
    selectContact = (contact: Contact) => {
        this.props.setActiveContact(contact);
    };

    render() {

        const { contacts } = this.props.clientDetails;
        const chats = (!contacts || contacts.length == 0)
            ? []
            : contacts.filter(c => c.messages && c.messages.length > 0)
                .sort((a, b) => new Date(b.messages.slice(-1)[0].time).getTime() - new Date(a.messages.slice(-1)[0].time).getTime());

        const renderItem = ({ item }) => {
            return <ChatItem
                contact={item}
                isFirstChat={chats.length > 0 && chats[0] == item}
                selectContact={this.selectContact}
                key={item.clientId} />;
        };

        return (
            <View style={styles.container}>
                <FlatList
                    data={chats}
                    renderItem={renderItem}
                    keyExtractor={item => item.clientId}
                    style={styles.contacts} />
                {(!chats || chats.length == 0) && <View style={styles.emptyChatsContainer}><Text style={COMMON_TEXT_STYLE}>No conversations yet!</Text></View>}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BODY_BACKGROUND_COLOR,
        paddingTop: 22,
        justifyContent: 'center'
    },
    contacts: {
        flex: 1
    },
    emptyChatsContainer: {
        flex: 1.5,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    addContactButton: {
        flex: 1
    }
});


const mapStateToProps = (state: store.State): object => ({
    clientDetails: state.clientDetails
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setActiveContact: (activeContact: Contact) => dispatch(setActiveContact(activeContact))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);