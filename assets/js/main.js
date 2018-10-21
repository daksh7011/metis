/*
 * Open Source Project made by Daksh (daksh7011.com)
 * Do NOT remove this excerpt even if you fork this or use it by any means.
 * This project is Licenced under GNU GENERAL PUBLIC LICENSE Version 3
 */

(function ($) {
    "use strict";

    // Vars
    var $body = $('body'),
        $preloader = $('#preloader'),
        preloaderDelay = 1200,
        preloaderFadeOutTime = 500;

    // If Mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $body.addClass('mobile');
    }

    //  Preloader
    function metis_preloader() {
        $preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
    }

    // window load function
    $(window).on('load', function () {
        metis_preloader();
    });

})(jQuery);