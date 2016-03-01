$(document).ready(function(){

	$("#add-car").click(function(){
		alert("");
		$("#table-car").hide(100);
		$("#section-1").show(100);
		$("#form-car2").hide(300);
		$(".add-object").hide(100);
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
	   	$.ajax({
	   		type: 'GET',
	   		url: 'json/Puertas.json',
	   		dataType: 'json',
	   		success: function (data) {
	   				 var array =data[1].puertas;
	   			for (var i = 0; i < array.length; i++) {
	   					$("#door-car").append("<option value="+ array[i]+">" + array[i] + "</option>");
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
/*       $("input:seleccionar:checked").each(
			 for (var i = Things.length - 1; i >= 0; i--) {
			 	remove(Things[i]);
			*/ }
		);
        /*});
    },*/
   	$("#btnCarRemove").click(function(){
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
				        	$.notify({
				            	icon: 'pe-7s-gift',
				            	message: "<b>Objeto Eliminado</b>"

				            },{
				                type: 'info',
				                timer: 4000
				            })
			          		 ;
			          	}

		    		}
		});
	});
/*	$("#btnEditar").click(function(){
    var dataId = this.id;
	var clase = "."+dataId;
		$.ajax({
    		type    : 'get',
    		url     : '/edit/' + dataId,
    		success : function(response) {
		    	if ( response === 'error' ) {
	           		alert('crap!');
	       		} else if (response === 'success' ) {
	          		demo.initChartist();
	          		 $(clase).edit();
		        	$.notify({
		            	icon: 'pe-7s-gift',
		            	message: ("<b>Curso a editar</b>"+dataId);
		            	$("#form-car2").show(100);
						$("#section-1").hide(100);


		            },{
		                type: 'info',
		                timer: 4000
		            })
	          		 ;
	          	}

    		}
		});
	});*/

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

$('#color-front').autocomplete({
    lookup: countries,
    onSelect: function (suggestion) {
    }
});

$('#color-back').autocomplete({
    lookup: countries,
    onSelect: function (suggestion) {
    }
});

/*function remove(id) {
	// body...
	var dataId = id;
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
				        	$.notify({
				            	icon: 'pe-7s-gift',
				            	message: "<b>Objeto Eliminado</b>"

				            },{
				                type: 'info',
				                timer: 4000
				            })
			          		 ;
			          	}

		    		}
		});
}*/