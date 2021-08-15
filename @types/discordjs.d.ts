import 'discord.js';
import { Collection } from 'discord.js';
import { Command } from './../src/interfaces/commands';

declare module 'discord.js' {
  interface Client {
    prefix: string;
    commands: Collection<string, Command>;
    cooldowns: Collection<string, Collection<string, number>>;
  }
}