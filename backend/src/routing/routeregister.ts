import { ErrorCallback, makeFramework, RouteClass } from "./route";
import { Application, NextFunction, Request, Response, json } from "express";
import { getExpressRoute } from "./parse";

export class RouteRegister {
    private readonly routes: { [path: string]: { [method: string]: RouteClass } } = {};

    constructor(
        private readonly app: Application,
        private readonly routeRootPath: string
    ) {}

    register(module: { default: RouteClass }) {
        const routeClass = module.default;
        const instance = new routeClass();
        const [method, routeExpressPath] = getExpressRoute(this.routeRootPath, instance.getFileName());
        if (this.routes[routeExpressPath] && this.routes[routeExpressPath][method]) {
            throw new Error(`[route exists error] route ${method}|${routeExpressPath} already exists.`);
        }
        if (!this.routes[routeExpressPath]) {
            this.routes[routeExpressPath] = {};
        }
        this.routes[routeExpressPath][method] = routeClass;

        // @ts-ignore
        this.app[method](routeExpressPath,json(), async (req: Request, res: Response, next: NextFunction) => {
            const framework = makeFramework(req, res, next);
            let current = new routeClass();
            const onError: ErrorCallback = (error) => {
                next(error);
            };
            try {
                await current.handle(...framework, onError);
            } catch (error) {
                if (!(error instanceof Error)) {
                    error = new Error(`[unknown error exception] error handler called with ${error}`);
                }
                onError(<Error>error);
            }
        });
    }

    getRoutes() {
        return { ...this.routes };
    }
}
