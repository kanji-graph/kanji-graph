$(document).ready(function(){
  $lis = $('ul.nav.navbar-nav li');

  $lis.on("click", function(e){
    $lis.removeClass("active");
    $(this).addClass("active");
  });
});
