// Generated by CoffeeScript 1.8.0
(function() {
  document.documentElement.className = document.documentElement.className.replace(/no-js/, 'js');

  jQuery(function($) {
    return $('.responsive .banner select').on('change', function($e) {
      if ($(this).val()) {
        return window.location.href = $(this).val();
      }
    });
  });

}).call(this);
