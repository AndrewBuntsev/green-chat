import { Contact } from "./Contact";

export type ClientDetails = {
    clientId: string;
    clientName: string;
    contacts: Array<Contact>;
}
