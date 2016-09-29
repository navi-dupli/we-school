$(document).ready(function(){


	$('#filtrar').keyup(function () {
 
        var rex = new RegExp($(this).val(), 'i');
        $('.buscar tr').hide();
        $('.buscar tr').filter(function () {
                        return rex.test($(this).text());
        }).show();
 
    });

    // Al dar click en el boton Listar...
	$(".list-users").click(function(){
		
		$("#form-modify-user").hide(100);
		$(".table-users").show(100);

	});
	// Al dar click en el boton Editar...
	$('.show-modify-form').click(function(){

		$(".form-user").show(100);
		$("#form-add-user").hide(100);
		$("#form-modify-user").show(100);
		$(".table-users").hide(100);

		var dataId = this.id;

	   	$.ajax({ 
	   		type: 'GET', 
	   		url: '/get-user/'+$(this).attr("id"),
	   		dataType: 'json',
	   		success: function (data) {
	   			user = data.local;
	   			
	   			$("#button_update").attr("id", dataId);

	   			$("#mod_code").val(user.code);
	   			$("#mod_name").val(user.name);
	   			$("#mod_codeCourse option[value='"+user.codeCourse+"']").attr("selected","selected");
	   		},
	   		error:function(msg) {
	   			// body...
	   			console.log(msg+"Peticion de datos fallida");
	   		}
	   	});
	});
		// Al dar click en el boton Actualizar...
	$('.modify-user').click(function(){

		var dataId = this.id;
		$('#frm-modify-user').attr("action", "modifyRegisterCourse/"+dataId);		

		$('#frm-modify-user').submit();
	});

});