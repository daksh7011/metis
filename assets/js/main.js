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

    //  Backgrounds
    function metis_backgrounds() {
        // granim.JS
        $('[data-gradient-bg]').each(function (index, element) {
            var granimParent = $(this),
                granimID = 'granim-' + index + '',
                colours = granimParent.attr('data-gradient-bg'),
                colours = colours.replace(' ', ''),
                colours = colours.replace(/'/g, '"')
            colours = JSON.parse(colours);

            // Add canvas
            granimParent.prepend('<canvas id="' + granimID + '"></canvas>');

            var granimInstance = new Granim({
                element: '#' + granimID,
                name: 'basic-gradient',
                direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
                opacity: [1, 1],
                isPausedWhenNotInView: true,
                states: {
                    "default-state": {
                        gradients: colours
                    }
                }
            });
        });

    }

    // window load function
    $(window).on('load', function () {
        metis_preloader();
    });

    // document.ready function
    jQuery(document).ready(function ($) {
        metis_backgrounds();
    });

})(jQuery);