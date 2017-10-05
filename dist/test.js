'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

(0, _mocha.describe)('Tests for API endpoints', function () {
    (0, _mocha.describe)('Handle valid endpoints', function () {
        (0, _mocha.describe)('GET /api/v1/recipe', function () {
            (0, _mocha.it)('it should GET all recipes', function (success) {
                _chai2.default.request(_app2.default).get('/api/v1/recipe').end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(200);
                    success();
                });
            });
        });
        (0, _mocha.describe)('GET /api/v1/recipe/:recipeid', function () {
            (0, _mocha.it)('it should GET a recipe', function (success) {
                _chai2.default.request(_app2.default).get('/api/v1/recipe/1').end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(200);
                    success();
                });
            });
        });
        (0, _mocha.describe)('POST /api/v1/recipe', function () {
            var recipe = {
                id: 1,
                name: 'Egusi soup',
                ingredients: 'Green leaf',
                directions: 'cook',
                upvotes: 90
            };
            (0, _mocha.it)('it should POST recipes', function (done) {
                _chai2.default.request(_app2.default).post('/api/v1/recipe').send(recipe).end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(200);
                    done();
                });
            });
        });

        (0, _mocha.describe)('PUT /api/v1/recipe/:recipeid', function () {
            (0, _mocha.it)('it should PUT all recipe', function (success) {
                _chai2.default.request(_app2.default).put('/api/v1/recipe/1').end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(200);
                    success();
                });
            });
        });
        (0, _mocha.describe)('DELETE /api/v1/recipe/:recipeid', function () {
            (0, _mocha.it)('it should DELETE a recipe', function (success) {
                _chai2.default.request(_app2.default).delete('/api/v1/recipe/1').end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(200);
                    success();
                });
            });
        });
    });

    (0, _mocha.describe)('Handle invalid endpoints', function () {
        (0, _mocha.describe)('GET /api/v1/recipe', function () {
            (0, _mocha.it)('it should GET all recipes returns false', function (success) {
                _chai2.default.request(_app2.default).get('/api/v1/recip').end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(404);
                    success();
                });
            });
        });

        (0, _mocha.describe)('POST /api/v1/recipe', function () {
            (0, _mocha.it)('it should POST a recipe return false', function (success) {
                _chai2.default.request(_app2.default).post('/api/v1/recip').end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(404);
                    success();
                });
            });
        });
        (0, _mocha.describe)('PUT /api/v1/recipe', function () {
            (0, _mocha.it)('it should PUT a recipe return false', function (success) {
                _chai2.default.request(_app2.default).put('/api/v1/recipe/:-1').end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(404);
                    success();
                });
            });
        });

        (0, _mocha.describe)('DELETE /api/v1/recipe', function () {
            (0, _mocha.it)('it should DELETE a recipe return false', function (success) {
                _chai2.default.request(_app2.default).delete('/api/v1/recipe/-1').end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(404);
                    success();
                });
            });
        });

        (0, _mocha.describe)('PUT /api/v1/recipe', function () {
            (0, _mocha.it)('it should PUT a recipe return false', function (success) {
                _chai2.default.request(_app2.default).put('/api/v1/recipe/:200').end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(404);
                    success();
                });
            });
        });

        (0, _mocha.describe)('DELETE /api/v1/recipe', function () {
            (0, _mocha.it)('it should DELETE a recipe return false', function (success) {
                _chai2.default.request(_app2.default).delete('/api/v1/recipe/-1').end(function (error, res) {
                    (0, _chai.expect)(res).to.have.status(404);
                    success();
                });
            });
        });
    });
});