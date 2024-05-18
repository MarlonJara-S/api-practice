const express = require('express'); // Require express module

const ProductService = require('./../services/products.service'); // Require the product service
const validatorHandler = require('../middlewares/validator.handler'); // Require the validator handler
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema'); // Require the schemas

const router = express.Router(); // Create an express router
const service = new ProductService(); // Create a new instance of the product service

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', async (req, res) => {
    res.send('Soy un filter');
});


router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);

    }catch(err){
      next(err);
    }
});


router.post('/', 
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);   
});


router.patch('/:id', 
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(getProductSchema, 'body'), 
  async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const product = await service.update(id, body);
    res.json(product);

  }catch (err) {
    next(err);
  
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id);
  res.json(product);
})

module.exports = router;
