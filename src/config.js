const createKnexClient = require('./knex-client');
const createHomeApp = require('./app/home');
const createPostgresClient = require('./postgres-client');

// support for dependency injection
function createConfig({ env }) {
    const db = createKnexClient({
        connectionString: env.databaseUrl
    });
    const postgresClient = createPostgresClient({
        connectionString: env.messageStoreConnectionString
    });
    const homeApp = createHomeApp({ db });
    return {
        env,
        db,
        homeApp
    }
}

module.exports = createConfig;