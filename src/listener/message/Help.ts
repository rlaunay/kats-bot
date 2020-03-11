import { Command } from "./Command";
import { CommandContext } from "./CommandContext";
import {MessageEmbed} from "discord.js";
import {settings} from "../../config/config";


export class Help implements Command {
    commandNames = ['help'];

    constructor(
        private commands: Command[]
    ) {
    }

    async run(commandContext: CommandContext): Promise<void> {
        if (commandContext.args.length === 0) {
            const msgHelp = new MessageEmbed();
            msgHelp.setColor(settings.colorPrimary);
            msgHelp.setTitle('Aide commandes');
            msgHelp.addField('Prefix', `Le prefix actuel : ${commandContext.prefix}`);
            msgHelp.addField('Détail des commandes', `${commandContext.prefix}help <commande> pour plus d'info sur la commande`);

            await commandContext.message.channel.send(msgHelp);
        } else {
            const usedCommand = this.commands.find(command => command.commandNames.includes(commandContext.args[0]));
            if (usedCommand) {
                await commandContext.message.channel.send(usedCommand.getHelp(commandContext.prefix));
            } else {
                await commandContext.message.channel.send('Cette commande n\'existe pas');
            }
        }
    }

    getHelp(prefix: string): MessageEmbed {
        const msgHelp = new MessageEmbed();
        msgHelp.setColor(settings.colorPrimary);
        msgHelp.setTitle('Aide commandes');
        msgHelp.addField('Prefix', `Le prefix actuel : ${prefix}`);
        msgHelp.addField('Détail des commandes', `${prefix}help <commande> pour plus d'info sur la commande`);

        return msgHelp;
    }
}