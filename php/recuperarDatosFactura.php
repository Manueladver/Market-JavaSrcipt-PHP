<?php
	
	//Valor DNI cliente
	$numAno = $_POST['numAno'];

	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	//Creamos la conexión
	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Generamos la consulta
	$sql = "SELECT numero, dni_cliente, totales, estado FROM facturas WHERE YEAR(año)='$numAno'";

	//Formateamos los datos UTF-8
	mysqli_set_charset($conexion, "utf8");

	if(!$result = mysqli_query($conexion, $sql)) die();

	//Creamos un array donde almacenaremos la información
	$datosFact = array();

	//Recorremos y añadimos la información al array
	while($row = mysqli_fetch_array($result)) { 
		$numero = $row['numero'];
		$dni_cliente = $row['dni_cliente'];
		$totales = $row['totales'];
		$estado = $row['estado'];
    
    	$datosFact[] = array('numero' => $numero, 'dni_cliente' => $dni_cliente, 'totales' => $totales, 'estado' => $estado);

	}

	//Desconectamos la base de datos
	$close = mysqli_close($conexion) or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

	//Creamos el JSON con los datos de la base de datos
	$json_string = json_encode($datosFact);
	echo $json_string;

?>