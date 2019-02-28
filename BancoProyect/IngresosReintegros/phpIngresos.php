<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once("../bbdd/consultas.php");
$objIngresos = json_decode($_GET['objIngre']);
$objIngresos->numCuenta;

//echo json_encode($objIngresos, JSON_FORCE_OBJECT);
