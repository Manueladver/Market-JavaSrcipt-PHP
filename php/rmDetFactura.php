<?php
	
	//Valor DNI cliente
	$numFact = $_POST['numFact'];
	$numDetalle = $_POST['numDetalle'];
	$total = $_POST['total'];

	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	//Creamos la conexión
	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Generamos la consulta
	$sql = "DELETE FROM detalles_factura WHERE num_detalle='$numDetalle'";

	//Ejecutamos
	mysqli_query($conexion, $sql);

	//Comprobamos si quedan detalles de la factura seleccionada
	$check = "SELECT num_factura FROM detalles_factura WHERE num_factura='$numFact'";

	//Guardamos la consulta
	$result = mysqli_query($conexion, $check);
	$val = mysqli_fetch_array($result);

	//Comprobación
	if(strtolower($numFact) == strtolower($val[0])) {

		//Generamos el UPDATE
		$sql2 = "UPDATE facturas SET totales=totales-'$total' WHERE numero='$numFact'";

		//Ejecutamos
		mysqli_query($conexion, $sql2);

	} else {

		//Generamos la consulta
		$sql3 = "DELETE FROM facturas WHERE numero='$numFact'";

		//Ejecutamos
		mysqli_query($conexion, $sql3);

	}

	//Cerramos
	mysqli_close($conexion);

?>