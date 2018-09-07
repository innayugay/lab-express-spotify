const express = require('express');
const app = express();
const hbs = require('hbs');
const path    = require('path')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var SpotifyWebApi = require('spotify-web-api-node');

// Remember to paste here your credentials
var clientId = '997fb878e39b488e9771fbb4aa6edc6f',
    clientSecret = 'b20615229ede46a58c3039e37fa2a163';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});



app.get('/', (req, res, next)=>{
  res.render('index')
})

// 'req.query.artist'

app.get('/artists', (req, res, next)=>{

  spotifyApi.searchArtists(req.query.artist)
      .then(data => {
        res.render('artists', {searchResult: data.body.artists.items})
        
        // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      })
      .catch(err => {
        console.log(err);
        // ----> 'HERE WE CAPTURE THE ERROR'
      })


})


app.listen(3000);