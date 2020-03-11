import React from 'react';


const styles = {
    container: {
        textAlign: 'left',
        borderBottom: '1px gray dashed',
        marginBottom: '0.1em',
        paddingBottom: '0.3em'
    },
    clientId: {
        fontSize: '12px'
    },
    addContactButton: {

    },
    sendMessageButton: {
        float: 'right'
    }
};

export default function SearchClientResult(props) {
    return <div style={styles.container}>
        <div>{props.clientName}</div>
        <div style={styles.clientId}>{props.clientId}</div>
        <button style={styles.addContactButton} onClick={() => props.addContact(props.clientId, props.clientName)}>Add to contact list</button>
        <button style={styles.sendMessageButton}>Send message</button>
    </div>;

}