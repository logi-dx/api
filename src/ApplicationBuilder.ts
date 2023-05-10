import { Express } from 'express';
import * as express from 'express';
import { Middleware } from './types/Middleware';
import { IEndpoint } from './interfaces/IEndpoint';
import { EndpointCollection } from './types/EndpointCollection';
import { Application } from './Application';
import { RequestHandler } from './types/RequestHandler';
import { RequestMethod } from './types/RequestMethod';

class WebApplicationBuilder {
  private activePort: number;
  private readonly server: Express;
  private readonly endpoints: EndpointCollection;

  private constructor() {
    this.activePort = 8080;
    this.server = express();
    this.endpoints = new Map<string, IEndpoint[]>();
  }

  public static create(): WebApplicationBuilder {
    return new WebApplicationBuilder();
  }

  public registerEndpoint(
    controller: string,
    method: RequestMethod,
    path: string,
    middleware: Middleware[],
    handler: RequestHandler,
  ): void {
    const endpoint: IEndpoint = {
      method,
      path: `${path}`,
      controller,
      middleware,
      handler,
    };

    if (!this.endpoints.has(controller)) {
      this.endpoints.set(controller, []);
    }

    this.endpoints.get(controller)?.push(endpoint);
  }

  public updateEndpoints(controller: string, path: string): void {
    const noControllerRegistered: boolean = !this.endpoints.has(controller);

    if (noControllerRegistered) {
      return;
    }

    const endpoints: IEndpoint[] = this.endpoints.get(controller) as IEndpoint[];
    endpoints.forEach((endpoint: IEndpoint) => {
      const hasPath: boolean = endpoint.path.length > 0;
      endpoint.path = hasPath ? `${path}${endpoint.path}` : path;
    });
  }

  public build(): Application {
    return new Application(this.server, this.endpoints, this.activePort);
  }

  public port(port: number): WebApplicationBuilder {
    this.activePort = port;
    return this;
  }
}

export const ApplicationBuilder = WebApplicationBuilder.create();
