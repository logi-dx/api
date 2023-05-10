import { Express } from 'express';
import { ApplicationBuilder, Port } from '../../src';
import { Application } from '../../src/Application';
import { MockController } from './MockController';

//@ts-ignore
@Port(1234)
export class MockApplication {
  private readonly app: Application;

  public constructor() {
    this.app = ApplicationBuilder.build();
  }

  public init(): Express {
    this.app.register(MockController).start();
    return this.app.expose();
  }

  public kill(): void {
    this.app.kill();
  }
}
