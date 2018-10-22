<?php

	//Valor DNI cliente
	$dniCliente = $_POST['dni'];

	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	//Creamos la conexión
	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Formateamos los datos UTF-8
	mysqli_set_charset($conexion, "utf8");

	//Comprobamos si hay facturas con este DNI
	$check = "SELECT dni_cliente FROM facturas WHERE dni_cliente='$dniCliente'";

	//Guardamos la consulta
	$result = mysqli_query($conexion, $check);
	$val = mysqli_fetch_array($result);

	//Comprobación
	if(strtolower($dniCliente) != strtolower($val[0])) {

		//Si se encuentra el dni en la base de datos devuelve false
		$check = false;
		echo $check;

	} else {

		//Generamos la consulta
		$sql = "SELECT numero FROM facturas WHERE dni_cliente='$dniCliente'";

		if(!$result = mysqli_query($conexion, $sql)) die();

		//Creamos un array donde almacenaremos la información
		$numFacturas = array();

		//Recorremos y añadimos la información al array
		while($row = mysqli_fetch_array($result)) { 
			$num = $row['numero'];
    
    		$numFacturas[] = ['numero' => $num];

		}


		//Creamos el JSON con los datos de la base de datos
		$json_string = json_encode($numFacturas);
		echo $json_string;

	}

	//Desconectamos la base de datos
	$close = mysqli_close($conexion) or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
	
?>