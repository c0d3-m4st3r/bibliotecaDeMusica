$(function(){
    getContent();
    $("body").on('click', '.dropdown-menu button', cambiaIdioma);
    
});

function getContent(){
    $.ajax({
        type: 'POST',
        url: '/idioma',
        success: function(response){
            idioma = response;

            $.ajax({
                type: 'POST',
                url: '/getContenido',
                success: function(respuesta) {
                    var data = respuesta.split("\n");
        
                    var numeroASumar = 0;
                    var numPalabras = parseInt(data[2]);

                    for(var i = 0; i < idioma ;i++){
                        numeroASumar = numeroASumar + numPalabras + 2; 
                    }
        
                    $('#tituloNavegador').text(data[6 + numeroASumar]);
                    $('#dropdownMenuButton').text(data[3 + numeroASumar]);
                    $('#titulo').text(data[6 + numeroASumar]);

                    var numeroIdiomas = parseInt(data[0]);
                    var posicion = 4;
                    for(var i = 0; i < numeroIdiomas; i++){
                        
                        var numPalabras = parseInt(data[2]);
            
                        var cadenaAIntroducir = '<button class="dropdown-item" id="idioma'+ String(i) + '">'+ data[posicion] +'</a>'
                        $("#dropdownMenu").append(cadenaAIntroducir);

                        posicion = posicion + numPalabras + 2;
                    }


                    var numeroCanciones = (numPalabras-12)/4;
                    console.log(numeroCanciones);
                    var contadorDeck = 0;

                    for(var i = 0; i < numeroCanciones ;i++){
                        if(i==0){
                            $('#agrupamientoTarjetas').append('<div class="card-deck" id="deck0">');
                        }else if(i%3 == 0){
                            contadorDeck++;
                            $('#agrupamientoTarjetas').append('</div><div class="card-deck" id="deck'+String(contadorDeck)+'">');
                            
                        }
                        var cadenaAIntroducir = '<div class="card text-center text-white bg-danger mb-3" style="width:400px"> <img class="card-img-top" src=""><div class="card-body"><h4 class="card-title" id="tituloCancion'+ String(i) + '"></h4><p class="card-text" id="artista'+ String(i) + '"></p><p class="card-text" id="ano'+ String(i) + '"></p><p class="card-text" id="duracion'+ String(i) + '"></p><a href="#" class="btn btn-success verMas" id="verMas'+ String(i) + '"></a><button class="text-white btn btn-warning" id="modificar'+ String(i) + '"></button><button class="btn btn-secondary" id="eliminar'+ String(i) + '"></button></div></div>';
                        $('#deck' + String(contadorDeck)).append(cadenaAIntroducir);
                        
                    }
                    $('#agrupamientoTarjetas').append('</div>');

                    contador = 15 + numeroASumar;

                    for(var i = 0; i < numeroCanciones ;i++){
                        
                        $("#tituloCancion"+ String(i)).text(data[contador]);
                        contador++;
                        $("#artista"+ String(i)).text(data[9+numeroASumar]+':  '+data[contador]);
                        contador++;
                        $("#ano"+ String(i)).text(data[10+numeroASumar]+':  '+data[contador]);
                        contador++;
                        $("#duracion"+ String(i)).text(data[11+numeroASumar]+':  '+data[contador]);
                        contador++;
                        $("#verMas"+ String(i)).text(data[12+numeroASumar]);
                        $("#modificar"+ String(i)).text(data[14+numeroASumar]);
                        $("#eliminar"+ String(i)).text(data[13+numeroASumar]);

                    }
                    
                },
                error: function() {
                    console.log("No se ha podido obtener la información");
                }
            });

        }, 
        error:function() {
            console.log("No se ha podido obtener la información");
        }
    });
}

function cambiaIdioma(event){
    var idioma = parseInt(event.target.id.substr(6));

    console.log(idioma);
    

    $.ajax({
        type: 'POST',
        url: '/getContenido',
        success: function(respuesta) {
            var data = respuesta.split("\n");

            var numeroASumar = 0;
            var numPalabras = parseInt(data[2]);

            for(var i = 0; i < idioma ;i++){
                console.log(numPalabras);
                numeroASumar = numeroASumar + numPalabras + 2;
                
            }

            $('#tituloNavegador').text(data[5 + numeroASumar]);
            $('#dropdownMenuButton').text(data[3 + numeroASumar]);
            $('#titulo').text(data[6 + numeroASumar]);
            $('#accederBiblio').text(data[7 + numeroASumar]);       
            
            var numeroCanciones = (numPalabras-12)/4;
            
            contador = 15 + numeroASumar;

            for(var i = 0; i < numeroCanciones ;i++){
                console.log(data[9+numeroASumar]);
                        
                $("#tituloCancion"+ String(i)).text(data[contador]);
                contador++;
                $("#artista"+ String(i)).text(data[9+numeroASumar]+':  '+data[contador]);
                contador++;
                $("#ano"+ String(i)).text(data[10+numeroASumar]+':  '+data[contador]);
                contador++;
                $("#duracion"+ String(i)).text(data[11+numeroASumar]+':  '+data[contador]);
                contador++;
                $("#verMas"+ String(i)).text(data[12+numeroASumar]);
                $("#modificar"+ String(i)).text(data[14+numeroASumar]);
                $("#eliminar"+ String(i)).text(data[13+numeroASumar]);

            }

        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });

    $.ajax({
        url: '/cambiaIdioma',
        data: {idiomaId: idioma}
    });
    
}