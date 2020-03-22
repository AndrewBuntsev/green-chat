import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as api from './../api';
import * as responseStatus from './../const/responseStatus';
import * as screens from './../const/screens';
import setActiveScreen from '../redux/actions/setActiveScreen';
import setClientDetails from '../redux/actions/setClientDetails';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';





class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientName: props.clientDetails.clientName,
            showNotifications: props.clientDetails.showNotifications,
            gender: props.clientDetails.gender,
            status: props.clientDetails.status
        }
    }

    onUpdateName = async () => {
        if (!this.state.clientName) return;
        if (this.state.clientName == this.props.clientDetails.clientName) return;

        const { clientId, showNotifications, gender, status } = this.props.clientDetails;
        const response = await api.updateClient({ clientId, clientName: this.state.clientName, showNotifications, gender, status });
        if (response && response.status == responseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(response.payload);
        }
    };

    onUpdateShowNotifications = async () => {
        const originalShowNotifications = this.state.showNotifications;
        this.setState({ showNotifications: !originalShowNotifications });

        const { clientId, clientName, gender, status } = this.props.clientDetails;
        const response = await api.updateClient({ clientId, clientName, showNotifications: !originalShowNotifications, gender, status });
        if (response && response.status == responseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(response.payload);
        }
    };

    onUpdateGender = async (e) => {
        const gender = e.target.value;
        this.setState({ gender });

        const { clientId, clientName, showNotifications, status } = this.props.clientDetails;
        const response = await api.updateClient({ clientId, clientName, showNotifications, gender, status });
        if (response && response.status == responseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(response.payload);
        }
    };

    onUpdateStatus = async (e) => {
        const status = e.target.value;
        this.setState({ status });

        const { clientId, clientName, showNotifications, gender } = this.props.clientDetails;
        const response = await api.updateClient({ clientId, clientName, showNotifications, gender, status });
        if (response && response.status == responseStatus.SUCCESS && response.payload) {
            this.props.setClientDetails(response.payload);
        }
    };

    onBackClick = async () => {
        this.props.setActiveScreen(screens.MAIN);
    };

    render() {
        return <div>
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
                <input type='radio' name='gender' value='' checked={!this.state.gender || this.state.gender == ''} onChange={this.onUpdateGender} /><br />
                Male
                <input type='radio' name='gender' value='m' checked={this.state.gender == 'm'} onChange={this.onUpdateGender} /><br />
                Female
                <input type='radio' name='gender' value='f' checked={this.state.gender == 'f'} onChange={this.onUpdateGender} /><br />
            </form>


            <br />
            Status:
            <form>
                Online
                <input type='radio' name='status' value='on' checked={this.state.status == 'on'} onChange={this.onUpdateStatus} /><br />
                Away
                <input type='radio' name='status' value='away' checked={this.state.status == 'away'} onChange={this.onUpdateStatus} /><br />
                Invisible
                <input type='radio' name='status' value='inv' checked={this.state.status == 'inv'} onChange={this.onUpdateStatus} /><br />
            </form>



            <br /><br /><br /><br /><br /><br />
            <div>
                <button onClick={this.onBackClick}>Back to Main Page</button>
            </div>

        </div>;
    }
}

const mapStateToProps = state => ({
    clientDetails: state.clientDetails
});

const mapDispatchToProps = dispatch => ({
    dispatchCombinedAction: actions => dispatch(dispatchCombinedAction(actions)),
    setActiveScreen: activeScreen => dispatch(setActiveScreen(activeScreen)),
    setClientDetails: clientDetails => dispatch(setClientDetails(clientDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);