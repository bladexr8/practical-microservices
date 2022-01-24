const Bluebird = require('bluebird');
const knex = require('knex');

function createKnexClient({ connectionString, migrationsTableName}) {
    //console.log(`Connection String = ${connectionString}, Migrations Table = ${migrationsTableName}`);
    const mTableName = migrationsTableName || 'knex_migrations';
    const client = knex({
        client: 'pg',
        connection: connectionString,
        migrations: {
            tableName: mTableName
        }
    });

    console.log(`Connection String = ${connectionString}, Migrations Table = ${mTableName}`);
    console.log('***knex-client -> client');
    console.log(client.context);

    return client;

    /*const migrationOptions = {
        tableName: migrationsTableName || 'knex_migrations'
    }

    console.log(`Connection String = ${connectionString}, Migrations Table = ${migrationOptions.tableName}`);
    console.log(client);

    // Wrap in Bluebird.resolve to guarantee a Bluebird Promise down the chain
    return Bluebird.resolve(client.migrate.latest(migrationOptions))
        .then(() => client)*/
}

module.exports = createKnexClient;