import { config } from 'dotenv';
config();

type BotConfig = {
    token: string;
    prefix: string;
}

if (!process.env.TOKEN) {
    throw new Error('Aucun TOKEN de définie');
}

if (!process.env.PREFIX) {
    throw new Error('Aucun prefix de définie');
}

export const settings: BotConfig = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX
};
