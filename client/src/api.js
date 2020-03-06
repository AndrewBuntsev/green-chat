import { ENDPOINT } from "./const/settings";

export const testApi = () => {
    return fetch(`${ENDPOINT}/api/test`).then(res => res.json());
};

export const getClient = clientId => {
    return fetch(`${ENDPOINT}/api/getClient?clientId=${clientId}`).then(res => res.json());
};