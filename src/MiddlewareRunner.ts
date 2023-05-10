import { NextFunction, Request, Response } from "express";
import { IEndpoint } from "./interfaces/IEndpoint";
import { Middleware } from "./types/Middleware";

export class MiddlewareRunner {
    private readonly request: Request;
    private readonly response: Response;
    private readonly next: NextFunction;
    private readonly endpoint: IEndpoint;
    private readonly middleware: Middleware[];
    private index: number = 0;
    

    public constructor(endpoint: IEndpoint, request: Request, response: Response, next: NextFunction) {
        this.endpoint = endpoint;
        this.middleware = endpoint.middleware;
        this.index = 0;
        this.request = request;
        this.response = response;
        this.next = next;
    }

    public async run(): Promise<any> {
        if (this.index === this.middleware.length) {
            return this.endpoint.handler(this.request, this.response, this.next);
        }

        const middleware: Middleware = this.middleware[this.index];
        this.index ++;
        middleware(this.request, this.response, this.run);
    }
}