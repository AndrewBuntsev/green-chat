import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as api from '../api';
import setActiveScreen from '../redux/actions/setActiveScreen';
import setClientDetails from '../redux/actions/setClientDetails';
import { ClientDetails } from '../types/ClientDetails';
import { Gender } from '../enums/Gender';
import { ClientStatus } from '../enums/ClientStatus';
import { Screen } from '../enums/Screen';
import { Response } from '../types/Response';
import { AppState } from '../types/AppState';
import { ResponseStatus } from '../enums/ResponseStatus';
import getTypeFromObject from '../helpers/getTypeFromObject';



type Props = {
    clientDetails: ClientDetails;
    setClientDetails(clientDetails: ClientDetails): void;
    setActiveScreen(activeScreen: Screen): void;
};

type State = {
    clientName: string;
    showNotifications: boolean;
    gender: Gender;
    clientStatus: ClientStatus;
};

class SettingsScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clientName: props.clientDetails.clientName,
            showNotifications: props.clientDetails.showNotifications,
            gender: props.clientDetails.gender,
            clientStatus: props.clientDetails.status
        }
    }

    onUpdateName = async () => {
        if (!this.state.clientName) return;
        if (this.state.clientName == this.props.clientDetails.clientName) return;

        const { clientId, showNotifications, gender, status } = this.props.clientDetails;
        const response: Response = await api.updateClient({ clientId, clientName: this.state.clientName, showNotifications, gender, status });
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(getTypeFromObject<ClientDetails>(response.payload));
        }
    };

    onUpdateShowNotifications = async () => {
        const originalShowNotifications = this.state.showNotifications;
        this.setState({ showNotifications: !originalShowNotifications });

        const { clientId, clientName, gender, status } = this.props.clientDetails;
        const response = await api.updateClient({ clientId, clientName, showNotifications: !originalShowNotifications, gender, status });
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(response.payload);
        }
    };

    onUpdateGender = async (e: any) => {
        const gender = e.target.value;
        this.setState({ gender });

        const { clientId, clientName, showNotifications, status } = this.props.clientDetails;
        const response = await api.updateClient({ clientId, clientName, showNotifications, gender, status });
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(getTypeFromObject<ClientDetails>(response.payload));
        }
    };

    onUpdateStatus = async (e: any) => {
        const status = e.target.value;
        this.setState({ clientStatus: status });

        const { clientId, clientName, showNotifications, gender } = this.props.clientDetails;
        const response = await api.updateClient({ clientId, clientName, showNotifications, gender, status });
        if (response && response.status == ResponseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(getTypeFromObject<ClientDetails>(response.payload));
        }
    };

    onBackClick = async () => {
        this.props.setActiveScreen(Screen.MAIN);
    };


    render() {

        return (
            <div>
                Setting screen<br /><br />
            Name: <input type='text' value={this.state.clientName} style={{ width: '280px' }} onChange={e => this.setState({ clientName: e.target.value })} /><br />
                <div>
                    <button onClick={this.onUpdateName}>Update Name</button>
                </div>

            Show Notifications
                <input type='checkbox' name='showNotifications' checked={this.state.showNotifications} onChange={this.onUpdateShowNotifications} />


                <br />
            Gender:
                <form>
                    Unknown
                <input type='radio' name='gender' value='' checked={this.state.gender == Gender.UNKNOWN} onChange={this.onUpdateGender} /><br />
                Male
                <input type='radio' name='gender' value='m' checked={this.state.gender == Gender.MALE} onChange={this.onUpdateGender} /><br />
                Female
                <input type='radio' name='gender' value='f' checked={this.state.gender == Gender.FEMALE} onChange={this.onUpdateGender} /><br />
                </form>


                <br />
            Status:
                <form>
                    Online
                <input type='radio' name='status' value='on' checked={this.state.clientStatus == ClientStatus.ONLINE} onChange={this.onUpdateStatus} /><br />
                Away
                <input type='radio' name='status' value='away' checked={this.state.clientStatus == ClientStatus.AWAY} onChange={this.onUpdateStatus} /><br />
                Invisible
                <input type='radio' name='status' value='inv' checked={this.state.clientStatus == ClientStatus.INVISIBLE} onChange={this.onUpdateStatus} /><br />
                </form>



                <br /><br /><br /><br /><br /><br />
                <div>
                    <button onClick={this.onBackClick}>Back to Main Page</button>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    clientDetails: state.clientDetails
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setActiveScreen: (activeScreen: Screen) => dispatch(setActiveScreen(activeScreen)),
    setClientDetails: (clientDetails: ClientDetails) => dispatch(setClientDetails(clientDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);