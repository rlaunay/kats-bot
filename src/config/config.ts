import { config } from 'dotenv';
config();

type BotConfig = {
    token: string;
    prefix: string;
    colorPrimary: number;
}

if (!process.env.TOKEN) {
    throw new Error('Aucun TOKEN de définie');
}

if (!process.env.PREFIX) {
    throw new Error('Aucun prefix de définie');
}

if (!process.env.COLOR_PRIMARY) {
    throw new Error('Aucune couleur primaire définie');
}

export const settings: BotConfig = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    colorPrimary: +process.env.COLOR_PRIMARY
};
