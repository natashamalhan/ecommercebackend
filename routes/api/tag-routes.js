const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
Tag.findAll(
  {
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  }
)
.then(dbTagData => res.json(dbTagData))
.catch(err => {
  console.log(err);
  res.status(500).json(err)
}
);
});

router.get('/:id', (req, res) => {
// find one category by its `id` value
// be sure to include its associated Products
Tag.findOne(
  {
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  }
)
.then(dbTagData => {
  if (!dbTagData) {
    res.status(404).json({ message: 'No category found with this id'});
    return;
  }
  res.json(dbTagData);
}
)
.catch(err => {
  console.log(err);
  res.status(500).json(err)
}
);

});

router.post('/', (req, res) => {
// create a new category
Tag.create(
  {
    category_name: req.body.category_name
  }
)
.then(dbTagData => res.json(dbTagData))
.catch(err => {
  console.log(err);
  res.status(500).json(err)
}
);
});

router.put('/:id', (req, res) => {
// update a category by its `id` value
Tag.update(
  {
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    },
  }
)
.then(dbTagData => {
  if (!dbTagData) {
    res.status(404).json({ message: 'No category found with this id'});
    return;
  }
  res.json(dbTagData);
}
)
.catch(err => {
  console.log(err);
  res.status(500).json(err)
}
);
});

router.delete('/:id', (req, res) => {
// delete a category by its `id` value
Tag.destroy(
  {
    where: {
      id: req.params.id
    },
  }
)
.then(dbTagData => {
  if (!dbTagData) {
    res.status(404).json({ message: 'No category found with this id'});
    return;
  }
  res.json(dbTagData);
}
)
.catch(err => {
  console.log(err);
  res.status(500).json(err)
}
);
});
module.exports = router;
