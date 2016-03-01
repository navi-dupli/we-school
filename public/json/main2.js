$(document).ready(function(){
	// Al dar click en el boton Agregar Usuario...
	$("#add-user").click(function(){
		$(".table-users").hide(100);
		$(".form-car").show(100);
		$("#section-1").show(100);
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
	   			console.log(msg+"Listado de roles fallido");
	   		}
	   	});
	   	
	});


	// Al dar click en el boton Listar Usuarios...
	$("#list-users").click(function(){
		$(".form-car").hide(100);
		$("#section-1").hide(100);
		$(".table-users").show(100);	   	
	});


	$("#form-date").click(function(){
		demo.initChartist();

    	$.notify({
        	icon: 'pe-7s-gift',
        	message: "<b>Ahora suba las fotos</b>"
        },{
            type: 'info',
            timer: 4000
        });

        $.notify({
        	icon: 'pe-7s-gift',
        	message: "<b>Recuerde que son necesarias para la publicación del auto</b>"
        },{
            type: 'danger',
            timer: 4000
        });

		$("#form-car").show(100);
		$("#form-car2").show(100);
		$("#section-1").hide(100);
	});


	$('.delete-user').click(function(){
    var dataId = this.id;

	var clase = "."+dataId;
		$.ajax({
    		type    : 'get',
    		url     : '/destroyUser/' + dataId,
    		success : function(response) {
		    	if ( response === 'error' ) {
	           		alert('crap!');
	       		} else if (response === 'success' ) {

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
var countries = [
   { value: 'Verde', data: 'VE' },
   { value: 'Rojo', data: 'RO' },
   { value: 'Violeta', data: 'VI' },
   { value: 'Amarillo', data: 'AM' },
   { value: 'Azul', data: 'AZ' },
   { value: 'Negro', data: 'NE' },
   { value: 'Blanco', data: 'BL' },
   { value: 'Naranja', data: 'NA' },
   { value: 'Beige', data: 'BE' },
   { value: 'Gris', data: 'GR' },
   { value: 'Cafe', data: 'CA' },
   { value: 'Rosado', data: 'RO' },
   { value: 'Plata', data: 'Pl' },
];


