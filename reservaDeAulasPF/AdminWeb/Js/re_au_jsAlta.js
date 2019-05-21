/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var response;
window.onload = function() {
responce();
};

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
        success: function (responseInsert) {
            $("#res_au_button").html(responseInsert);
        }
    });


}
function eliminar() {}
function modificar() {}
//activar json y ver q sale
function responce() {
    var parametro = {
        "data": "getData"
    };
    $.ajax({
        data: parametro, //datos que se envian a traves de ajax
        url: '../php/phpBDD.php', //archivo que recibe la peticion
        type: 'GET', //método de envio
        //dataType: "json",
        beforeSend: function () {
            $("#res_au_tabla_data").html('<h1>Cargando...</h1>');
        },
        success: function (responce) {
             response = JSON.parse(responce);   
            crearTabla("res_au_tabla_data", "ssdssd", "Elements");
        }
    });
}
function crearTabla(idTablaconte, idTabla, caption) {
    document.getElementById(idTablaconte).innerHTML = "";
    var mi_etiqueta_table = document.createElement("table");
    var id = document.createAttribute("id");
    id.value = idTabla;
    mi_etiqueta_table.setAttributeNode(id);
    document.getElementById(idTablaconte).appendChild(mi_etiqueta_table);
    captio = document.createElement("caption");
    var Caption = document.createTextNode(caption);
    captio.appendChild(Caption);
    mi_etiqueta_table.appendChild(captio);
    
    var mi_etiqueta_tr = document.createElement("tr");

    for (var nameAtribute in  response[0]) {
        var campo = document.createTextNode(nameAtribute);
        var mi_etiqueta_th = document.createElement("th");
        mi_etiqueta_th.appendChild(campo);
        mi_etiqueta_tr.appendChild(mi_etiqueta_th);
    }
    mi_etiqueta_table.appendChild(mi_etiqueta_tr);
    
    for (var dentro in response) {
        var mi_etiqueta_tr = document.createElement("tr");
        for (var den in  response[dentro]) {
            var data = document.createTextNode(response[dentro][den]);
            var mi_etiqueta_td = document.createElement("td");
            mi_etiqueta_td.appendChild(data);
            mi_etiqueta_tr.appendChild(mi_etiqueta_td);
        }
        mi_etiqueta_tr.setAttribute('onclick', 'funciona('+dentro+')');
        mi_etiqueta_tr.appendChild(mi_etiqueta_td);
        mi_etiqueta_table.appendChild(mi_etiqueta_tr);
    }
    // ____________________________________---------------------------------------ver si puedes hacer el metodo onclick en el TR preguntar al profesor si esta mal no usar punteros los escuchadores

}
function funciona(selec) {
    alert(response[0]["id"]);
    
    document.res_au_formulario_admin.nombre.value = response[selec]["name"];
     document.res_au_formulario_admin.tipo.value = response[selec]["type"];
    document.getElementById("textArea_form").value = response[selec]["description"];
    
    
    
}