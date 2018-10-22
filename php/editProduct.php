<?php

	//Datos campos formulario
	$mainRef = $_POST['mainRef'];
	$ref = $_POST['ref'];
	$nom_cat = $_POST['nom_cat'];
	$nombre = $_POST['nombre'];
	$precio = $_POST['precio'];
	$nomImagen = $_FILES['imagen']['name'];
	$rutaImg = "imagenes/".$nomImagen;

	//Creamos la conexión
	$server = "localhost";
	$user = "root";
	$pass = "";
	$bd = "bdmarket";

	$conexion = mysqli_connect($server, $user, $pass,$bd) or die("Ha sucedido un error inexperado en la conexion de la base de datos");

	//Formateamos los datos UTF-8
	mysqli_set_charset($conexion, "utf8");

	//Generamos la consulta
	if(empty($nomImagen)) {
		$sql = "UPDATE productos SET nom_cat='".$nom_cat."', ref='".$ref."', nombre='".$nombre."', precio='".$precio."' WHERE ref='".$mainRef."'";
	} else {
		$sql = "UPDATE productos SET nom_cat='".$nom_cat."', ref='".$ref."', nombre='".$nombre."', precio='".$precio."', imagen='".$rutaImg."' WHERE ref='".$mainRef."'";
	}

	//Subimos la imagen a la carpeta imagenes
	move_uploaded_file($_FILES['imagen']['tmp_name'],"../imagenes/".$nomImagen);

	//Ejecutamos
	mysqli_query($conexion, $sql);

	//Cerramos
	mysqli_close($conexion);

?>