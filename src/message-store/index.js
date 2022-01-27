const createWrite = require('./write');

function createMessageStore({ db }) {
    console.log('***Creating Message Store...');
    const write = createWrite({ db });
    return {
        write: write,
    }
}

module.exports = createMessageStore;