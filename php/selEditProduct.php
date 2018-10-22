<?php

	//Variable referencia producto
	$ref = $_POST['producto'];

	//Creamos la conexión
	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Generamos la consulta
	$sql = "SELECT nom_cat, ref, nombre, precio, imagen FROM productos WHERE ref='$ref'";

	//Formateamos los datos UTF-8
	mysqli_set_charset($conexion, "utf8");

	if(!$result = mysqli_query($conexion, $sql)) die();

	//Creamos un array donde almacenaremos la información
	$producto = array();

	while($row = mysqli_fetch_array($result)) {
		$nom_cat=$row['nom_cat'];
    	$nombre=$row['nombre'];
    	$ref=$row['ref'];
    	$precio=$row['precio'];
    	$imagen=$row['imagen'];
    
    	$producto[] = array('nom_cat'=> $nom_cat, 'nombre'=> $nombre, 'ref'=> $ref, 'precio'=> $precio, 'imagen' => $imagen);

	}

	//Creamos el JSON con los datos de la base de datos
	$json_string = json_encode($producto);
	echo $json_string;

	//Desconectamos la base de datos
	$close = mysqli_close($conexion) or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

?>