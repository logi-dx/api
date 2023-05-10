import { ApplicationBuilder } from "../ApplicationBuilder";

export const Port = (port: number) => {
    return (_target: any) => {
        ApplicationBuilder.port(port);
    };
};