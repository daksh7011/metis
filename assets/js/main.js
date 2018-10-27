/*
 * Open Source Project made by Daksh (daksh7011.com)
 * Do NOT remove this excerpt even if you fork this or use it by any means.
 * This project is Licenced under GNU GENERAL PUBLIC LICENSE Version 3
 */

// noinspection JSUnresolvedVariable
(function ($) {
    "use strict";

    // lets
    let $body = $('body'),
        $sideBlock = $('#side-block'),
        $siteHeader = $('.site-header'),
        $headerBase = $('.header-base'),
        $siteNavigation = $('.site-navigation'),
        $navToggle = $('#navigation-toggle'),
        closeOverlayNavAfterClick = true,
        closeOverlayNavAfterClick_mobile = true,
        closeClassicNavAfterClick_mobile = true,
        $backToTop = $('#back-to-top'),
        $closeSideBlock = $('#close-side-block'),
        $smoothScrollLinks = $('a.scrollto, .site-header a[href^="#"]'),
        $globalMask = $('.global-mask'),
        $preloader = $('#preloader'),
        preloaderDelay = 1200,
        preloaderFadeOutTime = 500;

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
        $('[data-gradient-bg]').each(function (index) {
            // using let here wont work because same block scoped vars cant be re-declared
            const granimParent = $(this),
                granimID = 'granim-' + index + '';
            let colors = granimParent.attr('data-gradient-bg');
            colors = colors.replace(' ', '');
            colors = colors.replace(/'/g, '"');
            colors = JSON.parse(colors);

            // Add canvas
            granimParent.prepend('<canvas id="' + granimID + '"></canvas>');

            new Granim({
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
        let countdown = $('.countdown[data-countdown]');

        if (countdown.length > 0) {
            countdown.each(function () {
                let $countdown = $(this),
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
                // noinspection JSValidateTypes
                let scrollpos = $(window).scrollTop();

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

    // Navigation
    function metis_navigation() {
        let headerBaseHeight = parseInt($headerBase.innerHeight(), 10);

        if (!(1199 >= getWindowWidth() || $body.hasClass('mobile'))) {
            if ($sideBlock.length > 0) {
                $body.addClass('has-side-block');
            }

            if ($sideBlock.hasClass('hide-side-block')) {
                $body.addClass('has-hide-side-block');
            }

            $siteNavigation.css('display', '');

            if ($body.hasClass('mCS_destroyed') || !$body.hasClass('mCustomScrollbar')) {
                $body.mCustomScrollbar({
                    axis: 'y',
                    scrollbarPosition: 'inside',
                    scrollInertia: 150,
                    mouseWheel: {
                        enable: true,
                        scrollAmount: 100,
                        axis: 'y'
                    },
                    autoHideScrollbar: false,
                    alwaysShowScrollbar: 1,
                    callbacks: {
                        whileScrolling: function () {
                            // Show - Back to top button
                            if ($body.hasClass('side-block-open') || !$body.hasClass('has-hide-side-block')) {
                                if (this.mcs.top <= -100) {
                                    $backToTop.addClass('active');
                                } else {
                                    $backToTop.removeClass('active');
                                }
                            }
                        },
                        onScroll: function () {
                            if (!$body.hasClass('side-block-open'))
                                return true;
                        }
                    }
                });

            }
        } else {

            if ($body.hasClass('has-side-block')) {
                $body.removeClass('has-side-block');
            }

            if ($body.hasClass('has-hide-side-block')) {
                $body.removeClass('has-hide-side-block');
            }

            if ($body.hasClass('side-block-open')) {
                $body.removeClass('side-block-open');
            }

            if ($body.hasClass('mCustomScrollbar')) {
                $body.mCustomScrollbar('destroy');
            }

            // Hide - Close side block button
            if ($closeSideBlock.hasClass('active')) {
                $closeSideBlock.removeClass('active');
            }

            // Hide - Global mask
            if ($globalMask.hasClass('active')) {
                $globalMask.removeClass('active');
            }

        }


        // Fix first section padding
        if ($siteHeader.hasClass('header-classic-mobile-fixed') || $siteHeader.hasClass('header-overlay-navigation')) {
            if (1199 >= getWindowWidth()) {
                headerBaseHeight = $headerBase.innerHeight();

                $body.find('section').first().css('padding-top', '');
                $body.find('section').first().css('padding-top', parseInt($body.find('section').first().css('padding-top'), 10) + headerBaseHeight);
            }
        }

        // Fix overlay navigation padding
        if ($siteHeader.hasClass('header-overlay-navigation')) {
            headerBaseHeight = $headerBase.innerHeight();

            $siteHeader.find('.overlay-navigation-container').first().css('height', '').css('margin-top', '');
            $siteHeader.find('.overlay-navigation-container nav').first().css('min-height', '');
            $siteHeader.find('.overlay-navigation-container').first().css('height', getWindowHeight() - parseInt(headerBaseHeight, 10)).css('margin-top', parseInt(headerBaseHeight, 10));
            $siteHeader.find('.overlay-navigation-container nav').first().css('min-height', getWindowHeight() - parseInt(headerBaseHeight, 10));
        }

        // Mobile navigation toggle
        $navToggle.off('click');
        $navToggle.on('click', function (e) {
            e.preventDefault();

            if ($siteHeader.hasClass('header-overlay-navigation')) {
                if (!$(this).hasClass('open')) {
                    $(this).addClass('open');
                    $('.overlay-navigation').addClass('open');
                } else {
                    $('.overlay-navigation').removeClass('open');
                    $(this).removeClass('open');
                }
            } else if ($siteHeader.hasClass('header-classic-navigation')) {
                if (!$(this).hasClass('open')) {
                    $(this).addClass('open');
                    $('.header-collapse').slideDown(500);
                } else {
                    $('.header-collapse').slideUp(500);
                    $(this).removeClass('open');
                }
            }
        });

        // Smooth Scroll
        function mCustomScrollbarScrollToOffset(el) {
            const elTop = $(el).offset().top - $('.mCSB_container').offset().top;
            return elTop - headerBaseHeight;
        }

        $smoothScrollLinks.off('click');
        $smoothScrollLinks.on('click', function (e) {
            e.preventDefault();
            let target = $(this).attr('href');

            if (!(1199 >= getWindowWidth() || $body.hasClass('mobile'))) {

                if ($(target).parents('#side-block').length > 0) {

                    if (!$body.hasClass('side-block-open')) {
                        $body.addClass('side-block-open');
                    }

                    $('body.side-block-open').mCustomScrollbar('scrollTo', mCustomScrollbarScrollToOffset($body.find('.mCSB_container').find(target)), {
                        scrollInertia: 800
                    });

                    // Show - Close side block button
                    if ($sideBlock.hasClass('hide-side-block')) {
                        $closeSideBlock.addClass('active');
                    }

                    // Show - Global mask
                    if ($globalMask.hasClass('hide-global-mask') && $sideBlock.hasClass('hide-side-block')) {
                        $globalMask.addClass('active');
                    }

                } else {
                    if ($body.hasClass('has-side-block') && $body.hasClass('side-block-open')) {
                        $closeSideBlock.trigger('click');
                    }
                }

                // Close overlay navigation after menu element click
                if (closeOverlayNavAfterClick === true && $(target).parents('.site-header') && $siteHeader.hasClass('header-overlay-navigation') && $navToggle.hasClass('open')) {
                    $navToggle.trigger('click');
                }

            } else {

                $.smoothScroll({
                    offset: -headerBaseHeight,
                    easing: 'swing',
                    speed: 800,
                    scrollTarget: target,
                    preventDefault: false
                });

                // Close overlay navigation after menu element click - only for mobile view
                if (closeOverlayNavAfterClick_mobile === true && $(target).parents('.site-header') && $siteHeader.hasClass('header-overlay-navigation') && $navToggle.hasClass('open')) {
                    $navToggle.trigger('click');
                }

                // Close classic navigation after menu element click - only for mobile view
                if (closeClassicNavAfterClick_mobile === true && $(target).parents('.site-header') && $siteHeader.hasClass('header-classic-navigation') && $navToggle.hasClass('open')) {
                    $navToggle.trigger('click');
                }

            }
        });

        // Close side block button
        $closeSideBlock.off('click');
        $closeSideBlock.on('click', function (e) {
            e.preventDefault();

            if (!$(this).hasClass('active'))
                return true;

            // Hide - Close side block button
            $(this).removeClass('active');

            if ($body.hasClass('side-block-open')) {
                $body.removeClass('side-block-open');

                // Hide - Global mask
                if ($globalMask.hasClass('active')) {
                    $globalMask.removeClass('active');
                }

                // Hide - Back to top button
                if ($backToTop.hasClass('active')) {
                    $backToTop.removeClass('active');
                }

                setTimeout(function () {
                    if ($body.hasClass('mCustomScrollbar')) {
                        $body.mCustomScrollbar('scrollTo', ['top', null], {
                            scrollInertia: 0
                        });
                    }
                }, 500);
            }
        });

    }


    // window load function
    $(window).on('load', function () {
        metis_preloader();
    });

    // document.ready function
    // noinspection JSUnresolvedFunction
    jQuery(document).ready(function () {
        metis_navigation();
        metis_backgrounds();
        metis_countdown();
        metis_backToTopButton();
    });

    // window.resize function
    $(window).on('resize', function () {
        metis_navigation();
        metis_backToTopToggle();
    });

    // window.scroll function
    $(window).on('scroll', function () {
        metis_backToTopToggle();
    });

})(jQuery);
