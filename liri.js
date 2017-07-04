
var keys = require('./keys.js');
var twitter = require('twitter');
//I couldn't get spotify running
var spotify= require ('spotify');
var fs = require('fs');
//I couldn't get spotifier running
var spotifier = require('spotifier');
var request = require ('request');



if(process.argv[2]==='my-tweets'){show2Tweets()};
//if(process.argv[2]==='spotify-this-song'){spotifysong()};
if(process.argv[2]==='spotify-this-song'){spotifier()};

if (process.argv[2]==='movie-this'){omdb()};

if(process.argv[2]==='do-what-it-says'){mystery()};
// var twitterqueryUrl='https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi'
// var spotifyqueryUrl='https://api.spotify.com/v1/search?q="dylan"&type=artist'
//https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl&result_type=recent



function show2Tweets(){
	console.log("it ran")

var client = new twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {screen_name: 'BenjaminTOwens'};

//Ben- need to put in the tweets one by one here.

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	console.log("tweets should come");

  	for(var i=0; i<tweets.length; i++){
  	var mycreated_at=tweets[i].created_at;
  	var mytext=tweets[i].text;
    console.log(mycreated_at);
   console.log(mytext);
}
  }

  else{console.log("there was an error");
console.log(keys.twitterKeys.consumer_key)}
});}


//function spotifysong(){

// var query=process.argv[3]
// 	spotify.search({ type: 'track', query: query }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
 
//     else {console.log(data)};
// });
// }
function spotifier(){

var client = new spotifier({
  authorizationUrl : 'https://accounts.spotify.com/api/token',
  clientId : keys.spotify.Client_Id,
  clientSecret : keys.spotify.Client_Secret,
  searchResultLimit : 10,
  searchUrl : 'https://api.spotify.com/v1/search',
  timeout : 1000
});

var title = process.argv[3]


 
client.search(options, params, function (err, result) {
  if (err) {
    console.error(err);
  }
 
  console.log(result);
  console.log("it ran!")
});
}

function omdb(){

//var title=process.argv[3];  instead of this, Start slicing at 3 going forward and then join them with a +

var title = process.argv.slice(3).join('+');
if (title===''){title='Mr. Nobody'};
if (process.argv[2]==='do-what-it-says'){title=randomInput}

var urlParam = 'http://www.omdbapi.com/?apiKey=40e9cece&t='+title



request(urlParam, function (error, response, body) {
var body = JSON.parse(body)
  console.log(body.Title, body.Year, body.Rated, body.Country, body.Language, body.Plot, body.Actors, body.Website); // Print the HTML for the Google homepage. 
});}


//I didn't have time to figure out how to 
function mystery(){
	console.log("it ran!")
  fs.readFile('random.txt', "utf8", function(error, data){
    var text = data.split(',');
var randomCommand =text[0];
var randomInput=text[1];
console.log (randomCommand);
console.log (randomInput);

if(randomCommand==='movie-this'){omdb();}
  });
}


// # Week 10 (LIRI Bot)

// ### Overview

// In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

// ### Before You Begin

// 1. LIRI will display your latest tweets. As we do not want to display your personal account, or its keys, please make an alias account and add a few tweets to it!

// 2. Make a new GitHub repository called liri-node-app and clone it to your computer.

// 3. To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and IMDB APIs. You'll find these Node packages crucial for your assignment.

//    * [Twitter](https://www.npmjs.com/package/twitter)
//    * [Spotify](https://www.npmjs.com/package/spotify)
//    * [Request](https://www.npmjs.com/package/request)
//      * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

// ### Instructions

// 1. Make a .gitignore file and add the following lines to it.


// ```
// node_modules
// .DS_Store
// ```

// 2. Make a JavaScript file named `keys.js`. **Do Not** add this file to the .gitignore. This would be a good thing to do in the real world, but it makes grading this assignment a challenge.

// Inside keys.js your file will look like this:

// ```JavaScript
// console.log('this is loaded');

// exports.twitterKeys = {
//   consumer_key: '<input here>',
//   consumer_secret: '<input here>',
//   access_token_key: '<input here>',
//   access_token_secret: '<input here>',
// }
// // ```

// 3. Get your Twitter API keys by following these steps:

//    * Step One: Visit <https://apps.twitter.com/app/new>
//    * Step Two: Fill out the form with dummy data. Type `http://google.com` in the Website input. Don't fill out the Callback URL input. Then submit the form.
//    * Step Three: On the next screen, click the Keys and Access Tokens tab to get your consume key and secret. 
//      * Copy and paste them where the `<input here>` tags are inside your keys.js file.
//    * Step Four: At the bottom of the page, click the `Create my access token` button to get your access token key and secret. 
//      * Copy the access token key and secret displayed at the bottom of the next screen. Paste them where the `<input here>` tags are inside your keys.js file.

// 4. Make a file called `random.txt`.

//    * Inside of `random.txt` put the following in with no extra characters or white space:
//      * spotify-this-song,"I Want it That Way"

// 5. Make a JavaScript file named `liri.js`.

// 6. At the top of the `liri.js` file, write the code you need to grab the data from keys.js. Then store the keys in a variable.

// 7. Make it so liri.js can take in one of the following commands:

//    * `my-tweets`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`

// ### What Each Command Should Do

// 1. `node liri.js my-tweets`

//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from

//    * if no song is provided then your program will default to
//      * "The Sign" by Ace of Base

// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//        * Rotten Tomatoes URL.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//      * It's on Netflix!

// 4. `node liri.js do-what-it-says`
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Feel free to change the text in that document to test out the feature for other commands.

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.

// - - -

