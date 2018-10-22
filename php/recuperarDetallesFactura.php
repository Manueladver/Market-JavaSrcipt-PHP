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
	$sql = "SELECT num_detalle, ref, precio, cantidad, total FROM detalles_factura WHERE num_factura='$numFact'";

	//Formateamos los datos UTF-8
	mysqli_set_charset($conexion, "utf8");

	if(!$result = mysqli_query($conexion, $sql)) die();

	//Creamos un array donde almacenaremos la información
	$datosFact = array();

	//Recorremos y añadimos la información al array
	while($row = mysqli_fetch_array($result)) {
		$num_detalle = $row['num_detalle']; 
		$ref = $row['ref'];
		$precio = $row['precio'];
		$cantidad = $row['cantidad'];
		$total = $row['total'];
    
    	$datosFact[] = array('num_detalle' => $num_detalle, 'ref' => $ref, 'precio' => $precio, 'cantidad' => $cantidad, 'total' => $total);

	}

	//Desconectamos la base de datos
	$close = mysqli_close($conexion) or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

	//Creamos el JSON con los datos de la base de datos
	$json_string = json_encode($datosFact);
	echo $json_string;

?>