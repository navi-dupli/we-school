$(document).ready(function(){

	// Al dar click en el boton Agregar...
	$("#add-course").click(function(){
		
		$(".table-courses").hide(100);
		$(".form-course").show(100);
		$("#form-add-course").show(100);
		$("#form-modify-course").hide(100);
	   	
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
	$(".list-courses").click(function(){
		
		$(".form-course").hide(100);
		$("#form-add-course").hide(100);
		$("#form-modify-course").hide(100);
		$(".table-courses").show(100);

	});

	// Al dar click en el boton Editar...
	$('.show-modify-form').click(function(){

		$(".form-course").show(100);
		$("#form-add-course").hide(100);
		$("#form-modify-course").show(100);

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
	   		url: '/get-course/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			course = data;
	   			
	   			$("#button_update").attr("id", dataId);

	   			$("#mod_code").val(course.code);
	   			$("#mod_name").val(course.name);
	   			$("#mod_codeTeacher option[value='"+course.codeTeacher+"']").attr("selected","selected");
	   			$("#status_list2 option[value='"+course.status+"']").attr("selected","selected");
	   			$("#mod_description").val(course.description);
	   			
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	});

	// Al dar click en el boton Actualizar...
	$('.modify-course').click(function(){

		var dataId = this.id;
		$('#frm-modify-course').attr("action", "modifycourse/"+dataId);		

		$('#frm-modify-course').submit();
	});


	// Al dar click en el boton Cancelar...
	$("#cancel-modify").click(function(){
		
		$(".form-course").hide(100);
		$("#form-add-course").hide(100);
		$("#form-modify-course").hide(100);
		$(".table-courses").show(100);

	});


	// Al dar click en el boton Eliminar...
	$('.delete-course').click(function(){

		var dataId = this.id;
		var clase = "."+dataId; //Cada fila de la tabla posee una clase propia que cotiene el Id de cada objeto de la lista
		$.ajax({
    		type    : 'get',
    		url     : '/destroyCourse/' + dataId, //Funcion de borrado
    		success : function(response) {
		    	if (response === 'error') {
	           		alert('Error al eliminar curso');
	       		} else if (response === 'success') {
	          		demo.initChartist();
	          		 $(clase).remove(); 
	          		 alert("Curso borrado satisfactoriamente");  	
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