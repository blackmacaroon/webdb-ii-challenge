const router = require('express').Router();
const Zoos = require('./zoos-model.js');

router.get('/', (req, res) => {
      Zoos.find()
      .then(zoos => {
            res.status(200).json(zoos)
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get zoos from database'});
      })
});

router.post('/', (req, res) => { 
      console.log(req.body)
      Zoos.add(req.body)
      .then(account => {
            res.status(201).json({message: "success"});
            // 201 CREATED
      })
      .catch(err => {
            res.status(500).json({ error: 'could not post new zoo to database'});
      })
});

router.get('/:id',  (req, res) => {
      const id = req.params.id;
      
      Zoos.findById(id)
      .then(account => {
            res.status(200).json(account);
            // 201 CREATED
      })
      .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Couldn't get that zoo.." });
      })
});

router.put('/:id', (req, res) => {
      const id = req.params.id;
      const { name } = req.body;
      if (!name) { 
            res.status(400).json({ message: 'name is a required field'}) 
      } else { 
            Zoos.update(id, req.body)
            .then(count => {
                  if(count > 0) {
                        res.status(200).json({message: `${count} records updated`})
                  } else {
                        res.status(404).json({ message: 'role not found'})
                  }
            })
            .catch(err => {
                  res.status(500).json(err)
            })
      }
});


router.delete('/:id', (req, res) => {
      Zoos.remove(id)
      .then(count => {
        if(count > 0) {
          const unit = count > 1 ? 'records' : 'record';
          res.status(200).json({message: `${count} ${unit} deleted`})
        } else {
          res.status(404).json({ message: 'role not found'})
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
    });




module.exports = router;