<?php

//añadir seguridad a esta webada con las sentencias preparadas
class conectaBD {

    protected $db;

    
    function __construct() {
        $dsn = 'mysql:host=localhost;dbname=Banco;charset=utf8';
        $usuario = 'root';
        $pass = 'A271302!!';
        try {
            $this->db = new PDO($dsn, $usuario, $pass);
        } catch (PDOException $e) {
            die("¡Error!: " . $e->getMessage() . "<br/>");
        }
    }

    public function getConBD() {
        return $this->db;
    }

    public function existeBoolean($orden) {
        $resultado = $this->db->query($orden);
        if ($resultado->fetchColumn() > 0) {
            $opcion = true;
        } else {
            $opcion = false;
        }
        return $opcion;
    }

    public function comprobarCuenta($nCuenta) {
        $arr1 = str_split($nCuenta);
        $suma = 0;
        for ($i = 0; $i < count($arr1) - 1; $i++) {
            $suma = $arr1[$i] + $suma;
        }
    }

    public function dato($queri) {
        //ver porq funciona
        $arryFila = $this->db->prepare($queri);
        $arryFila->execute();
        $result = $arryFila->fetch(PDO::FETCH_OBJ);

        if (isset($result->cl_sal)) {
            $saldo = $result->cl_sal;
        } else {
            $saldo = 0;
        }
        return $saldo;
    }

    public function datoNcuenta($queri) {
        //ver porq funciona
        $arryFila = $this->db->prepare($queri);
        $arryFila->execute();
        $result = $arryFila->fetch(PDO::FETCH_OBJ);

        if (isset($result->cl_ncu)) {
            $saldo = $result->cl_ncu;
        } else {
            $saldo = 0;
        }
        return $saldo;
    }

    public function arrayDatos($queri) {
        //ver porq funciona
        $filas[] = array();
        $consulta = $this->db->prepare($queri);
        $consulta->setFetchMode(PDO::FETCH_ASSOC);
        $consulta->execute();
        if ($consulta->rowCount() > 0) {
            while ($row = $consulta->fetch()) {
                $filas[] = $row;
            }
        }
        return $filas;
    }

    public function transaccion($insertCuenta, $queriCliente1, $queriCliente2, $saldoCuenta1, $saldoCuenta2, $movimiento, $setNumcuenta2, $setNumcuenta1) {

        try {
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $this->db->beginTransaction();
            //condiciones
            if ($queriCliente1 !== NULL) {
                //AltaCliente
                $this->db->exec($queriCliente1);
            }
            if ($saldoCuenta2 !== NULL) {
                //AlataCuenta2 si hay 
                if ($queriCliente2 !== NULL) {
                    $this->db->exec($queriCliente2);
                }
                //si hay cuenta2 aumentar su saldo
                $this->db->exec($saldoCuenta2);
                $this->db->exec($setNumcuenta2);
            }
            //umero de cuentas
            $this->db->exec($setNumcuenta1);
            //Saldo cuenta 1
            $this->db->exec($saldoCuenta1);
            //altacuenta
            $this->db->exec($insertCuenta);
            //grabar movimiento
            $this->db->exec($movimiento);

            $this->db->commit();
        } catch (Exception $e) {
            $this->db->rollBack();
            echo "Fallo: " . $e->getMessage();
        }
    }
     public function ingreso($saldoCuenta, $saldoClientes, $movimiento) {

        try {
   
            //Saldo
            $this->db->exec($saldoCuenta);
            //saldo clientes
            $this->db->exec($saldoClientes);
            //grabar movimiento
            $this->db->exec($movimiento);

            $this->db->commit();
        } catch (Exception $e) {
            $this->db->rollBack();
            echo "Fallo: " . $e->getMessage();
        }
    }

}

$conexion = new conectaBD();

function selectMovimientos($fechIni, $fechfinal, $nCuenta) {

    $existeCuenta = 'select * from movimientos where mo_ncu = "' . $nCuenta . '"';
    $sqlCon = 'SELECT * FROM movimientos WHERE mo_ncu LIKE "' . $nCuenta . '" AND (mo_fec >=  "' . $fechIni . '" and mo_fec <= "' . $fechfinal . '") ';

    //comprobacion de si la cuenta existe en la base de datos
    $existe = existeCuenta($existeCuenta);
    $GLOBALS['conexion']->comprobarCuenta($nCuenta); //terminar de implementar
    if ($existe) {

        if (strtotime($fechIni) < strtotime($fechfinal)) {
            $arrayConsultas = $GLOBALS['conexion']->arrayDatos($sqlCon);
            return $arrayConsultas;
        } else {
            print "Error, la fecha inicial debe ser menor que la final";
        }
    } else {
        print "La cuenta " . $nCuenta . " no existe";
    }
}

//existe cliente
function existeCliente($dniCliente) {
    $existeCliente = 'select * from clientes where cl_dni = "' . $dniCliente . '"';
    $result = $GLOBALS['conexion']->existeBoolean($existeCliente);
    return $result;
}

//existec cuenta
function existeCuenta($queri) {
    $existe = $GLOBALS['conexion']->existeBoolean($queri);
    return $existe;
}
//archivo
//$contenido = parce_ini_file($archivo,true);
//$equipo = $contenido['equipo'];
//Datos cliente
function dCliente($dni_cli) {
    $queri = 'select * from clientes where cl_dni = "' . $dni_cli . '"';
    $datosCliente = $GLOBALS['conexion']->arrayDatos($queri);

    return $datosCliente;
}

function altaCuenta($numCuenta, $numDni, $numDni2, $saldo) {
    if ($numDni2 == null) {
        $insertCuenta = 'INSERT INTO cuentas (cu_ncu, cu_dn1, cu_dn2, cu_sal) VALUES (' . $numCuenta . ', "' . $numDni . '", NULL, ' . $saldo . ')';
    } else {
        $insertCuenta = 'INSERT INTO cuentas (cu_ncu, cu_dn1, cu_dn2, cu_sal) VALUES (' . $numCuenta . ', "' . $numDni . '","' . $numDni2 . '",' . $saldo . ')';
    }
    return $insertCuenta;
}

function altaCliente($numDni, $nombre, $direccion, $numTelefo, $email, $fna, $nCuentas, $saldo) {
    $hoy = getdate();
    $actual = $hoy['year'] . '-' . $hoy['mon'] . '-' . $hoy['mday'];
    $insertCliente = ' INSERT INTO clientes (cl_dni, cl_nom, cl_dir, cl_tel, cl_ema, cl_fna, cl_fcl, cl_ncu, cl_sal)
            VALUES ("' . $numDni . '","' . $nombre . '","' . $direccion . '",' . $numTelefo . ',"' . $email . '","' . $fna . '","' . $actual . '",' . $nCuentas . ',' . $saldo . ')';

    return $insertCliente;
}

function setClienteSaldo($numDni, $saldo) {

    $queri = 'select cl_sal from clientes where cl_dni = "' . $numDni . '"';
    $saldoactual = $GLOBALS['conexion']->dato($queri);

    $saldoactual = $saldoactual + $saldo;
    $setSaldoCliente = 'UPDATE clientes SET cl_sal = ' . $saldoactual . ' WHERE clientes.cl_dni = "' . $numDni . '";';
    return $setSaldoCliente;
}

function nuevoMovimiento($nCuenta, $descripcion, $importe) {

    $hoy = getdate();
    $hora = $hoy['hours'] . ':' . $hoy['minutes'];
    $fecha = $hoy['year'] . '-' . $hoy['mon'] . '-' . $hoy['mday'];
    $nuevoMovmiento = 'INSERT INTO movimientos (mo_ncu, mo_fec, mo_hor, mo_des, mo_imp) 
            VALUES (' . $nCuenta . ', "' . $fecha . '", "' . $hora . '", "' . $descripcion . '", ' . $importe . ')';

    return $nuevoMovmiento;
}

//numero de cuentas
function setClienteNcuentas($numDni) {

    $queri = 'select cl_ncu from clientes where cl_dni = "' . $numDni . '"';
    $ncuentas = $GLOBALS['conexion']->datoNcuenta($queri);
    $ncuentasActuales = $ncuentas + 1;
    $setNumCuenCli = 'UPDATE clientes SET cl_ncu = ' . $ncuentasActuales . ' WHERE clientes.cl_dni = "' . $numDni . '";';
    return $setNumCuenCli;
}
function ingreso($saldoCuenta, $saldoClientes, $movimiento) {
    $saldoSql;
    $saldoClieSql;
    $moviSql;
    
    return $setNumCuenCli;
}