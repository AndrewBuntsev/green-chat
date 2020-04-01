import React, { CSSProperties } from 'react';

type Props = {
    clientName: string;
    clientId: string;
    addContact(clientId: string, clientName: string): void;
};
type State = {};

export default class SearchClientResult extends React.Component<Props, State> {
    render() {
        const { clientId, clientName } = this.props;
        return (
            <div style={styles.container}>
                <div>{clientName}</div>
                <div style={styles.clientId}>{clientId}</div>
                <button style={styles.addContactButton} onClick={() => this.props.addContact(clientId, clientName)}>Add to contact list</button>
                <button style={styles.sendMessageButton}>Send message</button>
            </div>
        );
    }
}



const styles = {
    container: {
        textAlign: 'left',
        borderBottom: '1px gray dashed',
        marginBottom: '0.1em',
        paddingBottom: '0.3em'
    } as CSSProperties,
    clientId: {
        fontSize: '12px'
    } as CSSProperties,
    addContactButton: {

    } as CSSProperties,
    sendMessageButton: {
        float: 'right'
    } as CSSProperties
};