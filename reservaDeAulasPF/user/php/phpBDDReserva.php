<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once '../objects/elementosReserva.php';

if (isset($_GET['data'])) {
    $elemenJson = $_GET['data'];
    $element = json_decode($elemenJson);
    
    $fechaIni = date("Y-m-d H:i", strtotime($element->fechaReservaIni));
    $fechaFin = date("Y-m-d H:i", strtotime($element->fechaReservaFin));
    
    $elemento = new ElementBD();
    $arrayElement = $elemento->datasElementBddR($fechaIni,$fechaFin);
    //print_r($arrayElement);
    echo json_encode($arrayElement, JSON_OBJECT_AS_ARRAY);
}
if (isset($_GET['elemenJsonUpdateReserva'])) {
    $elemenJson = $_GET['elemenJsonUpdateReserva'];
    $element = json_decode($elemenJson);

    $fechaIni = date("Y-m-d H:i", strtotime($element->fechaReservaIni));
    $fechaFin = date("Y-m-d H:i", strtotime($element->fechaReservaFin));

    $elemento = new ElementBD();
    $elemento->insertElementBdd($element->id, $element->nombreElemento, $fechaIni, $fechaFin, $element->description);
}

