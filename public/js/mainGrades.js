$(document).ready(function(){

	// Al dar click en el boton Agregar...
	$("#add-grade").click(function(){
		
		$(".table-grades").hide(100);
		$(".form-grade").show(100);
		$("#form-add-grade").show(100);
		$("#form-modify-grade").hide(100);
	   	
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
	});

	// Al dar click en el boton Listar...
	$(".list-grades").click(function(){
		
		$(".form-grade").hide(100);
		$("#form-add-grade").hide(100);
		$("#form-modify-grade").hide(100);
		$(".table-grades").show(100);

	});

	// Al dar click en el boton Editar...
	$('.show-modify-form').click(function(){

		$(".form-grade").show(100);
		$("#form-add-grade").hide(100);
		$("#form-modify-grade").show(100);

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
	   		url: '/get-grade/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			grade = data;
	   			
	   			$("#button_update").attr("id", dataId);

	   			$("#mod_code").val(grade.code);
	   			$("#mod_name").val(grade.name);
	   			
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	});

	// Al dar click en el boton Actualizar...
	$('.modify-grade').click(function(){

		var dataId = this.id;
		$('#frm-modify-grade').attr("action", "modifyGrade/"+dataId);

		$('#frm-modify-grade').submit();
	});


	// Al dar click en el boton Cancelar...
	$("#cancel-modify").click(function(){
		
		$(".form-grade").hide(100);
		$("#form-add-grade").hide(100);
		$("#form-modify-grade").hide(100);
		$(".table-grades").show(100);

	});


	// Al dar click en el boton Eliminar...
	$('.delete-grade').click(function(){

		var dataId = this.id;
		var clase = "."+dataId; //Cada fila de la tabla posee una clase propia que cotiene el Id de cada objeto de la lista
		$.ajax({
    		type    : 'get',
    		url     : '/destroyGrade/' + dataId, //Funcion de borrado
    		success : function(response) {
		    	if (response === 'error') {
	           		alert('Error al eliminar grade');
	       		} else if (response === 'success') {
	          		demo.initChartist();
	          		 $(clase).remove(); 
	          		 alert("Grado borrado satisfactoriamente");  	
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