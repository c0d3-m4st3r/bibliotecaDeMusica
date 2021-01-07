$(function(){
    getContent();
    $("body").on('click', '.dropdown-menu button', cambiaIdioma);
    $('#enviarAnadir').on('click', anadirCancion);
    $("body").on('click', '.eliminarConfirmacion' ,eliminarCancion);
    $("body").on('click', '.editarConfirmacion' ,modificar);
    $("body").on('click', '.verMas' ,verMas);
});

function getContent(){
    $.ajax({
        type: 'POST',
        url: '/idioma',
        success: function(response){
            var idioma = parseInt(response.idiomaId);

            $.ajax({
                type: 'POST',
                url: '/getContenido',
                success: function(respuesta) {
                    var data = respuesta.split("\n");
        
                    var numeroASumar = 0;
                    var numPalabras = parseInt(data[2]);
                    var numeroCanciones = (numPalabras-22)/4;
                    var numImagenes = parseInt(data[25 + numeroCanciones * 4]);
                    
                    console.log(numImagenes);

                    for(var i = 0; i < idioma ;i++){
                        numeroASumar = numeroASumar + numPalabras + 2 + numImagenes + 1; 
                    }
        
                    $('#tituloNavegador').text(data[6 + numeroASumar]);
                    $('#dropdownMenuButton').text(data[3 + numeroASumar]);
                    $('#titulo').text(data[6 + numeroASumar]);
                    $('#anadir').text(data[8 +numeroASumar]);

                    $('#tituloModalAnadir').text(data[8 +numeroASumar]);

                    $('#labelNombreCancionAnadir').text(data[11 + numeroASumar]);
                    $('#labelArtistaCancionAnadir').text(data[12 + numeroASumar]);
                    $('#labelDuracionCancionAnadir').text(data[14 + numeroASumar]);
                    $('#labelAnoCancionAnadir').text(data[13 + numeroASumar]);

                    $('#cerrarAnadir').text(data[18+numeroASumar]);
                    $('#enviarAnadir').text(data[8+numeroASumar]);

                    $('#alertaNombre').text(data[21 + numeroASumar]);
                    $('#alertaArtista').text(data[22 + numeroASumar]);
                    $('#alertaDuracion').text(data[23 + numeroASumar]);
                    $('#alertaAno').text(data[24 + numeroASumar]);

                    var numeroIdiomas = parseInt(data[0]);
                    var posicion = 4;
                    for(var i = 0; i < numeroIdiomas; i++){
            
                        var cadenaAIntroducir = '<button class="dropdown-item" id="idioma'+ String(i) + '">'+ data[posicion] +'</a>'
                        $("#dropdownMenu").append(cadenaAIntroducir);

                        posicion = posicion + numPalabras + 2 + numImagenes + 1;
                    }

                    
                    var contadorDeck = 0;

                    for(var i = 0; i < numeroCanciones ;i++){
                        if(i==0){
                            $('#agrupamientoTarjetas').append('<div class="card-deck" id="deck0">');
                        }else if(i%3 == 0){
                            contadorDeck++;
                            $('#agrupamientoTarjetas').append('</div><div class="card-deck" id="deck'+String(contadorDeck)+'">');
                            
                        }

                        var formularioModalEditar = '<div class="form-group"><label for="nombreCancionEditar'+ String(i) + '" id="labelNombreCancionEditar'+ String(i) + '"></label><input type="text" class="form-control" id="nombreCancionEditar'+ String(i) + '" placeholder="Despacito"><div class="alert alert-danger" role="alert" id="alertaNombre'+ String(i) + '"></div></div><div class="form-group"><label for="artistaCancionEditar'+ String(i) + '" id="labelArtistaCancionEditar'+ String(i) + '"></label><input type="text" class="form-control" id="artistaCancionEditar'+ String(i) + '" placeholder="Luis Fonsi"><div class="alert alert-danger" role="alert" id="alertaArtista'+ String(i) + '"></div></div><div class="form-group"><label for="duracionCancionEditar'+ String(i) + '" id="labelDuracionCancionEditar'+ String(i) + '"></label><input type="text" class="form-control" id="duracionCancionEditar'+ String(i) + '" placeholder="4:31"><div class="alert alert-danger" role="alert" id="alertaDuracion'+ String(i) + '"></div></div><div class="form-group"><label for="anoCancionEditar'+ String(i) + '" id="labelAnoCancionEditar'+ String(i) + '"></label><input type="text" class="form-control" id="anoCancionEditar'+ String(i) + '" placeholder="2018"><div class="alert alert-danger" role="alert" id="alertaAno'+ String(i) + '"></div></div>';  

                        var modalEditar = '<div class="modal" tabindex="-1" id="editarModal'+ String(i) + '"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title tituloEditar" style="color: black;" id="tituloEditar'+ String(i) + '"></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+ formularioModalEditar +'</div><div class="modal-footer"><button type="button" class="btn btn-secondary cancelarEnviar" data-dismiss="modal" id="cancelarEnviar'+ String(i) +'"></button><button type="button" class="btn btn-danger editarConfirmacion" id="editarConfirmacion'+ String(i) + '"></button></div></div></div></div>';

                        var cadenaAIntroducir = '<div class="card text-center text-white bg-danger mb-3" style="width:400px"> <img class="card-img-top" src=""><div class="card-body"><h4 class="card-title" id="tituloCancion'+ String(i) + '"></h4><p class="card-text" id="artista'+ String(i) + '"></p><p class="card-text" id="ano'+ String(i) + '"></p><p class="card-text" id="duracion'+ String(i) + '"></p><button type="button" class="btn btn-dark verMas" style="margin-right: 10px;" id="verMas'+ String(i) + '"></button><button class="text-white btn btn-info" style="margin-right: 10px;" id="modificar'+ String(i) + '" data-toggle="modal" data-target="#editarModal'+ String(i) + '"></button><button class="btn btn-secondary" id="eliminar'+ String(i) + '" data-toggle="modal" data-target="#eliminarModal'+ String(i) + '"></button> <div class="modal" tabindex="-1" id="eliminarModal'+ String(i) + '"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title tituloEliminar" style="color: black;" id="tituloEliminar'+ String(i) + '"></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p class="deseaEliminar" style="color: black;" id="deseaEliminar'+ String(i) + '"></p></div><div class="modal-footer"><button type="button" class="btn btn-secondary cancelarEliminar" data-dismiss="modal" id="cancelarEliminar'+ String(i) + '"></button><button type="button" class="btn btn-danger eliminarConfirmacion" id="eliminarConfirmacion'+ String(i) + '"></button></div></div></div></div></div></div>' + modalEditar;
                        $('#deck' + String(contadorDeck)).append(cadenaAIntroducir);
                        
                    }
                    $('#agrupamientoTarjetas').append('</div>');

                    contador = 25 + numeroASumar;

                    for(var i = 0; i < numeroCanciones ;i++){
                        
                        $("#tituloCancion"+ String(i)).text(data[contador]);
                        contador++;
                        $("#artista"+ String(i)).text(data[12+numeroASumar]+':  '+data[contador]);
                        contador++;
                        $("#ano"+ String(i)).text(data[13+numeroASumar]+':  '+data[contador]);
                        contador++;
                        $("#duracion"+ String(i)).text(data[14+numeroASumar]+':  '+data[contador]);
                        contador++;
                        $("#verMas"+ String(i)).text(data[15+numeroASumar]);
                        $("#modificar"+ String(i)).text(data[17+numeroASumar]);
                        $("#eliminar"+ String(i)).text(data[16+numeroASumar]);
                        $('#volverBoton').text(data[18 + numeroASumar]);

                        $('#tituloEditar'+ String(i)).text(data[9+numeroASumar]);
                        $('#labelNombreCancionEditar'+ String(i)).text(data[11+numeroASumar]);
                        $('#labelArtistaCancionEditar'+ String(i)).text(data[12+numeroASumar]);
                        $('#labelDuracionCancionEditar'+ String(i)).text(data[14+numeroASumar]);
                        $('#labelAnoCancionEditar'+ String(i)).text(data[13+numeroASumar]);

                        $('#cancelarEnviar'+String(i)).text(data[18+numeroASumar]);
                        $('#editarConfirmacion'+String(i)).text(data[10+numeroASumar]);

                        $('#alertaNombre'+String(i)).text(data[21 + numeroASumar]);
                        $('#alertaArtista'+String(i)).text(data[22 + numeroASumar]);
                        $('#alertaDuracion'+String(i)).text(data[23 + numeroASumar]);
                        $('#alertaAno'+String(i)).text(data[24 + numeroASumar]);

                        $('#tituloEliminar'+String(i)).text(data[19+numeroASumar]);
                        $('#deseaEliminar'+String(i)).text(data[20+numeroASumar]);
                        $('#cancelarEliminar'+String(i)).text(data[18+numeroASumar]);
                        $('#eliminarConfirmacion'+String(i)).text(data[16+numeroASumar]);



                    }
                    $('.alert').hide();
                    
                    
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
            $('#anadir').text(data[8 +numeroASumar]);  
            
            $('#tituloModalAnadir').text(data[8 +numeroASumar]);

            $('#labelNombreCancionAnadir').text(data[11 + numeroASumar]);
            $('#labelArtistaCancionAnadir').text(data[12 + numeroASumar]);
            $('#labelDuracionCancionAnadir').text(data[14 + numeroASumar]);
            $('#labelAnoCancionAnadir').text(data[13 + numeroASumar]);

            $('#cerrarAnadir').text(data[18+numeroASumar]);
            $('#enviarAnadir').text(data[8+numeroASumar]);

            $('#alertaNombre').text(data[21 + numeroASumar]);        
            $('#alertaArtista').text(data[22 + numeroASumar]);
            $('#alertaDuracion').text(data[23 + numeroASumar]);
            $('#alertaAno').text(data[24 + numeroASumar]);
            
            contador = 25 + numeroASumar;

            for(var i = 0; i < numeroCanciones ;i++){
                
                        
                $("#tituloCancion"+ String(i)).text(data[contador]);
                contador++;
                $("#artista"+ String(i)).text(data[12+numeroASumar]+':  '+data[contador]);
                contador++;
                $("#ano"+ String(i)).text(data[13+numeroASumar]+':  '+data[contador]);
                contador++;
                $("#duracion"+ String(i)).text(data[14+numeroASumar]+':  '+data[contador]);
                contador++;
                $("#verMas"+ String(i)).text(data[15+numeroASumar]);
                $("#modificar"+ String(i)).text(data[17+numeroASumar]);
                $("#eliminar"+ String(i)).text(data[16+numeroASumar]);
                $('#volverBoton').text(data[18 + numeroASumar]);

                $('#tituloEditar'+ String(i)).text(data[9+numeroASumar]);
                $('#labelNombreCancionEditar'+ String(i)).text(data[11+numeroASumar]);
                $('#labelArtistaCancionEditar'+ String(i)).text(data[12+numeroASumar]);
                $('#labelDuracionCancionEditar'+ String(i)).text(data[14+numeroASumar]);
                $('#labelAnoCancionEditar'+ String(i)).text(data[13+numeroASumar]);

                $('#cancelarEnviar'+String(i)).text(data[18+numeroASumar]);
                $('#editarConfirmacion'+String(i)).text(data[10+numeroASumar]);

                $('#tituloEliminar'+String(i)).text(data[19+numeroASumar]);
                $('#deseaEliminar'+String(i)).text(data[20+numeroASumar]);
                $('#cancelarEliminar'+String(i)).text(data[18+numeroASumar]);
                $('#eliminarConfirmacion'+String(i)).text(data[16+numeroASumar]);

                $('#alertaNombre'+String(i)).text(data[21 + numeroASumar]);
                $('#alertaArtista'+String(i)).text(data[22 + numeroASumar]);
                $('#alertaDuracion'+String(i)).text(data[23 + numeroASumar]);
                $('#alertaAno'+String(i)).text(data[24 + numeroASumar]);

            }

            $('.alert').hide();

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

function anadirCancion(){
    var seEnvia = true;

    if(!$('#nombreCancionAnadir').val()){
        $('#alertaNombre').show();
        seEnvia = false;
    }

    if(!$('#artistaCancionAnadir').val()){
        $('#alertaArtista').show();
        seEnvia = false;
    }

    if(!$('#duracionCancionAnadir').val()){
        $('#alertaDuracion').show();
        seEnvia = false;
    }
    if(!$('#anoCancionAnadir').val()){
        $('#alertaAno').show();
        seEnvia = false;
    }

    if(seEnvia){
        $.ajax({
            url: '/guardaCancion',
            data: { nombre: $('#nombreCancionAnadir').val(),
                    artista: $('#artistaCancionAnadir').val(),
                    duracion: $('#duracionCancionAnadir').val(),
                    ano: $('#anoCancionAnadir').val()},
            success: function(res){
                if(res == 'ok'){
                    location.reload();
                }
            },error: function() {
                console.log("No se ha podido enviar la información");
            }
        });
    }
}

function eliminarCancion(event){
    var cancion = parseInt(event.target.id.substr(20));
    console.log(cancion);

    $.ajax({
        url: '/eliminarCancion',
        data: { idCancion: cancion },
        success: function(res){
            if(res == 'ok'){
                location.reload();
            }
        },error: function() {
            console.log("No se ha podido enviar la información");
        }
    });

}

function verMas(event){
    var cancion = parseInt(event.target.id.substr(6));

    $.ajax({
        url: '/verMas',
        data: { idCancion: cancion },
        success: function(res){
            if(res == 'ok'){
                window.location.href = "http://localhost:8080/verMas.html";
            }
        },error: function() {
            console.log("No se ha podido enviar la información");
        }
    });

}

function modificar(event){
    var cancion = parseInt(event.target.id.substr(18));

    var seEnvia = true;

    if(!$('#nombreCancionEditar'+String(cancion)).val()){
        $('#alertaNombre'+String(cancion)).show();
        seEnvia = false;
    }

    if(!$('#artistaCancionEditar'+String(cancion)).val()){
        $('#alertaArtista'+String(cancion)).show();
        seEnvia = false;
    }

    if(!$('#duracionCancionEditar'+String(cancion)).val()){
        $('#alertaDuracion'+String(cancion)).show();
        seEnvia = false;
    }
    if(!$('#anoCancionEditar'+String(cancion)).val()){
        $('#alertaAno'+String(cancion)).show();
        seEnvia = false;
    }



    if(seEnvia){
        $.ajax({
            url: '/editarCancion',
            data: { nombre: $('#nombreCancionEditar'+String(cancion)).val(),
                    artista: $('#artistaCancionEditar'+String(cancion)).val(),
                    duracion: $('#duracionCancionEditar'+String(cancion)).val(),
                    ano: $('#anoCancionEditar'+String(cancion)).val(),
                    idCancion: cancion},
            success: function(res){
                if(res == 'ok'){
                    location.reload();
                }
            },error: function() {
                console.log("No se ha podido enviar la información");
            }
        });
    }

}