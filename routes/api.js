var express = require('express');
var waterfall = require('async-waterfall');
var async = require('async');
var router = express.Router();
var msg = "kooooooooooooooooo";


var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
// set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


//Handling mongoose here
//Import the mongoose module
var mongoose = require('mongoose');
var mongo = require('mongodb');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/blockchain';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;


var blockSchema = new Schema({
    difficulty: String,
    extraData: String,
    gasLimit: String,
    gasUsed: String,
    hash: String,
    logsBloom: String,
    miner: String,
    mixHash: String,
    nonce: String,
    number: Number,
    parentHash: String,
    receiptRoot: String,
    sha3Uncles: String,
    size: String,
    stateRoot: String,
    timestamp: String,
    totalDifficulty: String,
    transactions: [],
    transactionsRoot: String,
    uncles: []

});

var Block = mongoose.model('Block', blockSchema);

// make this available to our users in our Node applications


var transactionSchema = new Schema({
    blockHash: String,
    blockNumber: String,
    from: String,
    gas: String,
    gasPrice: String,
    hash: String,
    input: String,
    nonce: String,
    r: String,
    s: String,
    to: String,
    transactionIndex: String,
    v: String,
    value: String


});

var Transaction = mongoose.model('Transaction', transactionSchema);

// make this available to our users in our Node applications

/**************************************************************/


router.get('/', function (req, res, next) {
    // var peerCount =web3.net.peerCount;
    console.log("*************************");

    res.send('Myyyy API');
});


router.get('/blocks', function (req, res, next) {
    var nbBlocks;
    var blocksList = [];


    Block.find().sort('-number').limit(5).exec(function (err, blocks) {
        if (err) return console.error(err);

        console.log(blocks.length);

        res.json(blocks);
    });

    /*async.waterfall(
     [
     function (callback) {
     Block.count(function (error,nbBlocks) {
     console.log(nbBlocks);
     callback(null, nbBlocks);

     });



     },
     function ( nbBlocks, callback) {

     for (var i=100 ;i > 100-5 ; i--) {
     Block.find({"number": 100}, function (error, block) {
     if (error) throw error;
     blocksList.push(block);
     callback(error, block);


     });


     }
     callback(error,blocksList)


     },
     function (blocksL, callback) {

     // blocksList.push()
     callback(block);
     }
     ], function (block) {
     console.log(block);
     });



     */


    /*   var fillBlockList = function (index) {
     console.log(index);
     Block.find({"number":Number(index)},function (err, blocks) {
     console.log("**********************")
     console.log(blocks);
     return blocks;

     });


     }



     console.log(Block.count(function (error,nbBlocks) {


     console.log(" countiiiiing");

     if (error) return console.error(error);



     for (var i = nbBlocks; i > (nbBlocks-10); i--) {
     // console.log("////////////////////");
     blocksList.push(fillBlockList(i));


     }
     console.log(blocksList)


     }));

     */


    /*Block.find({"number":100},function (err, blocks) {
     if (err) return console.error(err);

     //console.log(blocks);

     res.json(blocks);
     });*/


})
// Handling the watching process here
console.log(web3.eth.accounts);
var filter = web3.eth.filter('latest');

console.log("enter broadcastBlock");

var myFunction = function (io) {

    console.log('enter myFunction')
    var test = 0;
    filter.watch(function (error, result) {


        console.log("waaaatchiiiiiiiiiiiiiiiiinggg Blockss");
        if (error) {
            console.log(error);
        }
        if (!error) {


            console.log("noo erroooors");

            //  console.log(web3.eth.getBlock(result));
            var newblock = new Block(web3.eth.getBlock(result));
            if (test !== newblock.number) {

                newblock.save(function (err) {
                    if (err) return handleError(err);
                    // saved!
                }).then(function (sucess) {
                    console.log(newblock.number, sucess);
                    io.emit('new_block_coming', newblock).then(function (sucess) {
                        console.log(sucess)
                        test = newblock.number
                    })
                })

            }

        }
    });


}

var filter2 = web3.eth.filter('pending');

filter2.watch(function (error, log) {
    console.log("***********************************");
    console.log(log); //  {"address":"0x0000000000000000000000000000000000000000", "data":"0x0000000000000000000000000000000000000000000000000000000000000000", ...}
});


router.get('/api/blocks/:number', function (req, res, next) {
    console.log("ppppppppppppppppppppppp");

    //var block = web3.eth.getBlock( req.params.number);
    console.log("getting a single bloooooooooooooooooooock");
    //res.json(block);
    res.send('OK');

})


module.exports = {
    router: router,
    Transaction: Transaction,
    Block: Block,
    myFunction: myFunction

};
