var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var simpleoauth2 = require("simple-oauth2");
var path = require('path');
var hbs = require('hbs');
var request = require('request');
var fs = require('fs');
var mysql = require('mysql');
var cookieSession = require('cookie-session')
// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 8080 );
app.set('view engine', 'hbs');

// -------------- serve static folders -------------- //
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/img', express.static(path.join(__dirname, 'img')))
app.use(cookieSession({
  name: 'loginCookie',
  keys: ['uniquekey1', 'uniquekey2']
}))
// -------------- variable definition -------------- //
var visitorCount = 0;
var ion_client_id = 'KEaF2x04oK9lnG9g5UfwOuTuXizfIIm45VHDXSAz';
var ion_client_secret = 'aSo48SpuO69U5bTnXWtCJtHUSfgXDQNo2rNeWH8mHmtUDpBydeY4JLFIbHJMaqTi5XnXvEAJAQx8eUCDPztdtupcmZ7OdXBRqLhuu02BGQgccufgMhe923bZrEWPj30w';
var ion_redirect_uri = 'https://user.tjhsst.edu/2020sgu/login_worker';
var oauth2 = simpleoauth2.create({
  client: {
    id: ion_client_id,
    secret: ion_client_secret,
  },
  auth: {
    tokenHost: 'https://ion.tjhsst.edu/oauth/',
    authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
    tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
  }
});
var pool  = mysql.createPool({
  connectionLimit : 10,
  user            : 'site_meowmates',
  password        : 'jdPH5ExnX62mH7KSDYthtVZh',
  host            : 'mysql1.csl.tjhsst.edu',
  port            : 3306,
  database        : 'site_meowmates'
});
var authorizationUri = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri
});
app.get('/', function(req, res){
    if(typeof(req.session.username) == 'undefined')
    {
        res.sendFile(__dirname + '/htmls/home.html');
    }
    else{
        res.render('homepage', {name: req.session.username})
    }
});
app.get('/login', function(req, res){
    console.log('no sub-page');
    res.sendFile(__dirname + '/htmls/login.html');
});
app.get('/logout', function(req,res){
    req.session = null
    res.redirect('https://meowmates.sites.tjhsst.edu');
})
app.get('/match', function(req, res){
    if(typeof(req.session.username) == 'undefined')
    {
        res.send("login to view this content!");
    }
    pool.query('CALL rand_pet();', function (error, results, fields) {
          if (error) throw error;
          console.log(results[0]);
          console.log(results[0][0]['id']);
          res.render('match', {ownername: req.session.username, imagelink: results[0][0]['imagelink'], name:results[0][0]['id'], petType: results[0][0]['animal'], bio: results[0][0]['bio'], hobbies: results[0][0]['hobbies'], location: results[0][0]['location']});
    });

    // res.sendFile(__dirname + '/htmls/match.html');
});
app.get('/petprofile', function(req, res){
    if(typeof(req.session.username) == 'undefined')
    {
        res.send("login to view this content!");
    }
    // pool.query('SELECT animal, hobbies, aniPref FROM pets WHERE name=?', [req.session.username], function(error, results, field) {
    //     if (error) throw error;
    //     console.log(results);
    //     res.send('profile_page', {name: req.session.username, p_animal: results[0].animal, p_hobbies: results[0].hobbies, p_aniPref: results[0].aniPref});
    // });
    // pool.query('CALL new_pet(?, ?, ?, ?, ?)', [req.session.username, ], function(error, results, field) {
    //     if (error) throw error;
    //     console.log(results);
    //     res.send('profile_page');
    // });
    res.render('profile_page');
});
app.get('/register', function(req, res){
    console.log('no sub-page');
    res.sendFile(__dirname + '/htmls/register.html');
});

app.get('/dm', function(req, res){
    if(typeof(req.session.username) == 'undefined')
    {
        res.send("login to view this content!");
    }
    res.render('dm', {name:req.session.username + ": "});
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log("message: " + msg)
  });
});

app.get('/validateLogin', function(req, res){
    var username = req.query.lg_username;
    var password = req.query.lg_password;
    if(password === ''|| username === '')
      {
        res.send("Try again! ");
      }
    else {
        pool.query('CALL check_pass(?,?);', [username,password], function (error, results, fields) {
          if (error) throw error;
          console.log(results[0]);

          if(typeof(results[0]) == 'undefined')
          {
             res.send("incorrect login");
          }
            else {
            req.session.username = username;
            console.log(req.session.username);
            res.send("");
          }
        });
    }
});
app.get('/registerVal', function(req, res){
    var username = req.query.reg_username;
    var password = req.query.reg_password;
    var email = req.query.reg_email;
    var fullusername = req.query.reg_fullname;
    console.log(email);
    if(password === ''|| username === '' || email === '' || fullusername === '')
      {
        res.send("Try again! ");
      }
    else {
        pool.query('CALL add_owner(?,?,?,?);', [username,password,email,fullusername], function (error, results, fields) {
          if (error) throw error;
            console.log(results[0]);
          if(typeof(results[0]) == 'undefined')
          {
             res.send("change your username");
          }
            else {
            res.send("");
          }
        });
    }
});
app.get('/petRegister', function(req, res){
    var username = req.query.reg_username;
    var bio = req.query.reg_bio;
    var location = req.query.reg_location;
    var hobby = req.query.reg_hobby;
    var petType = req.query.reg_ptype;
    var imagelink = req.query.reg_img; 
    console.log(imagelink);
    if(imagelink === '' || username === ''|| bio === '' || location === '' || hobby === '' || petType ==='')
      {
        res.send("Try again! ");
      }
    else {
        pool.query('CALL add_pet(?,?,?,?,?,?);', [imagelink,username, hobby, location, petType, bio], function (error, results, fields) {
          if (error) throw error;
            console.log(results[0]);
          if(typeof(results[0]) == 'undefined')
          {
             res.send("change your username");
          }
            else {
            res.send("");
          }
        });
    }
});
app.get('/acceptMatch', function(req, res){


        pool.query('CALL rand_pet();', function (error, results, fields) {
          if (error) throw error;
            console.log(results[0]);
            res.send({ownername: req.session.username, imagelink: results[0][0]['imagelink'], name:results[0][0]['id'], petType: results[0][0]['animal'], bio: results[0][0]['bio'], hobbies: results[0][0]['hobbies'], location: results[0][0]['location']});

        });

});
// -------------- listener -------------- //
// The listener is what keeps node 'alive.'

var listener = http.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});