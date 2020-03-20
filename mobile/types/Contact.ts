import { Message } from "./Message";

export type Contact = {
    clientId: string;
    clientName: string;
    messages?: Array<Message>;
};