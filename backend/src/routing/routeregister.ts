import { ErrorCallback, makeFramework, RouteClass } from "./route";
import { Application, NextFunction, Request, Response } from "express";
import { getExpressRoute } from "./parse";

/**
 * is a class for registering routes
 * it is used to register routes in the express application
 */
export class RouteRegister {
    // is a object containing all routes by path and method
    /**
     * is a object containing all routes by path and method
     * @type {{[p: string]: {[p: string]: RouteClass}}}
     * @private
     */
    private readonly routes: { [path: string]: { [method: string]: RouteClass } } = {};

    /**
     * constructor for the RouteRegister class
     * @param app is the express application to register the routes in
     * @param routeRootPath is the root path for all routes
     */
    constructor(
        // is the express application to register the routes in
        private readonly app: Application,
        // is the root path for all routes
        private readonly routeRootPath: string
    ) {}

    // is a function for registering a route
    // it takes a module containing a route class which is exported as default
    /**
     * register a route
     * @param module is a module containing a route class which is exported as default
     */
    register(module: { default: RouteClass }) {
        // the route class is constructed and a instance is created
        const routeClass = module.default;
        // a instance of the route class is created
        const instance = new routeClass();
        // the route class is registered in the express application
        // this is done by using getExpressRoute to get the express path and method from the route class
        const [method, routeExpressPath] = getExpressRoute(this.routeRootPath, instance.getFileName());
        // check if the route already exists and throw an error if it does
        if (this.routes[routeExpressPath] && this.routes[routeExpressPath][method]) {
            throw new Error(`[route exists error] route ${method}|${routeExpressPath} already exists.`);
        }
        // if a route with the same path does not exist it is added to the routes object
        if (!this.routes[routeExpressPath]) {
            this.routes[routeExpressPath] = {};
        }
        // the route is added to the routes object by path and method
        this.routes[routeExpressPath][method] = routeClass;

        // the route is registered in the express application
        // @ts-ignore
        this.app[method](routeExpressPath, async (req: Request, res: Response, next: NextFunction) => {
            // the route is handled by creating a framework request and framework response
            const framework = makeFramework(req, res, next);
            // a instance of the route class is created
            let current = new routeClass();
            // when a error occurs the onError function is called
            // this invokes the default error handler in the express application
            const onError: ErrorCallback = (error) => {
                next(error);
            };
            // the route is handled by calling the handle function on the route class
            try {
                await current.handle(...framework, onError);
            } catch (error) {
                // if the error is not a instance of Error it is converted to a instance of Error
                if (!(error instanceof Error)) {
                    error = new Error(`[unknown error exception] error handler called with ${error}`);
                }
                onError(<Error>error);
            }
        });
    }

    /**
     * is a function for getting all routes
     */
    getRoutes() {
        return { ...this.routes };
    }
}
