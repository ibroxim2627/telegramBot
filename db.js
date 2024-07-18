const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '198.199.72.220',
    database: 'bot',
    password: 'Pn6ZNRZMDQRZadCN',
    port: 5432,
});

module.exports = pool;
