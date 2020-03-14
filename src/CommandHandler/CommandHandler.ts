import {Collection, Message} from "discord.js";
import {Command} from "./Command";
import { CommandContext } from "./CommandContext";

import fs from 'fs';

// import { Help } from "./Help";

type CommandHandlerConfig = {
    prefix: string;
    commandsFolder: string;
    root: string;
};

export class CommandHandler {
    public readonly commands: Collection<string, Command> = new Collection();

    private readonly prefix: string;
    private readonly root: string;

    constructor(args: CommandHandlerConfig) {
        this.prefix = args.prefix;
        this.root = args.root;

        this.getCommands(this.root + '\\' + args.commandsFolder + '\\');
    }

    async handleMessage(message: Message): Promise<void> {
        if (message.author.bot || !this.isCommand(message)) return;
        const commandContext = new CommandContext(message, this.prefix);

        const matchedCommand = this.commands.find(command => command.commandNames.includes(commandContext.command));

        if (!matchedCommand) {
            await message.reply(`Je ne connais pas cette commande. Essayez ${this.prefix}help.`);
        } else {
            try {
                await matchedCommand.run(commandContext);
            } catch (e) {
                if (e.message === 'Missing Permissions') {
                    console.error(`Bot error : ${e.message}`);
                    await message.channel.send(`Désolé je n'ai pas les permissions nécessaires pour exécuter  cette commande.`);
                } else {
                    console.log(e.message);
                }
            }
        }
    }

    private isCommand(message: Message): boolean {
        return message.content.startsWith(this.prefix);
    }

    private getCommands(path: string) {
        const results = fs.readdirSync(path);

        results.forEach((res: string) => {
            if (fs.statSync(path + res).isDirectory()) {
                this.getCommands(path + res + '\\');
            } else if (res.includes('.js')) {
                const cmdName = res.split('.')[0];
                const command = <any>Object.values(require(path + res)).shift();

                this.commands.set(cmdName, new command);

                console.log(`${cmdName} Chargée`);
            }
        });
    }
}