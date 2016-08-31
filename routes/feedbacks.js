let router = require('express').Router();

const feedbacks = require('../controllers/feedbacksControllers');

router.post('/new',feedbacks.add);

module.exports = router;

