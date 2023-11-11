import { app } from "../express/setup";
import { ROUTE_ROOT_PATH } from "./routes/routeroot";
import { RouteRegister } from "./routeregister";
import * as _get from "./routes/get";
import * as _categories_get from "./routes/categories/get";
import * as _categories_post from "./routes/categories/post";
import * as _categories_delete from "./routes/categories/delete";
import * as _mappingservices_get from "./routes/mappingservices/get";
export const routes = new RouteRegister(app, ROUTE_ROOT_PATH);

export function registerRoutes() {
    routes.register(_get);
    routes.register(_categories_get);
    routes.register(_categories_post);
    routes.register(_categories_delete);
    routes.register(_mappingservices_get);
}
