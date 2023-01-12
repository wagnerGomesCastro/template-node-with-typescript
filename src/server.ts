/* eslint-disable no-console */
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

class App {
  public express: express.Application;

  public constructor() {
    this.bootstrap();
  }

  public async bootstrap() {
    this.express = express();
  }

  private setupMiddlewares() {
    this.express.disable('x-powered-by');
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes() {
    this.express.get('/', (req: Request, res: Response) => {
      return res.json({
        message: 'Hello World',
      });
    });

    // this.express.use(routes);
  }

  private serveStaticFiles() {
    this.express.use(
      '/public',
      express.static(path.join(__dirname, '..', 'public'), {
        maxAge: 31557600000,
      })
    );
  }

  public startApplication() {
    this.express.listen(process.env.APP_PORT || 3011, () => {
      console.log(
        `🚀 Server started at http://localhost:${process.env.APP_PORT}`
      );
      console.log(`🚨️ Version Node.js v${process.versions.node}!`);
      console.log(`🚨️ Environment: ${process.env.NODE_ENV}`);
    });
  }
}

// Start App
const server = new App();
server.startApplication();
