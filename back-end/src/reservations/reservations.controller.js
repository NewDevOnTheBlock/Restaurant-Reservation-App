const service = require("./reservations.service");
const reservationService = require("../reservations/reservations.service")
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validation middleware

//validate reservation existence
async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation '${reservation_id}' does not exist.`,
  });
}

// validate people count is a number
function validatePeople(req, res, next) {
  const { data = {} } = req.body;

  if (!data.people || Number.isNaN(data.people))
    return next({ 
      status: 400, 
      message: `Invalid: people must be an integer greater than zero` 
    });
  next();
}

// validate time is a time
async function validateTime(req, res, next) {
  const { data = {} } = req.body;
  const time = data.reservation_time
  if (!time.match(/^\d{1,2}:\d{2}([ap]m)?$/)) {
    next({
      status: 400,
      message: "reservation_time must be a valid time format"
    })
  }
  if (time < "10:30" || time > "21:30") (
    next({
      status: 400,
      message: "reservation_time must be within business hours"
    })
  )
  next()
}

// validate date is a date
async function validateDate(req, res, next) {
  const { data = {} } = req.body;
  const date = new Date(data.reservation_date)
  const day = date.getUTCDay()

  if (!Date.parse(date)) {
    next({
      status: 400,
      message: "reservation_date must be a valid date format!"
    })
  }
  if (day === 2) {
    return next({
      status: 400,
      message: `Restaurant closed on Tuesday, please choose a different day of the week.`
    })
  }
  if (date < new Date()) {
    return next({
      status: 400,
      message: `Reservation must be a future date.`
    })
  }
  next()
}

// list out all reservations in the system
async function list(req, res) {
  const queryDate = req.query.date;
  const data = await service.list();
  const newData = data.filter(
      ({ reservation_date: date }) => JSON.stringify(date).slice(1, 11) == queryDate
    );

  newData.sort((a, b) => {
    let c = a.reservation_time
    let d = b.reservation_time
    if (c > d) {
      return 1
    } else if (c === d) {
      return 0
    } else {
      return -1
    }
  })

  res.json({ data: newData });
}

// read a single reservation in the system
async function read(req, res) {
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

// adds a new reservation to the system
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

// exported functions
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasProperties("first_name")),
    asyncErrorBoundary(hasProperties("last_name")),
    asyncErrorBoundary(hasProperties("mobile_number")),
    asyncErrorBoundary(hasProperties("reservation_date")),
    asyncErrorBoundary(hasProperties("reservation_time")),
    asyncErrorBoundary(hasProperties("people")),
    asyncErrorBoundary(validatePeople),
    asyncErrorBoundary(validateDate),
    asyncErrorBoundary(validateTime),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
};
