/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mes_actual;
var hour = 8;
var min = 30;
var responses;

var houIniSegundoTurno = 15;
var hourFinSegundoTurno = 30;

var reserva;//objeto reserva
window.onload = function () {
    responce();
    var fecha_mes = new Date();
    var mes = fecha_mes.getMonth();
    imprimirMes(mes);
    mes_actual = mes;
      $("#form").slideUp();


};
function menosMes() {
    mes_actual--;
    imprimirMes(mes_actual);
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
    var num_mes = numMes(mes.id);
    var fecha_seleccionada = new Date();
    fecha_seleccionada.setMonth(num_mes);
    fecha_seleccionada.setDate(dia);
    fecha_seleccionada;
    printHour("Turno de mañanan " + dia + " de " + mes.id);
    hour = 15;
    min = 30;
    printHour("Turno de tarde " + dia + " de " + mes.id);


}
function selectHour(horaTer, minTer, hourIni, minIni) {
    alert(hourIni + ":" + minIni + ", " + horaTer + ":" + minTer);

       
            $("#conten").slideToggle();
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

function submit(){
    //name
    //fecha
    // hora ini
    //Hora fin
    //descripcio
    // id elemento
    
}

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
            $("#res_au_tabla_reserv").html('<h1>Cargando...</h1>');
        },
        success: function (responces) {
             responses = JSON.parse(responces);   
            crearTabla("res_au_tabla_reserv", "ssdssd", "Elements");
        }
    });
}
function crearTabla(idTablaconte, idTabla, caption) {
   // hacer una llamada para optener todos los ids reservados para una cierta hora
    document.getElementById(idTablaconte).innerHTML = "";
    var mi_etiqueta_table = document.createElement("table");
     mi_etiqueta_table.setAttribute("id","idTabla");
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
        mi_etiqueta_tr.setAttribute("class","pulsar");
        for (var den in  responses[dentro]) {
            var data = document.createTextNode(responses[dentro][den]);
            var mi_etiqueta_td = document.createElement("td");
            mi_etiqueta_td.appendChild(data);
            mi_etiqueta_tr.appendChild(mi_etiqueta_td);
        }
        if("id"){
            
        }
        mi_etiqueta_tr.setAttribute('onclick', 'funciona('+dentro+')');
        mi_etiqueta_tr.appendChild(mi_etiqueta_td);
        mi_etiqueta_table.appendChild(mi_etiqueta_tr);
    }
    // ---------------------ver si puedes hacer el metodo onclick en el TR preguntar al profesor si esta mal no usar punteros los escuchadores

}

