/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.addEventListener("readystatechange", cargarEventos, false);
function cargarEventos() {
    if (document.readyState === "complete") {
        document.getElementById("buttonC").addEventListener("click", mostrarhijo, true);
    }
}
function mostrarhijo() {
    nCuenta = document.form.nCuenta.value;
    fechIni = document.form.fechIni.value;
    fechFin = document.form.fechFin.value;
    var movimiento = new Object();
    movimiento.nCuenta = nCuenta;
    movimiento.fechIni = fechIni;
    movimiento.fechFin = fechFin;
    // codificar el objeto
    movimientoJ = JSON.stringify(movimiento);
    var parametro = {
        "json": movimientoJ
    };
    
    $.ajax({
        data: parametro, //datos que se envian a traves de ajax
        url: 'movimientosPHP.php', //archivo que recibe la peticion
        type: 'POST', //método de envio
        dataType: "json",
        beforeSend: function () {
            $("#tabla").html('<h1>Cargando...</h1><img id="cargando" src="../img/_preloader.gif" alt=""/>');
        },
        success: function (response) {
            //Quito lo que hay dentro para agregar lo nuevo
            document.getElementById('tabla').innerHTML="";
            //*******************Table desde 0********************************
            var mi_etiqueta_table = document.createElement("table");
            var id = document.createAttribute("id");
            id.value = "table";
            mi_etiqueta_table.setAttributeNode(id);
            document.getElementById('tabla').appendChild(mi_etiqueta_table);
            //Dentro de ttabal----------------------------------------------------------------------
            //-----CAPTION------------------------------------------
            //<caption>Info.Cliente</caption>
            captio = document.createElement("caption");
            document.getElementById('table').appendChild(captio);
            var cap = document.getElementsByTagName("caption")[0];//Esto es un array
            var movimientoCaption = document.createTextNode('Movimientos');
            cap.appendChild(movimientoCaption);

            //----TR PARA TH

            var mi_etiqueta_tr = document.createElement("tr");
            document.getElementById('table').appendChild(mi_etiqueta_tr);
            var tr = document.getElementsByTagName("tr")[0];//Esto es un array
            //----TH-----

            for (var i = 0; i < 5; i++) {//creo un for de th 5
                var mi_etiqueta_td = document.createElement("th");
                tr.appendChild(mi_etiqueta_td);
            }
            //creo los textos que van dentro del th
            var numeroDeCuenta = document.createTextNode('Numero de cuenta');
            var fecha = document.createTextNode('Fecha');
            var hora = document.createTextNode('Hora');
            var descripcion = document.createTextNode('Descripcion');
            var importe = document.createTextNode('Importe');
            //los meto en un array para q sea mas facil a la hora de añadirlos al th
            arrayTh = new Array(numeroDeCuenta, fecha, hora, descripcion, importe);
            //meto los texto en el th
            for (var i = 0; i < arrayTh.length; i++) {
                var th = document.getElementsByTagName("th")[i];//Esto es un array
                th.appendChild(arrayTh[i]);
            }

            //-------- METO LOS DATOS DENTRO DE UNA TABLA-----------
            //contador
            var contador = 0;
            //CON ESTE FOR LO QUE LOGO HACER ES CREAR TR Y TD I METER EL CONTENIDO
            for (var i = 0; i < response.length; i++) {
                //TR 
                var mi_etiqueta_tr = document.createElement("tr");
                document.getElementById('table').appendChild(mi_etiqueta_tr);
                
                for (var dentro in response[i]) {
                    //cojo el tr creado cojo el mas 1 por que tengo un TH
                    var tr = document.getElementsByTagName("tr")[i + 1];
                    //CREO TD
                    var mi_etiqueta_td = document.createElement("td");
                    tr.appendChild(mi_etiqueta_td);
                    //USO UN CONTOR PARA PODER COGER UNO A UNO LOS ELEMENTOS DEL TD
                    var td = document.getElementsByTagName("td")[contador];//Esto es un array
                    var mi_texto = document.createTextNode(response[i][dentro]);
                    td.appendChild(mi_texto);
                    contador++;
                }

            }
            //Ajax utilisa esto para ponerlo en el lugar que queramos
            //$("#resultado").html(response[1]['mo_des']);
        }
    });
}

//prueba de imprimir objetos con un for in
//    for (var n in movimiento) {
//        var mi_texto = document.createTextNode(movimiento[n]);
//        document.getElementById('tabla').appendChild(mi_texto);
//    }


//    var mi_etiqueta_table = document.createElement("table");
//    var id = document.createAttribute("id");
//    id.value = "table";
//    mi_etiqueta_table.setAttributeNode(id);
//    document.getElementById('tabla').appendChild(mi_etiqueta_table);
//
//    var mi_etiqueta_tr = document.createElement("tr");
//    document.getElementById('table').appendChild(mi_etiqueta_tr);
//    var tr = document.getElementsByTagName("tr")[0];//Esto es un array
//
//    for (var i = 0; i < 5; i++) {
//        var mi_etiqueta_td = document.createElement("td");
//        tr.appendChild(mi_etiqueta_td);
//    }
//    var tr = document.getElementsByTagName("td")[1];//Esto es un array
//    var mi_texto = document.createTextNode('Numerocuenta');
//    tr.appendChild(mi_texto);