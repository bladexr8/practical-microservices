const createKnexClient = require('./knex-client');
const createHomeApp = require('./app/home');
const createPostgresClient = require('./postgres-client');
const createMessageStore = require('./message-store');

const createRecordViewingsApp = require('./app/record-viewings');

// support for dependency injection
function createConfig({ env }) {
    const db = createKnexClient({
        connectionString: env.databaseUrl
    });
    const postgresClient = createPostgresClient({
        connectionString: env.messageStoreConnectionString
    });
    const messageStore = createMessageStore({ db: postgresClient });
    const homeApp = createHomeApp({ db: knexClient });
    const recordViewingsApp = createRecordViewingsApp({ messageStore });
    return {
        env,
        db,
        messageStore,
        homeApp,
        recordViewingsApp,
    }
}

module.exports = createConfig;