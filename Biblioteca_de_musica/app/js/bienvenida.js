$(function(){
    getContent();
    $("body").on('click', '.dropdown-menu button', cambiaIdioma);
    
});

function getContent(){
    $.ajax({
        type: 'POST',
        url: '/idioma',
        success: function(response){
            var idioma = parseInt(response.idiomaId);
            console.log(idioma);

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

                    var numeroIdiomas = parseInt(data[0]);
                    var posicion = 4;
                    for(var i = 0; i < numeroIdiomas; i++){
            
                        var cadenaAIntroducir = '<button class="dropdown-item" id="idioma'+ String(i) + '">'+ data[posicion] +'</a>'
                        $("#dropdownMenu").append(cadenaAIntroducir);

                        posicion = posicion + numPalabras + 2 + numImagenes + 1;
                    }
                    
                },
                error: function() {
                    console.log("No se ha podido obtener la información");
                }
            });
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });

}

function cambiaIdioma(event){
    var idioma = parseInt(event.target.id.substr(6));
    

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