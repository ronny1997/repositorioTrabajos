
<?php

include_once 'bbdd/bddConsul.php';

$json = $_POST['json'];
$obj = json_decode($json);

$conexion = new conectaBD();
$arra = selectMovimientos($obj->fechIni, $obj->fechFin, $obj->nCuenta);

//
$jsondata = array();
$cont = 0;
foreach ($arra as $k => $fila) {

    if ($k >= 1) {

        foreach ($fila as $dentro => $valor) {
            $jsondata[$cont][$dentro] = $valor;
        }
        $cont++;
    }
}
echo json_encode($jsondata, JSON_OBJECT_AS_ARRAY);
