<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//PDO
class conectaBD {

    protected $db;

    function __construct() {
        $dsn = 'mysql:host=localhost;dbname=reserva_aulas;charset=utf8';
        $usuario = 'root';
        $pass = '';
        try {
            $this->db = new PDO($dsn, $usuario, $pass);
        } catch (PDOException $e) {
            die("¡Error!: " . $e->getMessage() . "<br/>");
        }
    }
    public function insertTabla($sql) {
        try {
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo $sql;
            $this->db->exec($sql);
            echo "New record created successfully";
        } catch (PDOException $e) {
            echo $sql . "<br>" . $e->getMessage();
        }
    }



}
$bd = new conectaBD();
$sql = "CREATE TABLE `elementos` (
  `id` int(11) NOT NULL  AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `reserva` (
  `id` int(20) NOT NULL  AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `fecha` date NOT NULL,
  `hour_ini` date NOT NULL,
  `hour_fin` date NOT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `id_elementos` int(20) NOT NULL,
   PRIMARY KEY (id),
    FOREIGN KEY (id_elementos) REFERENCES elementos(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
$bd->insertTabla($sql);
mysqli_close($bd);