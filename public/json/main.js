$(document).ready(function(){

	$("#add-car").click(function(){
		$("#table-car").hide(100);
		$("#section-1").show(100);
		$("#form-car2").hide(300);
		$("#form-modify-subject").hide(300);
		//$(".add-object").hide(100);
	   	$.ajax({
	   		type: 'GET',
	   		url: 'json/cursos.json',
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].cursos;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#career-list").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+":P");
	   		}
	   	});
	   	$.ajax({
	   		type: 'GET',
	   		url: 'json/estilo.json',
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].estilo;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#style-car").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+":P");
	   		}
	   	});
	   	$.ajax({
	   		type: 'GET',
	   		url: 'json/dia.json',
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].dia;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#diaCurso").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+":P");
	   		}
	   	});
	   	$.ajax({
	   		type: 'GET',
	   		url: 'json/mes.json',
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].mes;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#mesCurso").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+":P");
	   		}
	   	});
	   	$.ajax({
	   		type: 'GET',
	   		url: 'json/ano.json',
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].ano;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#anoCurso").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+":P");
	   		}
	   	});
	});

	$(".form-date").click(function(){

		$("#form-car2").show(100);
		$("#section-1").hide(100);
		$("#table-car").hide(100);

	});

	$(".Atras").click(function(){
		$("#table-car").hide(100);
		$("#section-1").show(100);
		$("#form-car2").hide(300);
		$("#add-object").hide(100);
	});


	$(".btnCarRemove").click(function(){
		var dataId = this.id;
	    var clase = "."+dataId;
	    $.ajax({
	    	type    : 'get',
			url     : '/destroy/' + dataId,
			success : function(response) {
				if ( response === 'error' ) {
					alert('crap!');
					} else if (response === 'success' ) {
						demo.initChartist();
						$(clase).remove();
				    }
			}
		});
	});
	// Al dar click en el boton Editar se despliega el formulario Modificar Usuario
	$('.show-modify-subject').click(function(){
		$("#table-car").hide(100);
		$("#form-car").show(100);
		$("#section-1").hide(100);
		$("#form-modify-subject").show(100);

		//Cada botón Editar tiene como id="id usuario fila". Aquí se captura
		var dataId = this.id;

	   	$.ajax({
	   		type: 'GET',
	   		url: 'json/cursos.json',
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].cursos;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#mod_materiaList").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+":P");
	   		}
	   	});


		//Listar opciones fecha
			$.ajax({
		   		type: 'GET',
		   		url: 'json/dia.json',
		   		dataType: 'json',
		   		success: function (data) {
		   				 var array =data[1].dia;
		   			for (var i = 0; i < array.length; i++) {
		   					$("#mod_diaCurso").append("<option value="+ array[i] +">" + array[i] + "</option>");
		   				};
		   		},
		   		error:function(msg) {
		   			// body...
		   			console.log(msg+":P");
		   		}
		   	});

		   	$.ajax({
		   		type: 'GET',
		   		url: 'json/mes.json',
		   		dataType: 'json',
		   		success: function (data) {
		   				 var array =data[1].mes;
		   			for (var i = 0; i < array.length; i++) {
		   					$("#mod_mesCurso").append("<option value="+ array[i] +">" + array[i] + "</option>");
		   				};
		   		},
		   		error:function(msg) {
		   			// body...
		   			console.log(msg+":P");
		   		}
		   	});

		   	$.ajax({
		   		type: 'GET',
		   		url: 'json/ano.json',
		   		dataType: 'json',
		   		success: function (data) {
		   				 var array =data[1].ano;
		   			for (var i = 0; i < array.length; i++) {
		   					$("#mod_anoCurso").append("<option value="+ array[i] +">" + array[i] + "</option>");
		   				};
		   		},
		   		error:function(msg) {
		   			// body...
		   			console.log(msg+":P");
		   		}
		   	});
		   		   	//Captura los datos de la fila actual para ingresarlos en el formulario Modificar Usuario
	  	$.ajax({
	   		type: 'GET',
	   		//Ejecuta la vista /get-user enviando como parámetro el id del usuario actual (capturado
	   		//previamente en el id="" del botón Editar)
	   		url: '/get-objects/'+$(this).attr("id"),
	   		dataType: 'json',
	   		//Si la vista /get-user retorna un resultado satisfactorio (retorna objeto usuario (data)),
	   		//lo captura en la variable user
	   		success: function (data) {
	   			objects = data;//object = data.local; //.local es un sub-atributo del modelo User, con otro tipo de objeto ignorarlo

	   			$("#mod_idCurso").val(objects.idCurso); //Al campo email se le asigna el valor email capturado
	   			$("#mod_idUser").val(objects.idUser);
	   			$("#mod_materiaList option[value='"+objects.nombreMateria+"']").attr("selected","selected");
	   			$("#mod_fechaInicio").val(objects.fechaInicio);
				$("#mod_diaCurso option[value='"+objects.diaCurso+"']").attr("selected","selected");
				$("#mod_mesCurso option[value='"+objects.mesCurso+"']").attr("selected","selected");
				$("#mod_anoCurso option[value='"+objects.anoCurso+"']").attr("selected","selected");
	   			$("#mod_Estado option[value='"+objects.estado+"']").attr("selected","selected");
	   			$("#mod_descripcion").val(objects.descripcion);
	   			//Al botón Actualizar Usuario se le asigna un id="" con el Id del usuario actual
	   			//para que posteriormente pueda ser usado en el método .modify-user
	   			$("#Actualizar").attr("id", dataId);
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+" Peticion de datos fallida");
	   		}
	   	});

	// Al dar click en el boton Actualizar usuario...
	$('.modify-subject').click(function(){

		//El botón Actualizar Usuario tiene como id="id usuario". Se guarda en la variable
		var dataId = this.id;

		//Se activa la petición POST del formulario Modificar Usuario por medio de "action" y submit,
		//y se ejecuta la vista /modifyUser enviando como parámetro dataId
		$('#frm-modify-subject').attr("action", "modifyObject/"+dataId);
		$('#frm-modify-subject').submit();
	});


	// Al dar click en el boton Cancelar se cierra el formulario Modificar Usuario
	$("#cancel-modify").click(function(){

		$("#table-car").show(100);
		$("#section-1").hide(100);
		$("#form-car2").hide(300);
		$("#form-car3").hide(100);
		$("#add-object").hide(100);

	});
	$(".form-date2").click(function(){
		$("#form-modify-subject").hide(100);
		$("#form-car3").show(100);
		$("#section-1").hide(100);
		$("#table-car").hide(100);
	});
		$(".AtrasEditar").click(function(){
		$("#form-modify-subject").show(100);
		$("#form-car3").hide(100);

	});
	$(".#mod_descripcion").click(function(){
		$("#form-modify-subject").show(100);
		$("#form-car3").hide(100);
		$("#section-1").hide(100);
		$("#table-car").hide(100);
	});

	});
});
