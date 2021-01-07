$(function(){
    getContent();
    $("body").on('click', '.dropdown-menu button', cambiaIdioma);
});

function getContent(){
    $.ajax({
        type: 'POST',
        url: '/idioma',
        success: function(response){
            let idioma = parseInt(response.idiomaId);
            console.log(idioma);

            $.ajax({
                type: 'POST',
                url: '/cancionVerMas',
                success: function(response){
                    let cancion = parseInt(response);

                    $.ajax({
                        type: 'POST',
                        url: '/getContenido',
                        success: function(respuesta) {
                            var data = respuesta.split("\n");
                
                            var numeroASumar = 0;
                            var numPalabras = parseInt(data[2]);
                            var numeroCanciones = (numPalabras-22)/4;
                            var numImagenes = parseInt(data[25 + numeroCanciones * 4]);

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

                            var imagenCancion = '';
                            var tarjetaCancion = '';

                            if((cancion) < numImagenes){
                                var imagenCancion = cancion + 1 + 25 + numeroCanciones*4 +numeroASumar;
                                tarjetaCancion = '<div class="card text-center text-white bg-danger mb-3" style="width:20%; height:600px;  margin-left: 40%;" > <img class="card-img-top" id="imagenCancion" src="'+ data[imagenCancion] +'" style="max-height: 70%;"><div class="card-body"><h4 class="card-title" id="tituloCancion" ></h4><p class="card-text" id="artista"></p><p class="card-text" id="ano"></p><p class="card-text" id="duracion"></p></div></div>';

                            }else{
                                tarjetaCancion = '<div class="card text-center text-white bg-danger mb-3" style="width:20%; height:600px;  margin-left: 40%;" > <img class="card-img-top" id="imagenCancion" src=""><div class="card-body"><h4 class="card-title" id="tituloCancion" ></h4><p class="card-text" id="artista"></p><p class="card-text" id="ano"></p><p class="card-text" id="duracion"></p></div></div>';

                            }
                                                         
                            $('#cancionTarjeta').append(tarjetaCancion);
                            

                            contador = 25 + numeroASumar + 4*cancion;

                                
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
            var cancion = parseInt(respuesta);
            $.ajax({
                type: 'POST',
                url: '/getContenido',
                success: function(respuesta) {
                    var data = respuesta.split("\n");

                    var numeroASumar = 0;
                    var numPalabras = parseInt(data[2]);
                    var numeroCanciones = (numPalabras-22)/4;
                    var numImagenes = parseInt(data[25 + numeroCanciones * 4]);

                    for(var i = 0; i < idioma ;i++){
                
                        numeroASumar = numeroASumar + numPalabras + 2 + numImagenes + 1;
                        
                    }

                    $('#tituloNavegador').text(data[5 + numeroASumar]);
                    $('#dropdownMenuButton').text(data[3 + numeroASumar]);
                    $('#titulo').text(data[6 + numeroASumar]);
                    $('#accederBiblio').text(data[7 + numeroASumar]);       
                    
                    if((cancion) < numImagenes){
                        contador = 25 + numeroASumar + 4*cancion;
                        var imagenCancion = cancion + 1 + 25 + numeroCanciones*4 +numeroASumar;

                        $("#imagenCancion").attr("src",data[imagenCancion]);
                    }

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


