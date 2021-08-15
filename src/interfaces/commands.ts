import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;

  execute: (message: CommandInteraction) => void;
}