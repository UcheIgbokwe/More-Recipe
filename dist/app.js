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

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = parseInt(process.env.PORT, 10) || 8080;

// routes(routes);

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  res.json({
    message: 'welcom'
  });
});

app.use('/api/v1', _routes2.default);

app.get('*', function (request, response) {
  return response.status(404).json({ message: 'Nothing to display' });
});

app.listen(port);

exports.default = app;