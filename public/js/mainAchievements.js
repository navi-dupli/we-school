$(document).ready(function(){

	// Al dar click en el boton Agregar...
	$("#add-achievement").click(function(){
		
		$(".table-achievements").hide(100);
		$(".form-achievement").show(100);
		$("#form-add-achievement").show(100);
		$("#form-modify-achievement").hide(100);
	   	
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
	});

	// Al dar click en el boton Listar...
	$(".list-achievements").click(function(){
		
		$(".form-achievement").hide(100);
		$("#form-add-achievement").hide(100);
		$("#form-modify-achievement").hide(100);
		$(".table-achievements").show(100);

	});

	// Al dar click en el boton Editar...
	$('.show-modify-form').click(function(){

		$(".form-achievement").show(100);
		$("#form-add-achievement").hide(100);
		$("#form-modify-achievement").show(100);

		var dataId = this.id;

		$.ajax({ 
	   		type: 'GET', 
	   		url: 'json/periodos.json', 
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].periodo;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#period_list2").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				}; 
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+" Listado de periodos fallido");
	   		}
	   	}); 

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
	   		url: '/get-achievement/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			achievement = data;
	   			
	   			$("#button_update").attr("id", dataId);

	   			$("#mod_codeSubject option[value='"+achievement.codeSubject+"']").attr("selected","selected");
	   			$("#mod_name").val(achievement.name);
	   			$("#mod_description").val(achievement.description);
	   			$("#mod_codeGrade option[value='"+achievement.codeGrade+"']").attr("selected","selected");
	   			$("#period_list2 option[value='"+achievement.period+"']").attr("selected","selected");
	   			
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	});

	// Al dar click en el boton Actualizar...
	$('.modify-achievement').click(function(){

		var dataId = this.id;
		$('#frm-modify-achievement').attr("action", "modifyAchievement/"+dataId);		

		$('#frm-modify-achievement').submit();
	});


	// Al dar click en el boton Cancelar...
	$("#cancel-modify").click(function(){
		
		$(".form-achievement").hide(100);
		$("#form-add-achievement").hide(100);
		$("#form-modify-achievement").hide(100);
		$(".table-achievements").show(100);

	});


	// Al dar click en el boton Eliminar...
	$('.delete-achievement').click(function(){

		var dataId = this.id;
		var clase = "."+dataId; //Cada fila de la tabla posee una clase propia que cotiene el Id de cada objeto de la lista
		$.ajax({
    		type    : 'get',
    		url     : '/destroyAchievement/' + dataId, //Funcion de borrado
    		success : function(response) {
		    	if (response === 'error') {
	           		alert('Error al eliminar logro');
	       		} else if (response === 'success') {
	          		demo.initChartist();
	          		 $(clase).remove(); 
	          		 alert("Logro borrado satisfactoriamente");  	
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