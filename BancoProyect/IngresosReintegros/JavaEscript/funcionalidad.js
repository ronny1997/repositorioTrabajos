/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function comprobarNcuenta(x) {
     nCuenta = document.form.nCuenta.value;
    var res = nCuenta.split("");
    if (res.length === 10) {
        var resul = 0;
        for (var i = 0; i <= 8; i++) {
            resul = parseInt(res[i]) + resul;
        }
        resul = resul % 9;
        if (resul === parseInt(res[9])) {
            x.style.background = "#99ff85";
        } else {
            x.style.background = "#ff3433";
            x.value = 'numero incorrecto';
        }
    } else {
        x.style.background = "#ff3433";
        x.value = 'numero incorrecto';
    }
}
function efecto(x) {
    x.style.cssText = 'color:black;';
    x.value = '';
}

function ingresos() {
    infoIngreso = new Object();
    infoIngreso.numCuenta=document.form.nCuenta.value;
    infoIngreso.importe=document.form.importe.value;
    infoIngreso.descripcion= document.form.comment.value;
        var myJSON = JSON.stringify(infoIngreso);
    var parametro = {
        "objIngre": myJSON
    };
    $.ajax({
        data: parametro, //datos que se envian a traves de ajax
        url: 'phpIngresos.php', //archivo que recibe la peticion
        type: 'GET', //método de envio
        dataType: "json",
        beforeSend: function () {
            $("#resultado").html('<h1>Cargando...</h1><img src="../img/_preloader.gif" alt=""/>');
        },
        success: function (response) {
            $("#resultado").html(response);
        }
    });
}