import { ApplicationBuilder } from '../ApplicationBuilder';
import { Middleware } from '../types/Middleware';
import { RequestMethod } from '../types/RequestMethod';

export const Put = (path?: string, ...middleware: Middleware[]): any => {
  return (target: any, _property: string, descriptor: PropertyDescriptor) => {
    const method: RequestMethod = 'PUT';
    const controller: string = target.constructor.name;
    const endpoint: string = path || '';
    const handler: any = descriptor.value;
    ApplicationBuilder.registerEndpoint(controller, method, endpoint, middleware, handler);
  };
};
