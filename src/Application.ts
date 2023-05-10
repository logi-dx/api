import { Express, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import { EndpointCollection } from './types/EndpointCollection';
import { Middleware } from './types/Middleware';
import { IEndpoint } from './interfaces/IEndpoint';


export class Application {
  private readonly server: Express;
  private readonly endpoints: EndpointCollection;
  private readonly port: number;
  private readonly controllers: any[];
  private listener: Server | undefined;

  public constructor(server: Express, endpoints: EndpointCollection, port: number) {
    this.server = server;
    this.endpoints = endpoints;
    this.port = port;
    this.controllers = [];
    this.listener = undefined;
  }

  public start(): void {
    this.onStartup();
    this.listener = this.server.listen(this.port);
  }

  public kill(): void {
    const hasListener: boolean = this.listener !== null && this.listener !== undefined;

    if (hasListener) {
      const server: Server = this.listener as Server;
      this.listener = undefined;
      server.close();
    }
  }
  public expose(): Express {
    return this.server;
  }

  public register(controller: any): Application {
    this.controllers.push(controller);
    return this;
  }

  public consume(middleware: any): Application {
    this.server.use(middleware);
    return this;
  }

  private onStartup(): void {
    this.endpoints.forEach((endpoints: IEndpoint[]) => {
      endpoints.forEach((endpoint: IEndpoint) => {
        this.registerEndpoint(endpoint);
      });
    });
  }

  private registerEndpoint(endpoint: IEndpoint): void {
    switch (endpoint.method) {
      case 'DELETE':
        return this.registerDeleteRequestHandler(endpoint);
      case 'GET':
        return this.registerGetRequestHandler(endpoint);
      case 'PATCH':
        return this.registerPatchRequestHandler(endpoint);
      case 'POST':
        return this.registerPostRequestHandler(endpoint);
      case 'PUT':
        return this.registerPutRequestHandler(endpoint);
      default:
        return this.registerDefaultRequestHandler(endpoint);
    }
  }

  private registerDeleteRequestHandler(endpoint: IEndpoint): void {
    const middleware: Middleware[] = this.getMiddleware(endpoint);

    this.server.delete(endpoint.path, middleware, async (req: Request, res: Response, next: NextFunction) => {
      await endpoint.handler(req, res, next);
    });
  }

  private registerGetRequestHandler(endpoint: IEndpoint): void {
    const middleware: Middleware[] = this.getMiddleware(endpoint);

    this.server.get(endpoint.path, middleware, async (req: Request, res: Response, next: NextFunction) => {
      await endpoint.handler(req, res, next);
    });
  }

  private registerPatchRequestHandler(endpoint: IEndpoint): void {
    const middleware: Middleware[] = this.getMiddleware(endpoint);

    this.server.patch(endpoint.path, middleware, async (req: Request, res: Response, next: NextFunction) => {
      await endpoint.handler(req, res, next);
    });
  }

  private registerPostRequestHandler(endpoint: IEndpoint): void {
    const middleware: Middleware[] = this.getMiddleware(endpoint);

    this.server.post(endpoint.path, middleware, async (req: Request, res: Response, next: NextFunction) => {
      await endpoint.handler(req, res, next);
    });
  }

  private registerPutRequestHandler(endpoint: IEndpoint): void {
    const middleware: Middleware[] = this.getMiddleware(endpoint);

    this.server.put(endpoint.path, middleware, async (req: Request, res: Response, next: NextFunction) => {
      await endpoint.handler(req, res, next);
    });
  }

  private registerDefaultRequestHandler(endpoint: IEndpoint): void {
    const middleware: Middleware[] = this.getMiddleware(endpoint);

    this.server.all(endpoint.path, middleware, async (req: Request, res: Response, next: NextFunction) => {
      await endpoint.handler(req, res, next);
    });
  }

  private getMiddleware(endpoint: IEndpoint): Middleware[] {
    const hasMiddleware: boolean =
      endpoint.middleware !== null &&
      endpoint.middleware !== undefined &&
      Array.isArray(endpoint.middleware) &&
      endpoint.middleware.length > 0;
    return hasMiddleware ? endpoint.middleware : [];
  }
}
