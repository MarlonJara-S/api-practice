const express = require('express'); // Require express module
const router = express.Router(); // Create an express router


router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json(
    {
      categoryId,
      productId,
    }
  )
})

module.exports = router;