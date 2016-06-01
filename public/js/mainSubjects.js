$(document).ready(function(){

	// Al dar click en el boton Agregar...
	$("#add-subject").click(function(){
		
		$(".table-subjects").hide(100);
		$(".form-subject").show(100);
		$("#form-add-subject").show(100);
		$("#form-modify-subject").hide(100);
	   	
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
	$(".list-subjects").click(function(){
		
		$(".form-subject").hide(100);
		$("#form-add-subject").hide(100);
		$("#form-modify-subject").hide(100);
		$(".table-subjects").show(100);

	});

	// Al dar click en el boton Editar...
	$('.show-modify-form').click(function(){

		$(".form-subject").show(100);
		$("#form-add-subject").hide(100);
		$("#form-modify-subject").show(100);

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
	   		url: '/get-subject/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			subject = data;
	   			
	   			$("#button_update").attr("id", dataId);

	   			$("#mod_code").val(subject.code);
	   			$("#mod_name").val(subject.name);
	   			$("#mod_codeTeacher option[value='"+course.codeTeacher+"']").attr("selected","selected");
	   			$("#mod_initDate").val(subject.initDate);
	   			$("#status_list2 option[value='"+subject.status+"']").attr("selected","selected");
	   			$("#mod_description").val(subject.description);
	   			
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	});

	// Al dar click en el boton Actualizar...
	$('.modify-subject').click(function(){

		var dataId = this.id;
		$('#frm-modify-subject').attr("action", "modifySubject/"+dataId);		

		$('#frm-modify-subject').submit();
	});


	// Al dar click en el boton Cancelar...
	$("#cancel-modify").click(function(){
		
		$(".form-subject").hide(100);
		$("#form-add-subject").hide(100);
		$("#form-modify-subject").hide(100);
		$(".table-subjects").show(100);

	});


	// Al dar click en el boton Eliminar...
	$('.delete-subject').click(function(){

		var dataId = this.id;
		var clase = "."+dataId; //Cada fila de la tabla posee una clase propia que cotiene el Id de cada objeto de la lista
		$.ajax({
    		type    : 'get',
    		url     : '/destroySubject/' + dataId, //Funcion de borrado
    		success : function(response) {
		    	if (response === 'error') {
	           		alert('Error al eliminar materia');
	       		} else if (response === 'success') {
	          		demo.initChartist();
	          		 $(clase).remove(); 
	          		 alert("Materia borrada satisfactoriamente");  	
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