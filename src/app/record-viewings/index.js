const express = require('express');
const uuid = require('uuid');

function createActions({
    messageStore
}) {
    function recordViewing(traceId, videoId, userId) {
        return new Promise((resolve, reject) => {
            console.log(`Recording Viewing... TraceId = ${traceId}, VideoId = ${videoId}`);

            const viewedEvent = {
                id: uuid(),
                type: 'VideoViewed',
                metadata: {
                    traceId,
                    userId
                },
                data: {
                    userId,
                    videoId
                }
            }

            const streamName = `viewing-${videoId}`;

            //return messageStore.write(streamName, viewedEvent)

            resolve(messageStore.write(streamName, viewedEvent));
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
    messageStore
}) {
    const actions = createActions({ });
    const handlers = createHandlers({ actions });

    const router = express.Router();
    router.route('/:videoId').post(handlers.handleRecordViewing)

    return { actions, handlers, router }

}

module.exports = createRecordViewings;





