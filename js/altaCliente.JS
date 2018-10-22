$(document).ready(function() {

	$('#btn-registro').on("click", function() {
		
		//Valores input form
		var $formNombre = $('#factura-form').find('#nombre').val();
		var $formDni = $('#factura-form').find('#dni').val();
		var $formDomicilio = $('#factura-form').find('#domicilio').val();
		var $formPoblacion = $('#factura-form').find('#poblacion').val();
		var $formProvincia = $('#factura-form').find('#provincia').val();

		if(validarUsuario($formNombre, $formDni, $formDomicilio, $formPoblacion, $formProvincia) == true) {

			//Petición a la base de datos
			$.ajax({

				url: './php/registroUsuario.php',
				type: 'POST',
				data: "nombre="+$formNombre+"&dni="+$formDni+"&domicilio="+$formDomicilio+"&poblacion="+$formPoblacion+"&provincia="+$formProvincia,
				success: function(data) {

					if(data == true) {

						alert("Usuario dado de alta correctamente.");

						//Vaciar datos
						$('#nombre').val("");
						$('#dni').val("");
						$('#domicilio').val("");
						$('#poblacion').val("");
						$('#provincia').val("");

					} else {

						$('#user-dni').val("");

						alert("El DNI ya esta registrado. Introduce otro DNI.");

					}

				}

			});

		} else {

			alert("Algún campo es incorrecto, revísalos");

		}

	});

	//Prevenir envio
	$('#factura-form').submit(function(event) {
		
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

//Validar registro cliente
function validarUsuario($nombre, $dni, $domicilio, $poblacion, $provincia) {

	//Variable boolean
	var $isCorrect = true;

	//Variables letras DNI
	var $letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

	//Validar campos
	if($nombre == '' || !/^[a-zA-Z]*$/g.test($nombre) || $dni == '' || !(/^\d{8}[A-Z]$/.test($dni)) || $domicilio == '' || $poblacion == '' || !/^[a-zA-Z]*$/g.test($poblacion) || $provincia == '' || !/^[a-zA-Z]*$/g.test($provincia)) {
		
		$isCorrect = false;

	} else {

		return $isCorrect;

	}

}