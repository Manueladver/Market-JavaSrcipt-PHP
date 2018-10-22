$(document).ready(function() {

	//CSS Custom ocultar formulario edición

	$('#edit_product').css({
		"display" : "none"
	});

	//Cargamos el select de productos
	loadSelect();

	//Selecionar Producto Editar
	$('#editar').on("click", function() {

		//Referencia de producto
		var $ref = $("#producto").val();

		var $firstOptPr = $('#producto').find("option:first-child").val();

		if($ref !== $firstOptPr) {

			loadCategories();

			//Variable auxiliar
			var $producto = [];

			//Petición a la base de datos
			$.ajax({

				url: './php/selEditProduct.php',
				type: 'POST',
				dataType: 'json',
				data: "producto="+$ref,
				success: function(data) {

					//CSS Custom mostrar formulario edición
					$('#edit_product').css({
						"display" : "block"
					});

					//Guardamos los datos en un jSon
					$producto = data;
					
					//Rellenamos el formulario con los datos originales
					$('#cat_pr').val($producto[0].nom_cat);
					$('#nombre').val($producto[0].nombre);
					$('#ref').val($producto[0].ref);
					$('#precio').val($producto[0].precio);

					//Vemos si hay imagen y vaciamos si existe
					if($('#ffac').children()) {
						$('#ffac').empty();
					}

					//Cargamos la imagen de la base de datos
					$('<img>', {src : $producto[0].imagen, 'class' : 'peque img-fluid'}).appendTo($('#ffac'));

				}

			});

		} else {

			alert("Tienes que seleccionar un producto");

		}

	});

	//Modificar un producto
	$('#modificar').on("click", function() {

		//Recogemos la imagen del formulario
		var $imagen = $('#imagen')[0].files[0];

		//Guardamos el formulario
		var form = $('#csForm')[0];

		//Creamos un FormData para almacenar los datos del formulario
		var datos = new FormData(form);

		//Variables con valores del producto
		var $mainRef = $("#producto").val();
		var $cat = $("#cat_pr").val();
		var $nombre = $("#nombre").val();
    	var $ref = $("#ref").val();
    	var $precio = $("#precio").val();

    	//Añadimos los datos al FormData
		datos.append("mainRef", $mainRef);
		datos.append("nombre", $nombre);
		datos.append("nom_cat", $cat);
		datos.append("ref", $ref);
		datos.append("precio", $precio);
		datos.append("imagen", $imagen);

		if(validator() == true) {

			//Petición a la base de datos
			$.ajax({

				url: './php/editProduct.php',
				type: 'POST',
				contentType: false,
				data: datos,
				processData: false,
				success: function(data) {

					alert("Producto editado correctamente");

					//Vaciar datos
					$('#producto').val($('#producto').find("option:first-child").val());
					$('#cat_pr').val($('#cat_pr').find("option:first-child").val());
					$("#nombre").val("");
					$("#ref").val("");
					$("#precio").val("");
					$("#imagen").val("");

					//CSS Custom
					$('#edit_product').css({
						"display" : "none"
					});

				}

			});

		} else {

			alert('Algunos campos no son correctos, revísalos');

		}

	});

	//Borrar producto
	$('#borrar').on("click", function() {

		//Referencia de producto
		var $ref = $("#producto").val();

		//Valores por defecto
		var $firstOptPr = $('#producto').find("option:first-child").val();

		if($ref !== $firstOptPr) {

			//Petición a la base de datos
			$.ajax({

				url: './php/deleteProduct.php',
				type: 'POST',
				data: "producto="+$ref,
				success: function(data) {

					alert("Producto Borrado");

					//Recargamos el select de productos
					loadSelect();

					//Ocultar menu editar
					$('#edit_product').css({
						"display" : "none"
					});

				}

			});

		} else {

			alert("Selecciona un producto de la lista para borrar.");

		}

	});

	//Prevenir envio
	$('#csForm').submit(function(event) {
		
		event.preventDefault();
		
	});

	//Link alta de productos
	$('#alta').on("click", function() {

		window.location.href = './alta.html';

	});

	//Link borrar productos
	$('#del').on("click", function() {

		window.location.href = './editdel.html';

	});

	//Link borrar productos
	$('#altcliente').on("click", function() {

		window.location.href = './alta_cliente.html';

	});

	//Link borrar productos
	$('#editcliente').on("click", function() {

		window.location.href = './editDelCliente.html';

	});

	//Link editar facturas
	$('#editfact').on("click", function() {

		window.location.href = './editFact.html';

	});

	//Regresar
	$('#volver').on("click", function() {

		window.location.href = './index.html';

	});

});

//Cargar Select de productos
function loadSelect() {

	$.ajax({

		url: './php/loadSelectProducts.php',
		type: 'GET',
		success: function(data) {

			$('#producto').html(data).fadeIn();

		}

	});

}

//Cargar Select de categorías
function loadCategories() {

	$.ajax({

		url: './php/loadSelectCats.php',
		type: 'POST',
		success: function(data) {

			$('#cat_pr').html(data).fadeIn();

		}

	});

}

//Validar campos formulario
function validator() {
	
	//Variable boolean
	var $isCorrect = true;
	
	//Para editar producto
	
	if($('#nombre').val() == '' || $('#ref').val() == '' ||$('#precio').val() == '' || isNaN($('#precio').val())) {
	
		$isCorrect = false;
	
	} else {
	
		return $isCorrect;
		
	}
	
}