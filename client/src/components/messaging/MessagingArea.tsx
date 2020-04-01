import React, { Component, CSSProperties } from 'react';

import { Contact } from './../../types/Contact';
import { MessageType } from '../../enums/MessageType';


type Props = {
    contact: Contact;
    sendMessage(newMessage: string): void;
};

type State = {
    newMessage: string;
};

export default class MessagingArea extends Component<Props, State> {
    state = {
        newMessage: ''
    };

    chatRef: React.RefObject<HTMLUListElement> = React.createRef<HTMLUListElement>();

    onClickSendMessage = () => {
        this.props.sendMessage(this.state.newMessage);
        this.setState({ newMessage: '' });
    };

    render() {
        const messages = this.props.contact.messages
            ? this.props.contact.messages.map((m, i) => <li style={m.type == MessageType.IN ? styles.messageIn : styles.messageOut} key={i}>{m.msg}</li>)
            : [];

        return <div style={styles.container} key={this.props.contact.clientId}>
            <ul style={styles.messagesBox} ref={this.chatRef}>
                {messages}
            </ul>
            <textarea style={styles.newMessageBox} value={this.state.newMessage} onChange={e => this.setState({ newMessage: e.target.value })}></textarea>
            <button style={styles.sendMessageButton} onClick={this.onClickSendMessage}>Send</button>
        </div>;
    }

    getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
        if (this.props.contact.messages
            && prevProps.contact.messages
            && this.props.contact.messages.length > prevProps.contact.messages.length) {
            const chatRef = this.chatRef.current;
            return chatRef ? chatRef.scrollHeight - chatRef.scrollTop : null;
        }
        return null;
    }

    componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
        if (snapshot != null) {
            const chatRef = this.chatRef.current;
            if (chatRef != null) {
                chatRef.scrollTop = chatRef.scrollHeight - snapshot;
            }
        }
    }
}

const styles = {
    container: {
        gridColumn: '2',
        gridRow: '2',
        width: '600px',
        marginLeft: '50px',
        height: '100vh'
    } as CSSProperties,
    messagesBox: {
        border: 'green 1px solid',
        borderRadius: '5px',
        height: '500px',
        overflow: 'auto',
        listStyle: 'none'
    } as CSSProperties,
    messageIn: {
        backgroundColor: '#DDDDDD',
        borderRadius: '5px',
        marginBottom: '5px',
        width: '70%',
        float: 'left'
    } as CSSProperties,
    messageOut: {
        backgroundColor: '#FADCD9',
        borderRadius: '5px',
        marginBottom: '5px',
        width: '70%',
        float: 'right'
    } as CSSProperties,
    newMessageBox: {
        marginTop: '30px',
        border: 'green 1px solid',
        borderRadius: '5px',
        width: '100%',
        height: '15%'
    } as CSSProperties,
    sendMessageButton: {
        width: '100px',
        height: '40px',
        backgroundColor: '#9999FF'
    } as CSSProperties
};