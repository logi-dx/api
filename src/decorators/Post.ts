import { ApplicationBuilder } from '../ApplicationBuilder';
import { Middleware } from '../types/Middleware';
import { RequestMethod } from '../types/RequestMethod';

export const Post = (path?: string, ...middleware: Middleware[]): any => {
  return (target: any, _property: string, descriptor: PropertyDescriptor) => {
    const method: RequestMethod = 'POST';
    const controller: string = target.constructor.name;
    const endpoint: string = path || '';
    const handler: any = descriptor.value;
    ApplicationBuilder.registerEndpoint(controller, method, endpoint, middleware, handler);
  };
};
