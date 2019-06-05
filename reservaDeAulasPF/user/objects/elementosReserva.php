<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include '../../bdd/conexionBdd.php';

class ElementBD {

    private $bd;

    public function __construct() {
        $this->bd = new conectaBD();
    }

    public function insertElementBdd($idElement, $name, $fechaIni, $fechaFin, $description) {
        //protegerse de sql inyection
        $sql = 'INSERT INTO reserva ( name, hour_ini, hour_fin, description, id_elementos)'
                . ' VALUES ("' . $name . '","' . $fechaIni . '","' . $fechaFin . '","' . $description . '","' . $idElement . '")';
        $this->bd->insert($sql);
    }

    public function datasElementBddR($fechaIni, $fechaFin) {
        //protegerse de sql inyection
        $sql = 'SELECT *
  FROM elementos
 WHERE id NOT IN (SELECT id_elementos
                       FROM reserva
                 	where hour_ini = "' . $fechaIni . '" and hour_fin = "' . $fechaFin . '" )';
        return $this->bd->select($sql);
    }

    //administrar mis reservas   and hour_fin = "2019-06-05 09:25:00"
    public function deleteElementBdd($id) {
        $sql = 'DELETE elemen, reserv FROM'
                . ' elementos AS elemen INNER'
                . ' JOIN reserva AS reserv '
                . 'WHERE elemen.id = reserv.id_elementos '
                . 'AND elemen.Id LIKE ' . $id;
        $sqlSimple = 'DELETE FROM elementos where id =' . $id;

        return $this->bd->delete($sql, $sqlSimple);
    }

    public function updateElementBdd($id_selecto, $name, $type, $description) {
        $sql = 'UPDATE elementos SET id=' . $id_selecto . ', name= "' . $name . '", type= "' . $type . '", description = "' . $description . '" WHERE id = ' . $id_selecto;
        return $this->bd->update($sql);
    }

}

//INSERT INTO elementos ( name, hour_ini, hour_fin, type, description) VALUES ("ddddd", null, null, "dddd","dddd")
// ver como se llama esto para las conexion y la optencion de datos
//DELETE FROM reserva, elementos
//WHERE elementos.id = 2 AND reserva.id_elementos = 2;
