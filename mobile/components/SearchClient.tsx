import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as api from '../api';
import * as store from '../redux/store';
import { Response } from '../types/Response';
import { ResponseStatus } from '../enums/ResponseStatus';
import { Contact } from '../types/Contact';
import getTypeFromObject from '../helpers/getTypeFromObject';
import SearchClientResults from './SearchClientResults';
import setClientDetails from '../redux/actions/setClientDetails';
import { ClientDetails } from '../types/ClientDetails';


type Props = {
    navigation: any;
    clientDetails: ClientDetails;
    setClientDetails(clientDetails: ClientDetails): void;
};

type State = {
    searchTerm: string;
    clients: Array<Contact>;
    searchPerformed: boolean;
    searchInProgress: boolean;
};

class SearchClient extends React.Component<Props, State>{
    state = {
        searchTerm: '',
        clients: [],
        searchPerformed: false,
        searchInProgress: false
    };

    onSearchButtonClick = async () => {
        if (!this.state.searchTerm) return;
        if (this.state.searchInProgress) return;

        this.setState({ searchInProgress: true });

        const response: Response = await api.searchClients(this.state.searchTerm);

        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            this.setState({ searchInProgress: false, searchPerformed: true, clients: getTypeFromObject<Array<Contact>>(response.payload) });
        } else {
            this.setState({ searchInProgress: false, searchPerformed: true });
        }
    };

    addContact = async (clientId: string, clientName: string) => {
        const response: Response = await api.addContact(this.props.clientDetails.clientId, { clientId, clientName });
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(getTypeFromObject<ClientDetails>(response.payload));
        }

        this.props.navigation.goBack();
    };

    render() {
        return <View>
            <View>
                <Text>Find new contact</Text>
            </View>
            <View>
                <TextInput
                    value={this.state.searchTerm}
                    placeholder='Client ID or Name'
                    onChangeText={value => this.setState({ searchTerm: value })}
                    style={styles.searchInput} />
            </View>
            <View>
                <Button onPress={this.onSearchButtonClick} title='Search' />
                <Button onPress={this.props.navigation.goBack} title='Cancel' />
            </View>
            <View>
                {this.state.searchInProgress && <Image source={require('../assets/spinner.gif')} width={50}></Image>}
                {this.state.searchPerformed && <SearchClientResults clients={this.state.clients} addContact={this.addContact} />}
            </View>
        </View>;
    }
}



const styles = StyleSheet.create({
    searchInput: {
        backgroundColor: '#EEEEEE',
        borderColor: '#A3EBB1',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 5
    }
});





const mapStateToProps = (state: store.State): object => ({
    clientDetails: state.clientDetails
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    //dispatchCombinedAction: (actions: Array<Action>) => dispatch(dispatchCombinedAction(actions)),
    setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchClient);
