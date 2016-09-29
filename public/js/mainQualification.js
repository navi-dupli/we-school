$(document).ready(function(){


	$('#filtrar').keyup(function () {
 
        var rex = new RegExp($(this).val(), 'i');
        $('.buscar tr').hide();
        $('.buscar tr').filter(function () {
                        return rex.test($(this).text());
        }).show();
 
    });

    // Al dar click en el boton Listar...
	$(".list-qual").click(function(){
		
		$("#form-modify-qual").hide(100);
		$(".table-qual").show(100);

	});
	// Al dar click en el boton Editar...
	$('.show-modify-form').click(function(){

		$(".form-qual").show(100);
		$("#form-add-qual").hide(100);
		$("#form-modify-qual").show(100);
		$(".table-qual").hide(100);

		var dataId = this.id.split("/")[0];
		var dataUrl = this.id;
		console.log(dataId);

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

	   	$.ajax({ 
	   		type: 'GET', 
	   		url: '/get-user/'+dataId,
	   		dataType: 'json',
	   		success: function (data) {
	   			user = data.local;
	   			
	   			$("#button_update").attr("id", dataUrl);

	   			$("#mod_code").val(user.code);
	   			$("#mod_name").val(user.name);
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	});
		// Al dar click en el boton Actualizar...
	$('.modify-qual').click(function(){

		var dataId = this.id;
		$('#frm-modify-qual').attr("action", "qualification_user/"+dataId);		

		$('#frm-modify-qual').submit();
	});

});