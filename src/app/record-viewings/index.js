const express = require('express');

function createActions({
    db
}) {
    function recordViewing(traceId, videoId) {
        return new Promise((resolve, reject) => {
            console.log(`Recording Viewing... TraceId = ${traceId}, VideoId = ${videoId}`);
            resolve();
        })
    }
    return {
        recordViewing
    }
}


function createHandlers({ actions }) {
    function handleRecordViewing(req, res) {
        console.log(`Handling Viewing... TraceId = ${req.context.traceId}, VideoId = ${req.params.videoId}`);
        return actions
            .recordViewing(req.context.traceId, req.params.videoId)
            .then(() => res.redirect('/'));
    }
    return {
        handleRecordViewing
    }
}


function createRecordViewings({

}) {
    const actions = createActions({ });
    const handlers = createHandlers({ actions });

    const router = express.Router();
    router.route('/:videoId').post(handlers.handleRecordViewing)

    return { actions, handlers, router }

}

module.exports = createRecordViewings;





