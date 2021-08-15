import { CommandInteraction, Interaction } from 'discord.js';
import Event from '../interfaces/event';

const interactionCreate: Event = {
  name: 'interactionCreate',
  async execute(interaction: Interaction | CommandInteraction): Promise<void> {
    if (!interaction.isCommand()) return;

    const { commandName, client } = interaction;

    if (!client.commands.has(commandName)) return;

    try {
      client.commands.get(commandName)?.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
};

export default interactionCreate;