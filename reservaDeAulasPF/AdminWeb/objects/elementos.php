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
    public $hour_ini;
    public $hour_fin;
    public $type;
    public $description;

    public function __construct($name, $type, $description, $hour_ini = null, $hour_fin = null) {
        $this->name = $name;
        $this->type = $type;
        $this->hour_ini = $hour_ini;
        $this->hour_fin = $hour_fin;
        $this->description = $description;
        $this->bd = new conectaBD();
    }

// no se si me hace fata aun
    public function getName() {
        return;
    }

    public function insertElement() {
        //protegerse de sql inyection

//        $sql = 'INSERT INTO elementos ( name, hour_ini, hour_fin, type, description)'
//                . ' VALUES ("' . $this->name . '", null, null, "' . $this->type . '","' . $this->description . '")';
         $sql ='INSERT INTO elementos ( name, hour_ini, hour_fin, type, description) VALUES ("ddddd", null, null, "dddd","dddd")';
        $this->bd->insert($sql);
    }

}

//INSERT INTO elementos ( name, hour_ini, hour_fin, type, description) VALUES ("ddddd", null, null, "dddd","dddd")
