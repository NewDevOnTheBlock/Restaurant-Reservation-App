const service = require("./tables.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validation middleware
// verify table exists
async function tableExists(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id)
    if (table) {
        res.locals.table = table
        return next()
    }
    next({
        status: 404,
        message: `could not find table with an id of ${table_id}`
    })
}


// validate table_name length
function validateNameLength(req, res, next) {
    const { data = {} } = req.body
    if (data.table_name.length < 2) {
        next({
            status: 400,
            message: "table_name must be at least 2 characters long"
        })
    }
    next();
}
// validate capacity is integer
function validateCapacity(req, res, next) {
    const { data = {} } = req.body
    // console.log(data.capacity)
    if (!data.capacity || typeof data.capacity !== "number" || data.capacity < 1) {
        next({
            status: 400,
            message: "capacity must be a number with a positive value"
        })
    }
    next()
}

// list all tables
async function list(req, res) {
    const data = await service.list()
    data.sort((a, b) => {
        if (a.table_name > b.table_name) {
            return 1
        } else if (a.table_name === b.table_name) {
            return 0
        } else {
            return -1
        }
    })
    res.json({ data })
}

// create a new table
async function create(req, res) {
    const data = await service.create(req.body.data)
    res.status(201).json({ data })
}

async function read(req, res) {
    res.json({ data: res.locals.table })
}

async function update(req, res) {
    const updatedInfo = {
        ...req.body.data,
        column_id: res.locals.table.table_id
    }
    const data = await service.update(updatedInfo)
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        asyncErrorBoundary(hasProperties("table_name")),
        asyncErrorBoundary(hasProperties("capacity")),
        asyncErrorBoundary(validateNameLength),
        asyncErrorBoundary(validateCapacity),
        asyncErrorBoundary(create)
    ],
    read: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(read)
    ],
    update: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(hasProperties("table_name")),
        asyncErrorBoundary(hasProperties("capacity")),
        asyncErrorBoundary(update)
    ]
}