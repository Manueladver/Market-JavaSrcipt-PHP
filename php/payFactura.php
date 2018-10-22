<?php
	
	//Valor DNI cliente
	$numFact = $_POST['numFact'];

	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	//Creamos la conexión
	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Generamos la consulta
	$sql = "UPDATE facturas SET estado='pagada' WHERE numero='$numFact'";

	//Ejecutamos
	mysqli_query($conexion, $sql);

	//Cerramos
	mysqli_close($conexion);

?>