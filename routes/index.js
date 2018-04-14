var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/rest/emr', db.getAllRecords);
router.get('/rest/emr/:id', db.getSingleRecord);
router.post('/rest/emr', db.createRecord);

module.exports = router;
