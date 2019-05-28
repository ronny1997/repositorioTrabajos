/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mes_actual;
var hour = 8;
var min = 30;
var reserva;//objeto reserva
window.onload = function () {
    var fecha_mes = new Date();
    var mes = fecha_mes.getMonth();
    imprimirMes(mes);
    mes_actual = mes;


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
    printHour(dia+" de "+mes.id);
}
function selectHour(){
    
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



