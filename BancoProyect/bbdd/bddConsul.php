<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once 'bbdd/consultas.php';

function arrayMovi($obj) {
    $arrayConsultas = selectMovimientos($obj->fechIni, $obj->fechFin, $obj->nCuenta);
//$conta=0;
//$jaa = array($obj->fechFin,$obj->fechFin);

    return $arrayConsultas;
}
