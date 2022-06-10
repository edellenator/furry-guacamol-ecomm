const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tagData = await Tag.findAll({
    attributes: ['id', 'tag_name'],
    // be sure to include its associated Product data
    include: [
      {
        model: ProductTag,
        attributes: ['id', 'product_id', 'tag_id']
      },
      {
        model: Product,
        attributes: [
          'id', 
          'product_name', 
          'price', 
          'stock', 
          'category_id'
        ]
      }
    ]
  });
  res.json(tagData)
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const tagData = await Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    // be sure to include its associated Product data
    include: [
      {
        model: ProductTag,
        attributes: ['id', 'product_id', 'tag_id']
      },
      {
        model: Product,
        attributes: [
          'id', 
          'product_name', 
          'price', 
          'stock', 
          'category_id'
        ]
      }
    ]
  });
  if (!tagData) {
    res.status(404).json({message: 'No Tag with this ID found'});
    return;
  }
  res.json(tagData)
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', async (req, res) => {
  // create a new tag
  const tagData = await Tag.create({
    tag_name: req.body.tag_name
  })
  res.json(tagData)
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.include
      }
    }
  )
  if (!tagData) {
    res.status(404).json({message: 'No Tag with this ID found'});
    return;
  }
  res.json(tagData)
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  if(!tagData) {
    res.status(404).json({message: 'No Tag with this ID found'})
  }
  res.json(tagData)
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
