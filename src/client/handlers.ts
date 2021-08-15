import fs from 'fs';
import path from 'path';
import { Client } from 'discord.js';
import Event from '../interfaces/event';
import { Command } from '../interfaces/commands';

export const eventsHandler = async (client: Client): Promise<void> => {
  const eventFiles = fs.readdirSync(path.join(__dirname, '..', 'events')).filter(file => file.endsWith('.js'));

  await Promise.all(eventFiles.map(async (file) => {
    const event: Event = (await import(`./../events/${file}`)).default;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }));
};

export const commandsHandler = async (client: Client): Promise<void> => {
  const commandFolders = fs.readdirSync(path.join(__dirname, '..', 'commands'));

  await Promise.all(commandFolders.map( async (folder) => {
    const commandFiles = fs
      .readdirSync(path.join(__dirname, '..', 'commands', folder))
      .filter(file => file.endsWith('.js'));
 
    await Promise.all(commandFiles.map(async (file) => {
      const command: Command = (await import(`./../commands/${folder}/${file}`)).default;

      client.commands.set(command.data.name, command);
    }));
  }));
};