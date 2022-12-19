const knex = require("../db/connection")
// list all tables
function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name")
}
// read a specific table
function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id: table_id })
        .first()
}
// create a new table
function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then(createdRecords => createdRecords[0])
}

function seatTable(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*")
        .then(updatedRecords => updatedRecords[0])
}

function finishTable(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*")
        .then(updatedRecords => updatedRecords[0])
}

module.exports = {
    list,
    create,
    read,
    seatTable,
    finishTable
}