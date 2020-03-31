import express, {Express, Request, Response} from 'express';

export class Server {
    app: Express;

    constructor(
        readonly port: number
    ) {
        this.app = express();
    }

    start() {
        this.app.get('/', (_req: Request, res: Response) => {
            res.send('Salut les gens');
        });
        this.app.listen(this.port, () => {
            console.log('Serveur demarrer');
        });
    }


}
