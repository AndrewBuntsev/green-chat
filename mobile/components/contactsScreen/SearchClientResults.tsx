import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, FlatList } from 'react-native';
import { Contact } from '../../types/Contact';
import SearchClientResult from './SearchClientResult';
import { COMMON_TEXT_STYLE } from '../../styles/styles';


type Props = {
    clients: Array<Contact>;
    addContact(clientId: string, clientName: string): void;
};

type State = {
    selectedClient: Contact;
};

export default class SearchClientResults extends React.Component<Props, State>{
    state = { selectedClient: null };

    render() {
        const renderItem = ({ item }) => {
            return <SearchClientResult
                client={item}
                addContact={this.props.addContact}
                selectClient={client => this.setState({ selectedClient: client })}
                selectedClient={this.state.selectedClient}
                key={item.clientId}
            />;
        };

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={COMMON_TEXT_STYLE}>{`Found ${this.props.clients.length} clients`}</Text>
                </View>
                <View style={styles.resultsPanel}>
                    <FlatList
                        data={this.props.clients}
                        renderItem={renderItem}
                        keyExtractor={item => item.clientId} />

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    headerContainer: {
        alignSelf: 'center'
    },
    resultsPanel: {
    }
});