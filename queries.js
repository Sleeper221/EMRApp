var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:root@localhost:5432/emr';
var db = pgp(connectionString);

//query functions
function getAllRecords(req, res, next) {
    db.any('select * from emrs')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL emrs'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

function getSingleRecord(req, res, next) {
  var emrID = parseInt(req.params.id);
  db.one('select * from emrs where id = $1', emrID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE emr'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createRecord(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into emrs (name, address, medications, dob, provider)' +
      'values(${name}, ${address}, ${medications}, ${dob}, ${provider})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one emr'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
    getAllRecords: getAllRecords,
    getSingleRecord: getSingleRecord,
    createRecord: createRecord
};