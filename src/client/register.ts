import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces/commands';
import { REST } from '@discordjs/rest';
import { APIApplicationCommandOption, Routes } from 'discord-api-types/v9';
import { token, clientId } from '../config/env';

type JsonData = {
  name: string;
  description: string;
  options: APIApplicationCommandOption[];
}

const commands: JsonData[] = [];
const commandFolders = fs.readdirSync(path.join(__dirname, '..', 'commands'));

const rest = new REST({ version: '9' }).setToken(token);

export default async function registerSlash(): Promise<void> {
  await Promise.all(commandFolders.map(async (folder) => {
    const subCommandFiles = fs
      .readdirSync(path.join(__dirname, '..', 'commands', folder))
      .filter(file => file.endsWith('.js'));

    await Promise.all(subCommandFiles.map(async (file) => {
      const command: Command = (await import(`./../commands/${folder}/${file}`)).default;
      commands.push(command.data.toJSON());
    }));
  }));

  try {
    console.log('%cStarted refreshing application (/) commands.', 'color: #2ecc71');
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );
    console.log('%cSuccessfully reloaded application (/) commands.', 'color: #2ecc71');
  } catch (error) {
    console.error(error);
  }
}