<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include '../../bdd/conexionBdd.php';

class Element {

    private $bd;
    public $name;
    public $type;
    public $description;

    public function __construct($name, $type, $description) {
        $this->name = $name;
        $this->type = $type;
        $this->description = $description;
        $this->bd = new conectaBD();
    }

// no se si me hace fata aun
    public function getName() {
        return;
    }
    public function insertElementBdd() {
        //protegerse de sql inyection
        $sql = 'INSERT INTO elementos ( name, type, description)'
                . ' VALUES ("' . $this->name . '","' . $this->type . '","' . $this->description . '")';
        $this->bd->insert($sql);
    }
     public function datasElementBdd() {
        //protegerse de sql inyection
        $sql = 'select * from elementos';
        $this->bd->select($sql);
    }
    

}

//INSERT INTO elementos ( name, hour_ini, hour_fin, type, description) VALUES ("ddddd", null, null, "dddd","dddd")
// ver como se llama esto para las conexion y la optencion de datos