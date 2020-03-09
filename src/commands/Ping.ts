import { Command } from "../listener/message/Command";
import { CommandContext } from "../listener/message/CommandContext";

export class Ping implements Command {
    commandNames = ['ping'];

    async run(commandContext: CommandContext): Promise<void> {
        await commandContext.message.channel.send('pong');
    }
}