import {Listener} from "../../ListenerHandler/Listener";
import KatsBot from "../../bot";

import { Message } from "discord.js";

export class MessageListener implements Listener {
    listenerName = 'message';

    listen(client: KatsBot, message: Message): void {
        client.commandHandler.handleMessage(message);
    }
}