<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//PDO
class conectaBD {

    private $db;
     private $archivo;
    private $contenido;
    private $servidor;
    private $usuario;
    private $clave;
    private $bd;
   function __construct() {
        $this->setArchivo("sitio.conf");
        $this->setContenido(parse_ini_file($this->archivo, true));
        $this->setServidor($this->contenido['servidor']);
        $this->setUsuario($this->contenido['usuario_admin']);
        $this->setClave($this->contenido['contrasenia_admin']);
        $this->setBd($this->contenido['nombrebd']);
          $dsn = 'mysql:host='.$this->servidor.';dbname='.$this->bd.';charset=utf8';
        try {
            $this->db = new PDO($dsn, $this->usuario, $this->clave);
        } catch (PDOException $e) {
            die("¡Error!: " . $e->getMessage() . "<br/>");
        }
    }
      
    function setArchivo($archivo) {
        $this->archivo = $archivo;
    }

    function setContenido($contenido) {
        $this->contenido = $contenido;
    }

    function setServidor($servidor) {
        $this->servidor = $servidor;
    }

    function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    function setClave($clave) {
        $this->clave = $clave;
    }

    function setBd($bd) {
        $this->bd = $bd;
    }
  

    public function select($sql) {
        $filas = array();
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
            $this->db->exec($sql);
            echo 'OK';
        } catch (PDOException $e) {
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    public function delete($sql, $sqlSimple) {
        try {
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $consulta = $this->db->prepare($sql);
            $consulta->execute();
            if ($consulta->rowCount() == 0) {
                $this->db->exec($sqlSimple);
            }
            echo 'OK';
        } catch (PDOException $e) {
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    public function update($sql) {
        try {
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Prepare statement
            $consulta = $this->db->prepare($sql);
            // execute the query
            $consulta->execute();
            // echo a message to say the UPDATE succeeded
            echo 'OK';
        } catch (PDOException $e) {
            echo $sql . "<br>" . $e->getMessage();
        }
    }

}

//INSERT INTO elementos ( name, hour_ini, hour_fin, type, description) VALUES ("ddddd", null, null, "dddd","dddd")
/*
 * 
 CREATE TABLE `elementos` (
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 * 
 * 
 * 
 */