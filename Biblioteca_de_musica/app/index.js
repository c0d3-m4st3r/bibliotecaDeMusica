var express = require('express');
var fs = require('fs');
    

var app = express();
app.use(express.static(__dirname)); //__dir and not _dir
var port = 8080; // you can use any port
app.listen(port);
console.log('Server running on port: ' + port);


app.post('/getContenido', function(req, res){
    fs.readFile('idiomas.txt','utf-8', function(err, data){
        if(err) throw err;
        else{
            res.send(data);
        }
    })
});







    