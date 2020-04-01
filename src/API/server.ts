import express, {Express, NextFunction, Request, Response} from 'express';

export class Server {
    app: Express;

    constructor(
        readonly port: number
    ) {
        console.log('port: ' + this.port);
        this.app = express();
        this.middleware();
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Serveur demarrer');
        });
    }

    private middleware() {
        this.app.use(express.json());
        const cors = (req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            if (req.method === 'OPTIONS') {
                res.setHeader('Access-Control-Allow-Headers', '*');
            }
            next();
        };
        this.app.use(cors);
    }
}
