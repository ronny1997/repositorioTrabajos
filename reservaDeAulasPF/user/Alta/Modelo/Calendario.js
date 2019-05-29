/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Calendario(mes, dia_mes_empiesa, num_dias) {
    this.c_mes = mes;
    this.c_dia_mes_empiesa = dia_mes_empiesa;
    this.c_num_dias = num_dias;
    this.crearMes = crearMes;
    function crearMes() {
        var arrayDias = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

        var mi_etiqueta_table = document.createElement("table");
        mi_etiqueta_table.setAttribute('id', this.c_mes);
        //Eliminamos los datos del div para poner el nuevo
        document.getElementById("table_mes").innerHTML = "";
        document.getElementById("table_mes").appendChild(mi_etiqueta_table);
        var mi_etiqueta_tr = document.createElement("tr");
        var mi_etiqueta_caption = document.createElement("caption");
        var t_mes = document.createTextNode(this.c_mes);
        mi_etiqueta_caption.appendChild(t_mes);
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
        dias_del_mes = 1;

        for (var e = 1; dias_del_mes <= this.c_num_dias; e++) {
            //TR 
            var mi_etiqueta_tr = document.createElement("tr");
            mi_etiqueta_table.appendChild(mi_etiqueta_tr);
            var tr = mi_etiqueta_table.getElementsByTagName("tr")[e];
            for (var i = 1; i <= 7; i++) {
                //CREO TD
                var mi_etiqueta_td = document.createElement("td");
                if (contador2 >= this.c_dia_mes_empiesa) {
                    //USO UN CONTOR PARA PODER COGER UNO A UNO LOS ELEMENTOS DEL TD
                    if (dias_del_mes <= this.c_num_dias) {
                        //asigno clase
                        mi_etiqueta_td.setAttribute('class', "pulsar");
                        //asigno onlick
                        mes_asignado = "" + this.c_mes;
                        mi_etiqueta_td.setAttribute('onclick', "selectMes(" + dias_del_mes + "," + mes_asignado + ")");
                        var mi_texto = document.createTextNode(dias_del_mes);
                        mi_etiqueta_td.appendChild(mi_texto);
                    }
                    dias_del_mes++;
                }
                tr.appendChild(mi_etiqueta_td);
                contador2++;

            }
        }
    }
}

function printHour(dia) {
    var mi_etiqueta_table = document.createElement("table");
    mi_etiqueta_table.setAttribute("class","horario");
    var contador = 0;

    var mi_etiqueta_caption = document.createElement("caption");
    var diasCaption = document.createTextNode(dia);
    mi_etiqueta_caption.appendChild(diasCaption);
    mi_etiqueta_table.appendChild(mi_etiqueta_caption);

    for (var i = 0; i < 7; i++) {
        var mi_etiqueta_tr = document.createElement("tr");
        mi_etiqueta_table.appendChild(mi_etiqueta_tr);
        for (var e = 0; e < 1; e++) {
            var mi_etiqueta_td = document.createElement("td");
            mi_etiqueta_td.setAttribute('class', "pulsar");
            var hora_string = hours(contador);
            var horaAnterior = hour;
            var minAnterior = min;
            contador++;
            var horaStringTermina = hours(contador);
            var mi_texto = document.createTextNode(hora_string + "-" + horaStringTermina);
            mi_etiqueta_td.setAttribute('onclick', "selectHour(" + hour + "," + min + "," + horaAnterior + "," + minAnterior + ")");
            hour = horaAnterior;
            min = minAnterior;
            mi_etiqueta_td.appendChild(mi_texto);

            mi_etiqueta_tr.appendChild(mi_etiqueta_td);

        }

    }
    if(hour !== 20){
         document.getElementById("conten").innerHTML = "";   
    }
    document.getElementById("conten").appendChild(mi_etiqueta_table);

}
function hours(i) {
    if (i !== 0) {
        hour = hour + 1;
        min = min + 55;
        if (min > 60) {
            min = min - 60;
        }
    }
    if (i === 4) {
        if (hour === 12) {
            hour = 11;
            min = 45;
        } else {
            hour = 18;
            min = 45;
        }
    }
    var hora_string;
    return  hora_string = hour + ":" + min;
}