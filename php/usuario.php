<?php
	
	//Datos campos formulario
	$dni = $_POST['dni'];
	$total = $_POST['total'];

	//Datos del JSON con la factura
	$json = $_POST['datos'];
	$factura = json_decode($json, true);

	//Creamos la conexión
	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Formateamos los datos UTF-8
	mysqli_set_charset($conexion, "utf8");

	//Comprobamos si el DNI existe en la base de datos
	$check = "SELECT dni FROM clientes WHERE dni='$dni'";

	//Guardamos la consulta
	$result = mysqli_query($conexion, $check);
	$val = mysqli_fetch_array($result);

	//Comprobación
	if(strtolower($dni) == strtolower($val[0])) {

		//Generamos la consulta para insertar la factura
		$sql = "INSERT INTO facturas (numero, dni_cliente, totales) VALUES (DEFAULT, '$dni', '$total')";
		mysqli_query($conexion, $sql);

		//Generamos una consulta para saber cual es el número de la última factura
		$ultFactura = "SELECT numero FROM facturas ORDER BY numero DESC LIMIT 1";
		$result = mysqli_query($conexion, $ultFactura);
		$val = mysqli_fetch_row($result);

		//Recorremos el array y realizamos un insert por cada detalle de la factura
		foreach ($factura as $detalles) {
   			$insert = "INSERT INTO detalles_factura(num_detalle, num_factura, ref, precio, cantidad, total) VALUES (DEFAULT, $val[0], '".$detalles['ref']."', '".$detalles['precio']."', '".$detalles['cantidad']."', '".$detalles['total']."')";
   			mysqli_query($conexion, $insert);
		}

		//Devolvemos true si no hay errores
		$check = true;
		echo $check;	

	} else {

		//Si no se encuentra el DNI en la base de datos, devuelve false
		$check = false;
		echo $check;

	}

	//Cerramos
	mysqli_close($conexion);

?>