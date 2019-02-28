<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>

        <script src="comprobaciones/funcionalidad.js" type="text/javascript"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
        <style>
            form{
                width: 200px;
                margin: auto;
                height: 400px;
            }
            h1{
                color: #ddaf27;
            }
            td{
                border: solid;
            }
            table{
                border: solid;
            }
            #divRegistro{
                border: solid;
            }
        </style>
    </head>
    <body>
        <h1>GoldenBank</h1>
        <h2>Apertura de cuenta</h2>
        <div id="tabla">
        </div>
        <div id="tabla2">
        </div>
        <form action="<?php $_SERVER["PHP_SELF"]; ?>" method="POST" name="form" id="form">   
            <span id="resultado">
                Numero de cuenta: <input onclick="efecto(this)" type = "text" name="nCuenta"  onBlur="comprobarNcuenta(this)"> <a id="demo"></a>
                DNI del primer tirular <input onclick="efecto(this)" type = "text" name="dniTitular">
                <input onclick="dniUno()" type="button" value="aceptar" name="aceptar">
                <br />
            </span>
            <span id="resultado5"></span>
        </form>
    </body>
</html>
