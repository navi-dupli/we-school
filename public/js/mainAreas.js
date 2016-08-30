$(document).ready(function(){

	// Al dar click en el boton Agregar...
	$("#add-area").click(function(){
		
		$(".table-areas").hide(100);
		$(".form-area").show(100);
		$("#form-add-area").show(100);
		$("#form-modify-area").hide(100);	
	});


	// Al dar click en el boton Listar...
	$(".list-areas").click(function(){
		
		$(".form-area").hide(100);
		$("#form-add-area").hide(100);
		$("#form-modify-area").hide(100);
		$(".table-areas").show(100);

	});


	// Al dar click en el boton Editar...
	$('.show-modify-form').click(function(){

		$(".form-area").show(100);
		$("#form-add-area").hide(100);
		$("#form-modify-area").show(100);

		var dataId = this.id;

	   	$.ajax({ 
	   		type: 'GET', 
	   		url: '/get-area/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			area = data;
	   			
	   			$("#button_update").attr("id", dataId);
		
	   			$("#mod_name").val(area.name);
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	});


	// Al dar click en el boton Actualizar...
	$('.modify-area').click(function(){

		var dataId = this.id;
		$('#frm-modify-area').attr("action", "modifyArea/"+dataId);		

		$('#frm-modify-area').submit();
	});


	// Al dar click en el boton Cancelar...
	$("#cancel-modify").click(function(){
		
		$(".form-area").hide(100);
		$("#form-add-area").hide(100);
		$("#form-modify-area").hide(100);
		$(".table-areas").show(100);

	});


	// Al dar click en el boton Eliminar...
	$('.delete-area').click(function(){

		var dataId = this.id;
		var clase = "."+dataId; //Cada fila de la tabla posee una clase propia
		$.ajax({
    		type    : 'get',
    		url     : '/destroyArea/' + dataId, //Funcion de borrado
    		success : function(response) {
    			console.log(response);
		    	if ( response === 'error') {
	           		alert('Error al eliminar usuario');
	       		} else if (response === 'success') {
	          		demo.initChartist();
	          		 $(clase).remove(); 
	          		 alert("Área eliminada satisfactoriamente");  	
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