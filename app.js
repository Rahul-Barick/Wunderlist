var express = require('express');

var app = express();
var mongoose = require('mongoose');
var config = require('./config/database');
var itemController = require('./controllers/list');

mongoose.connect(config.database);

mongoose.connection
    .once('open',() => {
        console.log("Mongo DB connected");
    })
    .on('error', (err)=>{
        console.log("Error in MongoDB connection "+err);
    })

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended : true
}));

var router = express.Router();

router.route('/')
    .get(itemController.fetch_get_Data)

router.route('/postItem')
    .post(itemController.postItem)

router.route('/edit/:id')
    .get(itemController.editItem)

router.route('/update/:id')
    .post(itemController.updateItem)

router.route('/delete/:id')
    .get(itemController.deleteItem)
    
app.use('/api',router);

app.listen(3000,() => {
    console.log("Server started in port 3000")
});