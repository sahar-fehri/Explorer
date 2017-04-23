var express = require('express');
var path = require ('path');
var bodyParser = require('body-parser');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);










/*
var difficulty =""
,  extraData =""
,  gasLimit=""
,  gasUsed=""
,  hash=""
,  logsBloom=""
,  miner=""
,  mixHash=""
,  nonce=""
,  number=""
,  parentHash=""
  receiptRoot=""
,  sha3Uncles=""
,  size=""
,  stateRoot=""
,  timestamp=""
,  totalDifficulty=""
,  transactions=[]
,  transactionsRoot=""
,  uncles =[];
*/

var index = require('./routes/index');
var api = require ('./routes/api');











//view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.engine('html', require('ejs').renderFile);


app.use(express.static(path.join(__dirname, 'client')));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',index);

app.use('/api/', api.router);



//var msg = " woooooork pleaaaaaaaaaaaaaase ";
var block = {
    "Difficulty": "147852" ,
    "Hash": "123456789azertyuio123",
    "Transactions": ["tx1","tx2","tx3"]
}



io.on('connection', function(socket){
    console.log("pouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuff");
    api.myFunction(io);





});
;


http.listen(3001, function(){

  console.log("server started at port 3001 .....");
});





