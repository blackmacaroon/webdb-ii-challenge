const router = require("express").Router();
const db = require("./zoos-model.js");

router.get("/", (req, res) => {
  db.find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: "could not get zoos from database" });
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  db.add(req.body)
    .then(zoo => {
      res.status(201).json({ message: "success" });
      // 201 CREATED
    })
    .catch(err => {
      res.status(500).json({ error: "could not post new zoo to database" });
    });
});

router.get("/:id", validateId, (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(zoo => {
      res.status(200).json(zoo);
      // 201 CREATED
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Couldn't get that zoo.." });
    });
});

router.put("/:id", validateId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} records updated` });
      } else {
        res.status(404).json({ message: "zoo not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", validateId, (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(count => {
      if (count > 0) {
        const unit = count > 1 ? "records" : "record";
        res.status(200).json({ message: `${count} ${unit} deleted` });
      } else {
        res.status(404).json({ message: "zoo not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//middleware
function validateId(req, res, next) {
  const id = req.params.id;
  db.findById(id)
    .then(id => {
      if (id) {
        req.id = id;
        next();
      } else {
        res.status(404).json({ err: "that ID does not currently exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;
