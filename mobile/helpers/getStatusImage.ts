import { ClientStatus } from "../enums/ClientStatus";

export function getStatusImage(status: ClientStatus): any {
    switch (status) {
        case ClientStatus.ONLINE:
            return require('./../assets/on.png');
        case ClientStatus.OFFLINE:
            return require('./../assets/off.png');
        case ClientStatus.AWAY:
            return require('./../assets/away.png');
        case ClientStatus.INVISIBLE:
            return require('./../assets/inv.png');
        default:
            return null;
    }
}