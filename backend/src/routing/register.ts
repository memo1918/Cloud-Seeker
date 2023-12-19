import { app } from "../express/setup";
import { ROUTE_ROOT_PATH } from "./routes/routeroot";
import { RouteRegister } from "./routeregister";
import * as _get from "./routes/get";
import * as _categories_get from "./routes/categories/get";
import * as _mappingservices_get from "./routes/mappingservices/get";
import * as _instancecomparisons_get from "./routes/categories/instancecomparisons/get";
import * as _instancecomparisons_post from "./routes/categories/instancecomparisons/post";
// contains all routes
// this is used by the framework to register all routes
export const routes = new RouteRegister(app, ROUTE_ROOT_PATH);

// register all routes
export function registerRoutes() {
    // GET /api
    routes.register(_get);
    // GET /api/categories
    routes.register(_categories_get);
    // GET /api/mappingservices
    routes.register(_mappingservices_get);
    // GET /api/categories/instancecomparisons
    routes.register(_instancecomparisons_get);
    // POST /api/categories/instancecomparisons
    routes.register(_instancecomparisons_post);
}
