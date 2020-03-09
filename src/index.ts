import { Client, Message } from 'discord.js';

import { config } from 'dotenv';
config();

const client = new Client();

client.on('ready', () => {
    if (client.user) console.log(`Bot ${client.user.tag}`);
});

client.on('message', (msg: Message) => {
   if (msg.content === '++ping') {
       msg.reply('Pong !');
   }
});

client.login(process.env.TOKEN);