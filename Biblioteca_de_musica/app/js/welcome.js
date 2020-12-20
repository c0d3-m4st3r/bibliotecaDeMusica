$(function(){
    getContent();
    
});

function getContent(){
    $.ajax({
        type: 'POST',
        url: '/getContenido',
        success: function(respuesta) {
            var data = respuesta.split("\n");
            $('#tituloNavegador').text(data[6]);
            $('#dropdownMenuButton').text(data[3]);
            $('#titulo').text(data[7]);
            $('#accederBiblio').text(data[8]);

            var numeroIdiomas = parseInt(data[0]);

            for(var i = 0; i < numeroIdiomas; i++){
                $("#dropdownMenu").append('<a class="dropdown-item" href="#" id="#idioma2">'+ data[4+i] +'</a>');
            }
            
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}