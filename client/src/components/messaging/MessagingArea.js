import React, { Component } from 'react';

const styles = {
    container: {
        gridColumn: '2',
        gridRow: '2',
        width: '600px',
        marginLeft: '50px',
        height: '100vh'
    },
    messagesBox: {
        border: 'green 1px solid',
        borderRadius: '5px',
        height: '60%'
    },
    messageOut: {
        border: 'red 1px solid',
        borderRadius: '5px',
        marginBottom: '5px',
        width: '70%',
        float: 'right'
    },
    newMessageBox: {
        marginTop: '30px',
        border: 'green 1px solid',
        borderRadius: '5px',
        width: '100%',
        height: '15%'
    },
    sendMessageButton: {
        width: '100px',
        height: '40px',
        backgroundColor: '#9999FF'
    }
};
export default class MessagingArea extends Component {

    state = {
        newMessage: ''
    };

    onClickSendMessage = () => {
        this.props.sendMessage(this.state.newMessage);
        this.setState({ newMessage: '' });
    };

    render() {
        const messages = this.props.contact.messages
            ? this.props.contact.messages.map((m, i) => <div style={styles.messageOut} key={i}>{m.msg}</div>)
            : [];

        return <div style={styles.container} key={this.props.contact.contactId}>
            <div style={styles.messagesBox}>
                {messages}
            </div>
            <textarea style={styles.newMessageBox} value={this.state.newMessage} onChange={e => this.setState({ newMessage: e.target.value })}></textarea>
            <button style={styles.sendMessageButton} onClick={this.onClickSendMessage}>Send</button>
        </div>;
    }
}