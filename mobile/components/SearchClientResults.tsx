import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Contact } from '../types/Contact';
import SearchClientResult from './SearchClientResult';


type Props = {
    clients: Array<Contact>;
    addContact(clientId: string, clientName: string): void;
};

type State = {};

export default class SearchClientResults extends React.Component<Props, State>{
    render() {
        return <View>
            <View>
                <Text>{`Found ${this.props.clients.length} clients`}</Text>
            </View>
            <View style={styles.resultsPanel}>
                {this.props.clients.map(client =>
                    <SearchClientResult
                        clientName={client.clientName}
                        clientId={client.clientId}
                        addContact={this.props.addContact}
                        key={client.clientId} />)}
            </View>
        </View>;
    }
}


const styles = StyleSheet.create({
    resultsPanel: {
        borderColor: '#A3EBB1',
        borderWidth: 2,
        borderRadius: 5,
    }
});