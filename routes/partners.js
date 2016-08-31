let router = require('express').Router();

const partners = require('../controllers/partnersControllers');

router.get('/',partners.index);
router.get('/list',partners.showAll);
router.post('/customization',partners.customization);
router.get('/questionnaire/list',partners.questionnaire);
router.post('/questionnaire/:id',partners.questionnaireLike);

router.get('/user',partners.user);
router.get('/is_trades',partners.isTrades);
router.get('/:id',partners.show);
router.post('/trades',partners.trades);
module.exports = router;