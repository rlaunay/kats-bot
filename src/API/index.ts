import { settings } from "../config/config";
import { Server } from './server';

import client from '../main';

import { Request, Response } from "express";
import {Channel, TextChannel} from "discord.js";

const server = new Server(settings.APIPort);

server.start();

server.app.post('/', (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);
    client.channels.fetch(data.channelID).then((channel: Channel) => {
        if (channel instanceof TextChannel) {
            console.log('salut je suis passer ici');
            data.message.forEach((value: string) => {
                channel.send(value[0] + ' ' + value[1]);
            });
        }
    });
    res.send('Ca marche');
});
