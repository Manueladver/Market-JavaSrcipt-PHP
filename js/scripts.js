//Manuel Santiago Gavilán

$(document).ready(function() {

	//Variables globales (usadas en varios sitios) 
	$primg = $('#ffac');
	$prref = $('#ref');
	$prpre = $('#precio');
	$cant = $('#cantidad');
	$sumtot = 0;
	$count = 0;

	//Cargamos el select con las categorías de productos
	loadSelect();

	//Creamos la ventana modal
	createModal();

	//Pasar producto seleccionado y datos a la tabla
	$('#grabar').on("click", function() {
		
		if($count < 5) {
		
			if(validator() == true) {

				var $total = 0;
	
				$total = $prpre.val() * $cant.val();
				var $valoresInputs = [];
		
				//JSON valores input
				$valoresInputs = {
			
					/* "dni" : dni.value, */
					"ref" : $prref.val(),
					"precio" : $prpre.val(),
					"cantidad" : $cant.val(),
					"total" : $total
				
				}
				
				//Pasamos el jSON como parámetro
				createRows($valoresInputs);
				$count++;
		
				} else {
			
					alert('Algunos campos no son correctos, revisalos');
			
				}
				
		} else {
			
			//Desactivamos el botón para agregar más productos
			$('#grabar:disabled');
			alert("No puedes añadir nada más a la lista");
			
		}
		
	});

	//Abrir modal guardar facturas
	$('#almacenar').on("click", function(e) {

		//Vemos si nuestra tabala tiene productos
		var $check = $('tbody').find('tr');

		if($check.length > 1) {

			//CSS para la ventana modal
			modalCss();

			$('#user-form').css({
				"display" : "block"
			});

			$('#btn-grabar-dni').css({
				"display" : "inline"
			});

			$('#btn-registro').css({
				"display" : "inline"
			});

			$('#btn-recuperar').css({
				"display" : "none"
			});

			$('#recover-form').css({
				"display" : "none"
			});
			
     		e.stopPropagation();


		} else {

			alert("No has añadido ningún producto");

		}
		
	});

	//Abrir modal recuperar facturas
	$('#recuperar').on("click", function() {

		//CSS para la ventana modal
		modalCss();

		$('#user-form').css({
			"display" : "none"
		});

		$('#btn-grabar-dni').css({
			"display" : "none"
		});

		$('#btn-registro').css({
			"display" : "none"
		});

		$('#recover-form').css({
			"display" : "inline"
		});

		$('#btn-recuperar').css({
			"display" : "inline"
		});

	});

	//Cargar Factura
	$('#cargar_factura').on("click", function() {

		var $numFact = $('#lisfacatura').val();
		
		if($numFact != "#") {

			$.ajax({
  				type: "POST",
  				url: "./php/recDetFactura.php",
  				data: 'numFact='+$numFact,
  				success: function(data) {

  					if($('tbody > tr').length > 1) {
  					
  						//Eliminar elementos de la tabla
						var $table = $('tbody');
						var $delrow = $('tbody').find('tr');
						var $aux = $delrow.length;

						for(var $i = 1; $i < $aux; $i++) {

							$table.find('tr:last').remove();

						}

					}

					//Reiniciamos el total
					var sumtot = 0;

  					//Variable con string de datos de la factura
  					var $stringFact = data;

  					//Pasamos a jSON
  					var $datosFact = JSON.parse($stringFact);

  					//Añadimos datos de cliente y número factura
  					$('#nfactura').html($datosFact.info.numero);
  					$('#ncliente').html($datosFact.info.nombre);

  					//Cantidad de productos en el jSON
  					var $tamProducts = $datosFact.detalles.length;

  					//Array auxiliar
  					var $saveProductos = [];

  					for (var $i = 0; $i < $tamProducts; $i++) {

						$saveProductos = {
							"ref": $datosFact.detalles[$i].ref,
							"precio": $datosFact.detalles[$i].precio,
							"cantidad": $datosFact.detalles[$i].cantidad,
							"total": $datosFact.detalles[$i].total			
						}
				
						createRows($saveProductos);
					
					}

					$count = $datosFact.detalles.length;

  				}
  				
			});
			
		} else {
			
			$('#cargar_factura:disabled');
			alert("Selecciona una factura válida");
			
		}

	})

	//Listar productos
	$('#mostrar').on("click", function() {

		//Valor de la categoría y array de productos
		var $categoria = $('#categoria').val();
		var $products = [];

		//Comprobamos si la opción seleccionada no es por defecto
		if($categoria !== $('#categoria').find("option:first-child").val()) {

			//Petición a la base de datos
			$.ajax({

				url: './php/loadProducts.php',
				type: 'POST',
				dataType: 'json',
				data: "categoria="+$categoria,
				success: function(data) {

					//Almacenamos el resultado de la consulta
					$products = data;

					//Comprobamos si ya hay productos en la categoría
					if($products.length > 0) {

						//Comprobamos si tenemos productos listados
						if ($('#products_list').children().length > 0 ) {
					
							$('#products_list').children().remove();
							createProducts($products);

						} else {

							createProducts($products);

						}

					} else {

						alert("No hay productos en esa categoría");

					}

				}

			});

		} else {

			alert("Seleccione una categoría");

		}

	});

	//Link alta de productos
	$('#alta').on("click", function() {

		window.location.href = './alta.html';

	});

	//Link borrar productos
	$('#borrar').on("click", function() {

		window.location.href = './editdel.html';

	});

	//Link dar de alta cliente
	$('#altcliente').on("click", function() {

		window.location.href = './alta_cliente.html';

	});

	//Link editar clientes
	$('#editcliente').on("click", function() {

		window.location.href = './editDelCliente.html';

	});

	//Link editar facturas
	$('#editfact').on("click", function() {

		window.location.href = './editFact.html';

	});

	//Prevenir envio
	$('#miform').submit(function(event) {
		
		event.preventDefault();
		
	});
	
	//Limpiar inputs e imagen
	$('#cancelar').on("click", function() {
	
		if($primg.children()) {
		
			$primg.empty();
			$prref.val("");
			$prpre.val("");
			$cant.val("");

		}
		
	});

});

//Función CSS modal
function modalCss() {

		$('#modal-window').show();

		$('#factura-form').css({
			"display" : "none"
		});

		$('#btn-grabar').css({
			"display" : "none"
		});

		$('#recover-form').css({
			"display" : "inline"
		});

		$('#btn-recuperar').css({
			"display" : "inline"
		});

}

//Función creación JSON productos y creación HTML con la información
function createProducts($products) {

	var $box = $('#products_list');

	//Bucle para crear cada producto
	for(var $i = 0; $i < $products.length; $i++) {

		$frutas = $('<div />', {id : $products[$i].nombre, 'class' : 'fpeque border-success'}).appendTo($box);

		$imgbox = $('<img>', {src : $products[$i].imagen, 'class' : 'peque img-fluid'}).appendTo($frutas);

		$cdiv = $('<div />').appendTo($frutas);

		$p1 = $('<p />', {html : 'ref: <span>' + $products[$i].ref + '</span>'}).appendTo($cdiv);

		$p2 = $('<p />', {html : 'precio: <span>' + $products[$i].precio + '</span> € kg'}).appendTo($cdiv);
	
	}

	var $product = $("#products_list > div");

	//Pasar datos del lado izquierdo al derecho
	$product.each(function(index) {

		$(this).on("click", function() {

			if($count < 5) {

				if($primg.children()) {
					$primg.empty();
				}

				$(this).find('img').clone().appendTo($primg);
				$prref.val($(this).find('span:first').text());
				$prpre.val($(this).find('span:last').text());
				
			} else {
				
				alert("No puedes añadir nada más a la lista");
				
			}

		});

	});

}

function createRows($valoresJson) {

	$table = $('tbody');
		
	$columna = $('<tr />').appendTo($table);

	//Bucle cración td
	for(var $i = 0; $i < 5; $i++) {
		$celda = $('<td />').appendTo($columna);
	}

	$columns = $('tr:last');

	//Añadimos el valor a cada td
	$columns.find('td').get(0).append($valoresJson.ref);
	$columns.find('td').get(1).append($valoresJson.precio);
	$columns.find('td').get(2).append($valoresJson.cantidad);
	$columns.find('td').get(3).append($valoresJson.total);

	//Creamos botón borrar
	$btn = $('<button />', {'class' : 'borrar btn btn-warning'}).text("Borrar")[0];
	$columns.find('td').get(4).append($btn);

	$total = parseInt($columns.find('td:nth-child(4)').html());
	$sumtot = $sumtot + $total;
	$totals = $('tfoot:first').find('td:nth-child(2)').html($sumtot);

	//Función borrado botón borrar
	$('.borrar').off().on("click", function(e) {

		$(e.target).parent().parent().remove();
		$total = $(e.target).parent().parent().find('td:nth-child(4)').html();
		$sumtot = $sumtot - $total;
		$totals = $('tfoot:first').find('td:nth-child(2)').html($sumtot);
		$count--;

	});

}

//Validar campos añadir producto tabla
function validator() {
	
	//Variable boolean
	var $isCorrect = true;

	if($prref.val() == '' || $prpre.val() == '' || isNaN($prpre.val()) || $cant.val() == '' || isNaN($cant.val())) {
	
		$isCorrect = false;
	
	} else {
	
		return $isCorrect;
		
	}
	
}

//Validar DNI usuario ya registra
function validarDni($dni) {

	//Variable boolean
	var $isCorrect = true;

	//Variables letras DNI
	var $letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

	//Validar campos
	if($dni.val() == '' || !(/^\d{8}[A-Z]$/.test($dni.val()))) {
		
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
	if($nombre == '' || !/^[a-zA-Z]*$/g.test($nombre) || $dni == '' || !(/^\d{8}[A-Z]$/.test($dni)) || $domicilio == '' || $poblacion == '' || !/^[a-zA-Z]*$/g.test($poblacion) || $provincia == '' || !/^[a-zA-Z]*$/g.test($provincia)) {
		
		$isCorrect = false;

	} else {

		return $isCorrect;

	}

}

//Función crear ventana modal
function createModal() {

	//Creación ventana modal
	var $modalWindow = $('<div />', {'id' : 'modal-window', 'class' : 'modal'}).appendTo('body');

	//CSS modal
	$('#modal-window').css({
		"display" : "none",
		"position" : "fixed",
		"left" : 0,
		"top" : 0,
		"width" : "100%",
		"height" : "100%",
		"padding-top" : "100px",
		"overflow" : "auto",
		"z-index" : 1,
		"background-color" : "rgb(0,0,0)",
		"background-color" : "rgba(0,0,0,0.4)"
	});

	//Creación capa contenido ventana modal
	var $modalContent = $('<div />', {'class' : 'modal-content'}).appendTo($modalWindow);

	//CSS contenido ventana modal
	$('.modal-content').css({
		"position" : "relative",
		"background-color" : "#fefefe",
		"margin" : "auto",
		"padding" : 0,
		"border" : "2px solid green",
		"width" : "25%"
	});

	//Creación header contenido ventana modal
	var $modalHeader = $('<div />', {'class' : 'modal-header'}).appendTo($modalContent);

	//CSS header ventana modal
	$('.modal-header').css({
		"display" : "block",
		"background-color" : "#5cb85c",
		"padding" : "2px 16px",
		"color" : "#fff"
	});

	//Creación contenido header ventana modal
	var $closeModal = $('<span />', {'class' : 'close'}).html("&times;").appendTo($modalHeader);
	var $titleModal = $('<h2 />').html("Datos de Facturación").appendTo($modalHeader);

	//CSS contenido header ventana modal
	$('.close').css({
		"color" : "#fff",
		"float" : "right",
		"font-size" : "28px",
		"font-weight" : "bold",
		"cursor" : "pointer"
	});

	//Creación body ventana modal
	var $modalBody = $('<div />', {'class' : 'modal-body'}).appendTo($modalContent);

	//CSS body ventana modal
	$('.modal-body').css({
		"padding" : "20px 16px"
	});

	//Creación contenido body ventana modal
	var $modalUser = $('<form />', {'id' : 'user-form'}).appendTo($modalBody);
	var $txtModal = $('<h5 />').html("Introduce tu DNI si ya tienes cuenta o regístrate").appendTo($modalUser);
	var $labelDni = $('<label />', {'for' : 'dni'}).html("DNI").appendTo($modalUser);
	var $inputDni = $('<input />', {'id' : 'user-dni', 'class' : 'border-success', 'type' : 'text', 'placeholder' : '12345678X'}).appendTo($modalUser);

	$labelDni.css({
		"width" : "20%",
		"display" : "inline-block"
	});

	var $modalForm = $('<form />', {'id' : 'factura-form'}).appendTo($modalBody);

	var $formElements = [
		
		{"fr": "nombre", "texto": "Nombre: ", "id": "nombre", 'class' : 'border-success', "type": "text", "placeholder": "Fulanito"},
		{"fr": "dni", "texto": "DNI: ", "id": "dni", 'class' : 'border-success', "type": "text", "placeholder": "12345678A"},
		{"fr": "domicilio", "texto": "Domicilio: ", "id": "domicilio", 'class' : 'border-success', "type": "text", "placeholder": "Av. 123"},
		{"fr": "poblacion", "texto": "Población: ", "id": "poblacion", 'class' : 'border-success', "type": "text", "placeholder": "Benidorm"},
		{"fr": "provincia", "texto": "Provincia: ", "id": "provincia", 'class' : 'border-success', "type": "text", "placeholder": "Alicante"}
		
	]

	for(var $i = 0; $i < $formElements.length; $i++) {

		var $lbl = $('<label />', {'for' : $formElements[$i].fr}).html($formElements[$i].texto).appendTo($modalForm);
		var $lbls = $("#factura-form > label");
		$lbls.css({
			"width" : "25%",
			"display" : "inline-block",
			"line-height" : "40px",
		});

		var $inp = $('<input />', {'id' : $formElements[$i].id, 'class' : $formElements[$i].class, 'type' : $formElements[$i].type, 'placeholder' : $formElements[$i].placeholder}).html($formElements[$i].texto).appendTo($modalForm);
		$inp.css({
			"width" : "70%"
		});
		
		var $brElement = $('<br />').appendTo($modalForm);
	
	}

	var $recoverForm = $('<form />', {'id' : 'recover-form'}).appendTo($modalBody);
	var $txtRecover = $('<h5 />').html("Introduce tu DNI para recuperar tus facturas").appendTo($recoverForm);
	var $lblRecover = $('<label />', {'for' : 'recover-dni'}).html("DNI").appendTo($recoverForm);
	var $inputRecover = $('<input />', {'id' : 'user-recover', 'type' : 'text', 'placeholder' : '12345678X'}).appendTo($recoverForm);

	$lblRecover.css({
		"width" : "20%",
		"display" : "inline-block"
	});

	//Creación footer ventana modal
	var $modalFooter = $('<div />', {'class' : 'modal-footer'}).appendTo($modalContent);

	//CSS footer ventana modal
	$('.modal-footer').css({
		"display" : "block",
		"padding" : "2px 16px",
		"background-color" : "#5cb85c",
		"color" : "#fff"
	});

	//Creación botones footer ventana modal
	var $formButtons = [
		
		{"id" : "btn-grabar-dni", "class" : "btn btn-light", "texto" : "Grabar"},
		{"id": "btn-grabar", "class" : "btn btn-light", "texto": "Grabar"},
		{"id" : "btn-registro", "class" : "btn btn-light", "texto" : "Registro"},
		{"id" : "btn-recuperar", "class" : "btn btn-light", "texto" : "Recuperar"},
		{"id": "btn-cancelar", "class" : "btn btn-light", "texto": "Cancelar"},
		
	]

	for(var $i = 0; $i < $formButtons.length; $i++) {

		var $btn = $('<button />', {'id' : $formButtons[$i].id, 'class' : $formButtons[$i].class}).html($formButtons[$i].texto).appendTo($modalFooter);
		$btn.css({
			"margin" : "15px"
		});
		
	}

	$('#btn-grabar').css({
		"display" : "none"
	});

	$('#btn-recuperar').css({
		"display" : "none"
	});

	//Guardar Factura usuario ya dado de alta (con DNI)
	$('#btn-grabar-dni').on("click", function() {

		//Variable para validar (valor campo)
		var $dni = $('#user-dni');

		if(validarDni($dni) == true) {

			//Obtenemos los datos de la factura
			$datosFact = saveFactura();

			//Datos varios
			$dni = $('#user-dni').val();
			var $total = $datosFact.info[1].totales[0].total;

			//Sacamos los detalles de la factura
			$convert = extractData();

			//Petición a la base de datos
			$.ajax({

				url: './php/usuario.php',
				type: 'POST',
				data: 'dni='+$dni+"&total="+$total+"&datos="+$convert,
				success: function(data) {

					if(data == true) {

						alert("Factura guardada correctamente.");

						cleanForms();

						$('#user-dni').val("");

						$('#modal-window').css({
							"display" : "none"
						});

					} else {

						$('#user-dni').val("");

						alert("DNI no encontrado. Introduce uno correcto.")

					}

				}

			});

		} else {

			alert("DNI incorrecto. Introduce un valor válido");

		}

	});

	//Guardar factura con registro de usuario
	$('#btn-grabar').on("click", function() {

		//Obtenemos los datos de la factura
		$datosFact = saveFactura();

		//Datos del total
		var $total = $datosFact.info[1].totales[0].total;
		
		//Valores input form
		var $formNombre = $('#factura-form').find('#nombre').val();
		var $formDni = $('#factura-form').find('#dni').val();
		var $formDomicilio = $('#factura-form').find('#domicilio').val();
		var $formPoblacion = $('#factura-form').find('#poblacion').val();
		var $formProvincia = $('#factura-form').find('#provincia').val();

		if(validarUsuario($formNombre, $formDni, $formDomicilio, $formPoblacion, $formProvincia) == true) {

			//Sacamos los detalles de la factura
			$convert = extractData();

			//Petición a la base de datos
			$.ajax({

				url: './php/registro.php',
				type: 'POST',
				data: "nombre="+$formNombre+"&dni="+$formDni+"&domicilio="+$formDomicilio+"&poblacion="+$formPoblacion+"&provincia="+$formProvincia+"&total="+$total+"&datos="+$convert,
				success: function(data) {

					if(data == true) {

						alert("Usuario y factura guardada correctamente.");

						cleanForms();

						//Vaciar datos
						$('#nombre').val("");
						$('#dni').val("");
						$('#domicilio').val("");
						$('#poblacion').val("");
						$('#provincia').val("");

						$('#modal-window').css({
							"display" : "none"
						});

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

	//Registro de usuario
	$('#btn-registro').on("click", function() {

		$('#user-form').css({
			"display" : "none"
		});

		$('#factura-form').css({
			"display" : "block"
		});

		$('#btn-grabar-dni').css({
			"display" : "none"
		});

		$('#btn-grabar').css({
			"display" : "inline"
		});

		$('#btn-registro').css({
			"display" : "none"
		});

	});

	//Recupear facturas
	$('#btn-recuperar').on("click", function() {

		//Variable para validar (valor campo)
		$dni = $('#user-recover');

		if(validarDni($dni) == true) {

			var $dniCliente = $('#recover-form').find('#user-recover').val();

			var $selectOptions = $('#lisfacatura');

			if($selectOptions.find("option").length <= 1) {

				//Petición a la base de datos
				$.ajax({

					url: './php/recuperarFacturas.php',
					type: 'POST',
					data: "dni="+$dniCliente,
					success: function(data) {

						if(data == false) {

							alert("No hay ninguna factura asociada a ese DNI.");

							cleanForms();

							$('#user-recover').val("");

						} else {

						$tamArray = data;

						var $listFact = JSON.parse($tamArray);

						for(var $i = 0; $i < $listFact.length; $i++) {

							var $options = $('<option />').val($listFact[$i].numero).html('Factura ' + $listFact[$i].numero).appendTo($selectOptions);
			
						}

						alert("Facturas cargadas correctamente. Selecciona la factura que quieras ver en la lista.");

						//Vaciar campos recuperar facturas
						$('#user-recover').val("");

						//Cerrar modal-window
						$('#modal-window').css({
							"display" : "none"
						});

						}

					}

				});

			} else {

				$selectOptions.find("option:gt(0)").remove();

				//Petición a la base de datos
				$.ajax({

					url: './php/recuperarFacturas.php',
					type: 'POST',
					data: "dni="+$dniCliente,
					success: function(data) {

						if(data == false) {

							alert("No hay ninguna factura asociada a ese DNI.");

							cleanForms();

							$('#user-recover').val("");

						} else {

							$tamArray = data;

							var $listFact = JSON.parse($tamArray);

							for(var $i = 0; $i < $listFact.length; $i++) {

								var $options = $('<option />').val($listFact[$i].numero).html('Factura ' + $listFact[$i].numero).appendTo($selectOptions);
			
							}

							alert("Facturas cargadas correctamente");

							//Vaciar campos recuperar facturas
							$('#user-recover').val("");

							//Cerrar modal-window
							$('#modal-window').css({
								"display" : "none"
							});

						}

					}

				});

			}

		} else {

			alert("DNI incorrecto. Introduce un valor válido");

		}	

	});

	//Ocultar modal botón cancelar
	$('#btn-cancelar').on("click", function() {
		
		$('#modal-window').css({
			"display" : "none"
		});
		
	});

	//Ocultar modal click X cerrar
	$('.close').on("click", function() {
		
		$('#modal-window').css({
			"display" : "none"
		});
		
	}).mouseover(function() {

		$('.close').css({
			"color" : "#000"
		});
		
	}).mouseout(function() {

		$('.close').css({
			"color" : "#fff"
		});

	});
	
}

//Función guardar toda la factura
function saveFactura() {

	//Tamaño de la tabla
	var $tam = $('#lineas').find('tbody').find('tr').length;

	//Obtener el valor del total del tfoot
	$totals = parseInt($('tfoot').find('td:nth-child(2)').html());

	var $datosProductos = [];

	var $linea = 0;

	//Rellenamos el JSON con un bucle for de los Productos
	for(var $i = 1; $i < $tam; $i++) {
			
		$celda = $('#lineas').find('tbody').find('tr:nth-child('+($i + 1)+')');
		
		$datosProductos[$linea] = {

			/* "dni" : celda[0].innerHTML, */
			"ref" : $celda.find('td:nth-child(1)').html(), 
			"precio" : $celda.find('td:nth-child(2)').html(), 
			"cantidad" : $celda.find('td:nth-child(3)').html(), 
			"total" : $celda.find('td:nth-child(4)').html()
				
		}
			
		$linea++;
			
	}

	//JSON Factura
	$objectList = []
		
	$objectList = {
		
		"info" : [

					
			{
				"factura" : [
					
					{"productos" : $datosProductos}
				]
						
			},
					
			{
					
				"totales" : [
							
					{"total" : $totals}
							
				]
					
			}
				
		]

	};

	return $objectList;

}

//Función extraer datos factura
function extractData() {

	//Obtenemos los datos de la factura
	$datosFact = saveFactura();

	//Creamos un JSON auxiliar
	var $infoFact = [];

	$infoFact =  $datosFact.info[0].factura[0].productos;

	//Conversión a cadena JSON
	var $convert = JSON.stringify($infoFact);

	return $convert;

}

//Función limpiar tabla y forms
function cleanForms() {

	//Eliminar elementos de la tabla
	var $table = $('tbody');
	var $delrow = $('tbody').find('tr');
	var $aux = $delrow.length;

	for(var $i = 1; $i < $aux; $i++) {

		$table.find('tr:last').remove();

	}

	//Vaciar datos
	if($('#ffac').has()) {
		
		$primg.empty();
		$prref.val("");
		$prpre.val("");
		$cant.val("");
		
	}

	//Asignar valor total a 0
	$totals = $('tfoot').find('td:last').html(0);
	$sumtot = 0;

	//Contador de productos a 0
	$count = 0;

}

//Cargar Select
function loadSelect() {

	$.ajax({

		url: './php/loadCat.php',
		type: 'POST',
		success: function(data) {

			//Al ser opciones, he preferido crearlas directamente en php y devolverlas
			$('#categoria').html(data).fadeIn();

		}

	});

}