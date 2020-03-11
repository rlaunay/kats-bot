import { Command } from "../../listener/message/Command";
import {CommandContext} from "../../listener/message/CommandContext";
import {MessageEmbed} from "discord.js";
import { settings } from "../../config/config";

export class Repeat implements Command{
    commandNames = ['say', 'dire'];

    async run(parsedUserCommand: CommandContext): Promise<void> {
        parsedUserCommand.message.delete();
        const msg: string = parsedUserCommand.args.join(' ');
        await parsedUserCommand.message.channel.send(msg);
    }

    getHelp(prefix: string): MessageEmbed {
        const helpMsg = new MessageEmbed();
        helpMsg.setColor(settings.colorPrimary);
        helpMsg.setTitle(`Commande: ${this.commandNames[0]}`);
        helpMsg.setDescription('**Description:** permet de faire dire au bot ce qu\'on lui donne en argument');
        helpMsg.addField('**Utilisation:**', `${prefix}say <Text>`);

        return helpMsg;
    }

}