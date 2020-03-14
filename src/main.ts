import KatsBot from './bot';
import { settings } from "./config/config";

const client = new KatsBot({
    prefix: settings.prefix,
    commandsFolder: 'commands',
    listenerFolder: 'listener'
});

client.listenerHandler.on();

client.login(settings.token);