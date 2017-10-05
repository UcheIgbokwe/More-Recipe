'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
(0, _index2.default)(app);
app.all('*', function (req, res) {
  res.status(404).send("The page you requested doesn't exist");
});
_dotenv2.default.config();
var port = process.env.PORT || 8080;
app.set('port', port);
var server = _http2.default.createServer(app);
server.listen(port, function () {
  console.log('Server running on port', port);
});

exports.default = app;