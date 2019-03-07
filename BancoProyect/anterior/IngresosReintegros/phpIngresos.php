<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once("../bbdd/consultas.php");
$objIngresos = json_decode($_GET['objIngre']);
$numCu = $objIngresos->numCuenta;
$import = $objIngresos->importe;
$desc = $objIngresos->descripcion;


$cuentas = clientesDeCuenta($numCu);

$sald1 = setClienteSaldo($cuentas[1]['cu_dn1'], $import);
if (isset($cuentas[1]['cu_dn2'])) {
    $sald2 = setClienteSaldo($cuentas[1]['cu_dn2'], $import);
} else {
    $sald2 = null;
}
//echo $sald1;
//echo $sald2;
$salCuen = setCuentaSaldo($numCu, $import);
$conexion = new conectaBD();
$descripcion = 'Descripcion del ingreso: ' . $desc;
$movimi = nuevoMovimiento($numCu, $descripcion, $import);
$estado = $conexion->ingreso($salCuen, $sald1, $sald2, $movimi);
$arrEst[] = array();
$arrEst[0] = $estado;
echo json_encode($arrEst, JSON_FORCE_OBJECT);
