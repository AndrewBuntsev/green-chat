import { MessageType } from "../enums/MessageType";

export type Message = {
    type: MessageType;
    msg: string;
};