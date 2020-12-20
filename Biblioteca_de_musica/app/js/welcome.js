$(function(){
    getContent();
    $("body").on('click', '.dropdown-menu button', cambiaIdioma);
    
});

function getContent(){
    $.ajax({
        type: 'POST',
        url: '/getContenido',
        success: function(respuesta) {
            var data = respuesta.split("\n");
            $('#tituloNavegador').text(data[5]);
            $('#dropdownMenuButton').text(data[3]);
            $('#titulo').text(data[6]);
            $('#accederBiblio').text(data[7]);

            var numeroIdiomas = parseInt(data[0]);
            var posicion = 4;
            for(var i = 0; i < numeroIdiomas; i++){
                
                var numPalabras = parseInt(data[2]);
    
                var cadenaAIntroducir = '<button class="dropdown-item" id="idioma'+ String(i) + '">'+ data[posicion] +'</a>'
                $("#dropdownMenu").append(cadenaAIntroducir);

                posicion = posicion + numPalabras + 2;
            }
            
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
            for(var i = 0; i < idioma ;i++){
                var numPalabras = parseInt(data[2]);
                numeroASumar = numeroASumar + numPalabras + 2;
                
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
    
}