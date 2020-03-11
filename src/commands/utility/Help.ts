import { Command } from "../../listener/message/Command";
import { CommandContext } from "../../listener/message/CommandContext";


export class Help implements Command {
    commandNames = ['help'];

    async run(commandContext: CommandContext): Promise<void> {
        const start = Date.now();
        const rep = await  commandContext.message.channel.send('Pong');

        await rep.edit(`Pong : **${Date.now() - start} ms**`);
    }
}