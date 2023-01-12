const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();
const configEnv = require('../config/configEnv');



console.log("================ INIT PARAMS DB ===============");
console.log(`USER ${configEnv.USER_DB}`);
console.log(`HOST ${configEnv.HOST_DB}`);
console.log(`DATABASE_NAME ${configEnv.DATABASE_NAME}`);
console.log(`PASSWORD_DB ${configEnv.PASSWORD_DB}`);
console.log(`PORT_DB ${configEnv.PORT_DB}`);

const pool = new Pool({
    user: configEnv.USER_DB,
    host: configEnv.HOST_DB,
    database: configEnv.DATABASE_NAME,
    password: configEnv.PASSWORD_DB,
    port: configEnv.PORT_DB,
    max: 5,
    ssl: { rejectUnauthorized: false }
});


(async function() {
    console.log("====== TESTING DB =========");
    try {
        pool.connect((err, client, release) => {
            if (err) {
                console.log("ERROR al conectar a la db " + err);
                return;
            }
            console.log(" === OK ===");
            client.query('show timezone', (err, result) => {
                release();
                if (err) {
                    return console.error('Error executing query', err.stack);
                }
                console.log(result.rows);
            });
        });

        pool.connect((err, client, release) => {
            if (err) {
                console.log("ERROR al conectar a la db " + err);
                return;
            }
            console.log(" === hora ===");
            client.query('SELECT current_timestamp,current_date,current_time,now()', (err, result) => {
                release();
                if (err) {
                    return console.error('Error executing query', err.stack);
                }
                console.log(result.rows);
            });
        });

    } catch (e) {
        console.log(e);
    }
})();

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: configEnv.HOST_DB,
        port: configEnv.PORT_DB,
        user: configEnv.USER_DB,
        password: configEnv.PASSWORD_DB,
        database: configEnv.DATABASE_NAME,
    },
    pool: { min: 0, max: 4 }
});


module.exports = {
    pool,
    knex
};