import { Country } from "../entities/Country";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    entities: [Country],
});
