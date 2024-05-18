const express = require('express'); // Require express module
const router = express.Router(); // Create an express router

router.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay limit ni offset');
  }
})



module.exports = router;
