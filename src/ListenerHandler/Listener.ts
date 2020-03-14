import KatsBot from "../bot";


export interface Listener {
    readonly listenerName: string;
    listen(client: KatsBot, ...args: any): void;
}