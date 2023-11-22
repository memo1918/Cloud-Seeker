import { app } from "../express/setup";
import { ROUTE_ROOT_PATH } from "./routes/routeroot";
import { RouteRegister } from "./routeregister";
import * as _get from "./routes/get";
import * as _categories_get from "./routes/categories/get";
import * as _mappingservices_get from "./routes/mappingservices/get";
import * as _instancecomparisons_get from "./routes/categories/instancecomparisons/get";

export const routes = new RouteRegister(app, ROUTE_ROOT_PATH);

export function registerRoutes() {
    routes.register(_get);
    routes.register(_categories_get);
    routes.register(_mappingservices_get);
    routes.register(_instancecomparisons_get);
}
