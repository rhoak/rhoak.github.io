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
      $(this).addClass('stretchRight');
    }
  });
});

// Dynamically loads images for modals.
//
// This expects there to be an <a> element with the following properties:
//
// class must include the zmdl-button class.
// data-target: the ID ofthe modal div
// img-url: The url of the img to load.
// img-alt: The alt text of the image.
$('.zmdl-button').click(function() {
  var $b = $(this);
  var modalId = $b.attr('data-target');
  var imgUrl = $b.attr('img-url');
  var imgAlt = $b.attr('img-alt');
  var img = document.createElement("img");
  img.setAttribute('src', imgUrl);
  img.setAttribute('class', 'modal-img img-responsive img-center');
  img.setAttribute('alt', imgAlt);
  $(modalId + ' .modal-content').append(img)
  $(modalId).modal();
});

/* $('.social').hover(function() {
  $(this).toggleClass("pulse");
}); */

$('.cap-button').hover(function() {
  $(this).toggleClass('pulse');
});


})(jQuery);
