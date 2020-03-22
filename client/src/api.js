import { ENDPOINT } from "./const/settings";

export const testApi = () => {
    return fetch(`${ENDPOINT}/api/test`).then(res => res.json());
};

export const getClient = clientId => {
    return fetch(`${ENDPOINT}/api/getClient?clientId=${clientId}`).then(res => res.json());
};

export const addClient = (clientDetails) => {
    return fetch(`${ENDPOINT}/api/addClient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientDetails)
    }).then(res => res.json());
};

export const updateClient = (clientDetails) => {
    return fetch(`${ENDPOINT}/api/updateClient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientDetails)
    }).then(res => res.json());
};

export const addContact = (clientId, contact) => {
    return fetch(`${ENDPOINT}/api/addContact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, contact })
    }).then(res => res.json());
};

export const removeContact = (clientId, contactId) => {
    return fetch(`${ENDPOINT}/api/removeContact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, contactId })
    }).then(res => res.json());
};

export const searchClients = searchTerm => {
    return fetch(`${ENDPOINT}/api/searchClients?searchTerm=${searchTerm}`).then(res => res.json());
};

export const sendMessage = (senderId, receiverId, message) => {
    return fetch(`${ENDPOINT}/api/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId, receiverId, message })
    }).then(res => res.json());
};