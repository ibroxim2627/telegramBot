const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bot',
    password: '2627',
    port: 5432,
});

module.exports = pool;
