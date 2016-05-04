$(document).ready(function(){

	// Al dar click en el boton Agregar Usuario...
	$("#add-user").click(function(){
		
		$(".table-users").hide(100);
		$(".form-user").show(100);
		$("#form-add-user").show(100);
		$("#form-modify-user").hide(100);
	   	
	   	$.ajax({ 
	   		type: 'GET', 
	   		url: 'json/roles.json', 
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].rol;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#roles_list").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};	

	   			 
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+" Listado de roles fallido");
	   		}
	   	});
	   	
	});


	// Al dar click en el boton Listar Usuarios...
	$(".list-users").click(function(){
		
		$(".form-user").hide(100);
		$("#form-add-user").hide(100);
		$("#form-modify-user").hide(100);
		$(".table-users").show(100);

	});


	// Al dar click en el boton Editar...
	$('.show-modify-form').click(function(){

		$(".form-user").show(100);
		$("#form-add-user").hide(100);
		$("#form-modify-user").show(100);

		var dataId = this.id;

		//Lista los roles existentes en el formulario
		$.ajax({ 
	   		type: 'GET', 
	   		url: 'json/roles.json',
	   		dataType: 'json',
	   		success: function (data) {
	   			var array =data[1].rol;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#roles_list2").append("<option value="+ array[i] +">" + array[i] + "</option>");
	   				};
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Listado de roles fallido");
	   		}
	   	
	   	});

	   	$.ajax({ 
	   		type: 'GET', 
	   		url: '/get-user/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			user = data.local;

	   			console.log(user.email);
	   			console.log(user.name);
	   			console.log(user.role);
	   			
	   			$("#button_update").attr("id", dataId);

	   			$("#mod_code").val(user.code);
	   			$("#mod_email").val(user.email);
	   			$("#mod_name").val(user.name);
	   			$("#roles_list2 option[value='"+user.role+"']").attr("selected","selected");
	   			$("#status_list option[value='"+user.status+"']").attr("selected","selected");
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	});


	// Al dar click en el boton Actualizar usuario...
	$('.modify-user').click(function(){

		var dataId = this.id;
		$('#frm-modify-user').attr("action", "modifyUser/"+dataId);		

		$('#frm-modify-user').submit();
	});


	// Al dar click en el boton Cancelar...
	$("#cancel-modify").click(function(){
		
		$(".form-user").hide(100);
		$("#form-add-user").hide(100);
		$("#form-modify-user").hide(100);
		$(".table-users").show(100);

	});


	// Al dar click en el boton Eliminar...
	$('.delete-user').click(function(){

		var dataId = this.id;
		var clase = "."+dataId; //Cada fila de la tabla posee una clase propia
		$.ajax({
    		type    : 'get',
    		url     : '/destroyUser/' + dataId, //Funcion de borrado
    		success : function(response) {
		    	if ( response === 'error') {
	           		alert('Error al eliminar usuario');
	       		} else if (response === 'success') {
	          		demo.initChartist();
	          		 $(clase).remove(); 
	          		 alert("remove");  	
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