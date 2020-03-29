import {Listener} from "../ListenerHandler/Listener";
import KatsBot from "../bot";


export class Ready implements Listener {
    listenerName = 'ready';

    listen(client: KatsBot): void {
        if (client.user) client.user.setActivity(`${client.commandHandler.prefix}help`);
    }
}