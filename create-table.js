import { sql } from './db.js';

sql`
    CREATE TABLE videos (
        id          TEXT,
        title       TEXT,
        description TEXT,
        duration    INTEGER
    );
`.then(() => {
    console.log("Tabela criada!");
}).catch(() => {
    console.log("Erro ao criar tabela!");
});