import { Client, Message } from 'discord.js';
import { CommandHadnler } from "./listener/message/CommandHandler";

import { settings } from "./config/config";

const client = new Client();
const commandHadnler = new CommandHadnler(settings.prefix);

client.on('ready', () => {
    if (client.user) console.log(`Bot ${client.user.tag}`);
});

client.on('message', (msg: Message) => commandHadnler.handleMessage(msg));

client.login(settings.token);