const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/face.js', (req, res) => {
  res.sendFile(__dirname + '/face.js');
});

app.get('/imgs/:fileName', function (req, res) {
   //console.log(req.params.fileName)
  res.sendFile(__dirname + '/imgs/'+req.params.fileName);
});

app.get('/src/:fileName', function (req, res) {
  //console.log(req.params.fileName)
  res.sendFile(__dirname + '/src/'+req.params.fileName);
});

app.get('/static/:fileName', function (req, res) {
  //console.log(req.params.fileName)
  res.sendFile(__dirname + '/static/'+req.params.fileName);
});

app.get('/api/models/:fileName', function (req, res) {
  //console.log(req.params.fileName)
  res.sendFile(__dirname + '/api/models/'+req.params.fileName);
});

app.get('/api/:fileName', function (req, res) {
  //console.log(req.params.fileName)
  res.sendFile(__dirname + '/api/'+req.params.fileName);
});

app.get('/api/jsm/lights/LightProbeGenerator.js', function (req, res) {
  //console.log(req.params.fileName)
  res.sendFile(__dirname + '/api/jsm/lights/LightProbeGenerator.js');
});

app.get('/static/textures/cube/Park3Med/:fileName', function (req, res) {
  //console.log(req.params.fileName)
  res.sendFile(__dirname + '/static/textures/cube/Park3Med/'+req.params.fileName);
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});