const db = require('./db/helpers.js');

const controller = {
  get: (req, res) => {
    db.get((err, results) => {
      err ? res.status(400).send(err) : res.status(200).json(results)
    })
  },
  getTypes: (req, res) => {
    db.getTypes((err, results) => {
      err ? res.status(400).send(err) : res.status(200).json(results)
    })
  },
  rename: (req, res) => {
    db.rename(req.params.id, req.body.name, (err) => {
      err ? res.status(400).send(err) : res.status(200).send('updated')
    })
  },
  delete: (req, res) => {
    db.delete(req.params.id, (err) => {
      err ? res.status(400).send(err) : res.status(200).send('deleted')
    })
  },
  post: (req, res) => {
    db.post(req.body, (err) => {
      err ? res.status(400).send(err) : res.status(200).send('posted')
    })
  }

}

module.exports = controller