import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Contact } from '../../types/Contact';


type Props = {
    clientName: string;
    clientId: string;
    addContact(clientId: string, clientName: string): void;
};

type State = {};

export default class SearchClientResult extends React.Component<Props, State>{
    render() {
        return <View>
            <View>
                <Text>{this.props.clientName}</Text>
            </View>
            <View>
                <Text>{this.props.clientId}</Text>
            </View>
            <Button
                title='Add to contact list'
                onPress={() => this.props.addContact(this.props.clientId, this.props.clientName)} />
            {/* <button style={styles.sendMessageButton}>Send message</button> */}
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