$(document).ready(function(){
	// Al dar click en el boton Listar...
	$(".list-users").click(function(){
		
		$("#form-report-user").hide(100);
		$(".table-users").show(100);

	});

	// Al dar click en el boton Editar...
	$('.show-report-form').click(function(){
		$(".table-users").hide(100);
		$("#form-report-user").show(100);

		var dataId = this.id;

		//Lista los roles existentes en el formulario
		$.ajax({ 
	   		type: 'GET', 
	   		url: 'json/periodos.json', 
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].periodo;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#period_list").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				}; 
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+" Listado de periodos fallido");
	   		}
	   	});

	   	$.ajax({ 
	   		type: 'GET', 
	   		url: '/get-course/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			course = data;
	   			
	   			$("#button_generate").attr("id", dataId);

	   			$("#mod_name").val(course.name);
	   			$("#mod_name").attr('disabled','disabled');
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	});
	// Al dar click en el boton Actualizar...
	$('.generate-pdf').click(function(){

		var dataId = this.id;
		var period = $( "#period_list option:selected" ).text();

		$.ajax({ 
	   		type: 'GET', 
	   		url: '/folderPdf/'+id,
	   		dataType: 'json',
	   		success: function (data) {
	   			
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Error en la creacion de carpeta");
	   		}
	   	});

		$.ajax({ 
	   		type: 'GET', 
	   		url: '/estudents-course/'+dataId,
	   		dataType: 'json',
	   		success: function (data) {
	   			estudents = data;
	   			
	   			estudents.forEach(function(estudent){
	   				$.ajax({ 
				   		type: 'GET', 
				   		url: '/report-user/'+estudent._id+'/'+period,
				   		dataType: 'json',
				   		success: function (data) {
				   			console.log(data);
				   		},
				   		error:function(msg) {
				   			// body...
				   			console.log(msg+"Peticion de datos fallida");
				   		}
				   	});
	   			});
	   			
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de estudiantes fallida");
	   		}
	   	});
	});
});