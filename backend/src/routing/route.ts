import { NextFunction, Request as _Request, Response as _Response } from "express";
import * as crypto from "crypto";

// is a interface for the request
// this interface is used to add properties to the request
// it inherits from the express request interface
// it includes a correlationID which is used to track requests
/**
 * interface for the request
 * this interface is used to add properties to the request
 * it inherits from the express request interface
 * it includes a correlationID which is used to track requests
 * @interface FrameworkRequest
 * @extends {_Request}
 */
export interface FrameworkRequest extends _Request {
    params: {
        /**
         * the correlationID of the request
         */
        readonly correlationID: string;
        /**
         * other params
         */
        [key: string]: any;
    };
}

/**
 * interface for the response
 * it inherits from the express response interface
 * @interface FrameworkResponse
 * @extends {_Response}
 */
export interface FrameworkResponse extends _Response {}

/**
 * interface for a ErrorCallback used to handle errors in routes and provide a uniform way of handling errors
 */
export type ErrorCallback = (error: Error) => void;

/**
 * interface for a route
 */
export interface Route {
    /**
     * the name of the route
     */
    getFileName(): string;

    /**
     * handle the client request
     * @param req the request
     * @param res the response
     * @param next the next function
     * @param error the error callback
     * @returns {Promise<any>} a promise that resolves when the request is handled
     */
    handle(req: FrameworkRequest, res: FrameworkResponse, next: NextFunction, error: ErrorCallback): Promise<any>;
}

/**
 * type for a RouteClass nexesarry for beeing able to construct type from a class
 */
export type RouteClass = { new (): Route };

// is a function for creating a framework request and framework response from a express request and express response
// it also adds a correlationID to the request
// it returns a tuple with the framework request, framework response and next function
/**
 * creates a framework request and framework response from a express request and express response
 * it also adds a correlationID to the request
 * it returns a tuple with the framework request, framework response and next function
 * @param req the express request
 * @param res the express response
 * @param next the next function
 * @returns {[FrameworkRequest, FrameworkResponse, NextFunction]} a tuple with the framework request, framework response and next function
 */
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
