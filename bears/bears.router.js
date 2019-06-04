const router = require('express').Router();
const Bears = require('./bears-model.js');

router.get('/', (req, res) => {
      Bears.find()
      .then(bears => {
            res.status(200).json(zoos)
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get bears from database'});
      })
});

router.post('/', (req, res) => { 
      console.log(req.body)
      Bears.add(req.body)
      .then(bear => {
            res.status(201).json({message: "success"});
            // 201 CREATED
      })
      .catch(err => {
            res.status(500).json({ error: 'could not post new bear to database'});
      })
});

router.get('/:id',  (req, res) => {
      const id = req.params.id;
      
      Bears.findById(id)
      .then(bear => {
            res.status(200).json(bear);
            // 201 CREATED
      })
      .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Couldn't get that bear.." });
      })
});

router.put('/:id', (req, res) => {
      const id = req.params.id;
      const { name } = req.body;
      if (!name) { 
            res.status(400).json({ message: 'name is a required field'}) 
      } else { 
            Bears.update(id, req.body)
            .then(count => {
                  if(count > 0) {
                        res.status(200).json({message: `${count} records updated`})
                  } else {
                        res.status(404).json({ message: 'bear not found'})
                  }
            })
            .catch(err => {
                  res.status(500).json(err)
            })
      }
});


router.delete('/:id', (req, res) => {
      const id = req.params.id;
      Bears.remove(id)
      .then(count => {
        if(count > 0) {
          const unit = count > 1 ? 'records' : 'record';
          res.status(200).json({message: `${count} ${unit} deleted`})
        } else {
          res.status(404).json({ message: 'bear not found'})
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
    });




module.exports = router;