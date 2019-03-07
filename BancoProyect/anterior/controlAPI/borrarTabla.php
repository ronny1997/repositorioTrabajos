<?php
 //conectar
$link = mysqli_connect("localhost","root","A271302!!");
//borrar
 mysqli_query($link, 'DROP DATABASE Banco');
$estadofilas = mysqli_affected_rows($link);//1 esta bn -1 un error 0 nada
if($estadofilas==3){
	echo 'Borrado con exito';
}else{
	echo 'Error';
}
//cerrar la conexion
mysqli_close($link);
?>
<br>
<a href="ControlBanco.php">Inicio</a>