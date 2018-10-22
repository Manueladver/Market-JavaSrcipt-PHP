$(document).ready(function() {

	//Cargamos las categorías
	loadSelect();

	//Insertar nueva Categoría
	$('#inscat').on("click", function(event) {

		//Prevenimos el envío
		event.preventDefault();

		//Valores campos
		var $cat = $('#cat').val();
		var $descripcion = $('#descripcion').val();

		//Variable validador
		var $val = 1;

		//Validamos los campos
		if(validator($val) == true) {

			//Petición a la base de datos
			$.ajax({

				url: './php/altaCat.php',
				type: 'POST',
				data: "nombre="+$cat+"&descripcion="+$descripcion,
				success: function(data) {

					alert(data);

					//Vaciar datos
					$('#cat').val("");
					$('#descripcion').val("");

					//Cargamos el select con las categorías
					loadSelect();

				}

			});

		} else {

			alert('Algunos campos no son correctos, revísalos');

		}

	});

	//Insertar nuevo Producto
	$('#insertar').on("click", function() {

		//Recogemos la imagen del formulario
		var $imagen = $('#imagen')[0].files[0];

		//Guardamos el formulario
		var form = $('#formAlta')[0];

		//Creamos un FormData para almacenar los datos del formulario
		var datos = new FormData(form);

		//Datos del formulario
		var $categoria = $('#categoria').val();
		var $nombre = $("#nombre").val();
    	var $ref = $("#ref").val();
    	var $precio = $("#precio").val();

    	//Añadimos los datos al FormData
		datos.append("categoria", $categoria);
		datos.append("nombre", $nombre);
		datos.append("ref", $ref);
		datos.append("precio", $precio);
		datos.append("imagen", $imagen);
		
		//Variable validador
		var $val = 0;

		//Validamos los campos
		if(validator($val) == true) {

			//Petición a la base de datos
			$.ajax({

				url: './php/altaProducts.php',
				type: 'POST',
				contentType: false,
				data: datos,
				processData: false,
				success: function(data) {

					alert(data);

					//Vaciar campos
					$('#categoria').val($('#categoria > option:first').val());
					$("#nombre").val("");
					$("#ref").val("");
					$("#precio").val("");
					$("#imagen").val("");

				}

			});

		} else {

			alert('Algunos campos no son correctos, revísalos');

		}

	});

	//Limpiar Campos
	$('#limpiar').on("click", function() {

		$("#nombre").val("");
		$("#ref").val("");
		$("#precio").val("");
		$("#imagen").val("");

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

///Cargamos el select de las categorías
function loadSelect() {

	$.ajax({

		url: './php/loadCat.php',
		type: 'GET',
		success: function(data) {

			$('#categoria').html(data).fadeIn();;

		}

	});

}

//Validar campos formulario
function validator($btn) {

	//Variable boolean
	var $isCorrect = true;

	//Valor de la categoría
	var $categoria = $('#categoria').val();

	//Para insertar producto
	if($btn == 0) {
	
		if($categoria == $('#categoria').find("option:first-child").val() || $('#nombre').val() == '' || $('#ref').val() == '' || $('#precio').val() == '' || isNaN($('#precio').val()) || $('#imagen').val() == '') {
	
			$isCorrect = false;
	
		} else {

			return $isCorrect;
		
		}

	//Para insertar categoría	
	} else if($btn == 1) {

		if($('#cat').val() == '' || $('#descripcion').val() == '') {

			$isCorrect = false;

		} else {

			return $isCorrect;

		}

	}
	
}