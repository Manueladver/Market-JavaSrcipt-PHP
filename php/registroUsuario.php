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

	//Comprobamos si el DNI existe en la base de datos
	$check = "SELECT dni FROM clientes WHERE dni='$dni'";

	//Guardamos la consulta
	$result = mysqli_query($conexion, $check);
	$val = mysqli_fetch_array($result);

	//Comprobación
	if(strtolower($dni) == strtolower($val[0])) {

		//Si se encuentra el dni en la base de datos devuelve false
		$check = false;
		echo $check;


	} else {

		//Generamos la consulta para registrar a un nuevo usuario
		$sql = "INSERT INTO clientes (nombre, dni, domicilio, poblacion, provincia) VALUES ('$nombre', '$dni', '$domicilio', '$poblacion', '$provincia')";

		//Hacemos la inserción
		mysqli_query($conexion, $sql);

		//Devolvemos true si no hay errores
		$check = true;
		echo $check;	

	}

	//Cerramos
	mysqli_close($conexion);

?>