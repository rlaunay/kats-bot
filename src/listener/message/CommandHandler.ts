import { Message } from "discord.js";
import {Command, CommandConstruct} from "./Command";
import { CommandContext } from "./CommandContext";

export class CommandHandler {
    private commands: Command[];
    private readonly prefix: string;

    constructor(prefix: string, commandClasses: CommandConstruct[]) {
        this.commands = commandClasses.map(commandClass => new commandClass);
        this.prefix = prefix;
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
}