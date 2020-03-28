import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as api from '../../api';
import * as store from '../../redux/store';
import { Response } from '../../types/Response';
import { ResponseStatus } from '../../enums/ResponseStatus';
import { Contact } from '../../types/Contact';
import getTypeFromObject from '../../helpers/getTypeFromObject';
import SearchClientResults from './SearchClientResults';
import setClientDetails from '../../redux/actions/setClientDetails';
import { ClientDetails } from '../../types/ClientDetails';
import CircleButton from '../CircleButton';
import { BODY_BACKGROUND_COLOR, COMMON_TEXT_STYLE, COMMON_INPUT_STYLE } from '../../styles/styles';


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
            Keyboard.dismiss();
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
        return (
            <View style={styles.container}>
                <View style={styles.headerTextContainer}>
                    <Text style={COMMON_TEXT_STYLE}>Search new contact</Text>
                </View>
                <View style={styles.searchInputContainer}>
                    <TextInput
                        value={this.state.searchTerm}
                        placeholder='Client ID or Name'
                        onChangeText={value => this.setState({ searchTerm: value })}
                        style={{ ...styles.searchInput, ...COMMON_INPUT_STYLE }} />
                    <View style={styles.searchButton}>
                        <CircleButton imageSource={require('./../../assets/search.png')} onPress={this.onSearchButtonClick} />
                    </View>
                </View>

                <View style={styles.searchResultsContainer}>
                    {this.state.searchInProgress && <View style={styles.searchSpinnerContainer}><Image source={require('../../assets/spinner.gif')} width={50}></Image></View>}
                    {this.state.searchPerformed && !this.state.searchInProgress && <SearchClientResults clients={this.state.clients} addContact={this.addContact} />}
                </View>

                <View style={styles.backButton}>
                    <CircleButton imageSource={require('./../../assets/back.png')} onPress={this.props.navigation.goBack} />
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BODY_BACKGROUND_COLOR
    },
    headerTextContainer: {
        height: 50,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    searchInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    searchInput: {
        width: '70%',
        height: 45
    },
    searchButton: {
        //flex: 1
    },

    //-----------------
    searchResultsContainer: {
        flex: 1,
        alignItems: 'stretch'
    },
    searchSpinnerContainer: {
        flex: 1,
        alignSelf: 'center'
    },

    backButton: {
        position: 'absolute',
        right: 20,
        bottom: 20
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
