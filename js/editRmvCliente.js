$(document).ready(function() {

	//CSS Custom ocultar formulario edición

	$('#edit_cliente').css({
		"display" : "none"
	});

	//Selecionar cliente para editar
	$('#editar').on("click", function() {

		//DNI cliente
		var $dni = $("#dni-edit").val();

		//Validamos el DNI
		if(validarDni($dni) == true) {

			//Variable auxiliar
			var $cliente = [];

			//Petición a la base de datos
			$.ajax({

				url: './php/selEditCliente.php',
				type: 'POST',
				data: "dni="+$dni,
				success: function(data) {

					if(data == false) {

						alert("DNI de cliente no encontrado. Por favor, introduzca otro.");

						$('#dni-edit').val("");

					} else {

						//CSS Custom mostrar formulario edición
						$('#edit_cliente').css({
							"display" : "block"
						});

						//Guardamos los datos en un jSon
						$cliente = JSON.parse(data);
					
						//Rellenamos el formulario con los datos originales
						$('#nombre').val($cliente[0].nombre);
						$('#dni').val($cliente[0].dni);
						$('#domicilio').val($cliente[0].domicilio);
						$('#poblacion').val($cliente[0].poblacion);
						$('#provincia').val($cliente[0].provincia);

					}

				}

			});

		} else {

			alert("El DNI introducido no es correcto, revísalo");

		}

	});

	//Modificar un producto
	$('#modificar').on("click", function() {

		//Guardamos el formulario
		var form = $('#csForm')[0];

		//Creamos un FormData para almacenar los datos del formulario
		var datos = new FormData(form);

		//Variables con valores del producto
		var $nombre = $("#nombre").val();
		var $dni = $("#dni").val();
		var $domicilio = $("#domicilio").val();
    	var $poblacion = $("#poblacion").val();
    	var $provincia = $("#provincia").val();

    	//Añadimos los datos al FormData
		datos.append("nombre", $nombre);
		datos.append("dni", $dni);
		datos.append("domicilio", $domicilio);
		datos.append("poblacion", $poblacion);
		datos.append("provincia", $provincia);

		//Validamos los campos del formulario
		if(validarUsuario($nombre, $dni, $domicilio, $poblacion, $provincia) == true) {

			//Petición a la base de datos
			$.ajax({

				url: './php/editCliente.php',
				type: 'POST',
				contentType: false,
				data: datos,
				processData: false,
				success: function(data) {

					alert("Datos de cliente editados correctamente");

					//Vaciar datos
					$("#nombre").val("");
					$("#dni").val("");
					$("#domicilio").val("");
					$("#poblacion").val("");
					$("#provincia").val("");

					//CSS Custom
					$('#edit_cliente').css({
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
		var $dni = $("#dni-edit").val();

		//Validar DNI
		if(validarDni($dni) == true) {

			//Petición a la base de datos
			$.ajax({

				url: './php/deleteCliente.php',
				type: 'POST',
				data: "dni="+$dni,
				success: function(data) {

					alert("Cliente dado de baja correctamente");

					$('#dni-edit').val("");

					//Ocultar menu editar
					$('#edit_cliente').css({
						"display" : "none"
					});

				}

			});

		} else {

			alert("El DNI introducido no es correcto, revísalo");

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

//Validar DNI usuario ya registrado
function validarDni($dni) {

	//Variable boolean
	var $isCorrect = true;

	//Variables letras DNI
	var $letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

	//Validar campos
	if($dni == '' || !(/^\d{8}[A-Z]$/.test($dni))) {
		
		$isCorrect = false;
		
	} else {
	
		return $isCorrect;
		
	}

}

//Validar registro cliente
function validarUsuario($nombre, $dni, $domicilio, $poblacion, $provincia) {

	//Variable boolean
	var $isCorrect = true;

	//Variables letras DNI
	var $letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

	//Validar campos
	if($nombre == '' || $dni == '' || !(/^\d{8}[A-Z]$/.test($dni)) || $domicilio == '' || $poblacion == '' || !/^[a-zA-Z]*$/g.test($poblacion) || $provincia == '' || !/^[a-zA-Z]*$/g.test($provincia)) {
		
		$isCorrect = false;

	} else {

		return $isCorrect;

	}

}