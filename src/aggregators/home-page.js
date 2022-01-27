

function createHandlers ({ queries }) {
    return {
        VideoViewed: event => queries.incrementVideosWatched(event.globalPosition),
    }
}


function createQueries({ db }) {

    function incrementVideosWatched(globalPosition) {
        const queryString = `
        UPDATE pages
        SET
          page_data = jsonb_set(
            jsonb_set(
              page_data,
              '{videosWatched}',
              ((page_data ->> 'videosWatched')::int + 1)::text::jsonb
            ),
            '{lastViewProcessed}',
            :globalPosition::text::jsonb) 
        WHERE
          page_name = 'home' AND
          (page_data->>'lastViewProcessed')::int < :globalPosition
        `;
    
        return db.then(client => client.raw(queryString, { globalPosition }));
        
    }

    return {
        incrementVideosWatched,
    }
}

function build ({ db, messageStore }) {
    const queries = createQueries({ db });
    const handlers = createHandlers({ queries });
    return {
        queries,
        handlers
    }
}

module.exports = build;