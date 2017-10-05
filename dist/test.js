'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../server/app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../server/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('Tests for more-recipes API endpoints', function () {
  describe('Handle all required endpoints', function () {
    describe('GET api/v1/recipes', function () {
      it('should GET all recipes', function (done) {
        _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (error, response) {
          (0, _chai.expect)(response).to.have.status(200);
          done();
        });
      });

      it('should not GET all recipes', function (done) {
        _chai2.default.request(_app2.default).get('/api/v1/recipe').end(function (error, response) {
          (0, _chai.expect)(response).to.have.status(404);
          done();
        });
      });
    });

    describe('GET api/v1/recipes/:id', function () {
      it('should GET a recipe', function (done) {
        _chai2.default.request(_app2.default).get('/api/v1/recipes/1').end(function (error, response) {
          (0, _chai.expect)(response).to.have.status(200);
          done();
        });
      });

      // it('should not GET a recipe', (done) => {
      //   chai.request(app).get('/api/v1/recipes/1000').end((error, response) => {
      //     expect(response).to.have.status(404);
      //     done();
      //   });
      // });
    });

    describe('About page', function () {
      it('should return true if "About" page does not exist', function () {
        _chai2.default.request('/api/v1/about', function (error, response) {
          (0, _chai.expect)(response.statusCode).to.equal(404);
        });
      });

      it('should return true if "Contact" page does not exist', function () {
        _chai2.default.request('/api/v1/contact', function (error, response) {
          (0, _chai.expect)(response.statusCode).to.equal(404);
        });
      });
    });
  });
});