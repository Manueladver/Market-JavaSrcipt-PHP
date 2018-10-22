$(document).ready(function() {

	//Cargamos el select con los años de cada factura
	loadSelect();

	//Pasar a la tabla
	$('#mostrar').on("click", function() {
		
		var $numAno = $('#ano').val();

		if($numAno != "#") {
			
			$.ajax({
  				type: "POST",
  				url: "./php/recuperarDatosFactura.php",
  				data: 'numAno='+$numAno,
  				success: function(data) {
  					
  					if($('#lineas > tbody > tr').length > 1) {
  					
  						//Eliminar elementos de la tabla
						var $table = $('#lineas > tbody');
						var $delrow = $('#lineas > tbody').find('tr');
						var $aux = $delrow.length;

						for(var $i = 1; $i < $aux; $i++) {

							$table.find('tr:last').remove();

						}

					}

  					//Variable con string de datos de la factura
  					var $stringFact = data;

  					//Pasamos a jSON
  					var $datosFact = JSON.parse($stringFact);

  					//Cantidad de facturas en el jSON
  					var $tamFacts = $datosFact.length;

  					//Array auxiliar
  					var $saveFactura = [];

  					for (var $i = 0; $i < $tamFacts; $i++) {

						$saveFactura = {
							"numero": $datosFact[$i].numero,
							"dni_cliente": $datosFact[$i].dni_cliente,
							"totales": $datosFact[$i].totales,
							"estado": $datosFact[$i].estado			
						}
				
						createRows($saveFactura);
					
					}
					
  				}
  				
			}); 
			
		} else {
			
			$('#ano:disabled');
			alert("Selecciona un año válido");
			
		}
		
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

function createRows($valoresJson) {

	//Valor año
	var $numAno = $('#ano').val();

	//Crear tabla con facturas
	createTable($valoresJson);

	//Función pagar facturas
	$('.pay').off().on("click", function(e) {

		//Valor del campo Estado
		var $estado = $(e.target).parent().parent().find('td:nth-child(4)').html();

		//Check estado factura
		if($estado == 'no pagada') {

			//Valor campo numero factura
			var $numFact = $(e.target).parent().parent().find('td:nth-child(1)').html();

			//Petición cambio estado
			$.ajax({

				type: "POST",
  				url: "./php/payFactura.php",
  				data: 'numFact='+$numFact,
  				success: function() {

  					//Petición crear tabla con facturas
  					$.ajax({
  						type: "POST",
  						url: "./php/recuperarDatosFactura.php",
  						data: 'numAno='+$numAno,
  						success: function(data) {
  					
  							if($('#lineas > tbody > tr').length > 1) {
  					
  								//Eliminar elementos de la tabla
								var $table = $('#lineas > tbody');
								var $delrow = $('#lineas > tbody').find('tr');
								var $aux = $delrow.length;

								for(var $i = 1; $i < $aux; $i++) {

									$table.find('tr:last').remove();

								}

							}

  							//Variable con string de datos de la factura
  							var $stringFact = data;

  							//Pasamos a jSON
  							var $datosFact = JSON.parse($stringFact);

  							//Cantidad de facturas en el jSON
  							var $tamFacts = $datosFact.length;

  							//Array auxiliar
  							var $saveFactura = [];

  							//Creamos un array con cada factura
  							for (var $i = 0; $i < $tamFacts; $i++) {

								$saveFactura = {
									"numero": $datosFact[$i].numero,
									"dni_cliente": $datosFact[$i].dni_cliente,
									"totales": $datosFact[$i].totales,
									"estado": $datosFact[$i].estado			
								}
								
								//Creamos la tabla
								createRows($saveFactura);
					
							}
					
  						}
  				
					}); 

  				}

			});


		} else {

			alert("Esta factura ya esta pagada");

		}


	});

	//Función enviar valores tabla factura
	$('.mod').off().on("click", function(e) {

		//Valor del campo Estado
		var $estado = $(e.target).parent().parent().find('td:nth-child(4)').html();

		//Check estado factura
		if($estado == 'no pagada') {

			//Valor del campo Estado
			var $numFact = $(e.target).parent().parent().find('td:nth-child(1)').html();

			$.ajax({
  				type: "POST",
  				url: "./php/recuperarDetallesFactura.php",
  				data: 'numFact='+$numFact,
  				success: function(data) {
  					
  					if($('#detalles > tbody > tr').length > 1) {
  					
  						//Eliminar elementos de la tabla
						var $table = $('#detalles > tbody');
						var $delrow = $('#detalles > tbody').find('tr');
						var $aux = $delrow.length;

						for(var $i = 1; $i < $aux; $i++) {

							$table.find('tr:last').remove();

						}

					}

  					//Variable con string de datos de la factura
  					var $stringFact = data;

  					//Pasamos a jSON
  					var $datosFact = JSON.parse($stringFact);

  					//Cantidad de facturas en el jSON
  					var $tamFacts = $datosFact.length;

  					//Array auxiliar
  					var $saveFactura = [];

  					for (var $i = 0; $i < $tamFacts; $i++) {

						$saveFactura = {
							"num_detalle": $datosFact[$i].num_detalle,
							"ref": $datosFact[$i].ref,
							"precio": $datosFact[$i].precio,
							"cantidad": $datosFact[$i].cantidad,
							"total": $datosFact[$i].total			
						}
				
						createRowsFact($saveFactura);
					
					}

					$('.modFact').off().on("click", function(e) {

						//Variables detalle factura, precio, cantidad y nuevo total
						var $numDetalle = $(e.target).parent().parent().find('td:nth-child(1)').html();
						var $valPrecio = $(e.target).parent().parent().find('td:nth-child(3)').html();
						var $valCantidad = $(e.target).parent().parent().find('#cantValue').val();
						var $total = $(e.target).parent().parent().find('td:nth-child(5)').html();

						var $nTotal = $valPrecio * $valCantidad;

						$.ajax({

							type: "POST",
							url: "./php/editDetFactura.php",
  							data: 'numDetalle='+$numDetalle+'&nTotal='+$nTotal+'&numFact='+$numFact+'&valCantidad='+$valCantidad+'&total='+$total,
  							success: function() {

  								alert('Factura actualizada');

  								//Petición crear tabla con facturas
  								$.ajax({
  									type: "POST",
  									url: "./php/recuperarDatosFactura.php",
  									data: 'numAno='+$numAno,
  									success: function(data) {
  					
  										if($('#lineas > tbody > tr').length > 1) {
  						
  											//Eliminar elementos de la tabla
											var $table = $('#lineas > tbody');
											var $delrow = $('#lineas > tbody').find('tr');
											var $aux = $delrow.length;

											for(var $i = 1; $i < $aux; $i++) {

												$table.find('tr:last').remove();

											}

										}

  										//Variable con string de datos de la factura
  										var $stringFact = data;

  										//Pasamos a jSON
  										var $datosFact = JSON.parse($stringFact);

  										//Cantidad de facturas en el jSON
  										var $tamFacts = $datosFact.length;

  										//Array auxiliar
  										var $saveFactura = [];

  										//Creamos un array con cada factura
  										for (var $i = 0; $i < $tamFacts; $i++) {

											$saveFactura = {
												"numero": $datosFact[$i].numero,
												"dni_cliente": $datosFact[$i].dni_cliente,
												"totales": $datosFact[$i].totales,
												"estado": $datosFact[$i].estado			
											}
								
											//Creamos la tabla
											createRows($saveFactura);
					
										}
					
  									}
  				
								});

  							}

						});

					});

					$('.deleteFact').off().on("click", function(e) {

						//Variables dealle factura y total
						var $numDetalle = $(e.target).parent().parent().find('td:nth-child(1)').html();
						var $total = $(e.target).parent().parent().find('td:nth-child(5)').html();

						$.ajax({

							type: "POST",
  							url: "./php/rmDetFactura.php",
  							data: 'numDetalle='+$numDetalle+'&total='+$total+'&numFact='+$numFact,
  							success: function() {

  								$(e.target).parent().parent().remove();

  								//Petición crear tabla con facturas
  								$.ajax({
  									type: "POST",
  									url: "./php/recuperarDatosFactura.php",
  									data: 'numAno='+$numAno,
  									success: function(data) {
  					
  										if($('#lineas > tbody > tr').length > 1) {
  						
  											//Eliminar elementos de la tabla
											var $table = $('#lineas > tbody');
											var $delrow = $('#lineas > tbody').find('tr');
											var $aux = $delrow.length;

											for(var $i = 1; $i < $aux; $i++) {

												$table.find('tr:last').remove();

											}

										}

  										//Variable con string de datos de la factura
  										var $stringFact = data;

  										//Pasamos a jSON
  										var $datosFact = JSON.parse($stringFact);

  										//Cantidad de facturas en el jSON
  										var $tamFacts = $datosFact.length;

  										//Array auxiliar
  										var $saveFactura = [];

  										//Creamos un array con cada factura
  										for (var $i = 0; $i < $tamFacts; $i++) {

											$saveFactura = {
												"numero": $datosFact[$i].numero,
												"dni_cliente": $datosFact[$i].dni_cliente,
												"totales": $datosFact[$i].totales,
												"estado": $datosFact[$i].estado			
											}
								
											//Creamos la tabla
											createRows($saveFactura);
					
										}
					
  									}
  				
								});

  							}

						});

					});
					
  				}
  				
			});


		} else {

			alert("Esta factura no se puede modificar. Estado: pagada");

		}

	});

	//Función enviar valores tabla factura
	$('.delete').off().on("click", function(e) {

		var $numFact = $(e.target).parent().parent().find('td:nth-child(1)').html();
		
		$.ajax({

			type: "POST",
  			url: "./php/rmFactura.php",
  			data: 'numFact='+$numFact,
  			success: function() {

  				$(e.target).parent().parent().remove();

  			}

		});

	});

}

function createTable($valoresJson) {

	$table = $('#lineas > tbody');
		
	$columna = $('<tr />').appendTo($table);

	//Bucle cración td
	for(var $i = 0; $i < 7; $i++) {
		$celda = $('<td />').appendTo($columna);
	}

	$columns = $('#lineas > tbody > tr:last');

	//Añadimos el valor a cada td
	$columns.find('td').get(0).append($valoresJson.numero);
	$columns.find('td').get(1).append($valoresJson.dni_cliente);
	$columns.find('td').get(2).append($valoresJson.totales);
	$columns.find('td').get(3).append($valoresJson.estado);

	//Creamos botón pagar facturas
	$btn = $('<button />', {'class' : 'pay btn btn-warning', 'id' : 'pay_btn'}).text("Pagar")[0];
	$columns.find('td').get(4).append($btn);

	//Creamos botón modificar facturas
	$btn = $('<button />', {'class' : 'mod btn btn-warning', 'id' : 'mod_btn'}).text("Modificar")[0];
	$columns.find('td').get(5).append($btn);

	//Creamos botón borrar facturas
	$btn = $('<button />', {'class' : 'delete btn btn-warning', 'id' : 'del_btn'}).text("Borrar")[0];
	$columns.find('td').get(6).append($btn);

}

function createRowsFact($valoresJson) {

	//Crear tabla con facturas
	createTableFact($valoresJson);

}

function createTableFact($valoresJson) {

	$table = $('#detalles > tbody');
		
	$columna = $('<tr />').appendTo($table);

	//Bucle cración td
	for(var $i = 0; $i < 7; $i++) {
		$celda = $('<td />').appendTo($columna);
	}

	$columns = $('#detalles > tbody > tr:last');

	//Añadimos el valor a cada td
	$columns.find('td').get(0).append($valoresJson.num_detalle);
	$columns.find('td').get(1).append($valoresJson.ref);
	$columns.find('td').get(2).append($valoresJson.precio);
	$input = $('<input />', {'id' : 'cantValue', 'class' : 'border-success', 'type' : 'text', 'placeholder' : '2', 'value' : $valoresJson.cantidad}).appendTo($columns.find('td').get(3));
	$columns.find('td').get(4).append($valoresJson.total);

	//Creamos botón modificar facturas
	$btn = $('<button />', {'class' : 'modFact btn btn-warning', 'id' : 'mod_btn'}).text("Modificar")[0];
	$columns.find('td').get(5).append($btn);

	//Creamos botón borrar facturas
	$btn = $('<button />', {'class' : 'deleteFact btn btn-warning', 'id' : 'del_btn'}).text("Borrar")[0];
	$columns.find('td').get(6).append($btn);

}

//Cargar Select
function loadSelect() {

	$.ajax({

		url: './php/loadAno.php',
		type: 'POST',
		success: function(data) {

			$('#ano').html(data).fadeIn();

		}

	});

}