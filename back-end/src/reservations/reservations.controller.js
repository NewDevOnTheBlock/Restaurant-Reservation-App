const service = require('./reservations.service')
const hasProperties = require('../errors/hasProperties')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')


// validation middleware
async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation '${reservationId}' does not exist.`
})
}

// list out all reservations in the system
async function list(req, res) {
  const data = await service.list()
  res.json({ data })
}

// read a single reservation in the system
async function read(req, res) {
  const { reservation } = res.locals
  res.json({ data: reservation })
}

// adds a new reservation to the system
async function create(req, res) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data })
}

// exported functions
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasProperties("first_name"),
    hasProperties("last_name"),
    hasProperties("mobile_number"),
    hasProperties("reservation_date"),
    hasProperties("reservation_time"),
    hasProperties("people"),
    asyncErrorBoundary(create)
  ],
  read: [
    asyncErrorBoundary(reservationExists), 
    read
  ],
};
