const express = require('express');
const {
  getBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug
} = require('../controllers/bugController.js');

const router = express.Router();

router.route('/')
  .get(getBugs)
  .post(createBug);

router.route('/:id')
  .get(getBug)
  .put(updateBug)
  .delete(deleteBug);

module.exports = router;