const service = require('./reservations.service')

// list out all reservations in the system
async function list(req, res) {
  const data = await service.list()
  res.json({ data })
}

async function create(req, res) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data })
}

module.exports = {
  list,
  create
};
