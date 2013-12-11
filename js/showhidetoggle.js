$(document).ready(function() {
 // hides the slickbox as soon as the DOM is ready
 // (a little sooner than page load)
  $('#slickbox').hide();
 // shows the slickbox on clicking the noted link  
  $('a#slick-show').click(function() {
    $('#slickbox').show('slow');
    return false;
  });
 // hides the slickbox on clicking the noted link  
  $('a#slick-hide').click(function() {
    $('#slickbox').hide('fast');
    return false;
  });
  
  
  // hides the togglebox as soon as the DOM is ready
  // (a little sooner than page load)
   $('.togglebox').hide();

 // toggles the slickbox on clicking the noted link  
  $('a.toggle').click(function() {
    $('.togglebox').toggle(400);
    return false;
  });
});