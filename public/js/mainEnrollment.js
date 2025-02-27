$(document).ready(function(){
  // Al dar click en el boton Agregar...
  $("#add-enroll").click(function(){
    
    $(".table-enroll").hide(100);
    $(".form-enroll").show(100);
    $("#form-add-enroll").show(100);
    $("#form-modify-enroll").hide(100);

  });

  // Al dar click en el boton Listar...
  $(".list-enroll").click(function(){
    
    $(".form-enroll").hide(100);
    $("#form-add-enroll").hide(100);
    $("#form-modify-enroll").hide(100);
    $(".table-enroll").show(100);

  });

  // Al dar click en el boton Editar...
  $('.show-modify-form').click(function(){

    
    $("#form-add-enroll").hide(100);
    $("#form-modify-enroll").show(100);

    var dataId = this.id;

      $.ajax({ 
        type: 'GET', 
        url: '/get-enrollment/'+$(this).attr("id"),
        dataType: 'json',
        success: function (data) {
          enroll = data;
          
          $("#button_update").attr("id", dataId);

          
          $("#mod_user option[value='"+enroll.codeUser+"']").attr("selected","selected");
          $("#mod_grade option[value='"+enroll.codeGrade+"']").attr("selected","selected");
         
          
        },
        error:function(msg) {
          // body...
          console.log(msg+"Peticion de datos fallida");
        }
      });
  });

    // Al dar click en el boton Actualizar...
  $('.modify-enroll').click(function(){

    var dataId = this.id;
    $('.frm-modify-enroll').attr("action", "modifyEnrollment/"+dataId);   

    $('.frm-modify-enroll').submit();
  });


  // Al dar click en el boton Cancelar...
  $("#cancel-modify").click(function(){
    
    $(".form-enroll").hide(100);
    $("#form-add-enroll").hide(100);
    $("#form-modify-enroll").hide(100);
    $(".table-enroll").show(100);

  });

   // Al dar click en el boton Eliminar...
  $('.delete-enrrol').click(function(){

    var dataId = this.id;
    var clase = "."+dataId; //Cada fila de la tabla posee una clase propia que cotiene el Id de cada objeto de la lista
    $.ajax({
        type    : 'get',
        url     : '/destroyEnrollment/' + dataId, //Funcion de borrado
        success : function(response) {
          if (response === 'error') {
                alert('Error al eliminar inscripción');
            } else if (response === 'success') {
                demo.initChartist();
                 $(clase).remove(); 
                 alert("Inscripción borrada satisfactoriamente");   
            /** $.notify({
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