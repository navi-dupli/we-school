$(document).ready(function(){
  // Al dar click en el boton Agregar...
  $("#add-enroll").click(function(){
    
    $(".table-enroll").hide(100);
    $(".form-enroll").show(100);
    $("#form-add-enroll").show(100);
    $("#form-modify-eroll").hide(100);

  });

  // Al dar click en el boton Listar...
  $(".list-courses").click(function(){
    
    $(".form-enroll").hide(100);
    $("#form-add-enroll").hide(100);
    $("#form-modify-eroll").hide(100);
    $(".table-enroll").show(100);

  });

});