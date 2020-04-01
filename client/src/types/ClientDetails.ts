import { Contact } from "./Contact";
import { Gender } from "../enums/Gender";
import { ClientStatus } from "../enums/ClientStatus";

export type ClientDetails = {
    clientId: string;
    clientName: string;
    showNotifications: boolean;
    gender: Gender;
    status: ClientStatus;
    contacts: Array<Contact>;
}
