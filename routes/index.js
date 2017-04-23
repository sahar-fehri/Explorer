var express = require('express');
var router = express.Router();
/*

var myServer = require('../server');

var http = myServer.http;




var io = require('socket.io')(http);



io.on('connection', function(socket){
  console.log('a user connected');
});*/


/*
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
// set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}*/



router.get('/',function(req,res,next){

  //res.send('JUST INDEX');
//  var currentBalance = web3.eth.getBalance(web3.eth.accounts[0]);
  res.render('index.html');

});


module.exports = router;
