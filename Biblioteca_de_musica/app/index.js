var express = require('express'), session = require('express-session'), cookieParser = require('cookie-parser');
var fs = require('fs');

var app = express();
app.use(express.static(__dirname)); //__dir and not _dir
var port = 8080; // you can use any port
console.log('Server running on port: ' + port);

app.use(cookieParser());
app.use(session({secret: 'IPO Internacional', resave: true, saveUninitialized: true}));

app.get('/cambiaIdioma', function(req, res){
    
    session.idiomaId = req.query.idiomaId;

});


app.post('/getContenido', function(req, res){
    fs.readFile('idiomas.txt','utf-8', function(err, data){
        if(err) throw err;
        else{
            res.send(data);
        }
    })
});

app.post('/idioma', function(req, res){
    
    res.send(session.idiomaId)
});





app.listen(port);





    