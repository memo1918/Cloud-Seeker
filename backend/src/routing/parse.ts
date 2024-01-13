import path from "path";
import { ValidMethod, validMethods } from "./methods";

/**
 * regex for validating names
 */
const NAME_REGEX = /^[a-z0-9_()]+$/gs;

/**
 * check if a segment is a parameter
 * @param segment the segment to check
 * @returns {boolean} true if the segment is a parameter, false otherwise
 */
const isParameter = (segment: string): boolean => {
    // a parameter is a segment that starts with [ and ends with ] like [name]
    return segment.startsWith("[") && segment.endsWith("]");
};

/**
 * check if a segment is a route
 * @param segment the segment to check
 * @returns {boolean} true if the segment is a route, false otherwise
 */
const isRoute = (segment: string): boolean => {
    return segment.endsWith(".ts");
};

/**
 * extract the name of a parameter by removing the [ and ] and converting it to lowercase
 * @param segment the segment to extract the name from
 * @returns {string} the name of the parameter
 */
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
/**
 * extract the name of a segment by converting it to lowercase
 * @param segment the segment to extract the name from
 * @returns {string} the name of the segment
 */
const extractName = (segment: string): string => {
    const name = segment.toLowerCase();
    if (name.match(NAME_REGEX) == null) {
        throw new Error(`[invalid pathname exception]: "${name}" is not a valid name. Name must match ${NAME_REGEX}`);
    }
    return segment;
};
/**
 * extract the method from a segment by removing the .ts and converting it to lowercase
 * @param segment the segment to extract the method from
 * @returns {ValidMethod} the method of the segment
 */
const extractMethod = (segment: string): ValidMethod => {
    const method = <ValidMethod>segment.replace(".ts", "").toLowerCase();
    if (validMethods.indexOf(method) == -1) {
        throw new Error(
            `[invalid method exception]: ${method} is not a valid method for express. (https://expressjs.com/en/4x/api.html#routing-methods)`
        );
    }
    return method;
};

/**
 * get the express route from a route path
 * @param rootPath the root path of the routes
 * @param routePath the route path
 * @returns {[ValidMethod, string]} the method and the route as they are used by express
 */
export function getExpressRoute(rootPath: string, routePath: string): [ValidMethod, string] {
    // get the relative route path
    const relativeRoutePath = path.relative(rootPath, routePath).toLowerCase();
    // split the relative route path into segments by using the platform specific path separator
    // path.sep is \ on windows and / on linux
    const relativeRoutePathSegments = relativeRoutePath.split(path.sep);

    // the http method indicator segment is the segment that contains the http method
    let httpMethodIndicatorSegment: string = "";
    // the route is the path that is used for express
    let route = "";
    // iterate over all segments
    // if a segment is a parameter, add it to the route as a parameter (express uses /:name for parameters)
    // if a segment is a route, add it to the route as a route (express uses /name for routes)
    for (const relativeRoutePathSegment of relativeRoutePathSegments) {
        // if the segment is a route, the http method indicator segment is the segment before the route
        if (isRoute(relativeRoutePathSegment)) {
            httpMethodIndicatorSegment = relativeRoutePathSegment;
            break;
        }
        // if the segment is a parameter, add it to the route as a parameter
        if (isParameter(relativeRoutePathSegment)) {
            route += `/:${extractParameterName(relativeRoutePathSegment)}`;
        } else {
            route += `/${extractName(relativeRoutePathSegment)}`;
        }
    }
    // if the route is empty, set it to /
    if (route.length == 0) {
        route = "/";
    }
    // extract the method from the http method indicator segment
    let method = extractMethod(httpMethodIndicatorSegment);
    // return the method and the route as thy are used by express
    return [method, route];
}
