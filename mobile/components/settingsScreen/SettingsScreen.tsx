import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList, Button, Switch, TextInput, Picker } from 'react-native';

import * as api from './../../api';
import * as store from '../../redux/store';
import { Dispatch } from 'redux';
import { ClientDetails } from '../../types/ClientDetails';
import setClientDetails from '../../redux/actions/setClientDetails';
import { ResponseStatus } from '../../enums/ResponseStatus';
import { Response } from '../../types/Response';
import getTypeFromObject from '../../helpers/getTypeFromObject';
import { Gender } from '../../enums/Gender';
import { ClientStatus } from '../../enums/ClientStatus';


type Props = {
  clientDetails: ClientDetails;
  setClientDetails(clientDetails: ClientDetails): void;
};

type State = {
  clientName: string;
  showNotifications: boolean;
  gender: Gender;
  status: ClientStatus;
};

class SettingsScreen extends React.Component<Props, State> {

  state = {
    clientName: this.props.clientDetails.clientName,
    showNotifications: this.props.clientDetails.showNotifications,
    gender: this.props.clientDetails.gender,
    status: this.props.clientDetails.status
  };

  clientNameChange = async () => {
    const { clientId, showNotifications, gender, status } = this.props.clientDetails;
    const response: Response = await api.updateClient({ clientId, clientName: this.state.clientName, showNotifications, gender, status });
    if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
      const clientDetails = getTypeFromObject<ClientDetails>(response.payload);
      this.props.setClientDetails(clientDetails);
    }
  };

  showNotificationsChange = async (value: boolean) => {
    this.setState({ showNotifications: value });

    const { clientId, clientName, gender, status } = this.props.clientDetails;
    const response: Response = await api.updateClient({ clientId, clientName, showNotifications: value, gender, status });
    if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
      const clientDetails = getTypeFromObject<ClientDetails>(response.payload);
      this.props.setClientDetails(clientDetails);
    }
  };

  genderChange = async (itemValue: Gender, itemIndex: number) => {
    this.setState({ gender: itemValue });

    const { clientId, clientName, showNotifications, status } = this.props.clientDetails;
    const response: Response = await api.updateClient({ clientId, clientName, showNotifications, gender: itemValue, status });
    if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
      const clientDetails = getTypeFromObject<ClientDetails>(response.payload);
      this.props.setClientDetails(clientDetails);
    }
  };

  statusChange = async (value: ClientStatus) => {
    this.setState({ status: value });

    const { clientId, clientName, showNotifications, gender } = this.props.clientDetails;
    const response: Response = await api.updateClient({ clientId, clientName, showNotifications, gender, status: value });
    if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
      const clientDetails = getTypeFromObject<ClientDetails>(response.payload);
      this.props.setClientDetails(clientDetails);
    }
  };


  render() {
    return <View>
      <View>
        <Text>Name</Text>
        <TextInput
          value={this.state.clientName}
          onChangeText={value => this.setState({ clientName: value })} />
        <Button title='Update Name' onPress={this.clientNameChange} />
      </View>

      <View>
        <Text>Show Notifications</Text>
        <Switch
          value={this.state.showNotifications}
          onValueChange={this.showNotificationsChange} />
      </View>

      <View>
        <Text>Gender</Text>
        <Picker
          selectedValue={this.state.gender}
          onValueChange={this.genderChange}>
          <Picker.Item label='Unknown' value={Gender.UNKNOWN} />
          <Picker.Item label='Male' value={Gender.MALE} />
          <Picker.Item label='Female' value={Gender.FEMALE} />
        </Picker>
      </View>

      <View>
        <Text>Status</Text>
        <Picker
          selectedValue={this.state.status}
          onValueChange={this.statusChange}>
          <Picker.Item label='Online' value={ClientStatus.ONLINE} />
          <Picker.Item label='Away' value={ClientStatus.AWAY} />
          <Picker.Item label='Invisible' value={ClientStatus.INVISIBLE} />
        </Picker>
      </View>

    </View>;
  }
}


const mapStateToProps = (state: store.State): object => ({
  clientDetails: state.clientDetails
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails)),
  //setActiveContact: (activeContact: Contact) => dispatch(setActiveContact(activeContact))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

