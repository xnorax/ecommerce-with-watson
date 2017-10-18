
const watson = require('watson-developer-cloud'),
Twit = require('twit'),
express = require('express'),
fs = require('fs'),
cfenv = require('cfenv'),
http = require('http');

// create a new express server
var app = express();

app.set('view engine','ejs');
app.use(express.static(__dirname));

// To parse the HTML form input
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// define personality insights
var personality_insights = watson.personality_insights({
  username: 'd565b330-6af7-4591-8e96-e0c8add65efc',
  password: 'yUsnYzCfAU86',
  version_date:'2016-10-19',
  version: 'v3'
});

// define twitter helper
var Twithelper = new Twit({
  consumer_key: 'b7K2VRtlEJ2CBTZOF60PgJPlM', // Insert your Twitter key here
  consumer_secret: 'DO4Z4LjJUd9CEcLivKDf4wG0N8vafEx4ZxLCuVCjMJ0tuyAJGQ',
  app_only_auth: true
})

const clothesTitles = ['Big & Tall Men\'s Quality Long Sleeve Pocket T-Shirts by Cotton Traders','RAISEVERN Unisex Casual 3d Pattern Printed Short Sleeve T-Shirts Top Tees','Men\'s Cotton Pique Polo Shirt','Burberry men\'s short sleeve shirt t-shirt thornaby blu'];
const clothesPrices = ['$25.00','$13.99','$12.00','$79.99'];

const booksTitles = ['Entertainment Weekly','A Short History of Nearly Everything','How to Turn $100 into $1,000,000','Etched in Sand: A True Story'];
const booksPrices = ['$17.00','$9.99','$7.98','$9.03'];

const healthTitle = 'Fitness Tracker, MoreFit Slim Touch Screen Activity Health Tracker Wearable Pedometer Smart Wristband';
const healthPrice = '$21.84';

const envTitle = 'Kalalou Recycled Flip Flop Large Rectangle Mat';
const envPrice = '$53.99';
/******************** Main Functions ******************/

// if you run the server locally it will run in localhost:port
// otherwise it will run on cloud foundry port
var appEnv = cfenv.getAppEnv();
http.Server(app).listen(appEnv.port, function() {
    console.log("server starting on " + appEnv.url);
});

app.post('/search', function(req, res){

  var titles = [];
  var subtitles = [];
  var prices = [];
  var images = [];

  Twithelper.get('statuses/user_timeline',  { 
    screen_name: req.body.name,
    count: 200
   } , function(err, data) {
    if (err) console.log('T Error:', err);
    var buffer = "";
    for (var i = 0; i < data.length; i++) {
        buffer = buffer.concat(data[i].text);
    }

    personality_insights.profile({
          text: buffer,
          consumption_preferences: true,
          language: 'en'
    }, function(error, response) {
    if (error)
      console.log('PI Error:', error);
    else {
      var json = JSON.stringify(response, null, 2);
      var obj = JSON.parse(json);

      for (var i=0;i<obj.consumption_preferences.length;i++){

        var category = obj.consumption_preferences[i];
        var category_id = category.consumption_preference_category_id;

        if (category_id.indexOf('shopping')!=-1){

          for(var j=0;j<category.consumption_preferences.length;j++){
            var preference = category.consumption_preferences[j];
            if (j>=2 && j<=5 && preference.score=='1'){
              titles.push(clothesTitles[j-2]); subtitles.push(preference.name);
              prices.push(clothesPrices[j-2]); images.push('/images/c'+(j-2)+'.jpg');
             }
            }// for shopping category

        } else if (category_id.indexOf('reading')!=-1) {

          for(var j=0;j<category.consumption_preferences.length;j++){
            var preference = category.consumption_preferences[j];
            if (j>0 && preference.score=='1'){
                titles.push(booksTitles[j-1]); subtitles.push(preference.name.split(' ').splice(-2).join(' ').slice(0,-1));
                prices.push(booksPrices[j-1]); images.push('/images/b'+(j-1)+'.jpg');
            }
            }// for book category

        } else if (category_id.indexOf('health')!=-1){

            if (category.consumption_preferences[2].score=='1'){
              titles.push(healthTitle); subtitles.push(category.consumption_preferences[2].name);
              prices.push(healthPrice); images.push('/images/h0.jpg');}

        } else if (category_id.indexOf('environmental')!=-1){

              if (category.consumption_preferences[0].score=='1'){
                titles.push(envTitle); subtitles.push(category.consumption_preferences[0].name);
                prices.push(envPrice); images.push('/images/e0.jpg');
              }
        }

      }// for consumption_preferences
      var data = {name:req.body.name,titles:titles,subtitles:subtitles,prices:prices,images:images};
      res.render('gifts',{data:data});
    }//else

    }); //personalityInsights.profile

    });//Twithelper.get

});//end of post function
