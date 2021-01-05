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
                url: '/cancionVerMas',
                success: function(response){
                    cancion = response;

                    $.ajax({
                        type: 'POST',
                        url: '/getContenido',
                        success: function(respuesta) {
                            var data = respuesta.split("\n");
                
                            var numeroASumar = 0;
                            var numPalabras = parseInt(data[2]);
                            var numeroCanciones = (numPalabras-18)/4;
                            var numImagenes = parseInt(data[21 + numeroCanciones * 4]);

                            for(var i = 0; i < idioma ;i++){
                                numeroASumar = numeroASumar + numPalabras + 2 + numImagenes + 1; 
                            }
                
                            $('#tituloNavegador').text(data[6 + numeroASumar]);
                            $('#dropdownMenuButton').text(data[3 + numeroASumar]);
                            $('#titulo').text(data[6 + numeroASumar]);

                            var numeroIdiomas = parseInt(data[0]);
                            var posicion = 4;
                            for(var i = 0; i < numeroIdiomas; i++){
                    
                                var cadenaAIntroducir = '<button class="dropdown-item" id="idioma'+ String(i) + '">'+ data[posicion] +'</a>'
                                $("#dropdownMenu").append(cadenaAIntroducir);

                                posicion = posicion + numPalabras + 2 + numImagenes + 1;
                            }


                            var tarjetaCancion = '<div class="card text-center text-white bg-danger mb-3" style="width:20%; height:600px;  margin-left: 40%;" > <img class="card-img-top" src=""><div class="card-body"><h4 class="card-title" id="tituloCancion" ></h4><p class="card-text" id="artista"></p><p class="card-text" id="ano"></p><p class="card-text" id="duracion"></p></div></div>';
                             
                            $('#cancionTarjeta').append(tarjetaCancion);
                            

                            contador = 21 + numeroASumar + 4*cancion;

                                
                            $("#tituloCancion").text(data[contador]);
                            contador++;
                            $("#artista").text(data[12+numeroASumar]+':  '+data[contador]);
                            contador++;
                            $("#ano").text(data[13+numeroASumar]+':  '+data[contador]);
                            contador++;
                            $("#duracion").text(data[14+numeroASumar]+':  '+data[contador]);
                            contador++;
                            $('#volverBoton').text(data[18 + numeroASumar]);

                            
                            
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
        }, error:function() {
            console.log("No se ha podido obtener la información");
        }
    });
}

function cambiaIdioma(event){
    var idioma = parseInt(event.target.id.substr(6));
    $.ajax({
        type: 'POST',
        url: '/cancionVerMas',
        success: function(respuesta) {
            var cancion = respuesta;
            $.ajax({
                type: 'POST',
                url: '/getContenido',
                success: function(respuesta) {
                    var data = respuesta.split("\n");

                    var numeroASumar = 0;
                    var numPalabras = parseInt(data[2]);
                    var numeroCanciones = (numPalabras-18)/4;
                    var numImagenes = parseInt(data[21 + numeroCanciones * 4]);

                    for(var i = 0; i < idioma ;i++){
                        console.log(numPalabras);
                        numeroASumar = numeroASumar + numPalabras + 2 + numImagenes + 1;
                        
                    }

                    $('#tituloNavegador').text(data[5 + numeroASumar]);
                    $('#dropdownMenuButton').text(data[3 + numeroASumar]);
                    $('#titulo').text(data[6 + numeroASumar]);
                    $('#accederBiblio').text(data[7 + numeroASumar]);       
                    
                    
                    contador = 21 + numeroASumar + 4*cancion;

                                 
                    $("#tituloCancion").text(data[contador]);
                    contador++;
                    $("#artista").text(data[12+numeroASumar]+':  '+data[contador]);
                    contador++;
                    $("#ano").text(data[13+numeroASumar]+':  '+data[contador]);
                    contador++;
                    $("#duracion").text(data[14+numeroASumar]+':  '+data[contador]);
                    contador++;
                    $('#volverBoton').text(data[18 + numeroASumar]);

                    
                },
                error: function() {
                    console.log("No se ha podido obtener la información");
                }
            });

            $.ajax({
                url: '/cambiaIdioma',
                data: {idiomaId: idioma}
            });
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}


