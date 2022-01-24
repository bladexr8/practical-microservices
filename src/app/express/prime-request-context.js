const uuid = require('uuid/v4');

// set up values required for every request

function primeRequestContext(req, res, next) {
    req.context = {
        traceId: uuid()
    }
    next();
}

module.exports = primeRequestContext;