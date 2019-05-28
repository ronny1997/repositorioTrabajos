<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once '../objects/elementos.php';


if(isset($_GET['elemenJsonInsert'])){
$elemenJson = $_GET['elemenJsonInsert'];
$element = json_decode($elemenJson);
$elemento = new ElementBD();
$elemento->insertElementBdd($element->nombreElemento,$element->tipoElemento,$element->descriptionElemento); 
}

if(isset($_GET['data'])){
    $elemento = new ElementBD();
    $arrayElement = $elemento ->datasElementBdd();
    //print_r($arrayElement);
    echo json_encode($arrayElement, JSON_OBJECT_AS_ARRAY);
}
if(isset($_GET['deleteData'])){
    $id_elementDelete = $_GET['deleteData'];
    $elemento = new ElementBD();
    $elemento->deleteElementBdd($id_elementDelete);
    
}
if(isset($_GET['elemenJsonUpdate'])){
    $elemenJson = $_GET['elemenJsonUpdate'];
    $element = json_decode($elemenJson);
    $elemento = new ElementBD();
    $elemento->updateElementBdd($element->id,$element->nombreElemento,$element->tipoElemento,$element->descriptionElemento);
    
}