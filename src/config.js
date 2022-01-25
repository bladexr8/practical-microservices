const createKnexClient = require('./knex-client');
const createHomeApp = require('./app/home');
const createPostgresClient = require('./postgres-client');

const createRecordViewingsApp = require('./app/record-viewings');

// support for dependency injection
function createConfig({ env }) {
    const db = createKnexClient({
        connectionString: env.databaseUrl
    });
    const postgresClient = createPostgresClient({
        connectionString: env.messageStoreConnectionString
    });
    const homeApp = createHomeApp({ db });
    const recordViewingsApp = createRecordViewingsApp({ db });
    return {
        env,
        db,
        homeApp,
        recordViewingsApp,
    }
}

module.exports = createConfig;