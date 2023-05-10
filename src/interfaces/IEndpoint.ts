import { Middleware } from '../types/Middleware';
import { RequestHandler } from '../types/RequestHandler';
import { RequestMethod } from '../types/RequestMethod';

export interface IEndpoint {
  method: RequestMethod;
  path: string;
  controller: string;
  middleware: Middleware[];
  handler: RequestHandler;
  ready: boolean;
}
