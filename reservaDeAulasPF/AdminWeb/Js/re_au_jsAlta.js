/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function aceptar() {
    var nombreElemento = document.res_au_formulario_admin.nombre.value;
    var tipoElemento = document.res_au_formulario_admin.tipo.value;
    var descriptiom = document.getElementById("textArea_form").value;
    var elemento = {
        nombreElemento: nombreElemento,
        tipoElemento: tipoElemento,
        descriptionElemento: descriptiom
    };
    var elemenJson = JSON.stringify(elemento);
    var parametro = {
        "elemenJsonInsert": elemenJson
    };
    $.ajax({
        data: parametro,
        url: '../php/phpBDD.php',
        type: 'GET',
        //dataType: "json",
        beforeSend: function () {
            $("#res_au_button").html('<h1>Cargando...</h1>');
        },
        success: function (response) { 
             $("#res_au_button").html(response);
        }
    });


}
function eliminar() {}
function modificar() {}
function responce() {
    
    //hacer tabla
     var parametro = {
        "data": "getData"
    };
    $.ajax({
        data: parametro, //datos que se envian a traves de ajax
        url: '../php/phpBDD.php', //archivo que recibe la peticion
        type: 'GET', //método de envio
        //dataType: "json",
        beforeSend: function () {
            $("#res_au_button").html('<h1>Cargando...</h1>');
        },
        success: function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            // $("#res_au_button").html(response);
        }
    });
}
