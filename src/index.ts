import { Client, Message } from 'discord.js';
import { CommandHandler } from "./listener/message/CommandHandler";

import { settings } from "./config/config";
import { CommandConstruct } from "./listener/message/Command";

import fs from 'fs';

const commandsClasses:CommandConstruct[] = [];

const client = new Client();

startBot();

async function startBot() {
    await getAllCommand(`${__dirname}\\commands\\`, './commands/');

    const commandHandler = new CommandHandler(settings.prefix, commandsClasses);

    client.on('ready', () => {
        if (client.user) {
            console.log(`Bot logged in as ${client.user.tag}`);
            client.user.setActivity(`${settings.prefix}help`);
        }
    });

    client.on('message', (msg: Message) => commandHandler.handleMessage(msg));

    client.login(settings.token);
}

async function getAllCommand(pathFs: string, pathRequire: string) {
    const results = fs.readdirSync(pathFs);

    await asyncForEach(results, async (res: string) => {
        if (fs.statSync(pathFs + res).isDirectory()) {
            await getAllCommand(pathFs + res + '\\', pathRequire + res + '/');
        } else if (res.includes('.js')) {
            const cmd = await import(pathRequire + res);
            commandsClasses.push(<CommandConstruct>Object.values(cmd).shift());
            console.log(`${res} Chargée`);
        }
    });
}

async function asyncForEach(array: string[], callback: Function) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}