import React, { Component } from 'react';
import { connect } from 'react-redux';

const styles = {
    container: {
        position: 'fixed',
        right: '10px',
        top: '10px'
    }
};

class TopMenu extends Component {

    render() {
        return <div style={styles.container}>
            <div>{`Hello, ${this.props.clientDetails.clientName}!`}</div>
            <div>{`Your ID is: ${this.props.clientDetails.clientId}!`}</div>
        </div>;
    }
}

const mapStateToProps = state => ({
    clientDetails: state.clientDetails
});

export default connect(mapStateToProps)(TopMenu);