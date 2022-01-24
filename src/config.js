// support for dependency injection
function createConfig({ env }) {
    return {
        env,
    }
}

module.exports = createConfig;