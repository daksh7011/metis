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
        preloaderFadeOutTime = 500,
        $backToTop = $('#back-to-top'),
        $sideBlock = $('#side-block'),
        $globalMask = $('.global-mask');

    function getWindowWidth() {
        return Math.max($(window).width(), window.innerWidth);
    }

    function getWindowHeight() {
        return Math.max($(window).height(), window.innerHeight);
    }

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
                colors = granimParent.attr('data-gradient-bg'),
                colors = colors.replace(' ', ''),
                colors = colors.replace(/'/g, '"');
            colors = JSON.parse(colors);

            // Add canvas
            granimParent.prepend('<canvas id="' + granimID + '"></canvas>');

            var granimInstance = new Granim({
                element: '#' + granimID,
                name: 'basic-gradient',
                direction: 'left-right', // 'top-bottom', 'radial' , 'diagonal'
                opacity: [1, 1],
                isPausedWhenNotInView: true,
                states: {
                    "default-state": {
                        gradients: colors
                    }
                }
            });
        });

    }

    // Countdown
    function metis_countdown() {
        var countdown = $('.countdown[data-countdown]');

        if (countdown.length > 0) {
            countdown.each(function () {
                var $countdown = $(this),
                    finalDate = $countdown.data('countdown');
                $countdown.countdown(finalDate, function (event) {
                    $countdown.html(event.strftime(
                        '<div class="countdown-container row"><div class="countdown-item col-6 col-sm"><div class="number">%-D</div><span>Day%!d</span></div><div class="countdown-item col-6 col-sm"><div class="number">%H</div><span>Hours</span></div><div class="countdown-item col-6 col-sm"><div class="number">%M</div><span>Minutes</span></div><div class="countdown-item col-6 col-sm"><div class="number">%S</div><span>Seconds</span></div></div>'
                    ));
                });
            });
        }
    }

    // Back to top
    function metis_backToTopToggle() {
        if (576 >= getWindowWidth()) {
            if (!$body.hasClass('mCS_destroyed') && !$body.hasClass('mCustomScrollbar')) {
                var scrollpos = $(window).scrollTop();

                if (scrollpos > 100) {
                    $backToTop.addClass('active');
                } else {
                    $backToTop.removeClass('active');
                }
            }
        } else {
            $backToTop.removeClass('active');
        }
    }

    function metis_backToTopButton() {
        $backToTop.off('click');
        $backToTop.on('click', function (e) {
            e.preventDefault();
            if (!$body.hasClass('mCS_destroyed') && !$body.hasClass('mCustomScrollbar')) {
                $.smoothScroll({
                    offset: 0,
                    easing: 'swing',
                    speed: 800,
                    scrollTarget: 0,
                    preventDefault: false
                });
            } else {
                if (!(1199 >= getWindowWidth() || $body.hasClass('mobile')) && ($body.hasClass('side-block-open') || !$sideBlock.hasClass('hide-side-block'))) {
                    $('body.side-block-open').mCustomScrollbar('scrollTo', ['top', null], {
                        scrollInertia: 800
                    });
                }
            }
        });
    }
    // window load function
    $(window).on('load', function () {
        metis_preloader();
    });

    // document.ready function
    jQuery(document).ready(function ($) {
        metis_backgrounds();
        metis_countdown();
        metis_backToTopButton();
    });


    // window.scroll function
    $(window).on('scroll', function () {
        metis_backToTopToggle();
    });

})(jQuery);