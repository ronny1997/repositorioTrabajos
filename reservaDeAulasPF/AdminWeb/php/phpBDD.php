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
$elemento = new Element($element->nombreElemento,$element->tipoElemento,$element->descriptionElemento);
$elemento->insertElement(); 
}


//hacer un objeto al que le pueda enchufar los campos anteriores los campos de la fecha son null 

