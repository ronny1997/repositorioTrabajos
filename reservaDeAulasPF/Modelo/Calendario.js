/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Calendario(mes, dia_mes_empiesa, num_dias) {
  this.marca = mes;
  this.modelo = dia_mes_empiesa;
  this.annio = num_dias;
  this.crearMes = crearMes;
  function crearMes(){
    var arrayDias = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    var mi_etiqueta_table = document.createElement("table");
    mi_etiqueta_table.setAttribute('id', this.mes);
    document.body.appendChild(mi_etiqueta_table);
    var mi_etiqueta_tr = document.createElement("tr");
    var mi_etiqueta_caption = document.createElement("caption");
    this.mes = document.createTextNode(this.mes);
    mi_etiqueta_caption.appendChild(this.mes);
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
    for (var e = 1; contador <= this.num_dias; e++) {
        //TR 
        var mi_etiqueta_tr = document.createElement("tr");
         mi_etiqueta_table.appendChild(mi_etiqueta_tr);
        var tr =  mi_etiqueta_table.getElementsByTagName("tr")[e];
        for (var i = 1; i <= 7; i++) {
            //CREO TD
            var mi_etiqueta_td = document.createElement("td");
            if (contador2 >= this.dia_mes_empiesa) {
                //USO UN CONTOR PARA PODER COGER UNO A UNO LOS ELEMENTOS DEL TD
                if (contador <= this.num_dias) {
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
}


