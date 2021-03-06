/***
 * Excerpted from "Practical Microservices",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/egmicro for more book information.
***/
const camelCaseKeys = require('camelcase-keys') 
const express = require('express')

function createHandlers ({ queries }) { 
  function home (req, res, next) {
    return queries
      .loadHomePage()
      .then(viewData =>
        res.render('home/templates/home', viewData)
      )
      .catch(next)
  }

  return {
    home
  }
}

function createQueries ({ db }) { 
  function loadHomePage () {
    console.log(`***Executing loadHomePage...`);
    //console.log(db); 
    /*return db.then(client =>
      client('videos')
        .sum('view_count as videosWatched')
        .then(rows => rows[0])
    )*/
    return db('videos').count('view_count as videosWatched');
  }

  return {
    loadHomePage
  }
}

function createHome ({ db }) {
  console.log('***createHome -> db');
  //console.log(db.context);
  console.log(`***Creating Queries...`); 
  const queries = createQueries({ db })
  const handlers = createHandlers({ queries })

  const router = express.Router()

  router.route('/').get(handlers.home) 

  return { handlers, queries, router }
}

module.exports = createHome 
