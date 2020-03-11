import { CommandContext } from "./CommandContext";
import { MessageEmbed } from "discord.js";

export interface Command {
    readonly commandNames: string[];
    run(parsedUserCommand: CommandContext): Promise<void>;
    getHelp(prefix: string): MessageEmbed;
}

export interface CommandConstruct {
    new (): Command;
}