/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mes_actual;
var hour = 8;
var min = 30;
var responses;
var num_mes;
var num_dia;
var fecha = new Date();

var fechaReservaIni = new Date();
var fechaReservaFin = new Date();
var selecIndex;

var houIniSegundoTurno = 15;
var hourFinSegundoTurno = 30;

window.onload = function () {
    
    var fecha_mes = new Date();
    var mes = fecha_mes.getMonth();
    imprimirMes(mes);
    mes_actual = mes;
    $("#form").slideUp();


};
function menosMes() {
     var mesActual = fecha.getMonth();
     
     if(mesActual < mes_actual){
    mes_actual--;
    imprimirMes(mes_actual);
     }
}
function masMes() {
    mes_actual++;
    imprimirMes(mes_actual);
}

//Colocar esto, dentro del funcionamiento interno del objeto calendario
function imprimirMes(mes) {
    var arrayMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


    fecha_año = new Date();
    año = fecha_año.getFullYear();

    var fecha = new Date(año, mes, 1);
    //pillo el ultimo dia del mes anterior, cogiendo asi cuantos dias tiene el mes
    var fecha_2 = new Date(año, mes + 1, 0);
    num_dias_mes = fecha_2.getDate();
    switch (fecha.getDay()) {
        case 0:
            DialDelMesEmpiesa = 7;
            break;
        case 1:
            DialDelMesEmpiesa = 1;
            break;
        case 2:
            DialDelMesEmpiesa = 2;
            break;
        case 3:
            DialDelMesEmpiesa = 3;
            break;
        case 4:
            DialDelMesEmpiesa = 4;
            break;
        case 5:
            DialDelMesEmpiesa = 5;
            break;
        case 6:
            DialDelMesEmpiesa = 6;
            break;
    }
    var calendario = new Calendario(arrayMeses[mes], DialDelMesEmpiesa, num_dias_mes);
    calendario.crearMes();
}

function selectMes(dia, mes) {
    num_mes = numMes(mes.id);
    num_dia = dia;
    printHour("Turno de mañanan " + dia + " de " + mes.id);
    hour = 15;
    min = 30;
    printHour("Turno de tarde " + dia + " de " + mes.id);


}
function selectHour(horaTer, minTer, hourIni, minIni) {
    alert(hourIni + ":" + minIni + ", " + horaTer + ":" + minTer);

    fechaReservaIni.setMonth(num_mes);
    fechaReservaIni.setDate(num_dia);
    fechaReservaIni.setHours(hourIni);
    fechaReservaIni.setMinutes(minIni);

    fechaReservaFin.setMonth(num_mes);
    fechaReservaFin.setDate(num_dia);
    fechaReservaFin.setHours(horaTer);
    fechaReservaFin.setMinutes(minTer);




    $("#conten").slideToggle();
    responce();
    $("#form").slideToggle();
    //montar objeto 
    //name
    //fecha
    // hora ini
    //Hora fin
    //descripcio
    // id elemento



}

function numMes(mes) {
    switch (mes) {
        case "Enero":
            MesIs = 0;
            break;
        case "Febrero":
            MesIs = 1;
            break;
        case "Marzo":
            MesIs = 2;
            break;
        case "Abril":
            MesIs = 3;
            break;
        case "Mayo":
            MesIs = 4;
            break;
        case "Junio":
            MesIs = 5;
            break;
        case "Julio":
            MesIs = 6;
            break;
        case "Agosto":
            MesIs = 7;
            break;
        case "Septiembre":
            MesIs = 8;
            break;
        case "Octubre":
            MesIs = 9;
            break;
        case "Noviembre":
            MesIs = 10;
            break;
        case "Diciembre":
            MesIs = 11;
            break;
    }
    return MesIs;
}


function responce() {
     var elemento = {
        fechaReservaIni: fechaReservaIni,
        fechaReservaFin: fechaReservaFin
    };
    var elemenJson = JSON.stringify(elemento);
    var parametro = {
        "data": elemenJson
    };
    $.ajax({
        data: parametro, //datos que se envian a traves de ajax
        url: '../php/phpBDDReserva.php', //archivo que recibe la peticion
        type: 'GET', //método de envio
        //dataType: "json",
        beforeSend: function () {
            $("#res_au_tabla_reserv").html('<h1>Cargando...</h1>');
        },
        success: function (responces) {
             //$("#res_au_tabla_reserv").html(responces);
            responses = JSON.parse(responces);
            crearTabla("res_au_tabla_reserv", "ssdssd", "Elements");
        }
    });
}
function crearTabla(idTablaconte, idTabla, caption) {
    // hacer una llamada para optener todos los ids reservados para una cierta hora
    document.getElementById(idTablaconte).innerHTML = "";
    var mi_etiqueta_table = document.createElement("table");
    mi_etiqueta_table.setAttribute("id", "idTabla");
    document.getElementById(idTablaconte).appendChild(mi_etiqueta_table);
    captio = document.createElement("caption");
    var Caption = document.createTextNode(caption);
    captio.appendChild(Caption);
    mi_etiqueta_table.appendChild(captio);

    var mi_etiqueta_tr = document.createElement("tr");

    for (var nameAtribute in  responses[0]) {
        var campo = document.createTextNode(nameAtribute);
        var mi_etiqueta_th = document.createElement("th");
        mi_etiqueta_th.appendChild(campo);
        mi_etiqueta_tr.appendChild(mi_etiqueta_th);
    }
    mi_etiqueta_table.appendChild(mi_etiqueta_tr);

    for (var dentro in responses) {
        var mi_etiqueta_tr = document.createElement("tr");
        mi_etiqueta_tr.setAttribute("class", "pulsar");
        for (var den in  responses[dentro]) {
            var data = document.createTextNode(responses[dentro][den]);
            var mi_etiqueta_td = document.createElement("td");
            mi_etiqueta_td.appendChild(data);
            mi_etiqueta_tr.appendChild(mi_etiqueta_td);
        }
        if ("id") {

        }
        mi_etiqueta_tr.setAttribute('onclick', 'funcionaReserva(' + dentro + ')');
        mi_etiqueta_tr.appendChild(mi_etiqueta_td);
        mi_etiqueta_table.appendChild(mi_etiqueta_tr);
    }
    // ---------------------ver si puedes hacer el metodo onclick en el TR preguntar al profesor si esta mal no usar punteros los escuchadores

}

function funcionaReserva(num) {
    selecIndex = num;
    var info = document.getElementById("info_reserva");
    document.getElementById("info_reserva").innerHTML = "";
    var txt_info = document.createTextNode("Seleccionado: " + responses[num]["name"]);
    info.appendChild(txt_info);
    alert(fechaReservaIni);
    alert(fechaReservaFin);




}
function openPage(url){
    window.location.replace(url);
}
function submit() {
    var description = document.formAltaReserva.descripcion.value;
//    fechaReservaIni.setHours(fechaReservaIni.getHours()-fechaReservaIni.getTimezoneOffset()/60);
//    fechaReservaIni.setMinutes(fechaReservaIni.getMinutes()-fechaReservaIni.getTimezoneOffset()/60);
//    
//    
//    fechaReservaFin.setHours(fechaReservaFin.getHours()-fechaReservaFin.getTimezoneOffset()/60);
//    fechaReservaFin.setMinutes(fechaReservaFin.getMinutes()-fechaReservaFin.getTimezoneOffset()/60);
    var elemento = {
        id: responses[selecIndex]["id"],
        nombreElemento: "prueba",
        fechaReservaIni: fechaReservaIni,
        fechaReservaFin: fechaReservaFin,
        description: description
    };
    var elemenJson = JSON.stringify(elemento);
    var parametro = {
        "elemenJsonUpdateReserva": elemenJson
    };
    $.ajax({
        data: parametro, //datos que se envian a traves de ajax
        url: '../php/phpBDDReserva.php', //archivo que recibe la peticion
        type: 'GET', //método de envio
        //dataType: "json",
        beforeSend: function () {
            $("#finalReserv").html('<h1>Cargando...</h1>');
        },
        success: function (responces) {
            var ruta = "'../index.html'";
            $("#finalReserv").html('<h1>'+responces+'</h1><br> <button onclick="openPage('+ruta+')">Reservar</button>');
            
        }
    });

}