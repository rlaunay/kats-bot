import { Command } from "../../CommandHandler/Command";
import { CommandContext } from "../../CommandHandler/CommandContext";
import {MessageEmbed} from "discord.js";
import {settings} from "../../config/config";

export class Ping implements Command {
    commandNames = ['ping'];

    async run(commandContext: CommandContext): Promise<void> {
        const start = Date.now();
        const rep = await  commandContext.message.channel.send('Pong');

        await rep.edit(`Pong : **${Date.now() - start} ms**`);
    }

    getHelp(prefix: string): MessageEmbed {
        const helpMsg = new MessageEmbed();
        helpMsg.setColor(settings.colorPrimary);
        helpMsg.setTitle(`Commande: ${this.commandNames[0]}`);
        helpMsg.setDescription('**Description:** Permet de ping le bot');
        helpMsg.addField('**Utilisation:**', `${prefix}ping`);

        return helpMsg;
    }
}