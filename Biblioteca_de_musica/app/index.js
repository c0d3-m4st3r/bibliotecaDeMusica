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
            var newData = data.split("\n");
            
            res.send(data);
            
        }
    })
});

app.post('/idioma', function(req, res){
    
    res.send(session.idiomaId)
});

app.get('/guardaCancion', function(req, res){

    fs.readFile('idiomas.txt','utf-8', function(err, data){
        if(err) throw err;
        else{
            let newData = data.split("\n");
            var numPalabras = parseInt(newData[2]);
            var numeroIdiomas = parseInt(newData[0]);
            var numeroCanciones = (numPalabras - 18)/4;
            var numImagenes = parseInt(data[21 + numeroCanciones * 4]);

            
            posicion = 21;

            for(var i = 0; i < numeroIdiomas; i++){
                newData.push('');
                newData.push('');
                newData.push('');
                newData.push('');

                var tamano = newData.length;
                
                for(var k = 0; k < 4; k++){
                    for(var j = tamano; j > posicion; j--){
                            newData[j] = newData[j - 1];
                    }
                }

                newData[posicion] = req.query.nombre;
                newData[posicion + 1] = req.query.artista;
                newData[posicion + 3] = req.query.duracion;
                newData[posicion + 2] = req.query.ano;

                posicion = posicion + numPalabras + 6 + numImagenes + 1;
            }

            var stringAIntroducir = '';
            var tamanoDatos = newData.length;
            var cont = 0;

            for(var i = 0; i < tamanoDatos; i++){
                if(i == 0){
                    stringAIntroducir = stringAIntroducir + newData[i];
                }else if(i == 2 || newData[i] == newData[2]){
                    stringAIntroducir = stringAIntroducir + '\n' + String(parseInt(newData[2]) + 4);
                }else if(newData[i] == ''){

                }else{
                    stringAIntroducir = stringAIntroducir + '\n' + newData[i];
                }
                
            }

            fs.writeFile('idiomas.txt', stringAIntroducir, (err) => {
                if (err) throw err;
                    console.log('El archivo ha sido guardado!');
              });
            
        }
    });
    
    
    console.log(req.query.nombre, req.query.artista, req.query.duracion, req.query.ano);

    res.send('ok');

});


app.get('/eliminarCancion', function(req, res){

    fs.readFile('idiomas.txt','utf-8', function(err, data){
        if(err) throw err;
        else{
            let newData = data.split("\n");
            var numPalabras = parseInt(newData[2]);
            var numeroIdiomas = parseInt(newData[0]);
            var numeroCanciones = (numPalabras - 13)/4;
            var numImagenes = parseInt(data[21 + numeroCanciones * 4]);

            let cancion = req.query.idCancion;
            posicion = 21 + cancion*4;

            for(var i = 0; i < numeroIdiomas; i++){
                
                var tamano = newData.length;
                
                for(var k = 0; k < 4; k++){
                    for(var j = posicion; j < tamano - 1; j++){
                            newData[j] = newData[j + 1];
                    }
                    newData.pop();
                }

                posicion = posicion + numPalabras - 2 + numImagenes + 1;
            }

            var stringAIntroducir = '';
            var tamanoDatos = newData.length;
            var cont = 0;

            for(var i = 0; i < tamanoDatos; i++){
                if(i == 0){
                    stringAIntroducir = stringAIntroducir + newData[i];
                }else if(i == 2 || newData[i] == newData[2]){
                    stringAIntroducir = stringAIntroducir + '\n' + String(parseInt(newData[2]) - 4);
                }else if(!newData[i]){

                }else{
                    stringAIntroducir = stringAIntroducir + '\n' + newData[i];
                }
                
            }

            fs.writeFile('idiomas.txt', stringAIntroducir, (err) => {
                if (err) throw err;
                    console.log('El archivo ha sido guardado!');
              });
            
        }
    });

    res.send('ok');

});

app.get('/editarCancion', function(req, res){

    fs.readFile('idiomas.txt','utf-8', function(err, data){
        if(err) throw err;
        else{
            let newData = data.split("\n");
            var numPalabras = parseInt(newData[2]);
            var numeroIdiomas = parseInt(newData[0]);
            var numeroCanciones = (numPalabras - 13)/4;
            var numImagenes = parseInt(data[21 + numeroCanciones * 4]);

            let cancion = req.query.idCancion;
            posicion = 21 + cancion*4;

            for(var i = 0; i < numeroIdiomas; i++){
                
                newData[posicion] = req.query.nombre;
                newData[posicion+1] = req.query.artista;
                newData[posicion+3] = req.query.duracion;
                newData[posicion+2] = req.query.ano;

                posicion = posicion + numPalabras + 2 + numImagenes + 1;
            }

            var stringAIntroducir = '';
            var tamanoDatos = newData.length;

            for(var i = 0; i < tamanoDatos; i++){
                if(i == 0){
                    stringAIntroducir = stringAIntroducir + newData[i];
                }else if(!newData[i]){

                }else{
                    stringAIntroducir = stringAIntroducir + '\n' + newData[i];
                }
                
            }

            fs.writeFile('idiomas.txt', stringAIntroducir, (err) => {
                if (err) throw err;
                    console.log('El archivo ha sido guardado!');
              });
            
        }
    });

    res.send('ok');

});


app.get('/verMas', function(req, res){

    session.verMasId = req.query.idCancion;
    
    res.send('ok');


});

app.post('/cancionVerMas', function(req, res){
    
    res.send(session.verMasId);

});



app.listen(port);





    