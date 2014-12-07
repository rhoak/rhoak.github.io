(function($){

var setThumby = function(e) {
  $('.thumby').on('mouseenter', function(e) {
    var $k = $(this).find('.caption');
    $k.removeClass('hidden-cap');
    e.preventDefault();
  });
  $('.thumby').on('mouseleave', function(e) {
    var $k = $(this).find('.caption');
    $k.addClass('hidden-cap');
    e.preventDefault();
  });
};

// Initialize the hover behavior
setThumby();

$('.caption').addClass('hidden-cap');

$(window).scroll(function() {
  $('.graphbar').each(function(){
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("stretchRight");
    }
  });
});


 /* $('.social').hover(function() {
    $(this).toggleClass("pulse");
  }); */

$('.cap-button').hover(function() {
  $(this).toggleClass("pulse");
});


})(jQuery);
