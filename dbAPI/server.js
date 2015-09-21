//get reference to awesome express framework;
var express = require('express');
//get the reference to it; 
var myApp = express();

var bodyParser = require('body-parser'); // get the body parser so we could read the body datas from GET/POST commands;

//we need our router to react on urls, and know what to do in each case;
var router = express.Router();

var city = require('./models/city.js');

myApp.use(bodyParser.json());
myApp.use(bodyParser.urlencoded({"extended" : true}));

router.get("/", function (req, res){
   res.json({"error" : false, "message": "Feel free to add your city"}); 
});

//here comes CRUD;

router.route('/cities')
    //get all cities in AJAX object, so we could request later from other applications;
    .get(function(req, res){
        var response = {};
    
        city.find({}, function(err, data){
           if(err){
                response = {"error": true, "message": "Error fetsching data"} ; 
           }
            else {
                response = {"error": false, "message": data} ;    
            }
            
            res.json(response);
        });
    })
    //add new city to our database;
    .post(function(req, res){
        //var db = new citydb({id: "as324234", name:"Isfara", image: "images/Isfara.png", description: "My hometown Isfara "});
        var newCity = new city();
            newCity.id =  req.body.id; 
            newCity.name = req.body.name;
            newCity.image = req.body.image, 
            newCity.description = req.body.description;
        
        var response = {};
    
        
        console.log(newCity.id);
        
        newCity.save(function(err, data){
            if (err){
                response = {"error": true, "message": "Could not save data" + err};   
            }else{
                respone = {"error": false, "message": "Saved the data" + data};   
            }
            
            res.json(response);
        });
    });
    

myApp.use("/", router);

myApp.listen(3000);
console.log('Listening on port 3000...');