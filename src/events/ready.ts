import { Client } from 'discord.js';
import Event from '../interfaces/event';

const ready: Event = {
  name: 'ready',
  once: true,
  execute(client: Client) {
    console.log(`Logged in ${client.user?.tag}`);
  }
};

export default ready;