import { Command } from "../../CommandHandler/Command";
import { CommandContext } from "../../CommandHandler/CommandContext";
import {MessageEmbed} from "discord.js";
import {settings} from "../../config/config";

export class Dice implements Command {
    commandNames = ['dice', 'dé', 'de', 'd'];

    async run(parsedUserCommand: CommandContext): Promise<void> {
        let de:number = 100;
        if (parsedUserCommand.args.length !== 0) {
            if (!isNaN(+parsedUserCommand.args[0])) {
                de = +parsedUserCommand.args[0]
            }
        }
        const lance = Math.floor(Math.random() * de) + 1;
        await parsedUserCommand.message.channel.send(`Dé ${de}: **${lance}**`);
    }

    getHelp(prefix: string): MessageEmbed {
        const helpMsg = new MessageEmbed();
        helpMsg.setColor(settings.colorPrimary);
        helpMsg.setTitle(`Commande: ${this.commandNames[0]}`);
        helpMsg.setDescription('**Description:** Permet de faire un lancé entre 0 et le nombre donnée (par défaut: 100)');
        helpMsg.addField('**Utilisation:**', `${prefix}dice <nombre>`);

        return helpMsg;
    }
}