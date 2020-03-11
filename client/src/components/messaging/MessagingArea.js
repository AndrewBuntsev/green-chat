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
        height: '500px',
        overflow: 'auto',
        listStyle: 'none'
    },
    messageOut: {
        //border: 'red 1px solid',
        backgroundColor: '#DDDDDD',
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

const listStyle = {
    width: '60%',
    height: '100px',
    overflow: 'auto',
    listStyle: 'none',
    background: '#d4f3e6',
    fontFamily: 'Garamond, serif',
    fontSize: '1.2rem',
    border: '1px #a59b15 solid',
    padding: '0.5em',
    boxShadow: '5px 5px #d9d9d9',
    borderRadius: '3px'
};

const listItemStyle = {
    textAlign: 'left',
    borderBottom: '1px gray dashed',
    marginBottom: '0.1em',
    paddingBottom: '0.3em'
};


export default class MessagingArea extends Component {

    state = {
        newMessage: ''
    };

    chatRef = React.createRef();

    onClickSendMessage = () => {
        this.props.sendMessage(this.state.newMessage);
        this.setState({ newMessage: '' });
    };

    render() {
        const messages = this.props.contact.messages
            ? this.props.contact.messages.map((m, i) => <li style={styles.messageOut} key={i}>{m.msg}</li>)
            : [];

        return <div style={styles.container} key={this.props.contact.contactId}>
            <ul style={styles.messagesBox} ref={this.chatRef}>
                {messages}
            </ul>
            <textarea style={styles.newMessageBox} value={this.state.newMessage} onChange={e => this.setState({ newMessage: e.target.value })}></textarea>
            <button style={styles.sendMessageButton} onClick={this.onClickSendMessage}>Send</button>
        </div>;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (this.props.contact.messages
            && prevProps.contact.messages
            && this.props.contact.messages.length > prevProps.contact.messages.length) {
            const chatRef = this.chatRef.current;
            return chatRef.scrollHeight - chatRef.scrollTop;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
            const chatRef = this.chatRef.current;
            chatRef.scrollTop = chatRef.scrollHeight - snapshot;
        }
    }
}