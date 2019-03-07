<?php
 //conectar
$link = mysqli_connect("localhost","root","A271302!!");
//insertar
 mysqli_query($link, "CREATE  DATABASE  Banco");
$estadofilas = mysqli_affected_rows($link);//1 esta bn -1 un error 0 nada
mysqli_select_db($link,"Banco");

mysqli_query($link,'CREATE TABLE clientes (cl_dni VARCHAR(9)  NOT NULL, 
                               cl_nom VARCHAR(50) NOT NULL,  
                               cl_dir VARCHAR(60) NOT NULL,  
                               cl_tel VARCHAR(9)  NOT NULL, 
                               cl_ema VARCHAR(65) NOT NULL,  
                               cl_fna DATE,
                               cl_fcl DATE        NOT NULL, 
                               cl_ncu TINYINT(2)  NOT NULL, 
                               cl_sal INT(8)      NOT NULL, 
                               PRIMARY KEY (cl_dni))ENGINE = InnoDB');
$estadofilas1 = mysqli_affected_rows($link);
mysqli_query($link, 'CREATE TABLE cuentas (cu_ncu VARCHAR(10) NOT NULL,
                      cu_dn1 VARCHAR(9) NOT NULL,
                      cu_dn2 VARCHAR(9),
                      cu_sal INT(8) NOT NULL,
                      PRIMARY KEY (cu_ncu),
                      FOREIGN KEY (cu_dn1) REFERENCES clientes(cl_dni),
                      FOREIGN KEY (cu_dn2) REFERENCES clientes(cl_dni))ENGINE = InnoDB');
$estadofilas2 = mysqli_affected_rows($link);
mysqli_query($link, 'CREATE TABLE movimientos (mo_ncu VARCHAR(10)  NOT NULL,  
                                  mo_fec DATE         NOT NULL, 
                                  mo_hor VARCHAR(6)   NOT NULL, 
                                  mo_des VARCHAR(80)  NOT NULL,  
                                  mo_imp INT(8)       NOT NULL,  
                                  PRIMARY KEY (mo_ncu, mo_fec, mo_hor))ENGINE = InnoDB');
$estadofilas3 = mysqli_affected_rows($link);
//INSERT INTO `clientes` (cl_dni, cl_nom, cl_dir, cl_tel, cl_ema, cl_fna, cl_fcl, cl_ncu, cl_sal) VALUES ('02558288k', 'ronny', 'talco', '672608341', 'ronnymontano', '1997-12-02', '2018-2-10', '10', '1000');
mysqli_query($link, ' INSERT INTO clientes (cl_dni, cl_nom, cl_dir, cl_tel, cl_ema, cl_fna, cl_fcl, cl_ncu, cl_sal) VALUES ("02558288k", "ronny", "talco", "672608341", "ronnymontano", "1997-12-02", "2018-2-10", "1", "1000")');
mysqli_query($link, ' INSERT INTO cuentas (cu_ncu, cu_dn1, cu_dn2, cu_sal) VALUES ("1111111110", "02558288k", NULL, "1000")');
mysqli_query($link, ' INSERT INTO movimientos (mo_ncu, mo_fec, mo_hor, mo_des, mo_imp) VALUES ("1111111110", "2018-12-13", "13", "Movimiento de dinero", "10")');


//procesar los datos
if($estadofilas==1&$estadofilas1==0&$estadofilas2==0&$estadofilas3==0){
	echo 'Tabla Creada con exito';
}else{
	echo 'error';
}

//cerrar la conexion
mysqli_close($link);
?>
<br>
<a href="ControlBanco.php">Inicio</a>