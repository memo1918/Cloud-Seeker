import { ErrorCallback, FrameworkRequest, FrameworkResponse, Route } from "../../route";
import { NextFunction } from "express";
import { getAllOrders,addOrder,deleteOrder, IOrders } from "../../../db/models/orders";
import { getAllpizzas,IPizzas } from "../../../db/models/pizzas";
import { execQuery } from "../../../db";


export default class Root implements Route {
    getFileName(): string {
        return __filename;
    }

    async handle(
        req: FrameworkRequest,
        res: FrameworkResponse,
        next: NextFunction,
        error: ErrorCallback
    ): Promise<any> {
        // data validation
        // execute sm fn in business lay
        let body: { order: { name: string }[] } = req.body;

        let pizzas = await execQuery<IPizzas[]>(getAllpizzas);
        let pizzamenu = pizzas[0].PizzaMenu;

        //calc;


        const order = await execQuery(async (client) => {
            await addOrder(client, body.order); //here adding to db
            return await getAllOrders(client);
        });


        res.contentType("application/json")
            .json({
                data: {

                }
            })
            .end();

        return Promise.resolve(undefined);
    }
}
