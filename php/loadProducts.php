<?php
	
	//Valor de la categoría seleccionada
	$nom_cat = $_POST['categoria'];

	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	//Creamos la conexión
	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Generamos la consulta
	$sql = "SELECT nombre, imagen, ref, precio FROM productos WHERE nom_cat='$nom_cat'";

	//Formateamos los datos UTF-8
	mysqli_set_charset($conexion, "utf8");

	if(!$result = mysqli_query($conexion, $sql)) die();

	//Creamos un array donde almacenaremos la información
	$productos = array();

	//Recorremos y añadimos la información al array
	while($row = mysqli_fetch_array($result)) { 
    	$nombre=$row['nombre'];
    	$imagen=$row['imagen'];
    	$ref=$row['ref'];
    	$precio=$row['precio'];
    
    	$productos[] = array('nombre'=> $nombre, 'imagen'=> $imagen, 'ref'=> $ref, 'precio'=> $precio);

	}
    
	//Desconectamos la base de datos
	$close = mysqli_close($conexion) or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
  
	//Creamos el JSON con los datos de la base de datos
	$json_string = json_encode($productos);
	echo $json_string;

?>