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

export const searchClients = searchTerm => {
    return fetch(`${ENDPOINT}/api/searchClients?searchTerm=${searchTerm}`).then(res => res.json());
};