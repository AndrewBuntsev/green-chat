import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Contact } from '../../types/Contact';
import { getStatusImage } from '../../helpers/getStatusImage';
import SearchClientResultMenu from './SearchClientResultMenu';


type Props = {
    client: Contact;
    selectedClient: Contact;
    selectClient(client: Contact): void;
    addContact(clientId: string, clientName: string): void;
};

type State = {};

export default class SearchClientResult extends React.Component<Props, State>{

    selectClient = () => this.props.selectClient(this.props.client);

    addContact = () => this.props.addContact(this.props.client.clientId, this.props.client.clientName);

    sendMessage = () => { };


    render() {
        const { clientName, clientId, status } = this.props.client;
        const isSelected: boolean = this.props.selectedClient == this.props.client;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={isSelected ? { ...styles.result, ...styles.resultSelectedMode } : styles.result} onPress={this.selectClient}>
                    <Image source={getStatusImage(status)} style={styles.statusImage} />

                    <View style={styles.clientNameContainer}>
                        <Text style={styles.clientName}>{clientName}</Text>
                    </View>

                    <View style={styles.clientIdContainer}>
                        <Text>{`(ID: ${clientId})`}</Text>
                    </View>
                </TouchableOpacity>
                {isSelected && <View style={styles.menuContainer}><SearchClientResultMenu addButtonClick={this.addContact} messageButtonClick={this.sendMessage} /></View>}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    result: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 10,
        marginEnd: 10
    },
    resultSelectedMode: {
        backgroundColor: '#B5D595'
    },
    statusImage: {
        width: 15,
        height: 15
    },
    clientNameContainer: {
        marginStart: 3
    },
    clientName: {
        fontSize: 20
    },
    clientIdContainer: {
        marginStart: 10
    },
    menuContainer: {
        flex: 1
    }

});