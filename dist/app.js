'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = parseInt(process.env.PORT, 10) || 9000;
var router = _express2.default.Router();
(0, _index2.default)(router);

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/api/v1', router);

app.get('*', function (request, response) {
  return response.status(404).json({ message: 'Route does not exist!' });
});

app.listen(port);

exports.default = app;