
$(function(){
    $('.contenttop').on('scroll',function(){
      
      if($('.contenttop').scrollTop() > 56){
        $('.navbar-fixed').removeClass('index')
      }else{
        $('.navbar-fixed').addClass('index')
      }
    })
  })
  