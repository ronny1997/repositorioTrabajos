<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once '../objects/elementos.php';
$nombre = $_GET['nombre'];
$tipo = $_GET['tipo'];
$descriptiom = $_GET['descriptiom'];



$elemento = new Element($nombre,$tipo,$descriptiom);
$elemento->insertElement();

//hacer un objeto al que le pueda enchufar los campos anteriores los campos de la fecha son null 

