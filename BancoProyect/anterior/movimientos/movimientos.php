<!DOCTYPE html>
<html lang="es">
    <head>
        <title>Operando variables</title>
        <meta charset="ISO-8859-1">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script> 

        <script src="comprobaciones/funcionalidadMovimientos.js" type="text/javascript"></script>
        <style>
            td{
                border: solid;
                width: 200px;
                height: 50px;
            }
        </style>
    </head>
    <body>
        <?php
        //poner un escuchador en la caja de texto se inicia con un valor inicial y al querer escribir desaparesca
        //quitar el boton submit
        ?>
        <form name="form" action="<?php $_SERVER["PHP_SELF"]; ?>" method="POST"><!-- colocar el js como . php y escribir en el el scrip para comprobar cuenta -->
            Numero de cuenta: <input value="1111111110" type = "text" name="nCuenta">
            Fecha inicial <input  type = "Date" name="fechIni">
            Fecha final <input  type = "Date" name="fechFin">
            <input type="button" id="buttonC" value="aceptar" name="aceptar">
        </form>
         <div id="tabla"></div>
        
    </body>
</html>