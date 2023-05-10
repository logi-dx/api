import { ApplicationBuilder } from "../ApplicationBuilder";

export const Route = (path: string) => {
  // tslint:disable-next-line
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    ApplicationBuilder.updateEndpoints(constructor.name, path);
  };
};
