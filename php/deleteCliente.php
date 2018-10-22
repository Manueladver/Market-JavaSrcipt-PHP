<?php

	//Variable DNI
	$dni = $_POST['dni'];

	//Creamos la conexión
	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Generamos la consulta
	$sql = "DELETE FROM clientes WHERE dni='$dni'";

	//Ejecutamos
	mysqli_query($conexion, $sql);

	//Cerramos
	mysqli_close($conexion);

?>