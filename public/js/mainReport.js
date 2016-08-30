$(document).ready(function(){

	var datetime = new Date();

		$("#report-user").show(100);
		$(".table-report").html('<div class="row"><div class="col-md-8">Area</div><div class="col-md-4"><div class="col-md-1">1P</div><div class="col-md-1">2P</div><div class="col-md-1">ES</div><div class="col-md-1">3P</div><div class="col-md-1">4P</div><div class="col-md-1">EF</div></div></div>');
		$.ajax({ 
	   		type: 'GET', 
	   		url: '/get-user/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			user = data.local;
	   			$("#estudent").text("ESTUDIANTE: "+user.name);
	   			$("#date").text("FECHA: "+ datetime.toJSON().slice(0,10));
	   			$("#year").text("AÑO ELECTIVO: "+ datetime.getFullYear());
	   			
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});

	   	//subjectsNotas
	   	var subjects = new Array();
	   	$.ajax({ 
	   		type: 'GET', 
	   		url: '/subjectsNotas',
	   		dataType: 'json',
	   		success: function (data) {
	   			$.each( data, function( key, value ) {
	   				$(".table-report").append('<div class="row siguiente'+data[key]._id+'"><div class="col-md-8"><div class="col-md-6" id="subject'+data[key]._id+'">Estadistica</div><div class="col-md-1">I.H</div></div><div class="col-md-4"><div class="row"><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div></div><div class="row"><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div></div></div>');
	   				$("#subject"+data[key]._id).text(data[key].name);
	   				$.ajax({ 
				   		type: 'GET', 
				   		url: '/get-achiSub/'+data[key].code,
				   		dataType: 'json',
				   		success: function (materias) {
				   			$.each( materias, function( key_1, value ) {
								$(".siguiente"+data[key]._id).after('<div class="row sig-achi'+materias[key_1]._id+'"><div class="col-md-8"><p>'+materias[key_1].description+'</p></div></div>');
								$.ajax({ 
							   		type: 'GET', 
							   		url: '/get-achiacti/'+materias[key_1].name,
							   		dataType: 'json',
							   		success: function (activitys) {
							   			$.each( activitys, function( key_2, value ) {
								   				$(".sig-achi"+materias[key_1]._id).after('<div row><div class="col-md-8"><p>'+activitys[key_2].name+'</p></div></div>');
										});
										
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
				   			console.log(msg+"Peticion de datos fallida");
				   		}
				   	});
				});
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	   	var html=$('#report-user').html();
									   	console.log(html);
									   	location.href='/report-pdf';
	});

	//al dar click en Notas desde reportes
	$('.show-report').click(function(){
		
		var dataId = this.id;
		var datetime = new Date();

		$("#report-user").show(100);
		$(".table-report").html('<div class="row"><div class="col-md-8">Area</div><div class="col-md-4"><div class="col-md-1">1P</div><div class="col-md-1">2P</div><div class="col-md-1">ES</div><div class="col-md-1">3P</div><div class="col-md-1">4P</div><div class="col-md-1">EF</div></div></div>');
		$.ajax({ 
	   		type: 'GET', 
	   		url: '/get-user/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			user = data.local;
	   			$("#estudent").text("ESTUDIANTE: "+user.name);
	   			$("#date").text("FECHA: "+ datetime.toJSON().slice(0,10));
	   			$("#year").text("AÑO ELECTIVO: "+ datetime.getFullYear());
	   			
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});

	   	//subjectsNotas
	   	var subjects = new Array();
	   	$.ajax({ 
	   		type: 'GET', 
	   		url: '/subjectsNotas',
	   		dataType: 'json',
	   		success: function (data) {
	   			$.each( data, function( key, value ) {
	   				$(".table-report").append('<div class="row siguiente'+data[key]._id+'"><div class="col-md-8"><div class="col-md-6" id="subject'+data[key]._id+'">Estadistica</div><div class="col-md-1">I.H</div></div><div class="col-md-4"><div class="row"><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div></div><div class="row"><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div></div></div>');
	   				$("#subject"+data[key]._id).text(data[key].name);
	   				$.ajax({ 
				   		type: 'GET', 
				   		url: '/get-achiSub/'+data[key].code,
				   		dataType: 'json',
				   		success: function (materias) {
				   			$.each( materias, function( key_1, value ) {
								$(".siguiente"+data[key]._id).after('<div class="row sig-achi'+materias[key_1]._id+'"><div class="col-md-8"><p>'+materias[key_1].description+'</p></div></div>');
								$.ajax({ 
							   		type: 'GET', 
							   		url: '/get-achiacti/'+materias[key_1].name,
							   		dataType: 'json',
							   		success: function (activitys) {
							   			$.each( activitys, function( key_2, value ) {
								   				$(".sig-achi"+materias[key_1]._id).after('<div row><div class="col-md-8"><p>'+activitys[key_2].name+'</p></div></div>');
										});
										
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
				   			console.log(msg+"Peticion de datos fallida");
				   		}
				   	});
				});
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	   	var html=$('#report-user').html();
									   	console.log(html);
									   	location.href='/report-pdf';
	});


});