var express = require('express');
var argv = require('minimist')(process.argv.slice(2));
var app = express();

var port = Number(argv.port) || Number(argv.p) || 3000;

app.use(express.static(__dirname));
app.listen(port, function () {
  console.log('Ticktastic listening on port ' + port);
});
