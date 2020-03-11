import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as screens from '../const/screens';
import setActiveScreen from '../redux/actions/setActiveScreen';
import setClientDetails from '../redux/actions/setClientDetails';
import dispatchCombinedAction from '../redux/actions/dispatchCombinedAction';


const styles = {
    container: {
        position: 'fixed',
        right: '10px',
        top: '10px'
    }
};

class TopMenu extends Component {
    logOut = () => {
        this.props.dispatchCombinedAction([setClientDetails(null), setActiveScreen(screens.SIGNUP)]);
    };

    render() {
        return <div style={styles.container}>
            <div>
                {`Hello, ${this.props.clientDetails.clientName}! `}
                <button onClick={this.logOut}>Log Out</button>
            </div>
            <div>{`Your ID is: ${this.props.clientDetails.clientId}!`}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);