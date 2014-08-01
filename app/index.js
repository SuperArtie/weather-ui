'use strict';
var request = require('request');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.render('weather1');
});

app.post('/', function(req, res){
  var zip = req.body.zip;
  var url = 'http://api.wunderground.com/api/ec7f99c35ad8bcc2/conditions/q/'+zip+'.json';
  request(url, function(error, response, body){
    body = JSON.parse(body);
    var temp = body.current_observation.temp_f;
    var color;
    if(temp <= 32){
      color = 'blue';
    }else if(temp <= 70){
      color = 'green';
    }else if(temp <= 80){
      color = 'yellow';
    }else if(temp <= 95){
      color = 'orange';
    }else{
      color = 'red';
    }
    var level = temp * 2.92;
    
    res.render('weather2', {temp:temp, color:color, level:level});
  });
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT', port);
});
