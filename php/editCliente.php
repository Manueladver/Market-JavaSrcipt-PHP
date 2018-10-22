<?php

	//Datos campos formulario
	$nombre = $_POST['nombre'];
	$dni = $_POST['dni'];
	$domicilio = $_POST['domicilio'];
	$poblacion = $_POST['poblacion'];
	$provincia = $_POST['provincia'];

	//Creamos la conexión
	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Formateamos los datos UTF-8
	mysqli_set_charset($conexion, "utf8");

	//Generamos la consulta
	$sql = "UPDATE clientes SET nombre='".$nombre."', dni='".$dni."', domicilio='".$domicilio."', poblacion='".$poblacion."', provincia='".$provincia."' WHERE dni='".$dni."'";

	//Ejecutamos
	mysqli_query($conexion, $sql);

	//Cerramos
	mysqli_close($conexion);

?>