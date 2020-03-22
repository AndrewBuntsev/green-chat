import { Message } from "./Message";
import { Gender } from "../enums/Gender";
import { ClientStatus } from "../enums/ClientStatus";

export type Contact = {
    clientId: string;
    clientName: string;
    gender: Gender;
    status: ClientStatus;
    messages?: Array<Message>;
};