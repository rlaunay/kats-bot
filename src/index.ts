import client from './client';
import { token } from './config/env';
import { eventsHandler, commandsHandler } from './client/handlers';
import registerSlash from './client/register';

(async () => {
  await eventsHandler(client);
  await commandsHandler(client);
  await registerSlash();

  client.login(token);
})();