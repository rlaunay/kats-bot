import {Collection} from "discord.js";
import { Listener } from "./Listener";
import KatsBot from "../bot";
import fs from "fs";

type ListenerHandlerConfig = {
    listenerFolder: string;
    client: KatsBot;
    root: string;
};

export class ListenerHandler {
    public readonly listeners: Collection<string, Listener> = new Collection();

    private readonly client: KatsBot;


    constructor(args: ListenerHandlerConfig) {
        this.client = args.client;

        this.getListeners(args.root + '\\' + args.listenerFolder + '\\');
    }

    on() {
        this.listeners.forEach((eventClasse, event) => {
            this.client.on(event, (message) => {
                eventClasse.listen(this.client, message);
            });
            console.log(`Listen for: ${event}`);
        })
    }

    private getListeners(path: string) {
        const results = fs.readdirSync(path);

        results.forEach((res: string) => {
            if (fs.statSync(path + res).isDirectory()) {
                this.getListeners(path + res + '\\');
            } else if (res.includes('.js')) {
                const listenerName = res.split('.')[0];
                const listener = <any>Object.values(require(path + res)).shift();

                this.listeners.set(listenerName, new listener());

                console.log(`${listenerName} Chargée`);
            }
        });
    }
}