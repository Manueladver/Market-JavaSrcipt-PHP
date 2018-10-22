<?php

	//Datos campos formulario
	$nom_cat = $_POST['categoria'];
	$ref = $_POST['ref'];
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

	//Comprobamos si el producto existe en la base de datos
	$check = "SELECT ref FROM productos WHERE ref='$ref'";

	//Guardamos la consulta
	$result = mysqli_query($conexion, $check);
	$val = mysqli_fetch_array($result);

	//Comprobación
	if($ref == $val[0]) {

		echo "El producto ya existe en la base de datos";

	} else {

		//Generamos la consulta
		$sql = "INSERT INTO productos (nom_cat, ref, nombre, precio, imagen) VALUES ('$nom_cat', '$ref', '$nombre', '$precio', '$rutaImg')";

		//Insertamos el producto
		mysqli_query($conexion, $sql);

		//Subimos la imagen a la carpeta imagenes
		move_uploaded_file($_FILES['imagen']['tmp_name'],"../imagenes/".$nomImagen);
		
		echo "Producto dado de alta correctamente";

	}
	
	//Cerramos
	mysqli_close($conexion);

?>