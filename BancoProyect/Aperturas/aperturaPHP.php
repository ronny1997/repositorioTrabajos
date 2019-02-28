<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
sleep(2);
include_once("../bbdd/consultas.php");
//-----------------------------------------usarJson
  $dniCliente = $_GET['dniTitular'];  
//-----------------------------------------

$opcion = existeCliente($dniCliente);
//-----------------------------------------
$jsondata = array();
$jsondata['boolean'] = $opcion;
//bolean para saber si pinto o no el cliente
if ($opcion) {
    //Mandar a el java escrip el json y descodificarlo para que el servidor no trabaje;
    $arryFila = dCliente($dniCliente);
    foreach ($arryFila as $k => $fila) {

        if ($k >= 1) {
            //array asosiativo 
            foreach ($fila as $dentro => $valor) {
                $jsondata[$dentro] = $valor;
            }
        }
    }
}
echo json_encode($jsondata, JSON_OBJECT_AS_ARRAY);

