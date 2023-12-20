import { NextFunction, Request as _Request, Response as _Response } from "express";
import * as crypto from "crypto";

// is a interface for the request
// this interface is used to add properties to the request
// it inherits from the express request interface
// it includes a correlationID which is used to track requests
export interface FrameworkRequest extends _Request {
    params: {
        readonly correlationID: string;
        [key: string]: any;
    };
    // readonly logger: MainThreadRequestLogger;
}

// is a interface for the response
// it inherits from the express response interface
export interface FrameworkResponse extends _Response {}

// is a interface for a ErrorCallback used to handle errors in routes and provide a uniform way of handling errors
export type ErrorCallback = (error: Error) => void;

// is a interface for a Route
export interface Route {
    getFileName(): string;
    handle(req: FrameworkRequest, res: FrameworkResponse, next: NextFunction, error: ErrorCallback): Promise<any>;
}

// is a type for a RouteClass nexesarry for beeing able to construct type from a class
export type RouteClass = { new (): Route };

// is a function for creating a framework request and framework response from a express request and express response
// it also adds a correlationID to the request
// it returns a tuple with the framework request, framework response and next function
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
