const router = require("express").Router();
const db = require("./bears-model.js");

router.get("/", (req, res) => {
  db.find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ error: "could not get bears from database" });
    });
});

router.post("/", (req, res) => {
  // console.log(req.body)
  db.add(req.body)
    .then(bear => {
      res.status(201).json({ message: "success" });
      // 201 CREATED
    })
    .catch(err => {
      res.status(500).json({ error: "could not post new bear to database" });
    });
});

router.get("/:id", validateId, (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Couldn't get that bear.." });
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
        res.status(404).json({ message: "bear not found" });
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
        res.status(404).json({ message: "bear not found" });
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
