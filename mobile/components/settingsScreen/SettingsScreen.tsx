import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList, Button, Switch, TextInput, Picker, Keyboard } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


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
import { BODY_BACKGROUND_COLOR, COMMON_INPUT_STYLE } from '../../styles/styles';
import CircleButton from '../CircleButton';
import RadioButtonGroup from '../RadioButtonGroup';


const STATUS_LIST = [
  { label: 'Online', value: ClientStatus.ONLINE },
  { label: 'Away', value: ClientStatus.AWAY },
  { label: 'Invisible', value: ClientStatus.INVISIBLE }
];

const GENDER_LIST = [
  { label: 'Male', value: Gender.MALE },
  { label: 'Female', value: Gender.FEMALE },
  { label: 'Unknown', value: Gender.UNKNOWN }
];

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
      Keyboard.dismiss();
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




    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={{ ...COMMON_INPUT_STYLE, ...styles.nameInput }}
            value={this.state.clientName}
            onChangeText={value => this.setState({ clientName: value })} />
          <CircleButton imageSource={require('./../../assets/save-24.png')} onPress={this.clientNameChange} style={styles.saveNameButton} />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.label}>Show Notifications</Text>
          <Switch
            value={this.state.showNotifications}
            onValueChange={this.showNotificationsChange} />
        </View>

        <View style={styles.genderContainer}>
          <Text style={styles.label}>Gender</Text>
          <RadioButtonGroup options={GENDER_LIST} selectedOption={this.state.gender} selectOption={this.genderChange} />
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.label}>Status</Text>
          <RadioButtonGroup options={STATUS_LIST} selectedOption={this.state.status} selectOption={this.statusChange} />
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  //---Global---
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: BODY_BACKGROUND_COLOR
  },
  label: {
    fontSize: 18
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60
  },
  nameInput: {
    width: '65%'
  },
  saveNameButton: {
    width: 50,
    height: 50
  },
  genderContainer: {
    marginTop: 14
  },
  statusContainer: {
    marginTop: 14
  }
});


const mapStateToProps = (state: store.State): object => ({
  clientDetails: state.clientDetails
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails)),
  //setActiveContact: (activeContact: Contact) => dispatch(setActiveContact(activeContact))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

