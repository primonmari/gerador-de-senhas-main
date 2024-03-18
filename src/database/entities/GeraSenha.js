import { EntitySchema } from "typeorm";

const GeraSenha = new EntitySchema({
    name: "GeraSenha",
    tableName: "senhas",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        password: {
            type: "varchar",
        },
    },

});

export default GeraSenha;