import path from "path";
import { ValidMethod, validMethods } from "./methods";

const NAME_REGEX = /^[a-z0-9_()]+$/gs;

const isParameter = (segment: string): boolean => {
    return segment.startsWith("[") && segment.endsWith("]");
};
const isRoute = (segment: string): boolean => {
    return segment.endsWith(".ts");
};
const extractParameterName = (segment: string): string => {
    segment = segment.substring(1, segment.length - 1);
    segment = segment.toLowerCase();

    if (segment.match(NAME_REGEX) == null) {
        throw new Error(
            `[invalid parameter name exception]: "${segment}" is not a valid name. Name must match ${NAME_REGEX}`
        );
    }
    return segment;
};
const extractName = (segment: string): string => {
    const name = segment.toLowerCase();
    if (name.match(NAME_REGEX) == null) {
        throw new Error(`[invalid pathname exception]: "${name}" is not a valid name. Name must match ${NAME_REGEX}`);
    }
    return segment;
};
const extractMethod = (segment: string) => {
    const method = <ValidMethod>segment.replace(".ts", "").toLowerCase();
    if (validMethods.indexOf(method) == -1) {
        throw new Error(
            `[invalid method exception]: ${method} is not a valid method for express. (https://expressjs.com/en/4x/api.html#routing-methods)`
        );
    }
    return method;
};

export function getExpressRoute(rootPath: string, routePath: string): [ValidMethod, string] {
    if (rootPath.includes("/")) {
        // linux style path
    } else {
        // win style path
    }

    const relativeRoutePath = path.relative(rootPath, routePath).toLowerCase();
    const relativeRoutePathSegments = relativeRoutePath.split(path.sep);

    let httpMethodIndicatorSegment: string = "";
    let route = "";

    for (const relativeRoutePathSegment of relativeRoutePathSegments) {
        if (isRoute(relativeRoutePathSegment)) {
            httpMethodIndicatorSegment = relativeRoutePathSegment;
            break;
        }
        if (isParameter(relativeRoutePathSegment)) {
            route += `/:${extractParameterName(relativeRoutePathSegment)}`;
        } else {
            route += `/${extractName(relativeRoutePathSegment)}`;
        }
    }
    if (route.length == 0) {
        route = "/";
    }

    let method = extractMethod(httpMethodIndicatorSegment);

    return [method, route];
}
