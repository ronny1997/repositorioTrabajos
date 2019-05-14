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

    public function select($sql) {
        $filas[] = array();
        $consulta = $this->db->prepare($sql);
        $consulta->setFetchMode(PDO::FETCH_ASSOC);
        $consulta->execute();
        if ($consulta->rowCount() > 0) {
            while ($row = $consulta->fetch()) {
                $filas[] = $row;
            }
        }
        return $filas;
    }

    public function insert($sql) {
        try {
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo $sql;
        $this->db->exec($sql);
        echo "New record created successfully";
        } catch(PDOException $e) {
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    public function delete($sql) {
        // set the PDO error mode to exception
        $conn = $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $conn->exec($sql);
        echo "Record deleted successfully";
    }

    public function update($sql) {
        $conn = $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare statement
        $stmt = $conn->prepare($sql);
        // execute the query
        $stmt->execute();
        // echo a message to say the UPDATE succeeded
        echo $stmt->rowCount() . " records UPDATED successfully";
    }

}

//INSERT INTO elementos ( name, hour_ini, hour_fin, type, description) VALUES ("ddddd", null, null, "dddd","dddd")