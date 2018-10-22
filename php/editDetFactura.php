<?php
	
	//Valor DNI cliente
	$numFact = $_POST['numFact'];
	$numDetalle = $_POST['numDetalle'];
	$valCantidad = $_POST['valCantidad'];
	$nTotal = $_POST['nTotal'];
	$total = $_POST['total'];

	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	//Creamos la conexión
	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Generamos el UPDATE
	$sql = "UPDATE detalles_factura SET cantidad='$valCantidad', total='$nTotal' WHERE num_detalle='$numDetalle'";

	//Ejecutamos
	mysqli_query($conexion, $sql);

	//Generamos la consulta
	$sql2 = "UPDATE facturas SET totales=(totales+'$nTotal')-'$total' WHERE numero='$numFact'";

	//Ejecutamos
	mysqli_query($conexion, $sql2);

	//Cerramos
	mysqli_close($conexion);

?>