import {Route} from "../../Router";

export const GO_TO = 'GO_TO';

export function goTo(route: Route) {
    return {type: GO_TO, payload: {route}};
}
