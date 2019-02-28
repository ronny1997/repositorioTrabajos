<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//sentencias
sleep(5);
include_once("../bbdd/consultas.php");
$insertCuenta;
$queriCliente1 = NULL;
$queriCliente2 = NULL;
$saldoCuenta2 = NULL;
$setNumcuenta2 = NULL;
//-----------------
$nCuenta = $_GET['nCuenta'];
$dniTitular = $_GET['dniTitular'];
$importe = $_GET['importe'];

$insertCuenta = altaCuenta($nCuenta, $dniTitular, NULL, $importe);

if (isset($_GET['nombre'])) {
    $nombre = $_GET['nombre'];
    $direccion = $_GET['direccion'];
    $telefono = $_GET['telefono'];
    $email = $_GET['email'];
    $fechaNacimiento = $_GET['fechaNacimiento'];
    $queriCliente1 = altaCliente($dniTitular, $nombre, $direccion, $telefono, $email, $fechaNacimiento, 0, 0);
}

//
if (isset($_GET['dniTitular2'])) {
    $dniTitular2 = $_GET['dniTitular2'];
    if (isset($_GET['nombre2'])) {
        $nombre2 = $_GET['nombre2'];
        $direccion2 = $_GET['direccion2'];
        $telefono2 = $_GET['telefono2'];
        $email2 = $_GET['email2'];
        $fechaNacimiento2 = $_GET['fechaNacimiento2'];
        $queriCliente2 = altaCliente($dniTitular2, $nombre2, $direccion2, $telefono2, $email2, $fechaNacimiento2, 0, 0);
    }
    //saldo de la cuenta es algo curioso
    $insertCuenta = altaCuenta($nCuenta, $dniTitular, $dniTitular2, $importe);
    $saldoCuenta2 = setClienteSaldo($dniTitular2, $importe);
    $setNumcuenta2 = setClienteNcuentas($dniTitular2);
}

//
$saldoCuenta1 = setClienteSaldo($dniTitular, $importe);
$setNumcuenta1 = setClienteNcuentas($dniTitular);
$movimiento = nuevoMovimiento($nCuenta, 'nueva cuenta', $importe);
$GLOBALS['conexion']->transaccion($insertCuenta, $queriCliente1, $queriCliente2, $saldoCuenta1, $saldoCuenta2, $movimiento, $setNumcuenta2, $setNumcuenta1);
//
