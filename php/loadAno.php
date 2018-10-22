<?php 

	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	//Creamos la conexión
	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Generamos la consulta
	$sql = "SELECT DISTINCT YEAR(año) FROM facturas ORDER BY YEAR(año) ASC";

	//Formateamos los datos UTF-8
	mysqli_set_charset($conexion, "utf8");

	if(!$result = mysqli_query($conexion, $sql)) die();

	echo '<option value="#">-- Año --</option>';

	//Guardamos el resultado
	while (($fila = mysqli_fetch_array($result)) != NULL) {
    	echo '<option value="'.$fila["YEAR(año)"].'">'.$fila["YEAR(año)"].'</option>';
	}
    
	//Desconectamos la base de datos
	$close = mysqli_close($conexion) or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

?>