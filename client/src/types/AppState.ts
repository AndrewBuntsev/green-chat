import { ClientDetails } from "./ClientDetails";
import { Contact } from "./Contact";
import { Screen } from './../enums/Screen';

export type AppState = {
    activeScreen: Screen;
    clientDetails: ClientDetails;
    activeContact: Contact;
};