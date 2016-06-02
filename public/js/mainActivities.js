$(document).ready(function(){

	// Al dar click en el boton Agregar...
	$("#add-activity").click(function(){
		
		$(".table-activities").hide(100);
		$(".form-activity").show(100);
		$("#form-add-activity").show(100);
		$("#form-modify-activity").hide(100);
	   	
	   	$.ajax({ 
	   		type: 'GET', 
	   		url: 'json/estados.json', 
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].estado;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#status_list").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};	 
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Listado de estados fallido");
	   		}
	   	});

	   	$.ajax({ 
	   		type: 'GET', 
	   		url: 'json/estadosEnvio.json', 
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].estadoEnvio;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#sendStatus_list").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};	 
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Listado de estadosEnvio fallido");
	   		}
	   	});
	});

	//Al dar click en agregar achivos adjuntos
	$("#add-attachment").click(function(){

		//$(".form-activity").show(100);
		$("#form-attachment").show(100);
		$("#form-add-activity").hide(100);

		demo.initChartist();
    	
    	$.notify({
        	icon: 'pe-7s-gift',
        	message: "<b>Ahora suba los archivos</b>"
        	
        },{
            type: 'info',
            timer: 4000
        });
        $.notify({
        	icon: 'pe-7s-gift',
        	message: "<b>Recuerde que son necesarios para la publicación de la actividad</b>"
        	
        },{
            type: 'danger',
            timer: 4000
        });
	});

	// Al dar click en el boton Listar...
	$(".list-activities").click(function(){
		
		$(".form-activity").hide(100);
		$("#form-add-activity").hide(100);
		$("#form-modify-activity").hide(100);
		$("#form-attachment").hide(100);
		$(".table-activities").show(100);

	});

	// Al dar click en el boton Editar...
	$('.show-modify-form').click(function(){

		$(".form-activity").show(100);
		$("#form-add-activity").hide(100);
		$("#form-modify-activity").show(100);

		var dataId = this.id;

		$.ajax({ 
	   		type: 'GET', 
	   		url: 'json/estados.json',
	   		dataType: 'json',
	   		success: function (data) {
	   			var array =data[1].estado;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#status_list2").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Listado de estados fallido");
	   		}
	   	});

	   	$.ajax({ 
	   		type: 'GET', 
	   		url: 'json/estadosEnvio.json',
	   		dataType: 'json',
	   		success: function (data) {
	   			var array =data[1].estadoEnvio;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#sendStatus_list2").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Listado de estadosEnvio fallido");
	   		}
	   	});

	   	$.ajax({ 
	   		type: 'GET', 
	   		url: '/get-activity/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			activity = data;
	   			
	   			$("#button_update").attr("id", dataId);

	   			$("#mod_codeAchievement option[value='"+activity.codeAchievement+"']").attr("selected","selected");
	   			$("#mod_name").val(activity.name);
	   			$("#mod_description").val(activity.description);
	   			$("#mod_initDate").val(activity.initDate);
	   			$("#mod_endDate").val(activity.endDate);
	   			$("#sendStatus_list2 option[value='"+activity.sendStatus+"']").attr("selected","selected");
	   			
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	});

	// Al dar click en el boton Actualizar...
	$('.modify-activity').click(function(){

		var dataId = this.id;
		$('#frm-modify-activity').attr("action", "modifyActivity/"+dataId);		

		$('#frm-modify-activity').submit();
	});


	// Al dar click en el boton Cancelar...
	$("#cancel-modify").click(function(){
		
		$(".form-activity").hide(100);
		$("#form-add-activity").hide(100);
		$("#form-modify-activity").hide(100);
		$(".table-activities").show(100);

	});


	// Al dar click en el boton Eliminar...
	$('.delete-activity').click(function(){

		var dataId = this.id;
		var clase = "."+dataId; //Cada fila de la tabla posee una clase propia que cotiene el Id de cada objeto de la lista
		$.ajax({
    		type    : 'get',
    		url     : '/destroyActivity/' + dataId, //Funcion de borrado
    		success : function(response) {
		    	if (response === 'error') {
	           		alert('Error al eliminar actividad');
	       		} else if (response === 'success') {
	          		demo.initChartist();
	          		 $(clase).remove(); 
	          		 alert("Actividad borrada satisfactoriamente");  	
		        /**	$.notify({
		            	icon: 'pe-7s-gift',
		            	message: "<b>Objeto Eliminado</b>"	
		            },{
		                type: 'info',
		                timer: 4000
		            })*/
	          	}
    		}
		});
	});
});