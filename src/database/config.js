import * as SQLite from "expo-sqlite";
import GeraSenha from "./entities/GeraSenha";

const config = {
    database: "mydatabase",
    driver: SQLite,
    entities: [GeraSenha],
    synchronize: true,
    type: "expo"
};

export default config;
