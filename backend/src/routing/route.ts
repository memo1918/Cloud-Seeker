import { NextFunction, Request as _Request, Response as _Response } from "express";
import * as crypto from "crypto";

export interface FrameworkRequest extends _Request {
    params: {
        readonly correlationID: string;
        [key: string]: any;
    };
    // readonly logger: MainThreadRequestLogger;
}
export interface FrameworkResponse extends _Response {}
export type ErrorCallback = (error: Error) => void;
export interface Route {
    getFileName(): string;
    handle(req: FrameworkRequest, res: FrameworkResponse, next: NextFunction, error: ErrorCallback): Promise<any>;
}

export type RouteClass = { new (): Route };

export function makeFramework(
    req: _Request,
    res: _Response,
    next: NextFunction
): [FrameworkRequest, FrameworkResponse, NextFunction] {
    req.params["correlationID"] = crypto.randomUUID();
    const frameworkRequest: FrameworkRequest = <FrameworkRequest>req;
    const frameworkResponse: FrameworkResponse = <FrameworkResponse>res;
    return [frameworkRequest, frameworkResponse, next];
}
