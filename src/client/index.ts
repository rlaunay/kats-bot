import { Client, Collection, Intents } from 'discord.js';

const client = new Client({ 
  presence: {
    status: 'online',
    activities: [
      { name: 'Katsuo the BG', type: 'WATCHING' }
    ]
  },
  intents: [Intents.FLAGS.GUILDS] 
});

client.commands = new Collection();

export default client;