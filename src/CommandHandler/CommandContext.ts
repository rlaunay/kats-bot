import { Message } from "discord.js";

export class CommandContext {
    readonly command: string;
    readonly args: string[];
    readonly message: Message;
    readonly prefix: string;

    constructor(message: Message, prefix: string) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        let command = args.shift();
        if (!command) command = '';

        this.command = command;
        this.args = args;
        this.message = message;
        this.prefix = prefix;
    }
}