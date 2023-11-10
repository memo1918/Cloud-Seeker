// express setup
import { setupDB } from "./db";
import { Units } from "./pricing/units";

// registerRoutes();
setupDB(process.env["DB_CONNECTION_STRING"]);
// startServer();
// loadInfracostDumpInDb().then(console.log)
// execQuery(getDistinctUnitsGroupedByServiceFamily).then((data) => {
//     // console.log(JSON.stringify(data));
//     fs.writeFileSync("units_bygroup.json",JSON.stringify(data));
//     console.log("done");
// });

let unitConverter = new Units();
unitConverter.loadAllUnits();

// let distinctByGroup: {
//     "_id": string,
//     "units": string[]
// }[] = JSON.parse(fs.readFileSync("units_bygroup.json").toString());
//
// let elements: string[] = distinctByGroup.flatMap(i => i.units);
// // console.log(elements);
//
// const regex = /(?:[0-9]+(?:\.[0-9]+)?)|\/|-|([A-Z][a-z]+)|(?:[A-Z]+(?![a-z]))|(?:[a-z]+[A-Z])|[a-z]+/g;
// let tokens = elements.map(i => {
//     let r = i.match(regex);
//     console.log(r);
// });