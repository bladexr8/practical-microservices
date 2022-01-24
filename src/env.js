// set up application environment from a central point

const colors = require('colors/safe');
const dotenv = require('dotenv');

const packageJson = require('../package.json');

// set up dotenv Environment variables
const envFromRealEnvironment = process.env.NODE_ENV || 'development';
const path = `.env.${envFromRealEnvironment}`;
const envResult = dotenv.config({ path });

if (envResult.error) {
    console.error(`${colors.red('[ERROR] env failed to load:')} ${envResult.error}`);
    process.exit(1);
}

// get an environment variable
function requireFromEnv(key) {
    if (!process.env[key]) {
        console.error(`${colors.red('[APP ERROR] Missing env variable:')} ${key}`);
        return process.exit(1);
    }
    return process.env[key];
}


module.exports = {
    appName: requireFromEnv('APP_NAME'),
    databaseUrl: requireFromEnv('DATABASE_URL'),
    env: requireFromEnv('NODE_ENV'),
    port: parseInt(requireFromEnv('PORT'), 10),
    version: packageJson.version
}