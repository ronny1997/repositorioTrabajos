<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once '../objects/elementosReserva.php';

if(isset($_GET['data'])){
    $elemento = new ElementBD();
    $arrayElement = $elemento ->datasElementBdd();
    echo json_encode($arrayElement, JSON_OBJECT_AS_ARRAY);
   
}
if(isset($_GET['elemenJsonInsert'])){
$elemenJson = $_GET['elemenJsonInsert'];
$element = json_decode($elemenJson);
$elemento = new ElementBD();
$elemento->insertElementBdd($element->id,$element->nombreElemento,$element->fechaReservaIni,$element->fechaReservaFin,$element->description); 
}

