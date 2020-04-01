import KatsBot from './bot';
import { settings } from "./config/config";

const client = new KatsBot({
    prefix: settings.prefix,
    commandsFolder: settings.commandsFolder,
    listenerFolder: settings.listenersFolder
});

client.listenerHandler.on();

client.login(settings.token);

export default client;
