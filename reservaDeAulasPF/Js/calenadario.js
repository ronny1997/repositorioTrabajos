/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function () {
    var arrayMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];




    for (var i = 0; i < arrayMeses.length; i++) {
        fecha_año = new Date();
        año = fecha_año.getFullYear();
        var fecha = new Date(año, i, 1);
        var fecha_2 = new Date(año, i, 0);
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
        crearMes(arrayMeses[i], DialDelMesEmpiesa, num_dias_mes);
    }



};
function crearMes(mes, DialDelMesEmpiesa, numDiasDelMes) {
    var arrayDias = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    var mi_etiqueta_table = document.createElement("table");
    mi_etiqueta_table.setAttribute('id', mes);
    document.body.appendChild(mi_etiqueta_table);
    var mi_etiqueta_tr = document.createElement("tr");
    var mi_etiqueta_caption = document.createElement("caption");
    mes = document.createTextNode(mes);
    mi_etiqueta_caption.appendChild(mes);
    mi_etiqueta_table.appendChild(mi_etiqueta_caption);
    //----TH-----
    for (var i = 0; i < arrayDias.length; i++) {
        var mi_etiqueta_th = document.createElement("th");
        dia = document.createTextNode(arrayDias[i]);
        mi_etiqueta_th.appendChild(dia);
        mi_etiqueta_tr.appendChild(mi_etiqueta_th);
    }
    mi_etiqueta_table.appendChild(mi_etiqueta_tr);
    contador2 = 1;
    contador = 1;
    for (var e = 1; contador <= numDiasDelMes; e++) {
        //TR 
        var mi_etiqueta_tr = document.createElement("tr");
         mi_etiqueta_table.appendChild(mi_etiqueta_tr);
        var tr =  mi_etiqueta_table.getElementsByTagName("tr")[e];
        for (var i = 1; i <= 7; i++) {
            //CREO TD
            var mi_etiqueta_td = document.createElement("td");
            if (contador2 >= DialDelMesEmpiesa) {
                //USO UN CONTOR PARA PODER COGER UNO A UNO LOS ELEMENTOS DEL TD
                if (contador <= numDiasDelMes) {
                    var mi_texto = document.createTextNode(contador);
                    mi_etiqueta_td.appendChild(mi_texto);
                }
                contador++;
            }
            tr.appendChild(mi_etiqueta_td);
            contador2++;

        }
    }
}