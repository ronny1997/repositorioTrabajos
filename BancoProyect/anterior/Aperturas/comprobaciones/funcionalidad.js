/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function () {
    document.form.dniTitular.disabled = true;
    window.onscroll = function () {
        myFunction()
    };

    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");

        } else {
            navbar.classList.remove("sticky");
        }
    }



    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;
    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function () {
            this.classList.toggle("activeMD");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
}
var nCuenta;
var dniTitular;
//************Apertura de cuenta***************
function efecto(x) {
    x.style.cssText = 'color:black;';
    x.value = '';
}
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
            document.form.dniTitular.disabled = false;
            document.form.nCuenta.disabled = true;
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
function dniUno() {
    ///Escuchador de enventos
    alert('funciona');
    dniTitular = document.form.dniTitular;
    correcto = comprobarDNI(dniTitular);
    if (correcto) {
        document.form.dniTitular.disabled = true;
        si2Dni = 1;
        var parametro = {
            "dniTitular": document.form.dniTitular.value,
            "si2Dni": si2Dni
        };
//AJAX-------------------------------------------------------------------------
        $.ajax({
            data: parametro, //datos que se envian a traves de ajax
            url: 'aperturaPHP.php', //archivo que recibe la peticion
            type: 'GET', //método de envio
            dataType: "json",
            beforeSend: function () {
                $("#resultado").html('<h1>Cargando...</h1><img src="../img/_preloader.gif" alt=""/>');
            },
            success: function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
                //tabla
                if (response['boolean']) {
                    delete response.boolean;
                    crearTabla('tabla', 'table', 'Cliente Info', response);
                    document.getElementById('form').innerHTML = "";
                } else {
                    //pintar el registro del dni1
                    dniClienteNoReg();
                }
                //pintar el formulario dni2 y el formulario del importe esto va si o si
                importedni();
                //$("#resultado").html(response);
            }
        });
    } else {

        dniTitular.style.cssText = 'color:red;';
        dniTitular.value = 'DNI incorrecto';


    }
}
function dniSecundario(x) {
    dniTitular2 = document.form.dniTitular2;
    if (dniTitular.value === dniTitular2) {
        alert('DNI repetido');
    } else {
        correcto = comprobarDNI(dniTitular2);
        if (correcto) {
            alert("DNI correcto");
            document.form.dniTitular2.disabled = true;
            var parametro = {
                "dniTitular": document.form.dniTitular2.value
            };
            x.style.background = "#99ff85";
            $.ajax({
                data: parametro, //datos que se envian a traves de ajax
                url: 'aperturaPHP.php', //archivo que recibe la peticion
                type: 'GET', //método de envio
                dataType: "json",
                beforeSend: function () {
                    $("#resultado2").html('<h1>Cargando...</h1><img src="../img/_preloader.gif" alt=""/>');
                },
                success: function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
                    //tabla
                    if (response['boolean']) {
                        delete response.boolean;
                        crearTabla('tabla2', 'table2', 'Cliente nº2 Info', response);
                    } else {
                        //pintar el registro del dni1
                        dni2ClienteNoReg();
                    }
                    //$("#resultado").html(response);
                }
            });
        } else {
            alert("DNI Incorrecto");
            x.style.background = "red";
        }

    }
}

function comprobarDNI(dniTitular) {
    var arrayComprobacion = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
    var plantilla = /^\d{8}[A-Z]{1}$/g;
    letra = dniTitular.value.substr(8, 9);
    compro = dniTitular.value.substr(0, 8) % 23;

    for (var i = 0; i < arrayComprobacion.length - 1; i++) {
        if (compro === i) {
            if (letra === arrayComprobacion[i]) {
                if (plantilla.test(dniTitular.value)) {
                    correcto = true;
                    i = arrayComprobacion.length;
                }
            } else {
                correcto = false;
            }

        } else {
            correcto = false;
        }
    }
    return correcto;
}
function altaCuenta() {
    //SimpreEstan
    newCuenta = confirm('¿Esta seguro de que quiere crear esta cuenta?');
    if (newCuenta) {
        var parametro;
        importe = document.form.importe.value;

        if (typeof document.form.nombre !== 'undefined') {
            if (document.form.dniTitular2.value !== "") {
                if (typeof document.form.nombre2 !== 'undefined') {
                    parametro = {
                        "nCuenta": nCuenta,
                        "dniTitular": dniTitular.value,
                        "importe": importe,
                        "dniTitular2": document.form.dniTitular2.value,
                        "nombre": document.form.nombre.value,
                        "direccion": document.form.direccion.value,
                        "telefono": document.form.telefono.value,
                        "email": document.form.email.value,
                        "fechaNacimiento": document.form.fechaNacimiento.value,
                        "nombre2": document.form.nombre2.value,
                        "direccion2": document.form.direccion2.value,
                        "telefono2": document.form.telefono2.value,
                        "email2": document.form.email2.value,
                        "fechaNacimiento2": document.form.fechaNacimiento2.value
                    };
                } else {
                    parametro = {
                        "nCuenta": nCuenta,
                        "dniTitular": dniTitular.value,
                        "importe": importe,
                        "dniTitular2": document.form.dniTitular2.value,
                        "nombre": document.form.nombre.value,
                        "direccion": document.form.direccion.value,
                        "telefono": document.form.telefono.value,
                        "email": document.form.email.value,
                        "fechaNacimiento": document.form.fechaNacimiento.value,
                    };
                }
            } else {
                parametro = {
                    "nCuenta": nCuenta,
                    "dniTitular": dniTitular.value,
                    "importe": importe,
                    "nombre": document.form.nombre.value,
                    "direccion": document.form.direccion.value,
                    "telefono": document.form.telefono.value,
                    "email": document.form.email.value,
                    "fechaNacimiento": document.form.fechaNacimiento.value,
                };
            }
        } else if (document.form.dniTitular2.value !== "") {
            if (typeof document.form.nombre2 !== 'undefined') {
                parametro = {
                    "nCuenta": nCuenta,
                    "dniTitular": dniTitular.value,
                    "importe": importe,
                    "dniTitular2": document.form.dniTitular2.value,
                    "nombre2": document.form.nombre2.value,
                    "direccion2": document.form.direccion2.value,
                    "telefono2": document.form.telefono2.value,
                    "email2": document.form.email2.value,
                    "fechaNacimiento2": document.form.fechaNacimiento2.value,
                };
            } else {
                parametro = {
                    "nCuenta": nCuenta,
                    "dniTitular": dniTitular.value,
                    "importe": importe,
                    "dniTitular2": document.form.dniTitular2.value
                };
            }
        } else {
            parametro = {
                "nCuenta": nCuenta,
                "dniTitular": dniTitular.value,
                "importe": importe
            };
        }
        $.ajax({
            data: parametro, //datos que se envian a traves de ajax
            url: 'aperturaCuentaFinal.php', //archivo que recibe la peticion
            type: 'GET', //método de envio
            beforeSend: function () {
                $("#resultado").html('<h1>Cargando...</h1><img src="../img/_preloader.gif" alt=""/>');
            },
            success: function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve

                $("#resultado").html(response);

            }
        });
    }


}
//cra la tabla para cliente se le dice en donde va a estar
function crearTabla(idTablaconte, idTabla, caption, response) {
    // //Quito lo que hay dentro para agregar lo nuevo
    document.getElementById(idTablaconte).innerHTML = "";
    //*******************Table desde 0********************************
    var mi_etiqueta_table = document.createElement("table");
    var id = document.createAttribute("id");
    id.value = idTabla;
    mi_etiqueta_table.setAttributeNode(id);
    document.getElementById(idTablaconte).appendChild(mi_etiqueta_table);
    //Dentro de ttabal----------------------------------------------------------------------
    //-----CAPTION------------------------------------------
    //<caption>Info.Cliente</caption>
    captio = document.createElement("caption");
    document.getElementById(idTabla).appendChild(captio);

    var cap = document.getElementById(idTabla).getElementsByTagName("caption")[0];//Esto es un array
    var Caption = document.createTextNode(caption);
    cap.appendChild(Caption);

    //----TR PARA TH

    var mi_etiqueta_tr = document.createElement("tr");
    document.getElementById(idTabla).appendChild(mi_etiqueta_tr);
    var tr = document.getElementById(idTabla).getElementsByTagName("tr")[0];//Esto es un array
    //----TH-----

    for (var i = 0; i < 9; i++) {//creo un for de th 5
        var mi_etiqueta_th = document.createElement("th");
        tr.appendChild(mi_etiqueta_th);
    }
    //creo los textos que van dentro del th
    var dni = document.createTextNode('DNI');
    var nombre = document.createTextNode('Nombre');
    var direc = document.createTextNode('Direccion');
    var tlf = document.createTextNode('Tlf');
    var email = document.createTextNode('Email');
    var fhNac = document.createTextNode('Fech.Nacimiento');
    var fhFcl = document.createTextNode('Fech.fcl');
    var nCuentas = document.createTextNode('Nº Cuentas');
    var salso = document.createTextNode('Saldo');
    //los meto en un array para q sea mas facil a la hora de añadirlos al th
    arrayTh = new Array(dni, nombre, direc, tlf, email, fhNac, fhFcl, nCuentas, salso);
    //meto los texto en el th
    for (var i = 0; i < arrayTh.length; i++) {
        var th = document.getElementById(idTabla).getElementsByTagName("th")[i];//Esto es un array
        th.appendChild(arrayTh[i]);
    }

    //-------- METO LOS DATOS DENTRO DE UNA TABLA-----------
    //contador no hace falta es un array asosiativo simple solo es un tr
    var contador = 0;
    //CON ESTE FOR LO QUE LOGO HACER ES CREAR TR Y TD I METER EL CONTENIDO

    //TR 
    var mi_etiqueta_tr = document.createElement("tr");
    document.getElementById(idTabla).appendChild(mi_etiqueta_tr);
    var tr = document.getElementById(idTabla).getElementsByTagName("tr")[1];
    for (var dentro in response) {
        //CREO TD
        var mi_etiqueta_td = document.createElement("td");
        tr.appendChild(mi_etiqueta_td);
        //USO UN CONTOR PARA PODER COGER UNO A UNO LOS ELEMENTOS DEL TD
        var td = document.getElementById(idTabla).getElementsByTagName("td")[contador];//Esto es un array
        var mi_texto = document.createTextNode(response[dentro]);
        td.appendChild(mi_texto);
        contador++;
    }


}
function crearInput(nombreImput, arrayAsosiativo) {
    for (var dentro in arrayAsosiativo) {
        var atribu = document.createAttribute(dentro);
        atribu.value = arrayAsosiativo[dentro];
        nombreImput.setAttributeNode(atribu);
    }
}
function dniClienteNoReg() {
    //Hacer formulario de datos de registro si el dni no existe 
    document.getElementById('form').innerHTML = "";
    //----divtitulo
    var mi_etiqueta_div = document.createElement("div");
    var id = document.createAttribute("id");
    id.value = 'divRegistro';
    mi_etiqueta_div.setAttributeNode(id);
    document.getElementById('form').appendChild(mi_etiqueta_div);
    //h3
    var h3 = document.createElement("h3");
    var mi_texto = document.createTextNode('Cliente nuevo');
    h3.appendChild(mi_texto);
    document.getElementById('divRegistro').appendChild(h3);
    //imput nombre-----------------------------------------------
    var label = document.createElement("label");
    var mi_texto = document.createTextNode('Nombre');
    label.appendChild(mi_texto);
    document.getElementById('divRegistro').appendChild(label);
    //
    imputNombre = document.createElement("input");
    //atributos
    arrtNombre = new Array();
    arrtNombre["type"] = "text";
    arrtNombre["name"] = "nombre";
    crearInput(imputNombre, arrtNombre);
    document.getElementById('divRegistro').appendChild(imputNombre);
    //imput Direccion-----------------------------------------------
    imputDireccion = document.createElement("input");
    var label = document.createElement("label");
    var mi_texto = document.createTextNode('Direccion');
    label.appendChild(mi_texto);
    document.getElementById('divRegistro').appendChild(label);
    //
    //atributos
    arrtDireccion = new Array();
    arrtDireccion["type"] = "text";
    arrtDireccion["name"] = "direccion";
    crearInput(imputDireccion, arrtDireccion);
    document.getElementById('divRegistro').appendChild(imputDireccion);
    //imput Telefono-----------------------------------------------
    imputTelefo = document.createElement("input");
    var label = document.createElement("label");
    var mi_texto = document.createTextNode('Telefono');
    label.appendChild(mi_texto);
    document.getElementById('divRegistro').appendChild(label);
    //
    //atributos
    arrttlf = new Array();
    arrttlf["type"] = "text";
    arrttlf["name"] = "telefono";
    crearInput(imputTelefo, arrttlf);
    document.getElementById('divRegistro').appendChild(imputTelefo);
    //imput Email-----------------------------------------------
    imputEmail = document.createElement("input");
    var label = document.createElement("label");
    var mi_texto = document.createTextNode('Email');
    label.appendChild(mi_texto);
    document.getElementById('divRegistro').appendChild(label);
    //atributos
    arrtEmail = new Array();
    arrtEmail["type"] = "text";
    arrtEmail["name"] = "email";
    crearInput(imputEmail, arrtEmail);
    document.getElementById('divRegistro').appendChild(imputEmail);
    //imput nacimiento-----------------------------------------------
    imputNacimiento = document.createElement("input");
    var label = document.createElement("nacimiento");
    var mi_texto = document.createTextNode('Fecha de nacimiento');
    label.appendChild(mi_texto);
    document.getElementById('divRegistro').appendChild(label);
    //atributos
    arrtNacimien = new Array();
    arrtNacimien["type"] = "date";
    arrtNacimien["name"] = "fechaNacimiento";
    crearInput(imputNacimiento, arrtNacimien);
    document.getElementById('divRegistro').appendChild(imputNacimiento);
}
function importedni() {
    //relleno formulario
    //imput dni2------------------------------------------------
    dni2Imput = document.createElement("input");
    var label = document.createElement("label");
    var mi_texto = document.createTextNode('DNI2(OPCIONAL)');
    label.appendChild(mi_texto);
    document.getElementById('form').appendChild(label);
    //atributos
    arryDni2 = new Array();
    arryDni2["id"] = "dni2";
    arryDni2["type"] = "text";
    arryDni2["name"] = "dniTitular2";
    arryDni2["onBlur"] = "dniSecundario(this)";

    crearInput(dni2Imput, arryDni2);
    //Agregat el imput
    document.getElementById('form').appendChild(dni2Imput);
    //imput importe-----------------------------------------------
    var label = document.createElement("label");
    var atribu = document.createAttribute('id');
    atribu.value = 'idlabel';
    label.setAttributeNode(atribu);
    var mi_texto = document.createTextNode('Importe');
    label.appendChild(mi_texto);
    document.getElementById('form').appendChild(label);
    imputImporte = document.createElement("input");
    //atributos
    arrtImporte = new Array();
    arrtImporte["id"] = "importe";
    arrtImporte["type"] = "text";
    arrtImporte["name"] = "importe";

    crearInput(imputImporte, arrtImporte);
    //Agregat el imput
    document.getElementById('form').appendChild(imputImporte);
    //imput boton-----------------------------------------------
    imputBoton = document.createElement("input");
    //atributos
    arrtBoton = new Array();
    arrtBoton["onclick"] = "altaCuenta()";
    arrtBoton["type"] = "button";
    arrtBoton["value"] = "aceptar";
    arrtBoton["name"] = "aceptar";

    crearInput(imputBoton, arrtBoton);
    //Agregat el imput
    document.getElementById('form').appendChild(imputBoton);
}
function dni2ClienteNoReg() {
    //Hacer formulario de datos de registro si el dni no existe 
    //
    //----divtitulo
    //Agregar un div despues del imput d dni2 con el las children ver mañana 
    var mi_etiqueta_div = document.createElement("div");
    var id = document.createAttribute("id");
    id.value = 'divRegistro2';
    mi_etiqueta_div.setAttributeNode(id);

    var form = document.getElementById('form');
    var lavelIm = document.getElementById('idlabel');
    form.insertBefore(mi_etiqueta_div, lavelIm);
    //h3
    var h3 = document.createElement("h3");
    var mi_texto = document.createTextNode('Cliente nuevo');
    h3.appendChild(mi_texto);
    document.getElementById('divRegistro2').appendChild(h3);
    //imput nombre-----------------------------------------------
    var label = document.createElement("label");
    var mi_texto = document.createTextNode('Nombre');
    label.appendChild(mi_texto);
    document.getElementById('divRegistro2').appendChild(label);
    //
    imputNombre = document.createElement("input");
    //atributos
    arrtNombre = new Array();
    arrtNombre["type"] = "text";
    arrtNombre["name"] = "nombre2";
    crearInput(imputNombre, arrtNombre);
    document.getElementById('divRegistro2').appendChild(imputNombre);
    //imput Direccion-----------------------------------------------
    imputDireccion = document.createElement("input");
    var label = document.createElement("label");
    var mi_texto = document.createTextNode('Direccion');
    label.appendChild(mi_texto);
    document.getElementById('divRegistro2').appendChild(label);
    //
    //atributos
    arrtDireccion = new Array();
    arrtDireccion["type"] = "text";
    arrtDireccion["name"] = "direccion2";
    crearInput(imputDireccion, arrtDireccion);
    document.getElementById('divRegistro2').appendChild(imputDireccion);
    //imput Telefono-----------------------------------------------
    imputTelefo = document.createElement("input");
    var label = document.createElement("label");
    var mi_texto = document.createTextNode('Telefono');
    label.appendChild(mi_texto);
    document.getElementById('divRegistro2').appendChild(label);
    //
    //atributos
    arrttlf = new Array();
    arrttlf["type"] = "text";
    arrttlf["name"] = "telefono2";
    crearInput(imputTelefo, arrttlf);
    document.getElementById('divRegistro2').appendChild(imputTelefo);
    //imput Email-----------------------------------------------
    imputEmail = document.createElement("input");
    var label = document.createElement("label");
    var mi_texto = document.createTextNode('Email');
    label.appendChild(mi_texto);
    document.getElementById('divRegistro2').appendChild(label);
    //atributos
    arrtEmail = new Array();
    arrtEmail["type"] = "text";
    arrtEmail["name"] = "email2";
    crearInput(imputEmail, arrtEmail);
    document.getElementById('divRegistro2').appendChild(imputEmail);
    //imput nacimiento-----------------------------------------------
    imputNacimiento = document.createElement("input");
    var label = document.createElement("nacimiento");
    var mi_texto = document.createTextNode('Fecha de nacimiento');
    label.appendChild(mi_texto);
    document.getElementById('divRegistro2').appendChild(label);
    //atributos
    arrtNacimien = new Array();
    arrtNacimien["type"] = "date";
    arrtNacimien["name"] = "fechaNacimiento2";
    crearInput(imputNacimiento, arrtNacimien);
    document.getElementById('divRegistro2').appendChild(imputNacimiento);
}