import { config } from 'dotenv';
config();

type BotConfig = {
    token: string;
    prefix: string;
    commandsFolder: string;
    listenersFolder: string;
    colorPrimary: number;
    APIPort: number;
}

if (!process.env.TOKEN) {
    throw new Error('Aucun TOKEN de définie');
}

if (!process.env.PREFIX) {
    throw new Error('Aucun prefix de définie');
}

if (!process.env.COMMANDSFOLDER) {
    throw new Error('Aucun dossier de commandes définie');
}

if (!process.env.LISTENERSFOLDER) {
    throw new Error('Aucun aucun dossier d\'évenement définie');
}

if (!process.env.COLOR_PRIMARY) {
    throw new Error('Aucune couleur primaire définie');
}

if (!process.env.API) {
    throw new Error('Aucun port définie pour l API du bot');
}

export const settings: BotConfig = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    commandsFolder: process.env.COMMANDSFOLDER,
    listenersFolder: process.env.LISTENERSFOLDER,
    colorPrimary: +process.env.COLOR_PRIMARY,
    APIPort: +process.env.API
};
