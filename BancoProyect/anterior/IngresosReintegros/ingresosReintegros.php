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
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
        <script src="JavaEscript/funcionalidad.js" type="text/javascript"></script>
    </head>
    <body>
        <form method="POST" name="form" id="form">
            <label>Numero de cuenta:</label><br><input onclick="efecto(this)" type = "text" name="nCuenta"  onBlur="comprobarNcuenta(this)"><br>
            <label>Importe</label><br> <input onclick="efecto(this)" type = "text" name="importe"><br>
            <label>Comentario</label><br><textarea rows="4" cols="50" name="comment" form="form"></textarea><br>
            <input onclick="ingresos()" type="button" value="aceptar" name="aceptar">
        </form>
        <div id="resultado"></div>
    </body>
</html>
