(function(){ 

  function twinkling() {
    $('.stars2').fadeOut(1000);
    $('.stars2').fadeIn(1000);
  }

  function twinkling2() {
    $('.stars1').fadeIn(2300);
    $('.stars1').fadeOut(2300);
  }

  function twinkling3() {
    $('.stars3').fadeOut(1400);
    $('.stars3').fadeIn(1400);
  }

  setInterval(twinkling, 1000);

  setInterval(twinkling2, 1000);

  setInterval(twinkling3, 1000);

})();
