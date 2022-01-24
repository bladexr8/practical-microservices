/***
 * Excerpted from "Practical Microservices",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/egmicro for more book information.
***/
const Bluebird = require('bluebird')
const pg = require('pg')

function createDatabase ({ connectionString }) {
  const pool = new pg.Pool({ connectionString, Promise: Bluebird }) // (1)

  function query (sql, values = []) { // (2)
    return pool.query(sql, values)
  }

  return { // (3)
    query,
    stop: () => pool.end()
  }
}

module.exports = createDatabase
