import {Client} from "discord.js";
import {CommandHandler} from "./CommandHandler/CommandHandler";
import {ListenerHandler} from "./ListenerHandler/ListenerHandler";

type ClientConfig = {
    prefix: string;
    commandsFolder: string;
    listenerFolder: string;
};

export default class KatsBot extends Client {
    private readonly root: string = __dirname;

    readonly listenerFolder: string;

    public commandHandler: CommandHandler;
    public listenerHandler: ListenerHandler;

    constructor(args: ClientConfig) {
        super();

        this.commandHandler = new CommandHandler({
            prefix: args.prefix,
            commandsFolder: args.commandsFolder,
            root: this.root
        });

        this.listenerHandler = new ListenerHandler({
            listenerFolder: 'listener',
            client: this,
            root: this.root
        });


        this.listenerFolder = args.listenerFolder;
    }
}