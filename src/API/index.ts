import { settings } from "../config/config";
import { Server } from './server';

const server = new Server(settings.APIPort);
server.start();
