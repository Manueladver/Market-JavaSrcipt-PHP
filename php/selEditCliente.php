<?php

	//DNI cliente
	$dni = $_POST['dni'];

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

		//Generamos la consulta
		$sql = "SELECT nombre, dni, domicilio, poblacion, provincia FROM clientes WHERE dni='$dni'";

		if(!$result = mysqli_query($conexion, $sql)) die();

		//Creamos un array donde almacenaremos la información
		$cliente = array();

		while($row = mysqli_fetch_array($result)) {
			$nombre=$row['nombre'];
    		$dni=$row['dni'];
    		$domicilio=$row['domicilio'];
    		$poblacion=$row['poblacion'];
    		$provincia=$row['provincia'];
    
    		$cliente[] = array('nombre'=> $nombre, 'dni'=> $dni, 'domicilio'=> $domicilio, 'poblacion'=> $poblacion, 'provincia' => $provincia);

		}

		//Creamos el JSON con los datos de la base de datos
		$json_string = json_encode($cliente);
		echo $json_string;

	} else {

		//Si no se encuentra el dni en la base de datos devuelve false
		$check = false;
		echo $check;

	}

	//Desconectamos la base de datos
	$close = mysqli_close($conexion) or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

?>