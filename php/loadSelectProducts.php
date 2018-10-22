<?php 

	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	//Creamos la conexión
	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Generamos la consulta
	$sql = "SELECT ref FROM productos";

	//Formateamos los datos UTF-8
	mysqli_set_charset($conexion, "utf8");

	if(!$result = mysqli_query($conexion, $sql)) die();

	echo '<option>Elige un producto</option>';

	//Guardamos el resultado
	while (($fila = mysqli_fetch_array($result)) != NULL) {
    	echo '<option value="'.$fila["ref"].'">'.$fila["ref"].'</option>';
	}
    
	//Desconectamos la base de datos
	$close = mysqli_close($conexion) or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
  
	//Creamos el JSON con los datos de la base de datos
	$json_string = json_encode($productos);
	echo $json_string;

?>