(function ($) {
    'use strict';

    /* Table of contents */
    /*
		# Headers
		# Bar
		# Navigation
		# Footer
		# Shortcodes
			## Accordion box
			## Banner box
			## Counter box
			## Contact form
			## Countdown box
			## Cover box
			## Gallery
			## Onepage
			## Parallax
			## Progress bar
			## Pricing table
			## Social Bar
			## Split Box
			## Sliders
			## Split Screen
			## Tabs
			## Video Background
			## Scroll content
		# Shop
			## Shop products filter
			## Shop Masonry
		#Product
			## Ajax cart
		# Lazy load
		# Other
	*/

    window.Clb = {
        init: function () {
            // Header
            this.header = $('#masthead');
            this.headerIsFifth = Clb.header.hasClass('header-5');
            this.headerIsSixth = Clb.header.hasClass('header-6');

            this.headerFixed = {
                initialOffset: parseInt(this.header.attr('data-fixed-initial-offset')) || 150,

                enabled: $('[data-header-fixed]').length,
                value: false,

                mobileEnabled: $('[data-mobile-header-fixed]').length,
                mobileValue: false
            };

            this.headerSearch = $('.header-search');

            this.subheader = $('.subheader');

            // Logos
            this.siteBranding = this.header.find('.site-branding');
            this.siteTitle = this.header.find('.site-title');
            this.logo = this.header.find('.logo');
            this.fixedLogo = this.header.find('.fixed-logo');
            this.mobileLogo = this.header.find('.mobile-logo');
            this.fixedMobileLogo = this.header.find('.fixed-mobile-logo');

            this.logoForOnepage = this.header.find('.for-onepage');
            this.logoForOnepageDark = this.logoForOnepage.find('.dark');
            this.logoForOnepageLight = this.logoForOnepage.find('.light');

            // Menus
            this.megaMenu = this.header.find('#mega-menu-wrap');

            // Page
            this.containerLoading = $('.container-loading');

            this.shopProductsType = $('.woo-shop-container');

            this.resize();
        },

        resize: function () {
            this.isMobile = $(window).width() <= 768;
            this.isPad = $(window).width() <= 1024;
        }
    };

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    /* # Headers */
    function handleHeaders() {

        // Search open
        $('[data-nav-search]').on("click", function (e) {
            e.preventDefault();
            $('.search_results').empty();
            Clb.headerSearch.addClass('opened');
        });

        // Search close
        Clb.headerSearch.find('.close').on("click", function (e) {
            Clb.headerSearch.removeClass('opened');
            $('.search_results').empty();
        });

        $(document).on('keydown', function (e) {
            if (e.keyCode == 27) {
                Clb.headerSearch.removeClass('opened');
                $('.search_results').empty();
            }
        });
        // Remove close from form
        Clb.headerSearch.find('form').on("click", function (e) {
            e.stopPropagation();
        });

        handleMobileHeader();
        handleHeaderSize();
        handleFixedHeader();
    }

    function handleMobileHeader() {
        if (Clb.header && Clb.header.length) {

            if (Clb.isMobile) {
                Clb.header.addClass('mobile-header');
            } else {
                Clb.header.removeClass('mobile-header');
            }
        }
    }

    function handleHeaderSize() {

        handleFixedHeader();

        // Reset mega menu css properties for mobile phone
        if (Clb.isMobile) {
            Clb.megaMenu.find('ul').css({
                'left': '',
                'width': '',
                'max-width': '',
                'min-width': ''
            });
        }
    }

    function handleFixedHeader() {
        var fixed = Clb.headerFixed;

        if ($(document).scrollTop() > fixed.initialOffset) {

            if ((!Clb.isMobile && fixed.enabled && !fixed.value) ||
                (Clb.isMobile && fixed.mobileEnabled && !fixed.mobileValue)) {

                if (Clb.isMobile) {
                    fixed.mobileValue = true;
                } else {
                    fixed.value = true;
                }

                Clb.header.addClass('header-fixed no-transition')

                // Hide non fixed logos
                Clb.logo.css('display', 'none');
                Clb.mobileLogo.css('display', 'none');

                // Show fixed logo
                if (Clb.isMobile && Clb.fixedMobileLogo.length) {
                    Clb.fixedMobileLogo.css('display', 'flex');
                } else {
                    Clb.fixedLogo.css('display', 'flex');
                }
            }

        } else if (fixed.value || fixed.mobileValue) {

            fixed.value = false;
            fixed.mobileValue = false;

            Clb.header.removeClass('header-fixed');

            // Hide fixed logos
            Clb.fixedLogo.css('display', '');
            Clb.fixedMobileLogo.css('display', '');

            // Show non fixed logo
            if (Clb.isMobile && Clb.mobileLogo.length) {
                Clb.logo.css('display', 'none');
                Clb.mobileLogo.css('display', 'flex');
            } else {
                Clb.logo.css('display', 'flex');
                Clb.mobileLogo.css('display', 'none');
            }

        }

        // Effect appearance
        if ($(document).scrollTop() > fixed.initialOffset + 50) {
            Clb.header.removeClass('no-transition').addClass('showed');
        } else {
            Clb.header.removeClass('showed').addClass('no-transition');
        }
    }

    function handleHeaderTitle() {
        // Ttitle Parallax
        if ($('.header-title .page-title').hasClass('no-transition')) {
            if ($('.header-title h1').length) {
                var scroll = $(document).scrollTop() / 3;
                if (scroll > 200) {
                    scroll = 200;
                } else {
                    scroll = scroll;
                }
                $('.header-title h1, .header-title p.subtitle, .header-title .tags').css({
                    'transform': 'translate3d(0,' + (scroll) + 'px, 0)',
                    'opacity': 1 - (scroll / 200)
                });
            }
        }
    }

    /* # Bar */

    function handleBarScroll() {
        var bar = $('.bar');

        if (bar.length) {
            var hamburger = $('.bar-hamburger .hamburger');

            if ($(document).scrollTop() > 100) {
                hamburger.css('margin-top', '25px');
            } else {
                hamburger.css('margin-top', '');
            }
        }
    }

    /* # Navigation */

    window.openFullscreenMenu = function () {
        $('#fullscreen-mega-menu').addClass('open').find('#secondary-menu > li').each(function (i) {
            var link = $(this);
            setTimeout(function () {
                link.addClass('showed');
            }, 150 + i * 40);
        });
    };

    function handleNavigations() {

        // Mobile menu
        var menuNow = 0;

        $('#hamburger-menu').on("click", function () {
            $('#site-navigation').addClass('active');
            $('.close-menu').css('right', '0');
            $('body').css('overflow', 'hidden');
            // $(this).addClass('hidden');

            $('#masthead .search').addClass('visible');
        });

        $('.close, .mbl-overlay-bg, .mobile-header #site-navigation a[href^="#"]').on("click", function () {
            $('#mega-menu-sub-' + menuNow).removeClass('active');
            $('#mega-menu-sub-' + menuNow).removeAttr('id');
            menuNow--;
            $('#site-navigation').removeClass('active');
            $('.close-menu').css('right', '-100%');
            $('#hamburger-menu').removeClass('hidden');
            $('#masthead .search').removeClass('visible');
            $('body').css('overflow', 'auto');

        });
        
        $('a.menu-link').on('click', function () {
            if ($(this).attr('href')[0] == '#') {
                menuNow = 0;
                $('#site-navigation').removeClass('active');
                $('.close-menu').css('right', '-100%');
                $('#hamburger-menu').removeClass('hidden');
                $('#masthead .search').removeClass('visible');
                $('body').css('overflow', 'auto');
            }
        });

        // var dragging = false;

        // $('body').on('touchmove', function () {
        //     dragging = true;
        // });

        $('.has-submenu > a').on('click touchend', function (e) {
            // if (dragging) {
            //     dragging = false;
            //     return;
            // }

            if (Clb.isPad) {
                var parent = $(this).parent();
                var menu = parent.find('.sub-nav > ul.sub-menu, > .sub-sub-nav > ul.sub-sub-menu, .submenu');
                var subMenu = parent.find('>.sub-nav >.sub-menu, >.sub-sub-nav >.sub-sub-menu');

                // If click on first level menu item remove all active classes
                if (parent.hasClass('menu-item-depth-0') && !parent.hasClass('active')) {
                    resetAllClasses(parent);
                    parent.addClass('active-main-item');
                }

                // If click on depth level menu item remove all active classes
                if (menuNow > 0) {
                    resetClassesOnClickNonActiveItem(parent);
                }

                //If click on open first depth menu item, close it
                // if (parent.hasClass('main-active-item')) {
                //     resetClassesOnClickActiveItem(parent);
                // }

                // If click on open menu item, close it.
                if ($(this).hasClass('active') || parent.hasClass('active')) {
                    resetClassesOnClickActiveItem(parent);
                    resizeSubMenu(menuNow);

                    if (!parent.hasClass('menu-item-depth-' + menuNow)) {
                        menuNow--;
                    }
                    $(this).removeClass('active');
                    $('.sub-menu').removeAttr('style');
                    e.preventDefault();
                } else {
                    if (!parent.hasClass('menu-item-depth-' + menuNow)) {
                        menuNow++;
                    }

                    // If click on sub-nav-item resize height sub-menu
                    if (parent.hasClass('sub-nav-item')) {
                        $('.sub-nav >.sub-menu, .sub-sub-nav >.sub-sub-menu').removeAttr('style');
                        resizeSubMenu(menuNow);
                    }

                    var submenuItems = subMenu.find('> .mega-menu-item');
                    subMenu.css('height', calcHeight(submenuItems) + 'px');
                    parent.addClass('active');
                    menu.addClass('active');
                    $('.menu-link').removeClass('active');
                    $(this).addClass('active');
                    e.preventDefault();
                }
            } else if (Clb.isPad) {
                var self = $(this);

                $('.sub-sub-nav, .menu-link').removeClass('open active');
                $(this).addClass('active');
                $(this).siblings('.sub-sub-nav').addClass('open');

                $(document).on('mouseup touchstart', function (e) {
                    if (self.has(e.target).length === 0) {
                        $('.sub-sub-nav, .menu-link').removeClass('open active');
                    }
                });

                e.preventDefault();
            } else {
                window.location.href = $(this).attr('href');
            }
        });

        if ($('#masthead nav > .mobile-wpml-select').length) {
            $('#masthead nav > .mobile-wpml-select').insertAfter($('#mega-menu-wrap > ul > li').last());
        }

        // Mega Menu
        if ($('#mega-menu-wrap').length) {
            $('#mega-menu-wrap').accessibleMegaMenu({
                uuidPrefix: 'accessible-megamenu',
                menuClass: 'menu',
                topNavItemClass: 'nav-item',
                panelClass: 'sub-nav',
                panelGroupClass: 'sub-sub-menu',
                hoverClass: 'hover',
                focusClass: 'focus',
                openClass: 'open'
            }).on('megamenu:open', function (e, el) {
                var $menu = $(this),
                    $el = $(el),
                    $subNav;

                if (Clb.isMobile) {
                    return false;
                }

                if ($el.is('.main-menu-link.open') && $el.siblings('div.sub-nav').length > 0) {
                    $subNav = $el.siblings('div.sub-nav');
                } else if ($el.is('div.sub-nav')) {
                    $subNav = $el;
                    $el = $subNav.siblings('.main-menu-link');
                } else {
                    return true;
                }

                var ul = $subNav.find('ul.sub-menu-wide');
                ul.each(function () {
                    var $ul = $(this);
                    var total_width = 1;

                    $ul.find('> .sub-nav-item').each(function () {
                        total_width += $(this).outerWidth();
                    });

                    $ul.innerWidth(total_width);
                });

                var headerLeft = 0;
                if ($('#masthead.header-3').length) {
                    var headerWrap = $('#masthead.header-3 .header-wrap');
                    headerLeft = $(window).width() - headerWrap.outerWidth() - headerWrap.offset().left;
                }
                var windowWidth = $(window).width();

                var subNavWidth = $subNav.find('> ul').width();
                var subNavMargin = 0;

                $subNav.css({'max-width': windowWidth});

                if (subNavWidth > windowWidth) {
                    $subNav.addClass('sub-nav-onecol');

                    subNavWidth = $subNav.width();
                }
                var elWidth = $el.outerWidth();
                var elOffsetLeft = $el.offset().left;
                var elOffsetRight = windowWidth - $el.offset().left - elWidth;

                if (elOffsetLeft < 0) {
                    subNavMargin = -(elOffsetLeft - subNavWidth / 2 + elWidth / 2) - headerLeft;
                }
                if (elOffsetRight < (subNavWidth - elWidth)) {
                    subNavMargin = -(subNavWidth - elWidth - elOffsetRight) - headerLeft;
                }

                if (ul.outerWidth() >= windowWidth) {
                    $subNav.css('left', '');
                    ul.innerWidth(windowWidth);
                    subNavMargin = -$subNav.offset().left;
                }

                $subNav.css('left', subNavMargin);
            });

            $('#mega-menu-wrap .sub-sub-nav').each(function () {
                if ($(this).offset().left + $(this).outerWidth() > $(window).width()) {
                    $(this).addClass('menu-left');
                }
            });

			if (Clb.header.hasClass('header-6')) {
				$('.site-header.header-6').on('mouseover', function(){
					$(this).addClass('hover');
				});
	
				$('.content-right').on('mouseover', function(){
					$('.site-header.header-6').removeClass('hover');
				});
			}
        }

        // Cart
        $("a.cart .icon").on("click", function () {
            $(".submenu_cart, .cart-overlay").toggleClass("visible");
            $("body").toggleClass("cart-opened");
        });
        $(".submenu_cart .close-bar, .cart-overlay").on("click", function () {
            $(".submenu_cart, .cart-overlay").removeClass("visible");
            $("body").toggleClass("cart-opened");
        });

        // Fullscreen Mega Menu
        $('#hamburger-fullscreen-menu').on('click', function () {
            openFullscreenMenu();
            $(".cart-overlay").toggleClass("visible");
        });

        $("#fullscreen-menu-close, .cart-overlay").on("click", function () {
            $(".cart-overlay").removeClass("visible");
            closeMenu();
        });

        $(document).on('keydown', function (e) {
            if (e.keyCode == 27) {
                $(".cart-overlay").removeClass("visible");
                closeMenu();
            }
        });

        var fullscreenMenu = $('#fullscreen-mega-menu-wrap');
        if (fullscreenMenu.length) {
            var menuNow = 0;
            var closeMenu = function () {
                $('#fullscreen-mega-menu').removeClass('open').find('#secondary-menu > li').each(function (i) {
                    $(this).removeClass('showed active');
                    $('.cart-overlay').removeClass('visible');
                });
            };

            $('#fullscreen-menu-close, #fullscreen-mega-menu-wrap .nav-item:not(.has-submenu) > a[href^="#"]').on('click touchstart', closeMenu);

            $(document).on('mouseup touchstart', function (e) {
                if (fullscreenMenu.has(e.target).length === 0) {
                    $('#fullscreen-mega-menu-wrap .sub-nav > ul > li,#fullscreen-mega-menu-wrap .sub-nav .mega-menu-item > .sub-sub-nav > .sub-sub-menu > li').removeClass('showed active showed-onclick');
                    $('#fullscreen-mega-menu-wrap .nav-item').removeClass('active');
                    $('#fullscreen-mega-menu-wrap .sub-nav,#fullscreen-mega-menu-wrap .sub-sub-nav').removeClass('open-onclick');
                }
            });

            fullscreenMenu.accessibleMegaMenu({
                uuidPrefix: 'accessible-megamenu',
                menuClass: 'menu',
                topNavItemClass: 'nav-item',
                panelClass: 'sub-nav',
                panelGroupClass: 'sub-sub-menu',
                hoverClass: 'hover',
                focusClass: 'focus',
                openClass: 'open'
            }).on('megamenu:open', function (e, el) {

                $(this).find('.sub-nav:not(.open) > ul > li, .sub-nav .mega-menu-item:not(:hover) > .sub-sub-nav > .sub-sub-menu > li').removeClass('showed active');
                if (!Clb.isPad) {
                    $(this).find('.sub-nav.open > ul > li, .sub-nav .mega-menu-item:hover > .sub-sub-nav > .sub-sub-menu > li').each(function (i) {
                        var self = $(this);
                        setTimeout(function () {
                            if (self.parent().parent().parent().is(':hover')) {
                                self.addClass('showed');
                            }
                        }, i * 40);
                    });
                }

                if (fullscreenMenu.parents('.fullscreen-nav').hasClass('centered') && !Clb.isPad) {
                    var menuIcon = $('.has-submenu > a .has-submenu-icon')

                    menuIcon.unbind().on('click', function () {
                        var parent = $(this).parent().parent();

                        if (parent.hasClass('menu-item-depth-0') && !parent.hasClass('active')) {
                            resetAllClasses(parent);
                            parent.addClass('active-main-item');
                        }

                        if (!parent.hasClass('menu-item-depth-' + menuNow)) {
                            menuNow++;
                        }

                        if (parent.hasClass('menu-item-depth-' + menuNow) && !parent.hasClass('active')) {
                            resetClassesOnClickNonActiveItem(parent);
                        }

                        if (parent.hasClass('menu-item-depth-0') && parent.hasClass('active')) {
                            resetAllClasses(parent);
                            return false;
                        } else {
                            resetClassesOnClickActiveItem(parent);
                            parent.addClass('active');
                            parent.find('> .sub-nav, > .sub-sub-nav').addClass('open-onclick');
                            $('.open-onclick').find('> .sub-menu > .mega-menu-item, > .sub-sub-menu > .mega-menu-item ').addClass('showed-onclick');
                            return false;
                        }
                    });
                }

                if (Clb.isPad) {

                    $('.has-submenu > a').on('click touchend', function (i) {

                        var parent = $(this).parent();

                        if (parent.hasClass('menu-item-depth-0') && !parent.hasClass('active')) {
                            resetAllClasses(parent);
                        }

                        if (!parent.hasClass('menu-item-depth-' + menuNow)) {
                            menuNow++;
                        }

                        if (parent.hasClass('menu-item-depth-' + menuNow) && !parent.hasClass('active')) {
                            resetClassesOnClickNonActiveItem(parent);
                        }

                        parent.addClass('active');

                        if (!$(this).hasClass('showed')) {
                            $('.sub-sub-nav .sub-sub-menu .sub-nav-item').removeClass('showed');
                            $('.sub-sub-nav .sub-sub-menu').removeClass('open');
                        }

                        parent.addClass('active');
                        parent.find('> .sub-nav > .sub-menu > .sub-nav-item, > .sub-sub-nav > .sub-sub-menu > .sub-nav-item').addClass('showed');
                        parent.find('> .sub-sub-nav > .sub-sub-menu').addClass('open');
                    });
                }
            });

            if (fullscreenMenu.parents('.fullscreen-nav').hasClass('centered') && !Clb.isPad) {
                $('#fullscreen-mega-menu-wrap .sub-nav').on('mouseleave', function () {
                    $(this).find('li').removeClass('showed');
                });
            }
        }

        function calcHeight(items) {
            var calcHeight = 0;

            items.each(function () {
                var itemHeight = $(this).outerHeight();
                calcHeight += itemHeight;
            });

            return calcHeight;
        }


        function resizeSubMenu() {
            //resize sub-menu
            setTimeout(function () {
                var newHeight = $('.menu-depth-1.active').height();
                $('.sub-menu.active').css('height', newHeight + 'px');
            }, 500);
        }

        function resetAllClasses() {
            menuNow = 0;
            $('.sub-nav > ul.sub-menu, .sub-sub-nav > ul.sub-sub-menu, .submenu, .sub-nav-item').removeClass('active showed');
            $('.nav-item, .menu-link ').removeClass('active active-main-item');
            $('.sub-nav, .sub-sub-nav').removeClass('open-onclick');
            $('.sub-nav >.sub-menu, .sub-sub-nav >.sub-sub-menu').removeAttr('style');
        }

        function resetClassesOnClickNonActiveItem(menuItem) {
            var menuItems = $('.menu-item-depth-' + menuNow);
            menuItems.removeClass('active');
            menuItems.find('.sub-nav > ul.sub-menu, .sub-sub-nav > ul.sub-sub-menu, .submenu, .sub-nav-item').removeClass('active showed-onclick');
            menuItems.find('.sub-nav, .sub-sub-nav').removeClass('open-onclick ');
            menuItems.find('.sub-nav >.sub-menu, .sub-sub-nav >.sub-sub-menu').removeAttr('style');
        }

        function resetClassesOnClickActiveItem(menuItem) {
            if (menuItem.hasClass('active-main-item')) {
                resetAllClasses();
            }
            menuItem.find('.sub-menu, .sub-sub-menu').removeAttr('style');
        }
    }

    /* # Footer */

    function handleFooter() {
        // Sticky
        var stickyFooter = $('.site-footer.sticky');
        if (stickyFooter.length && !Clb.isMobile) {
            $('.site-content').css({
                'margin-bottom': stickyFooter.outerHeight() + 'px',
                'position': 'relative',
                'z-index': '3'
            });
            stickyFooter.addClass('visible');
        }
    };

    function handleFooterSize() {
        var stickyFooter = $('.site-footer.sticky');
        if (stickyFooter.length) {
            if (!Clb.isMobile) {
                stickyFooter.css({
                    'width': stickyFooter.parent().outerWidth() + 'px',
                    'left': stickyFooter.parent().offset().left + 'px',
                });
                $('.site-content').css({
                    'margin-bottom': stickyFooter.outerHeight() + 'px',
                    'position': 'relative',
                    'z-index': '3'
                });
            } else {
                $('.site-content').css({
                    'margin-bottom': '',
                    'position': '',
                    'z-index': ''
                });
                stickyFooter.css({
                    'width': '',
                    'left': '',
                });
            }
        }
    }

    /* # Shortcodes */

    /* ## Accordion box */

    function handleAccordionBox() {
        $('[data-stockie-accordion]').each(function () {
            var accordion = $(this);
            var titles = $(this).find('.accordionItem_title');
            var items = $(this).find('.accordionItem');
            var contents = $(this).find('.accordionItem_content');
            var iconOpened = 'ion-md-remove', iconClosed = 'ion-md-add';
            var isOutline = $(this).hasClass('outline');

            var toggle = function (num) {
                var opened = accordion.find('.open');
                var content = contents.eq(num);

                // If not active
                if (!items.eq(num).hasClass('active')) {
                    // Activate this item
                    items.removeClass('active');
                    items.eq(num).addClass('active');

                    setTimeout(function () {
                        content.css('height', '').addClass('no-transition open'); 			// Open new content
                        var height = content.outerHeight() + 'px'; 							   // Save heights
                        content.removeClass('no-transition open').css('height', (isOutline) ? '0px' : '6px'); // Close new content

                        setTimeout(function () {
                            opened.removeClass('open no-transition').css('height', (isOutline) ? '0px' : '6px'); // Close old content
                            content.addClass('open').css('height', height);				// Open new content

                            // Change titles
                            titles.find('.accordionItem_control i').removeClass(iconOpened).addClass(iconClosed);
                            titles.eq(num).find('.accordionItem_control i').removeClass(iconClosed).addClass(iconOpened);
                        }, 30);
                    }, 30);
                }
            };

            titles.each(function (i) {
                $(this).on('click', function () {
                    toggle(i);
                });
            });

            toggle($(this).attr('data-stockie-accordion') || 0);

            this.accordionToggle = toggle;
        });
    };

    function handleAccordionBoxSize() {
        $('[data-stockie-accordion]').each(function () {
            var content = $(this).find('.accordionItem_content.open');
            var wrap = content.find('.wrap');

            content.css('height', wrap.outerHeight() + 'px');

        });
    };

    /* ## Banner box */

    function handleBannerBox() {
        $('.banner-box.overlay-title.hover').each(function () {
            $(this).on("hover", function () {
                    var self = $(this);
                    var content = $(this).find('.title-wrap');
                    var description = $(this).find('.description-wrap');

                    description.css('margin-top', -content.outerHeight() + 'px');
                },
                function () {
                    var self = $(this), newHeight = 0, oldHeight = 0;
                    self.find('.description-wrap').css('margin-top', '');
                });
        });
    }

    function handleBannerBoxSize() {
        $('.banner-box.overlay-title.hover').each(function () {
            var newHeight = 0,
                titles = $(this).find('.title-wrap');

            $(this).css('height', '');
            $(this).css('height', ($(this).outerHeight() - titles.outerHeight()) + 'px');
        });
    }

    /* ## Counter box */

    function handleCounterBox() {
        $('[data-counter]').each(function () {
            var counter = $(this);
            var scrollTop = $(document).scrollTop() + $(window).height();

            if (scrollTop > counter.offset().top + counter.height()) {
                var countEnd = parseInt(counter.attr('data-counter').replace(/\s/g, ''));
                counter.removeAttr('data-counter');

                for (var j = 0; j <= 20; j++) {
                    (function (count) {

                        setTimeout(function () {
                            var number = Math.round((countEnd / 20) * count);

                            counter.find('.count').html(number);
                        }, 50 * count);

                    })(j);
                }
            }
        });
    };

    /* ## Contact form */

    function handleSubscribeContactForm() {
        // Button
        $('.contact-form').each(function () {
            var submit = $(this).find('[type="submit"]');
            var button = $(this).find('[data-contact-btn] button');

            if (submit.length) {
                button.find('.text').html(submit.val());
                submit.replaceWith(button);
                $(this).find('.ajax-loader').remove();
            }

            // For focus
            if ($(this).hasClass('without-label-offset')) {
                $(this).find('.wpcf7-form-control-wrap').after('<div class="focus"></div>');

                $(this).find('input, textarea, select').on('focus', function () {
                    $(this).parent().parent().find('.focus').addClass('active');
                }).on('blur', function () {
                    $(this).parent().parent().find('.focus').removeClass('active');
                });
            }
        });

        // Loader
        $('.contact-form form').on('submit', function () {
            var btn = $(this).find('.btn');

            if (btn.hasClass('btn-link')) {
                btn.addClass("btn-loading");
                btn.find('.text').css('display', 'none');
            } else {
                btn.addClass("btn-loading");
            }


        });
        $(document).on('wpcf7invalid wpcf7spam  wpcf7mailsent wpcf7mailfailed', function (e) {
            var form = $('.contact-form');
            $(form).find('.btn').removeClass("btn-loading");

            if ($(form).find('.btn').hasClass('btn-link')) {
                $(form).find('.btn .text').css('display', 'block');
            }
        });
    }

    /* ## Countdown box */

    function handleCountdownBox() {
        $("[data-countdown-box]").each(function () {
            var countdownBox = $(this);
            var labels = countdownBox.attr('data-countdown-labels').split(','),
                parser = /([0-9]{2})/gi;

            // Return the time components that diffs
            var diff = function (obj1, obj2) {
                var diff = [];
                labels.forEach(function (key) {
                    if (obj1[key] !== obj2[key]) {
                        diff.push(key);
                    }
                });
                return diff;
            }
            // Parse countdown string to an object
            var strfobj = function (str) {
                var parsed = str.match(parser),
                    obj = {};
                labels.forEach(function (label, i) {
                    obj[label] = parsed[i]
                });
                return obj;
            }

            var template = _.template($("#" + countdownBox.attr("data-countdown-box")).html()),
                currentDate = '00:00:00:00:00',
                nextDate = '00:00:00:00:00';
            // Build the layout
            var initData = strfobj(currentDate);
            labels.forEach(function (label, i) {
                countdownBox.append(template({
                    current: initData[label],
                    next: initData[label],
                    label: label
                }));
            });
            // Starts the countdown
            countdownBox.countdown(new Date($(this).attr("data-countdown-time")), function (event) {
                window.c = event;
                var newDate = event.strftime('%m:%n:%H:%M:%S'), data;
                if (newDate !== nextDate) {
                    currentDate = nextDate;
                    nextDate = newDate;
                    // Setup the data
                    data = {
                        'current': strfobj(currentDate),
                        'next': strfobj(nextDate)
                    };
                    // Apply the new values to each node that changed
                    diff(data.current, data.next).forEach(function (label) {
                        var selector = '.%s'.replace(/%s/, label),
                            node = countdownBox.find(selector);
                        // Update the node
                        node.removeClass('flip');
                        node.find('.box-current .number').text(data.current[label]);
                        node.find('.box-next .number').text(data.next[label]);
                        // Wait for a repaint to then flip
                        _.delay(function (node) {
                            node.addClass('flip');
                        }, 50, node);
                    });
                }
            });
        });
    }

    /* ## Cover box */

    function handleCoverBox() {
        $('[data-stockie-cover-box]').each(function () {
            var box = $(this),
                items = $(this).find('[data-item]'),
                triggers = $(this).find('[data-trigger]');

            var selected = -1;

            var openItem = function (num) {
                var item = items.eq(num);

                if (selected != num && !Clb.isMobile) {
                    selected = num;

                    item.addClass('no-transition');
                    item.css('width', '');

                    var width = item.outerWidth();
                    item.css('width', '0');

                    setTimeout(function () {
                        item.removeClass('no-transition');
                        items.css('width', '0');
                        item.css('width', (width - 2) + 'px');
                    }, 30);
                }
            };

            triggers.on('mouseenter', function () {
                openItem(triggers.index($(this)));
            });

            openItem(0);
        });
    }

    function handleCoverBoxSize() {
        $('[data-stockie-cover-box]').each(function () {
            var box = $(this);

            box.find('[data-item]').each(function (i) {
                if (!Clb.isMobile) {
                    $(this).css('height', box.find('[data-trigger]').eq(i).outerHeight() + 'px');
                    $(this).find(' > * ').css('width', box.find('[data-trigger]').eq(i).outerWidth() + 'px');
                } else {
                    $(this).css({
                        'height': '',
                        'width': ''
                    });
                }
            });
        });
    }

    /* ## Gallery */

    function handleGallery() {
        $('[data-gallery]').each(function () {
            var gallery = $(this);

            // Move galleries popup to footer
            var oldPopup = $('#' + $(this).attr('data-gallery'));
            var popup = oldPopup.clone();
            $('body').append(popup);
            oldPopup.remove();

            var popup = popup[0];

            popup.options = JSON.parse($(popup).attr('data-options'));
            popup.expanded = false;
            popup.opened = false;
            popup.currentItem = 0;

            var expand = function () {
                if (popup.expanded) {
                    document.webkitCancelFullScreen();
                    $(this).find('i').removeClass('ion ion-md-contract').addClass('ion ion-md-expand');
                    popup.expanded = false;
                } else {
                    popup.expanded = true;
                    popup.webkitRequestFullscreen();
                    $(this).find('i').removeClass('ion ion-md-expand').addClass('ion ion-md-contract');
                }
            };

            var close = function () {
                if (popup.opened) {
                    popup.opened = false;
                    $(popup).removeClass('open');

                    var oldImage = $(popup).find('.gimg').eq(popup.currentItem);
                    var img = oldImage.clone().addClass('gallery-tmpimage active').css({
                        'margin-left': '-' + oldImage.width() / 2 + 'px',
                        'height': oldImage.height() + 'px',
                        'top': (oldImage.offset().top - $(popup).offset().top) + 'px'
                    });

                    $(document.body).append(img);

                    setTimeout(function () {
                        var newImage = gallery.find('.gimg').eq(popup.currentItem);
                        img.css({
                            'left': newImage.offset().left + 'px',
                            'margin-left': '',
                            'height': newImage.height() + 'px',
                            'top': newImage.offset().top - $(window).scrollTop() + 'px',
                        });
                    }, 50);

                    setTimeout(function () {
                        $(popup).find('.slider').remove();
                        img.remove();
                    }, 400);

                    if (popup.expanded) {
                        expand.call($(popup).find('.expand'));
                    }
                }
            };

            $(popup).find('.expand').on('click', expand);
            $(popup).find('.close').on('click', close);

            $(window).on('keydown', function (e) {
                var key = e.which || e.keyCode || e.keyChar;
                if (key == 27) {
                    close();
                }
                if (key == 37) {
                    $(popup).find('.slider').trigger('prev.owl.carousel');
                }
                if (key == 39) {
                    $(popup).find('.slider').trigger('next.owl.carousel');
                }
            });
        });

        // Open popup
        $('body').on('click', '[data-gallery-item]', function () {
            var gallery = $(this).closest('[data-gallery]'),
                popup = $('#' + gallery.attr('data-gallery')),
                images = gallery.find('.owl-stage').length ? gallery.find('.owl-item:not(.cloned)  .gallery-image') : gallery.find('.gallery-image'),
                options = popup[0].options;
            if (gallery.parent('.woo_c-product-image').length) {
                var _this = $(this).parents('.image-wrap');
                _this.find('.gimg').removeAttr('style');
            } else {
                var _this = $(this);
            }

            var image = _this.find('.gimg').eq(0);

            // Create slider
            var slider = $(document.createElement('div')).addClass('slider');
            popup[0].currentItem = 0;
            popup.append(slider);

            // Clone image for move
            var cloneImg = image.clone().css({
                'height': image.outerHeight() + 'px',
                'top': image.offset().top - $(window).scrollTop(),
                'left': image.offset().left,
            }).addClass('gallery-tmpimage');
            $(document.body).append(cloneImg);

            popup[0].opened = true;
            popup.addClass('open');

            // Generated slider
            images.each(function () {

                var div = $(document.createElement('div'));

                if (gallery.parent('.woo_c-product-image').length) {
                    div.addClass('image-wrap').append($(this).siblings('.gimg').eq(0).clone());
                } else {
                    div.addClass('image-wrap').append($(this).find('.gimg').eq(0).clone());
                }

                if ($(this).find('.gallery-description').length) {
                    var description = $(this).find('.gallery-description').clone();
                    div.append(description).addClass('with-description');

                    if ($(window).width() > 787) {
                        setTimeout(function () {
                            div.find('.image-wrap').css('height', 'calc(100% - ' + (description.outerHeight() - 5) + 'px)')
                        }, 10);
                    }
                }

                slider.append(div);
            });

            slider.owlCarousel({
                items: 1,
                autoHeight: false,
                slideBy: 1,
                nav: true,
                navText: ['<i class="ion ion-ios-arrow-back"></i>', '<i class="ion ion-ios-arrow-forward"></i>'],
                navContainerClass: 'owl-nav slider-nav',
                navClass: ['owl-prev btn-round' + options.navClass, 'owl-next btn-round' + options.navClass],
                dots: false,
                loop: false,
                autoplay: false,
                navSpeed: 600,

            }).on('changed.owl.carousel', function (event) {
                popup[0].currentItem = event.item.index;
                slider.find('.thumbs img').removeClass('active');
                slider.find('.thumbs img').eq(popup[0].currentItem).addClass('active');
            });

            slider.trigger('to.owl.carousel', [parseInt($(this).attr('data-gallery-item')), 50, true]);


            // Generate thumbnails

            slider.find('.owl-nav').after('<div class="thumbs"></div>');
            var thumbnails = slider.find('.thumbs');
            
            images.each(function (index) {

                if (gallery.parent('.woo_c-product-image').length) {
                    thumbnails.append($(this).siblings('.gimg').eq(0).clone().on('click', function () {
                        $(this).parent().find('img').removeClass('active');
                        $(this).addClass('active');
                        slider.trigger('to.owl.carousel', [index, 300, true]);
                    }));
                } else {
                    thumbnails.append($(this).find('.gimg').eq(0).clone().on('click', function () {
                        $(this).parent().find('img').removeClass('active');
                        $(this).addClass('active');
                        slider.trigger('to.owl.carousel', [index, 300, true]);
                    }));
                }
            });

            slider.find('.thumbs img').eq(parseInt($(this).attr('data-gallery-item'))).addClass('active');



            // Move tmp image
            setTimeout(function () {

                if (gallery.parent('.woo_c-product-image').length) {
                    var sliderImg = slider.find('.gimg').eq(parseInt(_this.find('.gallery-image').attr('data-gallery-item')));
                } else {
                    var sliderImg = slider.find('.gimg').eq(parseInt(_this.attr('data-gallery-item')));
                }

                cloneImg.css({
                    'height': sliderImg.outerHeight() + 'px',
                    'top': (sliderImg.offset().top - popup.offset().top) + 'px',
                    'left': '',
                    'margin-left': '-' + (sliderImg.outerWidth() / 2) + 'px'
                }).addClass('active');

                // Open slider, remove tmp image
                setTimeout(function () {
                    slider.css('visibility', 'visible');
                    slider.find('.thumbs img').each(function (i) {
                        var img = $(this);
                        setTimeout(function () {
                            img.addClass('showed');
                        }, 50 * i);
                    });
                    setTimeout(function () {
                        cloneImg.remove();
                    }, 250);
                }, 300);
            }, 50);

            //Gallery description
            $(function () {
                var galleryPopup = $('.gallery-lightbox.open');

                galleryPopup.each(function () {
                    var galleryImages = $(this).find('.image-wrap img.gimg');

                    galleryImages.each(function () {
                        var imageWidth = $(this).width();
                        var galleryDesc = $(this).next('.gallery-description');

                        galleryDesc.css('width', imageWidth + 'px');

                    });
                });
            });
        });
    }

    /* ## Onepage */

    function handleOnepage() {
        $.fn.stockieOnepage = function (options) {
            var onepage = $(this),
                stage = onepage.find(' > .onepage-stage'),
                items = $(this).find('.onepage-section'),
                isHorizontal = onepage.hasClass('horizontal'),
                anchors = null, // Dots
                itemNow = 0,
                scrollEnabled = true, // For pause during animation
                speed = options.speed || 500,
                disableOnMobile = onepage.hasClass('disable-on-mobile');

            stage.css('transition', 'transform ' + (speed / 1000) + 's ease-in-out');
            items.eq(0).addClass('active');

            var divNav = $('#mega-menu-wrap > ul > li > a, #masthead .menu-other > li > a');

            // Transitions to section
            var moveTo = function (i) {
                if (Clb.isMobile && disableOnMobile) {
                    return false;
                }

                itemNow = i;


                if (i < 0) {
                    itemNow = 0;
                }
                if (i > items.length - 1) {
                    itemNow = items.length - 1;
                }

                if (anchors) {
                    anchors.removeClass('active');
                    anchors.eq(itemNow).addClass('active');
                }

                var hideNavButton = function (btn) {
                    btn.css({
                        'opacity': '0',
                        'visibility': 'hidden'
                    });
                }

                var showNavButton = function (btn) {
                    btn.css({
                        'opacity': '1',
                        'visibility': 'visible',
                        'height': 'auto'
                    });
                }

                onepage.find('.onepage-dots li').css({
                    'border-color': ''
                });

                var moveUpBtn = onepage.find('.onepage-nav .move-up');
                var moveDownBtn = onepage.find('.onepage-nav .move-down');

                if (itemNow == 0) {
                    hideNavButton(moveUpBtn);
                } else {
                    showNavButton(moveUpBtn);
                }

                if (itemNow == items.length - 1) {
                    hideNavButton(moveDownBtn);
                    var navButtonsPos = Clb.isMobile ? 60 : 70;

                    onepage.find('.onepage-nav .move-up').css('margin-top', navButtonsPos  + 'px');

                    
                } else {
                    showNavButton(moveDownBtn);
                    onepage.find('.onepage-nav .move-up').css('margin-top', '0px');
                }


                var isPrev = items.eq(itemNow).hasClass('prev');

                items.removeClass('active active-prev prev');
                items.eq(itemNow).addClass('active');
                items.eq(itemNow - 1).addClass('prev');

                if (isPrev) {
                    items.eq(itemNow).addClass('active-prev');
                }

                scrollEnabled = false;

                if (options.vertical) {
                    stage.css('transform', 'translate3d(-' + (onepage.outerWidth() * itemNow) + 'px, 0, 0)');
                } else {
                    stage.css('transform', 'translate3d(0, -' + (onepage.outerHeight() * itemNow) + 'px, 0)');
                }

                var paginationColor = items.eq(itemNow).attr('data-pagination-color');
                var menuColor = items.eq(itemNow).attr('data-header-nav-color');
                var logoType = items.eq(itemNow).attr('data-header-logo-type');

                var top = onepage.offset().top - ($(window).height() - onepage.outerHeight()) / 2;
                var scrollTop = $(document).scrollTop();
                var correctPosition = (top + 10 > scrollTop && top - 10 < scrollTop);

                onepage.find('.onepage-dots li').css({
                    'color': (paginationColor) ? paginationColor : '',
                });

                onepage.find('.onepage-dots li.active').css({
                    'border-color': (paginationColor) ? paginationColor : ''
                });

                if (correctPosition) {
                    divNav.css('color', menuColor ? menuColor : '');

                    Clb.logoForOnepageLight.addClass('hidden');
                    Clb.logoForOnepageDark.addClass('hidden');

                    if (logoType) {
                        $([Clb.logo[0], Clb.fixedLogo[0]]).css({
                            'position': 'absolute',
                            'width': '0px',
                            'height': '0px',
                            'overflow': 'hidden'
                        });

                        if (logoType == 'dark') {
                            Clb.logoForOnepageDark.removeClass('hidden');
                        }
                        if (logoType == 'light') {
                            Clb.logoForOnepageLight.removeClass('hidden');
                        }
                    } else {
                        $([Clb.logo[0], Clb.fixedLogo[0]]).css({
                            'position': '',
                            'width': '',
                            'height': '',
                            'overflow': ''
                        });
                    }
                }

                setTimeout(function () {
                    scrollEnabled = true;
                }, 1000);
            };
            var moveUp = function () {
                moveTo(itemNow - 1);
            }
            var moveDown = function () {
                moveTo(itemNow + 1);
            }

            // Transition by y
            var move = function (y, e) {
                if (!(Clb.isMobile && disableOnMobile)) {
                    var top = onepage.offset().top - ($(window).height() - onepage.outerHeight()) / 2;
                    var scrollTop = $(document).scrollTop();
                    var correctPosition = (top + 100 > scrollTop && top - 100 < scrollTop);

                    if ((y > 0 && itemNow < items.length - 1) || (y < 0 && itemNow > 0)) {
                        if (!correctPosition) {
                            setTimeout(function () {
                                $('html, body').animate({
                                    scrollTop: top
                                }, 400);
                            }, 100);

                            var menuColor = items.eq(itemNow).attr('data-header-nav-color');
                            divNav.css('color', menuColor ? menuColor : '');
                        }
                    }

                    if (y > 0 && itemNow < items.length - 1) {
                        if (scrollEnabled && correctPosition) moveDown();
                        e.preventDefault();
                    }
                    else if (y < 0 && itemNow > 0) {
                        if (scrollEnabled && correctPosition) moveUp();
                        e.preventDefault();
                    }
                    else if (!scrollEnabled || (y < 1 && y > -1)) {
                        e.preventDefault();
                    }
                    else {
                        $('html, body').stop(true, true).finish();
                        divNav.css('color', '');
                        $([Clb.logo[0], Clb.fixedLogo[0]]).css({
                            'position': '',
                            'width': '',
                            'height': '',
                            'overflow': ''
                        });
                        Clb.logoForOnepageLight.addClass('hidden');
                        Clb.logoForOnepageDark.addClass('hidden');
                    }
                    if (AOS) {
                        setTimeout(AOS.refresh, 400);
                    }
                }
            };

            // Mouse events
            if (options.mousewheel) {
                onepage.on('wheel mousewheel', function (e) {
                    var y = e.originalEvent.deltaY;
                    move(y, e);
                });
            }
            // Keyboard events
            onepage.on('keydown', function (e) {
                var key = e.which || e.keyCode;
                if (key == 38) {
                    move(-1, e);
                }
                else if (key == 40) {
                    move(1, e);
                }
            });
            // Tach events
            var oldTachY = 0;
            onepage.on('touchstart', function (e) {
                var y = e.originalEvent.touches[0].clientY,
                    x = e.originalEvent.touches[0].clientX;

                if (isHorizontal) {
                    oldTachY = x;
                } else {
                    oldTachY = y;
                }
            });
            onepage.on('touchmove', function (e) {
                var y = e.originalEvent.touches[0].clientY,
                    x = e.originalEvent.touches[0].clientX;

                var moveS;
                if (isHorizontal) {
                    moveS = oldTachY - x;
                    oldTachY = x;
                } else {
                    moveS = oldTachY - y;
                    oldTachY = y;
                }
                move(moveS, e);
            });

            onepage[0].resize = function () {
                if (Clb.isMobile && disableOnMobile) {
                    items.find('.onepage-section-inner, .onepage-section-inner > .vc_row').css({
                        'height': '100%'
                    });

                } else {
                    items.each(function () {
                        if (options.vertical) {
                            $(this).css('width', onepage.outerWidth() + 'px');
                        }

                        $(this).css('height', onepage.outerHeight() + 'px');
                    });
                }
                moveTo(itemNow);
            };

            /*# Create navigations #*/

            // Append dots
            if (options.dots) {
                var ul = $(document.createElement('ul')).addClass('onepage-dots');

                if (options.dotsClass) {
                    ul.addClass(options.dotsClass);
                }

                items.each(function (i) {
                    var li = $(document.createElement('li'));

                    if (options.dotClass) {
                        li.addClass(options.dotClass);
                    }

                    li.addClass('slider-dot');

                    li.on('click', function () {
                        moveTo(i);
                    });
                    ul.append(li);

                    $(this).css('height', onepage.outerHeight() + 'px');
                });

                onepage.append(ul);
                anchors = ul.find('li');
                anchors.eq(0).addClass('active');
            }

            // Append nav button
            if (options.nav) {
                var nav = $(document.createElement('div')).addClass('onepage-nav');

                if (options.navContainerClass) {
                    nav.addClass(options.navContainerClass);
                }

                var up = $(document.createElement('div')).addClass('move-up btn-round');
                var down = $(document.createElement('div')).addClass('move-down btn-round');
                var icon = $(document.createElement('i'));

                if (options.navClass) {
                    up.addClass(options.navClass[0]);
                    down.addClass(options.navClass[1]);
                }

                up.append(icon.clone().addClass((options.navIcons) ? options.navIcons[0] : 'ion ion-ios-arrow-up'));
                down.append(icon.clone().addClass((options.navIcons) ? options.navIcons[1] : 'ion ion-ios-arrow-down'));

                up.on('click', function () {
                    moveUp();
                });
                down.on('click', function () {
                    moveDown();
                });

                nav.append(up, down);
                onepage.append(nav);
            }
        };

        $('[data-stockie-onepage]').each(function () {
            var data = $(this).attr('data-options');
            var options = (data) ? JSON.parse(data) : {};
            $(this).stockieOnepage(options);
        });
    }

    function handleOnepageSize() {
        $('[data-stockie-onepage]').each(function () {
            this.resize();
        });
    }

    /* ## Parallax */

    function initParallax() {
        $('[data-parallax-bg]').each(function () {
            $(this).parent('.wpb_wrapper').addClass('full-height');
            var bg = $(this).find('.parallax-bg');
            var speed = $(this).attr('data-parallax-speed');

            if ($(this).attr('data-parallax-bg') == 'vertical') {
                $(this).find('.parallax-bg').css({
                    height: ($(this).outerHeight() + speed * 200) + 'px'
                });
            } else {
                $(this).find('.parallax-bg').css({
                    width: ($(this).outerWidth() + speed * 200) + 'px'
                });
            }
            bg.addClass(($(this).attr('data-parallax-bg') == 'vertical') ? '' : 'horizontal');
        });
    };

    function handleParallax() {
        var contentScroll = $(document).scrollTop();
        var wndHeight = $(window).height();

        $('[data-parallax-bg]').each(function () {
            var parallaxTop = $(this).offset().top;
            var parallaxHeight = $(this).outerHeight();
            var parallaxWidth = $(this).outerWidth();

            // If parallax block on screen
            if (parallaxTop <= contentScroll + wndHeight && parallaxTop + parallaxHeight >= contentScroll) {

                var speed = parseFloat($(this).attr('data-parallax-speed')) * 100;
                var bg = $(this).find('.parallax-bg');

                var percent = (-parallaxTop + contentScroll + wndHeight) / (parallaxHeight + wndHeight);
                var offset = -(percent * 2) * speed;

                if ($(this).attr('data-parallax-bg') == 'vertical') {
                    bg.css('transform', 'translate3d(0, ' + offset + 'px, 0)');
                } else {
                    bg.css('transform', 'translate3d(' + offset + 'px, 0, 0)');
                }
            }
        });
    };

    /* ## Progress bar */

    function handleProgressBar() {
        $("[data-stockie-progress-bar]:not([data-processed])").each(function () {
            var percent,
                bar = $(this),
                line = bar.find('.line'),
                progressEnd = parseInt(bar.attr("data-stockie-progress-bar")),
                withTooltip = bar.find('[data-tooltip]').length;

            var scrollTop = $(document).scrollTop() + $(window).height();

            if (line.length == 0 && bar.hasClass('split')) {
                var div = $(document.createElement('div')).addClass('line-split');

                div.append($(document.createElement('div')).addClass('line brand-bg-color'));

                for (var i = 0; i < 8; i++) {
                    var div = div.clone();

                    bar.find('.line-wrap').append(div);

                    div.find('.line').css({
                        'left': -(div.offset().left - bar.offset().left) + 'px'
                    });
                }

                if (withTooltip) {
                    bar.find('.line-wrap').append('<div class="line"><h4 class="line-percent"><span class="percent">0</span>%</h4></div>');
                }

                line = bar.find('.line');
            }

            percent = bar.find('.percent');

            if (scrollTop > bar.offset().top + bar.height()) {
                bar.attr("data-processed", "true");
                if (bar.hasClass('inner')) {
                    line.css("width", (bar.outerWidth() * (progressEnd / 100) - 8) + "px");
                } else {
                    line.css("width", (bar.outerWidth() * (progressEnd / 100)) + "px");
                }

                for (var j = 0; j <= 40; j++) {
                    (function (count) {
                        setTimeout(function () {
                            percent.html(Math.round((progressEnd / 40) * count));
                        }, 30 * count);
                    })(j);
                }
            }
        });
    }

    function handleProgressBarSize() {
        $("[data-stockie-progress-bar][data-processed]").each(function () {
            var bar = $(this);
            var line = bar.find('.line');
            var progressEnd = parseInt(bar.attr("data-stockie-progress-bar"));

            if (bar.hasClass('inner')) {
                line.css("width", (bar.outerWidth() * (progressEnd / 100) - 8) + "px");
            } else {
                line.css("width", (bar.outerWidth() * (progressEnd / 100)) + "px");
            }

            bar.find('.line-split').each(function () {
                $(this).find('.line').css({
                    'left': -($(this).offset().left - bar.offset().left) + 'px'
                });
            });
        });
    }

    /* ## Price table */

    function handlePriceTable() {
        if (!Clb.isMobile) {
            $('.pricing-table.features').each(function () {
                var row = $(this).parents('.vc_row').eq(0);
                var table = row.find('.pricing-table').eq(1);

                // Calculate position
                $(this).css({
                    'padding-top': (table.find('.list-box').eq(0).offset().top - table.offset().top - $(this).find('h3').outerHeight() - 15) + 'px',
                    'min-height': table.outerHeight() + 'px'
                });


                // Calculate sizes
                $(this).find('li').each(function (i) {
                    var max = 0;
                    row.find('.pricing-table').each(function () {
                        var h = $(this).find('li').eq(i).outerHeight();
                        if (h > max) {
                            max = h;
                        }
                    });
                    row.find('.pricing-table').each(function () {
                        $(this).find('li').eq(i).css({
                            'height': max + 'px',
                        });
                    });
                });
            });
        } else {
            $('.pricing-table.features').each(function () {
                $(this).css({
                    'padding-top': '',
                    'min-height': ''
                });
            });
        }
    };

    /* ## Split Box */

    function handleSplitboxParallax() {
        var process = function (side, num) {
            if ($(this).attr('data-parallax-' + side)) {
                $(this).find('.split-box-container').eq(num).attr({
                    'data-parallax-bg': $(this).attr('data-parallax-' + side),
                    'data-parallax-speed': $(this).attr('data-parallax-speed-' + side)
                });
            } else {
                $(this).find('.split-box-container').eq(num).find('.parallax-bg').css({
                    'height': '100%',
                    'width': '100%'
                });
            }
        };

        $('.split-box').each(function () {
            process.call(this, 'left', 0);
            process.call(this, 'right', 1);
        });
    }

    /* ## Sliders */

    function handleSliders(image) {

        if (image === undefined) {
            image = $('.slider .gimg, .woo_c-product-image-slider .gimg');
        }

        //create second pagintaion with images preview
        var imagesPreviewArr = [];

        image.each(function () {
            imagesPreviewArr.push($(this).attr("src"));
        });

        if ($('.owl-dots-images').length < 1) {
            var previewPagin = $('<div class="owl-dots-images"></div>')

            for (var imageItem in imagesPreviewArr) {
                previewPagin.append('<div class="owl-dot-image"><img src="' + imagesPreviewArr[imageItem] + '"></div>');
            }
        }

        var loaded = $('.owl-loaded');

        $(loaded).each(function (index) {
            if (loaded.eq(index).parents("li.product").length < 1) {
                loaded.eq(index).append(previewPagin);
            }
            ;
        });

        var owlDotImage = $('.owl-dot-image');

        owlDotImage.eq(0).addClass('active');

        $('.owl-dot').on('click', function () {
            var owlDotIndex = $(this).index();
            owlDotImage.removeClass('active');
            owlDotImage.eq(owlDotIndex).addClass('active')
        });

        owlDotImage.on('click', function () {
            var owlDotImageIndex = $(this).index();
            var owlItem = $(this).closest('.owl-dots-images').siblings('.owl-stage-outer').find('.owl-item');
            $('.owl-dot').removeClass('active');
            $('.owl-dot').eq(owlDotImageIndex).addClass('active');

            owlDotImage.removeClass('active');
            $(this).addClass('active');


            owlItem.removeClass('active');
            owlItem.eq(owlDotImageIndex).addClass('active')
            var owlItemW = owlItem.eq(owlDotImageIndex).width() * owlDotImageIndex;
            if (owlItem.eq(owlDotImageIndex) == 0) {
                owlItemW = 0;
            }

            owlItem.parent('.owl-stage').css({
                transform: 'translate3d(-' + owlItemW + 'px, 0px, 0px)',
                transition: '0.25s'
            });
        });

        $('[data-stockie-slider]').each(function () {
            var carousel = $(this);
            var options = $(this).attr('data-stockie-slider');
            options = (options) ? JSON.parse(options) : {};

            options.autoHeight = (options.autoHeight == undefined) ? true : options.autoHeight;
            options.dotsSpeed = (options.dotsSpeed == undefined) ? 600 : options.dotsSpeed;
            options.keyControl = (options.keyControl == undefined) ? false : options.keyControl;

            if (options.autoplay) {
                options.autoplaySpeed = (options.autoplaySpeed == undefined) ? 600 : options.autoplaySpeed;
                options.autoplayTimeout = (options.autoplaySpeed == undefined) ? 600 : options.autoplayTimeout * 1000;
            }

            options.responsive = {
                1025: {
                    items: options.itemsDesktop || 5,
                    nav: options.nav
                },
                769: {
                    items: options.itemsTablet || 3,
                    nav: options.nav
                },
                0: {
                    items: options.itemsMobile || 1,
                    nav: options.nav
                }
            };

            if (options.dots) {
                $(this).addClass('with-dots');
                options.dotClass = 'owl-dot ' + ((options.dotClass) ? options.dotClass : '');
                options.dotsClass = 'owl-dots ' + ((options.dotsClass) ? options.dotsClass : '');
            }

            options.navText = ['', ''];
            if (options.nav) {
                options.navSpeed = (options.navSpeed == undefined) ? 600 : options.navSpeed;
                options.navText = ['<i class="ion ion-ios-arrow-back"></i>', '<i class="ion ion-ios-arrow-forward"></i>'];
                options.navContainerClass = (options.navContainerClass) ? 'owl-nav ' + options.navContainerClass : 'owl-nav';

                if (options.navClass) {
                    options.navClass = ['owl-prev btn-round' + options.navClass[0], 'owl-next btn-round' + options.navClass[1]];
                } else {
                    options.navClass = ['owl-prev btn-round', 'owl-next btn-round'];
                }
            }

            // Nav buttons for slider offset
            var calculatePositionNavButtons = function () {
                if (carousel.hasClass('slider-offset')) {
                    var itemWidth = carousel.find('.owl-item').outerWidth();
                    var next = carousel.find('.owl-next'), prev = carousel.find('.owl-prev');

                    if (!Clb.isMobile) {
                        prev.css('margin-left', (-itemWidth / 2 - prev.outerWidth() / 2) + 'px');
                        next.css('margin-left', (itemWidth / 2 - next.outerWidth() / 2) + 'px');
                    } else {
                        prev.css('margin-left', '');
                        next.css('margin-left', '');
                    }
                }
            };

            carousel.on('initialized.owl.carousel refreshed.owl.carousel changed.owl.carousel resized.owl.carousel', function () {
                if ($(this).hasClass('slider-offset')) {
                    var self = $(this);
                    setTimeout(function () {
                        self.find('.owl-item.active').removeClass('offset-active').eq(2).addClass('offset-active');
                    }, 50);
                }
            });

            // Slider in slider
            options.onInitialized = function () {
                carousel.find('.owl-stage-outer').addClass('no-transition');
                carousel.find('.slider, .stockie-slider').trigger('refresh.owl.carousel');

                setTimeout(function () {
                    carousel.trigger('refresh.owl.carousel');

                    setTimeout(function () {
                        carousel.find('.owl-stage-outer').removeClass('no-transition');
                    }, 10);
                }, 10);
            };

            carousel.owlCarousel(options);

            if (options.mousewheel) {
                var test = true;
                carousel.on('wheel mousewheel', '.owl-stage', function (e) {
                    var y = e.originalEvent.deltaY;
                    if (test) {
                        carousel.trigger(((y > 0) ? 'next.owl' : 'prev.owl'), options.navSpeed || 350);
                        test = false;
                        setTimeout(function () {
                            test = true;
                        }, 350);
                    }
                    e.preventDefault();
                    e.cancleBubbling = true;
                    return false;
                });
            }

            if (options.keyControl) {
                $(window).on('keydown', function (e) {
                    var key = e.which || e.keyCode;

                    if (key == 37) {
                        carousel.trigger('prev.owl', options.navSpeed || 350);
                    }
                    if (key == 39) {
                        carousel.trigger('next.owl', options.navSpeed || 350);
                    }
                });
            }
        });

        $('[data-stockie-slider-simple]').each(function () {
            $(this).owlCarousel({
                items: 1,
                nav: true,
                navRewind: true,
                navClass: ['owl-prev btn-round', 'owl-next btn-round'],
                navText: ['<i class="ion ion-ios-arrow-back"></i>', '<i class="ion ion-ios-arrow-forward"></i>'],
                dots: true,
                loop: true,
                autoHeight: true,
            });
        });
    }

    /* ## Split Screen */

    function handleSplitScreens() {
        $('[data-stockie-splitscreen]').each(function () {

            if (!Clb.isMobile) {
                var splitscreen = $(this),
                    key = $(this).attr('data-stockie-splitscreen'),
                    options = JSON.parse($(this).attr('data-options'));

                var anchors = [],
                    itemsCount = 0,
                    menu = null;

                if (options.dots) {
                    menu = $(document.createElement('ul')).addClass('splitscreen-dots');

                    if (options.dotsClass) {
                        menu.addClass(options.dotsClass);
                    }

                    $(this).find('.ms-left .ms-section').each(function (i) {
                        var li = $(document.createElement('li')).attr('data-menuanchor', key + i);
                        var link = $(document.createElement('a')).attr('href', '#' + key + i);
                        li.append(link);
                        li.addClass('slider-dot');

                        if (options.dotClass) {
                            li.addClass(options.dotClass);
                        }

                        anchors.push(key + i);

                        if (i == 0) {
                            li.addClass('active');
                        }
                        menu.append(li);

                        itemsCount++;
                    });

                    splitscreen.append(menu);
                }

                var enableScroll = {
                    down: false,
                    up: false,
                    nextIndex: -1,
                    focuse: false,
                };

                $(this).multiscroll({
                    verticalCentered: true,
                    scrollingSpeed: 600,
                    sectionsColor: [],
                    navigation: true,
                    navigationPosition: 'right',
                    navigationColor: '#000',
                    navigationTooltips: [],
                    loopBottom: false,
                    loopTop: false,
                    css3: true,
                    paddingTop: 0,
                    paddingBottom: 0,
                    ClbmalScrollElements: null,
                    keyboardScrolling: true,
                    touchSensitivity: 5,

                    // Custom selectors
                    sectionSelector: '.ms-section',
                    leftSelector: '.ms-left',
                    rightSelector: '.ms-right',
                    anchors: anchors,
                    menu: menu,

                    //events
                    onLeave: function (index, nextIndex, direction) {
                        enableScroll.up = false;
                        enableScroll.down = false;
                        enableScroll.nextIndex = nextIndex;

                        if (nextIndex == 1) {
                            setTimeout(function () {
                                if (enableScroll.nextIndex == 1) {
                                    enableScroll.up = true;
                                }
                            }, 600);
                        } else if (nextIndex == itemsCount) {
                            setTimeout(function () {
                                if (enableScroll.nextIndex == itemsCount) {
                                    enableScroll.down = true;
                                }
                            }, 600);
                        }

                        var activeSection = splitscreen.find('.ms-section').eq(nextIndex - 1);
                        var activeIsPrev = activeSection.hasClass('prev');

                        splitscreen.find('.ms-section').removeClass('prev active-prev');
                        splitscreen.find('.ms-section').eq(nextIndex - 2).addClass('prev');

                        if (activeIsPrev) {
                            activeSection.addClass('active-prev');
                        }

                        if (nextIndex != 1) {
                            splitscreen.find('.move-up').css('opacity', '1');
                        } else {
                            splitscreen.find('.move-up').css('opacity', '0');
                        }

                        if (nextIndex == itemsCount) {
                            splitscreen.find('.move-down').css('opacity', '0');
                            splitscreen.find('.move-up').css('margin-top', '70px');
                        } else {
                            splitscreen.find('.move-down').css('opacity', '1');
                            splitscreen.find('.move-up').css('margin-top', '0px');
                        }

                    },
                    afterLoad: function (anchorLink, index) {
                    },
                    afterRender: function () {
                    },
                    afterResize: function () {
                    },
                });
                $(this).multiscroll.setMouseWheelScrolling(false);

                $(this).on('mouseenter mousemove', function () {
                    enableScroll.auto = true;
                    $(this).multiscroll.setMouseWheelScrolling(true);
                });

                $(this).on('mouseleave', function () {
                    enableScroll.auto = true;
                    $(this).multiscroll.setMouseWheelScrolling(false);
                });

                var animEnabled = false;

                $(this).on('wheel mousewheel', function (e) {
                    var y = e.originalEvent.deltaY;
                    var top = (splitscreen.offset().top + (splitscreen.outerHeight() - $(window).height()) / 2);
                    var scrollTop = $(document).scrollTop();

                    if ((y > 0 && !enableScroll.down) || (y < 0 && !enableScroll.up)) {
                        e.preventDefault();
                        if (enableScroll.auto && !animEnabled) {
                            animEnabled = true;

                            setTimeout(function () {
                                $('html, body').animate({
                                    scrollTop: top
                                }, 500, function () {
                                    animEnabled = false;
                                });
                            }, 100);
                        }

                        if ((top + 10 < scrollTop || top - 10 > scrollTop) && top > 10) {
                            $(this).multiscroll.setMouseWheelScrolling(false);
                        } else {
                            $(this).multiscroll.setMouseWheelScrolling(true);
                        }
                    } else {
                        $('html, body').stop(true, true).finish();
                    }
                    if (AOS) {
                        setTimeout(AOS.refresh, 400);
                    }
                });

                if (options.nav) {
                    var nav = $(document.createElement('div')).addClass('splitscreen-nav');

                    if (options.navContainerClass) {
                        nav.addClass(options.navContainerClass);
                    }

                    var up = $(document.createElement('div')).addClass('move-up btn-round');
                    var down = $(document.createElement('div')).addClass('move-down btn-round');
                    var icon = $(document.createElement('i'));

                    if (options.navClass) {
                        up.addClass(options.navClass[0]);
                        down.addClass(options.navClass[1]);
                    }

                    up.append(icon.clone().addClass((options.navIcons) ? options.navIcons[0] : 'ion ion-ios-arrow-up'));
                    down.append(icon.clone().addClass((options.navIcons) ? options.navIcons[1] : 'ion ion-ios-arrow-down'));

                    up.on('click', function () {
                        splitscreen.multiscroll.moveSectionUp();
                    });
                    down.on('click', function () {
                        splitscreen.multiscroll.moveSectionDown();
                    });

                    up.css('opacity', '0');

                    nav.append(up, down);
                    splitscreen.append(nav);
                }

                setTimeout(function () {
                    $('html, body').css({
                        'overflow': '',
                        'height': ''
                    });
                }, 50);
            }

            // SplitScreen on mobile
            else {
                var leftSections = $(this).find('.ms-left .ms-section');

                $(this).find('.ms-right .ms-section').each(function (i) {
                    $(this).insertAfter(leftSections.eq(i));
                });
            }
        });
    }

    /* ## Tabs  */


    function handleTabBox() {
    	if ($('[data-stockie-tab-box]').parents('.single-product').length) {
    		var tab = $($('[data-stockie-tab-box]').get().reverse());
    	} else {
    		var tab = $('[data-stockie-tab-box]');
    	}
        tab.each(function () {
            var box = $(this);
            var buttonsWrap = $(this).find('> .tabNav_wrapper > .tabNav');
            var buttons = buttonsWrap.find('> .tabNav_link');
            var line = buttonsWrap.find('> .tabNav_line');
            var items = $(this).find('> .tabItems > .tabItems_item');
            var options = (box.attr('data-options')) ? JSON.parse(box.attr('data-options')) : {};
            var nextBtn = $(this).find('.next-btn');
            var tabOffset = box.offset().top;

            // Initializtion
            if (buttons.length == 0) {

                items.each(function () {
                    var title = $(this).attr('data-title');
                    box.find('> .tabNav_wrapper > .tabNav').append($(document.createElement('li')).addClass('tabNav_link ' + options.tabClass).html(title));
                });
                buttons = $(this).find('> .tabNav_wrapper > .tabNav > .tabNav_link');
                buttons.eq(0).addClass('active ' + options.tabActiveClass);
            }
            items.eq(0).addClass('active');

            items.addClass(options.itemClass);


            // Process
            var refresh = function () {
                // Height
                var activeItem = box.find('> .tabItems > .tabItems_item.active');
                if (box.hasClass('vertical') && buttonsWrap.outerHeight() > activeItem.outerHeight()) {
                    box.find('> .tabItems').css('height', buttonsWrap.outerHeight() + 'px');
                } else {
                    box.find('> .tabItems').css('height', activeItem.outerHeight() + 'px');
                }

                // Line
                var active = box.find('> .tabNav_wrapper > .tabNav > .active');

                if (active.length) {
                    if (box.hasClass('vertical')) {                    
                        line.css({
                            'height': active.outerHeight() + 'px',
                            'transform': 'translateY(' + (active.offset().top - buttonsWrap.offset().top) + 'px)'
                        });
                    } else {
                        line.css({
                            'width': active.outerWidth() + 'px',
                            'transform': 'translateX(' + (active.offset().left - buttonsWrap.offset().left + buttonsWrap.scrollLeft()) + 'px)'
                        });
                    }
                }
            };

            buttons.on('click', function () {
                buttons.removeClass('active ' + options.tabActiveClass).addClass(options.tabClass);
                items.removeClass('active');

                $(this).addClass('active ' + options.tabActiveClass);
                items.eq($(this).index() - 1).addClass('active');

                refresh();
            });

            if ($('#masthead[data-header-fixed]').length) {
                tabOffset -= 70;
            }


            //Single product smooth scroll to review
            $(".write-review, .woo-review-link").on("click", function (event) {
                event.preventDefault();
                var id = $(this).data('tab-link');
                var tab = $('#product_review');
                tab.find('.tabNav_link').removeClass('active');
                tab.find('.tabItems_item').removeClass('active');

                var top = $(id).offset().top;
                $('body,html').animate({scrollTop: (top)}, 700);

                tab.find('.tabNav_link[data-stockie-tab="reviews"]').addClass('active');
                tab.find('.tabItems_item[data-stockie-tab-content="reviews"]').addClass('active');

                refresh();
            });

            //Checkout
            if ( box.parents('.woo-c_checkout_form').length ) {
                var nextTab = function (element) {
                    element.each(function (i) {
                        if (element.eq(i).hasClass('active')) {
                            element.eq(i).removeClass('active');
                            element.eq(i).next().addClass('active ' + options.tabActiveClass);
                            return false;
                        }
                    });
                }

                nextBtn.on('click', function () {
                    event.preventDefault();
                    if ( isValid() ) {
                        nextTab(buttons);
                        nextTab(items);
                        refresh();
                        $('body, html').animate({scrollTop: tabOffset}, 500);
                    }
                });

                var shippingCheckbox = $('#ship-to-different-address-checkbox, #createaccount');
                var shippingAddress = $(".shipping_address");

                if (shippingCheckbox.is(':checked')) {
                    shippingAddress.addClass('active');
                    refresh();
                }

                shippingCheckbox.on('change', function(){
                    if (shippingCheckbox.is(':checked')) {
                        shippingAddress.addClass('active');
                        setTimeout(function(){
                            refresh();
                        }, 400);
                    } else {
                        shippingAddress.removeClass('active');
                        setTimeout(function(){
                            refresh();
                        }, 300);
                    }
                });


                $('.create-account').on('click', function(e){
                    setTimeout(function(){
                        refresh();
                    }, 300);
                });


                function isValid() {
                    var activeTab = box.find('.tabItems_item.active')
                    var inputs = activeTab.find('.validate-required input');
                    var select = activeTab.find('.validate-required select');
                    var checkoutCheckboxes = activeTab.find('#ship-to-different-address-checkbox, #createaccount');

                    inputs.each(function() {
                        if ($(this).val() == '') {
                            $(this).addClass('error');
                        } else {
                            $(this).removeClass('error');
                        }
                    });

                    select.each(function(){
                        if ($(this).val() == '') {
                            $(this).siblings('.select-styled').addClass('error');
                        } else {
                            $(this).siblings('.select-styled').removeClass('error');
                        }
                    });
                    
                    if ( !checkoutCheckboxes.prop('checked')) {
                        checkoutCheckboxes.parents('.woocommerce-account-fields, .woocommerce-shipping-fields ').find('.validate-required input, .validate-required .select-styled').removeClass('error');
                    }


                    if ( inputs.hasClass('error') || select.siblings('.select-styled').hasClass('error') ) {
                        return false;
                    } else {
                        return true;
                    }
                } 
            }

            refresh();
            
        });
    };

    function handleTabBoxSize() {
        $('[data-stockie-tab-box]').each(function () {
            var box = $(this);
            var activeItem = box.find('tabItems_item.active');
            var buttonsWrap = box.find('.tabNav');

            if (box.hasClass('vertical') && buttonsWrap.outerHeight() > activeItem.outerHeight()) {
                box.find('.tabItems_item').css('height', buttonsWrap.outerHeight() + 'px');
            } else {
                box.find('.tabItems_item').css('height', activeItem.outerHeight() + 'px');
            }
        });
    };

    /* Temporary shortcode features */

    /* ## Video Background */

    function handleVideoBackground() {
        $('[data-arg-video-bg]').each(function () {
            var videoLink = $(this).attr('data-arg-video-bg');
            var iframe = $(document.createElement('iframe'));

            iframe.addClass('arg-video-bg').attr('src', videoLink);
            $(this).append(iframe);
        });
    }

    /* ## Theme Popup */
    function handlePopup() {
        var popup = $('.modal-window');
        // Activate popup
        popup.css('display', 'block');
        popup.find('.btn-loading-disabled').addClass('btn-loading');
        setTimeout(function () {
            popup.addClass('open');
        }, 30);
    }

    $(document).on('keydown', function (e) {
        var popup = $('.modal-window');

        if (e.keyCode == 27) {
            closePopup(popup);
        }
    });

    $('body').on('click keydown', '.modal-window .close, .modal-window .subscribe-nothanks-btn', function (e) {
        e.preventDefault(e);
        var popup = $(this).closest('.modal-window');
        closePopup(popup);
    });

    function closePopup(popup) {
        // Close button
        popup.removeClass('open');
        setTimeout(function () {
            popup.css('display', 'none');
            popup.find('.modal-content').empty();
            popup.find('.modal-content').removeClass().addClass('modal-content');
        }, 400);

    }

    function handleVideoPopup() {
        $(document).on('click', '.video-module', function (event) {
            event.preventDefault();
            handlePopup();
            var popupInner = $('.modal-content').addClass('video-popup');
            popupInner.siblings('.btn-loading-disabled').removeClass('btn-loading');
            // Append video
            popupInner.append($(document.createElement("iframe")).attr({
                'src': $(this).attr('data-video-module') + "?autoplay=1",
                'allowfullscreen': 'true',
                'frameborder': '0'
            }));
        });
    }

    /* ## Product Quickview */
    function handleQuickviewPopup(items) {
        var link;

        if (items === undefined ) {
            link = $('.quickview-link');
        } else {
            link = items.find('.quickview-link');
        }

        link.on("click", function (event) {
            event.preventDefault
            Clb.containerLoading.removeClass('closed');
            handlePopup();

            $.ajax({
                url: stockieVariables.url,
                data: {
                    action: 'stockie_product_modal',
                    product_id: $(this).attr('data-product-id'),
                },
                dataType: 'html',
                type: 'POST',
                success: function (data) {

                    var popupInner = $('.modal-content').addClass('product-popup');
                    popupInner.siblings('.btn-loading-disabled').removeClass('btn-loading');
                    popupInner.append(data);

                    setTimeout(function(){
                        if ($(popupInner).find('.product_images').find('img').length > 1) {
                            $(popupInner).find(".product_images").owlCarousel({
                                items: 1,
                                nav: true,
                                dots: false,
                                navSpeed: 600,
                                autoHeight: true,
                                navClass: ['owl-prev btn-round', 'owl-next btn-round'],
                                navText: ["<i class='ion ion-ios-arrow-back'></i>", "<i class='ion ion-ios-arrow-forward'></i>"],
                                onInitialized: popup_counter, //When the plugin has initialized.
                                onTranslated: popup_counter,
                                onChanged: popup_counter,
                            }).on('initialized.owl.carousel changed.owl.carousel resized.owl.carousel', function (event) {
                                owl_carousel_thumbnails(event);
                            });
                            popupInner.find('.owl-stage-outer').removeAttr('style');

                            var image = $(popupInner).find('.product_images').find('img');
                            //handleSliders(image);
                        }
                    }, 200);

                    var form_variation = popupInner.find('.variations_form');
                    if (form_variation) {
                        form_variation.each(function () {
                            $(this).wc_variation_form();
                        });
                        form_variation.trigger('check_variations');
                        form_variation.trigger('reset_image');
                    }

                    // Add link for title
                    var productTitle = $('.product-popup .woo_c-product-details-title');
                    var productLink = $('.product-popup-link');

                    productTitle.wrap('<div class="product-popup-title-link"><a href=' + productLink.attr('href') + ' target="_blank"></a></div>');

                    productLink.detach();

                    Clb.containerLoading.addClass('closed');
                    handleCustomSelect(popupInner.find('select'));
                    btnPreloader();
                    handleMutationObserver();
                }
            });
        });

        $( document ).on( "show_variation", function () {
            $('.woo_c-product-image-slider .owl-item').removeClass('active');
            $('.woo_c-product-image-slider .owl-item:first').addClass('active');
            $('.woo_c-product-image-slider .owl-stage').css('transform', 'translate3d(0px, 0px, 0px)');
        } );
    }

    function popup_counter(event) {
        var element = event.target;
        var items = event.item.count;
        var item = event.item.index + 1;
        $('.numbers_slides').html(item + " / " + items)
    }

    function owl_carousel_thumbnails(event) {
        var currentItem = event.item.index;
        $('.owl-dots-images .owl-dot-image').removeClass('active');
        $($('.owl-dots-images .owl-dot-image')[currentItem]).addClass('active');
    }

    $(document).on('click', '.color_attr span, .size_attr span', function (event) {
        $('.color_attr').removeClass('error');
        $(this).parents('.variation').find('> .custom_select select').removeClass('error required');
        $(this).siblings('*').removeClass('active');
        $(this).addClass('active');
        var select = $(this).closest('.variation').find('select');
        select.val($(this).attr('data-option'));
        select.trigger('change');
    });

    function handleCustomSelect(select) {
        /* ##Custom select */

        if ( select === undefined ) {
            select = $('select');
        }

        select.each(function () {
            if ( select.hasClass('wpml-ls')) {
                $(this).addClass('select select-dropdown');
                var selectedLang = $(this).find('> ul:not(.wpml-ls-sub-menu) .wpml-ls-item .wpml-ls-item-toggle');
                var selectSubMenu = $(this).find('.wpml-ls-sub-menu');
                selectedLang.addClass('select-styled')
                selectSubMenu.addClass('select-options');
            } else {
                var $this = $(this),
                    numberOfOptions = $(this).children('option').length;

                $this.addClass('select-hidden');
                $this.wrap('<div class="select"></div>');
                $this.after('<div class="select-styled"></div>');

                var $styledSelect = $this.next('div.select-styled');
                $styledSelect.text($this.children('option').eq(0).text());
                if ($this.children('option:selected').length > 0) {
                    $styledSelect.text($this.children('option:selected').text());
                }

                var $list = $('<ul />', {
                    'class': 'select-options'
                }).insertAfter($styledSelect);

                for (var i = 0; i < numberOfOptions; i++) {
                    
                    var li = $('<li />', {
                        text: $this.children('option').eq(i).text(),
                        rel: $this.children('option').eq(i).val(),
                    }).appendTo($list);

                    if ( $this.children('option').eq(i).data("select-href") ) {
                        li.attr('data-select-href', $this.children('option').eq(i).data("select-href"));
                    }
                }

                var $listItems = $list.children('li');

                var event = Clb.isPad ? 'touchend' : 'click';

                $styledSelect.on('click', function (e) {
                    e.stopPropagation();
                    $('.select').removeAttr('style');
                    $('div.select-styled.active').not(this).each(function () {
                        //$(this).removeClass('active').next('ul.select-options').hide();
                    });
                    $(this).toggleClass('active').next('ul.select-options').toggle();
                    $(this).parents('.select').css('z-index', '11');

                });

                var dragging = false;
                $list.on('touchmove', function(){
                    dragging = true;
                });

                $listItems.on(event, function (e) {
                    if (dragging) {
                        dragging = false;
                        return false;
                    }
                    e.stopPropagation();

                    $styledSelect.text($(this).text()).removeClass('active');
                    $this.val($(this).attr('rel'));
                    $this.trigger('change');
                    $list.hide();
                });

                if (!Clb.isPad) {
                    $(document).on(event, function (e) {
                        if (!$(e.target).hasClass('select-hidden')) {
                            $this.find(".select-options").hide();
                            $styledSelect.removeClass('active');
                        }
                    });
                }
            }
        });

        var languageSelect = $(".lang-dropdown .select-styled");
        var event = Clb.isPad ? 'touchend' : 'click';
        languageSelect.each(function () {
            var self = $(this);

            $(document).on(event, function (e) {
                
                if ( $(e.target).siblings(".select-options").css('display') == "none" && $(e.target).parents('.lang-dropdown').length ) {
                    if (!$(e.target).parents().hasClass('select-options select-styled')) {
                        self.addClass('active');
                        self.siblings(".select-options").show();
                    }
                } else {

                    //Mobile lang dropdown
                    if ( event == "touchend" ) {
                        if ($(e.target).parents('.select-options').length) {
                            window.location.href = $(e.target).attr('href');
                        }
                    }

                    self.siblings(".select-options").hide();
                    self.removeClass('active');

                    if (!$(e.target).parents().hasClass('select-options select-styled')) {
                        self.removeClass('active');
                        self.siblings(".select-options").hide();
                    }
                }
            });
        });
    }

    /* # Portfolio */

    function handlePortfolio() {
        // Filter
        $('[data-stockie-portfolio-grid]').each(function () {
            var isotopeGrid = $(this).find('[data-isotope-grid]');
            var filterbar = $(this).find('[data-filter="portfolio"]');

            if (isotopeGrid.isotope) {
                isotopeGrid.isotope({
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.grid-item'
                    }
                });
            }

            // Generate category numbers
            filterbar.find('a').each(function () {
                var category = $(this).attr('data-isotope-filter');

                var number = (category == '*') ? isotopeGrid.find('> div').length : isotopeGrid.find(category).length;

                if (number < 10) {
                    number = '0' + number;
                }

                $(this).find('.num').html(number);
            });

            filterbar.find('a').on('click', function () {
                filterbar.find('.active').removeClass('active');
                $(this).addClass('active');

                if (isotopeGrid.isotope) {
                    isotopeGrid.isotope({
                        filter: $(this).attr('data-isotope-filter')
                    });
                }

                setTimeout(function () {
                    if (AOS) {
                        AOS.refresh();
                    }
                    if (window.vc_waypoints) {
                        window.vc_waypoints();
                    }
                }, 600);

                return false;
            });

            if (window.location.hash) {
                filterbar.find('a[href="' + window.location.hash + '"]').on("click");
            }
        });

        // Header title 100% show animation
        $('.portfolio-page.layout-type5').addClass('show');
    }

    /* ## Scroll content */
    function handleScrollContent() {
        $('[data-stockie-content-scroll]').each(function () {
            var content = $(this),
                parent = $($(this).attr('data-stockie-content-scroll')),
                timeout = null, startTop = 0,
                contentLeft = content.offset().left,
                minWidth = 768,
                header = $('#masthead[data-header-fixed]'),
                subheader = $('.subheader'),
                wpadminbar = $('#wpadminbar'),
                headerTop = 0,
                contentWidth = (content.outerWidth());

                if (header.length) {
                    headerTop += header.outerHeight();

                    if (subheader.length) {
                        headerTop += subheader.outerHeight();
                    }
                }

                if ($('#wpadminbar').length) {
                    headerTop += $('#wpadminbar').outerHeight();
                }

            var refresh = function () {
                var scrollTop = $(window).scrollTop();

                if (header.length) {
                    scrollTop += header.outerHeight();

                    if (subheader.length) {
                        scrollTop += subheader.outerHeight();
                    }
                }

                if ($('#wpadminbar').length) {
                    scrollTop += $('#wpadminbar').outerHeight();
                }



                if ($(window).width() >= minWidth && content.outerHeight() < parent.outerHeight()) {
                    // scroll start
                    if (scrollTop > startTop) {
                        content.css({
                            'max-width': contentWidth + 'px',
                            'position': 'fixed',
                            'top': headerTop + 'px',
                            'left': contentLeft + 'px'
                        });
                    } else {
                        content.css({
                            'max-width': 'none',
                            'position': 'relative',
                            'top': '0px',
                            'left': '0px'
                        });
                    }
                    // scroll end
                    if (scrollTop + content.outerHeight() > parent.offset().top + parent.outerHeight()) {
                        var top = parent.outerHeight() - content.outerHeight();

                        content.css({
                            'max-width': 'none',
                            'position': 'relative',
                            'top': (top) + 'px',
                            'left': '0' + 'px'
                        });
                    }
                } else {
                    content.css({
                        'max-width': 'none',
                        'position': 'relative',
                        'top': '0px',
                        'left': '0px'
                    });
                }
            };

            var resize = function () {
                    
                contentLeft = content.offset().left;
                startTop = content.offset().top;

                if ( content.find('.variation[id^=variation]').length == 0 ) {
                    content.css('position', 'static');
                    
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        content.css({
                            'position': 'absolute',
                            'top': (content.offset().top - parent.offset().top) + 'px',
                            'left': (content.offset().left - parent.offset().left) + 'px'
                        });
                        refresh();
                    }, 30);
                }
            };

            setTimeout(function () {
                resize();
            }, 100);
            $(window).scroll(refresh).on('resize', resize);
        });
    }

    // ## Shop products filter

    $('.woocommerce-ordering select').on("change", function (event) {
        if ($(this).closest('form').length < 1) {
            window.location.href = $(this).val();
        }
    });

    // ## Shop masonry

    function shopMasonry() {
        var shopMasonry = $('[data-shop-masonry]');

        if (shopMasonry.parents('.owl-stage').length) {
            return false;
        }

        shopMasonry.each(function(){
            
            var product = $(this).find('> li.product');

            if (shopMasonry && !shopMasonry.parents('.shop-product-type_3').length && product.length > 1 ) {
                if (shopMasonry.isotope) {
                    shopMasonry.isotope({
                        percentPosition: true,
                        masonry: {
                            columnWidth: ' .product:not(.double_width)'
                        }
                    });
                }
            }
        });
    }

    /* # Product */

    //Single product gallery
    var singleProductGallery = function () {
        $('.product_images').each(function () {
            if ($(this).find('img').length > 1) {
                var slider = $(this);
                slider.owlCarousel({
                    items: 1,
                    nav: true,
                    navSpeed: 600,
                    dotsSpeed: 600,
                    autoHeight: true,
                    navClass: ['owl-prev btn-round', 'owl-next btn-round'],
                    navText: ["<i class='ion ion-ios-arrow-back'></i>", "<i class='ion ion-ios-arrow-forward'></i>"],
                    onInitialized: counter, //When the plugin has initialized.
                    onTranslated: counter,
                    onChanged: counter,

                    responsive: {
                        0 : {
                            loop: false
                        },
                        768 : {
                            loop: false
                        }
                    }
                });

                slider.on('initialized.owl.carousel changed.owl.carousel resized.owl.carousel', function (event) {
                    owl_carousel_thumbnails(event);
                });
            }
            ;

            function counter(event) {
                var element = event.target;
                var items = event.item.count;
                var item = event.item.index + 1;
                $('.numbers_slides').html(item + " / " + items)
            }

        });
    }

    /* ## Ajax cart */

    jQuery(function ($) {

        $(".input-text.qty.text").on('keyup mouseup', function () {
            var value = $(this).val();
            $("#product_quantity").val(value)
        });

        $(document).on('click', '.ajax-add-to-cart .single_add_to_cart_button', function (e) {


            if ($(this).hasClass('out-of-stock') || $(this).hasClass('product_type_variable') || $(this).closest('form').hasClass('external-product') || $(this).hasClass('product_type_external') || $(this).closest('form').hasClass('grouped_form')) return;

            e.preventDefault();

            var $variation_form = $(this).closest('.variations_form');
            var var_id = $variation_form.find('input[name=variation_id]').val();
            var product_id = $variation_form.find('input[name=product_id]').val();
            var quantity = $variation_form.find('input[name=quantity]').val();

            $('.ajaxerrors').remove();
            var item = {},
                check = true;
            var variations = $variation_form.find('select');
            if (!variations.length) {
                variations = $variation_form.find('[name^=attribute]:checked');
            }
            if (!variations.length) {
                variations = $variation_form.find('input[name^=attribute]');
            }
            variations.each(function () {
                var $this = $(this),
                    attributeName = $this.attr('name'),
                    attributevalue = $this.val(),
                    index,
                    attributeTaxName;
                $this.removeClass('error');
                if (attributevalue.length === 0) {
                    index = attributeName.lastIndexOf('_');
                    attributeTaxName = attributeName.substring(index + 1);
                    $this
                        .addClass('required error')
                        .before('Please select ' + attributeTaxName + '')
                    check = false;
                } else {
                    item[attributeName] = attributevalue;
                }
            });

            if (!check) {
                return false;
            }

            var $thisbutton = $(this);

            if ($thisbutton.is('.single_add_to_cart_button')) {

                $thisbutton.removeClass('added');
                $thisbutton.addClass('loading');

                if ($(".variations_form")[0]) {
                    var product_id = $variation_form.find('input[name=product_id]').val();
                    var quantity = $variation_form.find('input[name=quantity]').val();
                    var data = {
                        action: 'stockie_ajax_add_to_cart_woo',
                        product_id: product_id,
                        quantity: quantity,
                        variation_id: var_id,
                        variation: item
                    };
                } else {
                    if ($thisbutton.closest('.woocommerce-add-to-cart').length > 0) {
                        var product_id = $thisbutton.closest('.woocommerce-add-to-cart').find("input[name=product_id]").val();
                        var quantity = $thisbutton.closest('.woocommerce-add-to-cart').find("input[name=quantity]").val();
                        var data = {
                            action: 'stockie_ajax_add_to_cart_woo_single',
                            product_id: product_id,
                            quantity: quantity
                        };
                    } else {
                        var product_id = $thisbutton.siblings("input[name=product_id]").val();
                        var data = {
                            action: 'stockie_ajax_add_to_cart_woo_single',
                            product_id: product_id,
                            quantity: 1
                        };
                    }
                }


                $('body').trigger('adding_to_cart', [$thisbutton, data]);
                $.post(wc_add_to_cart_params.ajax_url, data, function (response) {
                    if (!response)
                        return;


                    var this_page = window.location.toString();
                    this_page = this_page.replace('add-to-cart', 'added-to-cart');
                    if (response.error && response.product_url) {
                        window.location = response.product_url;
                        return;
                    }
                    if (wc_add_to_cart_params.cart_redirect_after_add === 'yes') {
                        window.location = wc_add_to_cart_params.cart_url;
                        return;
                    } else {
                        $thisbutton.removeClass('loading');
                        var fragments = response.fragments;
                        var cart_hash = response.cart_hash;
                        if (fragments) {
                            $.each(fragments, function (key) {
                                $(key).addClass('updating');
                            });
                        }
                        $('.shop_table.cart, .updating, .cart_totals').fadeTo('400', '0.6').block({
                            message: null,
                            overlayCSS: {
                                opacity: 0.6
                            }
                        });


                        var $classes = '';
                        if ($('body').hasClass('single-product') || $thisbutton.parents('.modal-window').length) {
                            var $classes = ' button';
                        }



                        if (fragments) {
                            $.each(fragments, function (key, value) {
                                $(key).replaceWith(value);
                            });
                        }

                        $('.widget_shopping_cart, .updating').stop(true).css('opacity', '1').unblock();
                        $('.shop_table.cart').on('load', this_page + ' .shop_table.cart:eq(0) > *', function () {
                            $('.shop_table.cart').stop(true).css('opacity', '1').unblock();
                            $(document.body).trigger('cart_page_refreshed');
                        });
                        $('.cart_totals').on('load', this_page + ' .cart_totals:eq(0) > *', function () {
                            $('.cart_totals').stop(true).css('opacity', '1').unblock();
                        });

                        var productName = '';
                        if ($thisbutton.closest('.product').find('h1').length > 0) {
                            productName = $thisbutton.closest('.product').find('h1').text();
                        } else {
                            productName = $thisbutton.closest('.product').find('h5.font-titles').text();
                        }
                        if (productName == '') {
                            productName = $thisbutton.closest('.product-popup').find('h1').text();
                        }

                        // check if response is JSON
                        // If JSON - error
                        try
                        {
                            var json = JSON.parse(response);

                            // if has error
                            if(json.error) {
								
                                $thisbutton.removeClass('btn-loading').find('i').css('display', 'inline-block');
                                console.log(json.message);
                                $('footer').before('<div class="woo_c-message-group"><div class="message-box error">' + json.message + '<div class="close"><i class="ion ion-md-close"></i></div></div></div>');

                            } else {

                                $thisbutton.addClass('added');
                                $thisbutton.text('Product Added');

                                $thisbutton.after('<a href="' + stockieVariables.cart_page + '" class="' + $classes + '">' + stockieVariables.view_cart + '</a>');
                                $thisbutton.css('display', 'none');
                                $('footer').before('<div class="woo_c-message-group"><div class="ajax-cart-response message-box success">' + productName + ' ' + stockieVariables.add_to_cart_message + '<a class="view_cart_button" href="' + stockieVariables.cart_page + '">' + stockieVariables.view_cart + '</a><div class="close"><i class="ion ion-md-close"></i></div></div></div>');
                            }
                        }
                        catch(e)
                        {

                            $thisbutton.addClass('added');
                            $thisbutton.text('Product Added');

                            $thisbutton.after('<a href="' + stockieVariables.cart_page + '" class="' + $classes + '">' + stockieVariables.view_cart + '</a>');
                            $thisbutton.css('display', 'none');
                            $('footer').before('<div class="woo_c-message-group"><div class="ajax-cart-response message-box success">' + productName + ' ' + stockieVariables.add_to_cart_message + '<a class="view_cart_button" href="' + stockieVariables.cart_page + '">' + stockieVariables.view_cart + '</a><div class="close"><i class="ion ion-md-close"></i></div></div></div>');
                        }

                    }
                });
                return false;
            } else {
                return true;
            }
        });
    });

    /* # Lazy load */

    function lazyLoad(elem) {
        if ( elem.data( 'lazy-load-loading' ) ) {
            return;
        }

        elem.data( 'lazy-load-loading', 'true' ).addClass( 'active' );

        let currentPage = elem.data( 'lazy-page' ) ? parseInt( elem.data( 'lazy-page' ) ) : 1;
        currentPage += 1;

        elem.data( 'lazy-page', currentPage );

        let urlPattern = elem.data( 'lazy-load-url-pattern' );
        if (urlPattern) {
            urlPattern = urlPattern.replace( '{{page}}', currentPage );
        } else {
            urlPattern = 'page/' + currentPage;
        }

        let scopeSlug = elem.data('lazy-load-scope');

        // Get page content
        $.ajax({
            url: urlPattern,
            success: (content) => {
                var dom = $(new DOMParser().parseFromString(content, 'text/html')),
                    items = dom.find('[data-lazy-item][data-lazy-scope="' + scopeSlug + '"]');

                var container = elem.parent().find('[data-lazy-container="' + scopeSlug + '"]');
                if (container.length == 0) {
                    container = $('[data-lazy-container="' + scopeSlug + '"]')
                }
                items.parent().find('[data-aos]').attr('data-aos-offset', '20000000');
                items.addClass('hidden');

                container.append(items);
                $(document.body).append(dom.find('[data-lazy-to-footer]'));

                // Check images is loaded
                var metroImages = [];
                items.find('[data-stockie-bg-image]').each(function () {
                    var img = document.createElement('img');
                    img.src = $(this).attr('data-stockie-bg-image');
                    metroImages.push(img);
                });
                var checkImages = function () {
                    var result = true, result2 = true;

                    items.find('img').removeAttr('loading').each(function() {
                        if (!this.complete) {
                            result = false;
                            $(this).on('load', checkImages);
                            return false;
                        }
                    });

                    if (result) {
                        for (var i = 0; i < metroImages.length; i++) {
                            if (!metroImages[i].complete) {
                                result2 = false;
                                metroImages[i].onload = checkImages;
                                return false;
                            }
                        }
                    }

                    if (result && result2) {
                        items.removeClass('hidden');
                        handlePortfolio();
                        handleQuickviewPopup(items);

                        var portfolio_data_grid = container.hasClass('portfolio-grid') && container.isotope;
                        var woo_data_grid = container.attr('data-shop-masonry') && container.isotope;

                        if (portfolio_data_grid || woo_data_grid) {
                            container.isotope()
                                .isotope('appended', items)
                                .isotope('layout');
                        }

                        if (container.hasClass('stockie-masonry') || container.hasClass('masonry')) {
                            container.masonry('appended', items, false);
                        }

                        items.parent().find('[data-aos]').attr('data-aos-offset', '');

                        if (typeof(AOS) != 'undefined') {
                            // For mobile phones
                            AOS.init();

                            AOS.refresh();
                        }

                        $('[data-stockie-bg-image]').each(function () {
                            $(this).css('background-image', 'url(' + $(this).attr('data-ohio-bg-image') + ')');
                        });

                        if (currentPage >= parseInt(elem.attr('data-lazy-pages-count'))) {
                            elem.remove();
                        } else {
                            // Wait height animation
                            elem.removeClass('active');
                            if (elem.attr('data-lazy-load') == 'scroll') {
                                setTimeout(function () {
                                    elem.removeData('lazy-load-loading');
                                    handleLazyLoadScroll();
                                }, 500);
                            } else {
                                elem.removeData('lazy-load-loading');
                            }
                        }

                    }
                };
                checkImages();

                handlePortfolio();
                handleQuickviewPopup(items);
                productGridHoverSecondType();
            }
        });
    }

    function handleLazyLoadScroll() {
        $('[data-lazy-load="scroll"]').each(function () {
            if ($(document).scrollTop() + $(window).height() > $(this).offset().top) {
                lazyLoad($(this));
            }
        });
    }

    function handleLazyLoadClick() {
        $('[data-lazy-load="click"]').on('click', function () {
            lazyLoad($(this));
        });
    }

    function handleAOS() {
        if (typeof(AOS) != 'undefined') {
            setTimeout(function () {
                AOS.init({
                    disable: 'mobile'
                });
            }, 600);
        }
    }

    function handleStretchContent() {
        if ( !$('.page-sidebar').length ) {
            $('[data-vc-stretch-content="true"], [data-vc-full-width="true"], [data-stockie-stretch-content="true"], .alignfull').each(function () {
                $(this).css('left', '0');

                $(this).css({
                    'width': $('#page').width() + 'px',
                    'left': ($('#page').offset().left - $(this).offset().left) + 'px'
                });
            });

            $('[data-vc-full-width="true"]').not('[data-vc-stretch-content="true"]').each(function () {
                var padding = ($('#page').outerWidth() - $(this).closest('.page-container').outerWidth()) / 2;
                if ( !Clb.isMobile ) {
                    padding = padding + 10;
                }
                $(this).css({
                    'padding-left': padding + 'px',
                    'padding-right': padding + 'px',
                });
            });

            $('.rev_slider_wrapper.fullwidthbanner-container, .rev_slider_wrapper.fullscreen-container').each(function () {
                $(this).css('padding-left', $('#page').offset().left + 'px');
            });

            setTimeout(function () {
                var revSliders = $('.rev_slider');
                if (revSliders.revredraw) {
                    revSliders.revredraw();
                }
            }, 30);
        }
    }

    window.stockieRowRefresh = handleStretchContent;

    function handleScrollEffects() {
        $('[data-stockie-scroll-anim]').each(function () {
            var anim = $(this).attr('data-stockie-scroll-anim');

            if ($(this).offset().top < ($(window).scrollTop() + $(window).height() - 50)) {
                $(this).removeClass(anim).removeAttr('data-stockie-scroll-anim');
            }
        });
    }

    function handleStockieHeight() {
        var windowHeight = $(window).height();
        var footerHeight = $('.site-footer').outerHeight();
        var headerCapHeight = ($('.header-cap').length) ? $('.header-cap').outerHeight() : 0;
        var wpAdminHeight = ($('#wpadminbar').length) ? $('#wpadminbar').outerHeight() : 0;
        var headerTitleHeight = ($('.header-title').length) ? $('.header-title').outerHeight() : 0;

        $('[data-stockie-full-height]').each(function () {
            var height = windowHeight - footerHeight - headerCapHeight - wpAdminHeight - headerTitleHeight;

            $(this).css('height', (height) + 'px');
        });
    }

    function handleMutationObserver() {

        var target = $('.cart-collaterals, .variations .select, .variations .custom_select .select, #sb_instagram #sbi_images, #billing_country_field .select-styled, #calc_shipping_country_field .select-styled, #calc_shipping_state_field select, #calc_shipping_country_field select, .woo-c_checkout_form');

        if (target != undefined) {
            target.each(function () {
                var target = this;
                var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        if ($(target).hasClass('cart-collaterals')) {
							
                            if ( $(mutation.target).hasClass('woo-c_cart_totals') ) {
                                if ($(mutation.target).find('.woocommerce-shipping-calculator').length) {
                                    var select = $(mutation.target).find('#calc_shipping_country');
                                    if ( !select.hasClass('select-hidden') ) {
                                        handleCustomSelect(select);
                                    }
                                } else {
                                    observer.disconnect();
                                }
                            }

							if ( $(mutation.target).hasClass('state_select') || $(mutation.target).hasClass('input-text') ) {

								if (mutation.addedNodes.length || $(mutation.target).hasClass('input-text')) {
									var select = $('#calc_shipping_state_field .select');
									select.find('.select-styled, .select-options').remove();
									select.find('select').unwrap();
									handleCustomSelect($('select#calc_shipping_state'));
								}
							}
                        }

                        if ($(target).hasClass('select')) {
                            if ($(mutation.target).hasClass('select')) {
                                var elem = mutation.addedNodes[0];
                                $(elem).wrap("<div class='select-error'></div>");
                                $('.select-error').remove();
                                
                                if ($(target).children('select.error').parents('.custom_select').length) {
                                    $(target).children('select.error').parents('.custom_select').siblings('.color_attr').addClass('error');
                                }
                            }
                        }


                        if ( $(target).attr('id') == 'sbi_images') {
                            if ( mutation.addedNodes.length ) {
                                instagramFeedBtn();
                                observer.disconnect(); //Can disconect whole function 'handleMutationObserver'
                            }
                        }

                        if ($(target).hasClass('select-styled')) {
							
                            if (mutation.addedNodes.length) {
                                var select = $('#billing_state_field .select, #calc_shipping_state_field .select');
                                select.find('.select-styled, .select-options').remove();
                                select.find('select').unwrap();
                                handleCustomSelect($('select#billing_state, select#calc_shipping_state'));
                            }
						}
						
						if ($(target).hasClass('woo-c_checkout_form')) {
							if (mutation.addedNodes.length) {

								if ($(mutation.addedNodes[0]).hasClass('woocommerce-NoticeGroup')) {
									$(target).find('.btn[type=submit]').removeClass('btn-loading');
								}

								if ($(mutation.addedNodes[0]).hasClass('select2-selection__placeholder') || $(mutation.addedNodes[0]).hasClass('input-text')) {
									setTimeout(function(){
										var select = $('#billing_state_field .select, #calc_shipping_state_field .select');
										select.find('.select-styled, .select-options').remove();
										select.find('select').unwrap();
										handleCustomSelect($('select#billing_state, select#calc_shipping_state'));
										
									}, 300)

								}
							}
						}

                    });
                });

                // Settings observer
                var config = {
                    attributes: true,
                    characterData: true,
                    childList: true,
                    subtree: true,
                    attributeOldValue: true,
                    characterDataOldValue: true,
                }

                // Start observer

                observer.observe(this, config);

            });
        }

    }

    function handleAlignContentInStretchRow(){
        var containerWidth = $('#content').outerWidth();
        var containerOffset = $('#content').offset().left;
        var halfContainer = containerWidth/2 - $('#content .page-container').width()/2;

        // Align content column in wrapper container
        var align = function( self, isSplitbox, isParallax, isRight ){

            var column = self.find( '> .wpb_column > .vc_column-inner' );
            if( isSplitbox ){

                column = self.find( '> .split-box-container' );
            }
            if( isParallax ){

                column = self.find( '> .parallax-content' );
            }
            column = ( isRight ) ? column.last() : column.eq(0);


            if( !Clb.isMobile ){
                column.css( 'padding-' + ( isRight ? 'right' : 'left' ), ( halfContainer ) + 'px' );
            } 
        };

        // Stretch column
        var stretch = function( self, isSplitbox, isRight ){
            var column = self.find( isSplitbox ? '> .split-box-container' : '> .wpb_column > .vc_column-inner > .wpb_wrapper' );
            column = ( isRight ) ? column.last() : column.eq(0);
            column.css({ 'position': '', 'left': '', 'width': '' });

            if( column.length ){
                if( isRight ){
                    column.css( 'width', (containerWidth - column.offset().left ) + 'px');
                } else {
                    column.css({
                        'position': 'relative',
                        'left': -( column.offset().left) + 'px',
                        'width': ( column.offset().left + column.outerWidth() ) + 'px'
                    });
                }
                if( Clb.isMobile ){
                    column.css({
                        'width': '',
                        'left': ''
                    });
                }
            }
        };

        $('.clb-column-padding-left').each(function(){
            align( $(this), $(this).hasClass('split-box'), $(this).hasClass('parallax'), false );
        });

        $('.clb-column-padding-right').each(function(){
            align( $(this), $(this).hasClass('split-box'), $(this).hasClass('parallax'), true );
        });

        $('.clb-stretch-column-left').each(function(){
            stretch( $(this), $(this).hasClass('split-box'), false );
        });

        $('.clb-stretch-column-right').each(function(){
            stretch( $(this), $(this).hasClass('split-box'), true );
        });
    }


    //Centered image
    function centeredImage(image, imageContainer) {
        if (imageContainer === undefined) {
            imageContainer = $('.woo_c-product-image');
        }

        image.each(function () {
            $(this).css({'width': '100%'});

            var imgWidth = $(this).width();
            var imgHeight = $(this).height();
            var containerWidth = imageContainer.width();
            var containerHeight = imageContainer.height();
            var newPosition = 0;
            
            if (imgWidth < imgHeight) {
                //Tall image
                newPosition = (imgHeight - containerHeight) / 2;
                $(this).css("transform", "translatey(-" + newPosition + "px)");

                if (imgWidth <= containerWidth && imgHeight >= containerHeight) {
                    imgHeight = $(this).height();

                    newPosition = (imgHeight - containerHeight) / 2;
                    $(this).css("transform", "translatey(-" + newPosition + "px)");

                } else if ( imgHeight < containerHeight && Clb.isPad ) {
                    $(this).css({'width': 'auto'});
                    $(this).addClass('horizontal-img');

                    horizontalImagePosition($(this), imgWidth, containerWidth, newPosition);

                } else {
                    horizontalImagePosition($(this), imgWidth, containerWidth, newPosition);
                }
            }
            else {
                //Wide image + square image
                $(this).addClass('horizontal-img');
                imgWidth = $(this).width();

                if (imgWidth <= containerWidth) {
                    imgWidth = $(this).width();
                    newPosition = (containerWidth - imgWidth) / 2;
                    $(this).css("transform", "translatex(-" + newPosition + "px)");
                }
                else {
                    newPosition = (imgWidth - containerWidth) / 2;
                    $(this).css("transform", "translatex(-" + newPosition + "px)");
                }
            }
        });


        function horizontalImagePosition(self, imgWidth, containerWidth, newPosition) {
            imgWidth = self.width();
            newPosition = (imgWidth - containerWidth) / 2;
            self.css("transform", "translatex(-" + newPosition + "px)");
        }
    }

    function instagramFeedBtn() {
        var instaFeed = $('#sb_instagram .sbi_item a.sbi_photo');

        if ( instaFeed.find('.btn-round').length ) {
            return;
        }

        var btn = $('<div class="btn-round"><i class="ion ion-md-add"></i></div>');
        var btnClone;

        instaFeed.each(function(){
            btnClone = btn.clone();
            $(this).append(btnClone);
        });
    }

    function removeUnderlineFromImg() {
        var img = $('img');

        img.each(function(){
            if ($(this).parents('a').length) {
                $(this).parents('a').addClass('remove_underline');
            }
        });
    }

    function zoomProductImage() {
        $('.woo_c-product-image .with-zoom')
        .on('mouseover', function(){
          $(this).children('img').css({'transform': 'scale(1.5)'});
        })
        .on('mouseout', function(){
          $(this).children('img').css({'transform': 'scale(1)'});
        })
        .on('mousemove', function(e){
          $(this).children('img').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
        })
    }

    function productGridHoverSecondType() {
        $('[data-product-item] .slider').each(function(){
            if ( $(this).find('img').length > 1 ) {
                $(this).addClass('slider-images');
            }
        });
    }

    

    window.stockieRefreshFrontEnd = function () {
        handleAccordionBox();
        handleBannerBox();
        handleBannerBoxSize();
        handleCounterBox();
        handleCountdownBox();
        handleSubscribeContactForm();
        handleCoverBox();
        handleCoverBoxSize();
        handleGallery();
        handleSplitboxParallax();
        handleProgressBar();
        handleProgressBarSize();
        initParallax();
        handleParallax();
        handlePriceTable();
        handleOnepage();
        handleOnepageSize();
        handleTabBox();
        handleVideoBackground();
        handleVideoPopup();
        if ($.fn.multiscroll) {
            handleSplitScreens();
        }
        handleScrollEffects();
        handleSliders();
    };

    $(window).on('load', function () {

        Clb.init();
        handleStockieHeight();
        handleAlignContentInStretchRow();
        
        // Navigation
        handleNavigations();

        // Header
        handleHeaders();
        handleHeaderTitle();

        if ( !Clb.isMobile && Clb.headerIsFifth ) {
            centeredLogo();
        }
        

        // Footer
        handleFooter();
        handleFooterSize();

		setTimeout(function(){
			handleStretchContent();
		}, 100);

        // Shortcodes
        handleAccordionBox();
        handleBannerBox();
        handleBannerBoxSize();
        handleCounterBox();
        handleCountdownBox();
        handleSubscribeContactForm();
        handleCoverBox();
        handleCoverBoxSize();
        handleGallery();
        handleSplitboxParallax();
        handleProgressBar();
        handleProgressBarSize();
        initParallax();
        handleParallax();
        handlePriceTable();
        handleOnepage();
        handleOnepageSize();
        handleTabBox();
        handleVideoBackground();
        handleVideoPopup();
        if ($.fn.multiscroll) {
            handleSplitScreens();
        }

		setTimeout(function(){
			handleCustomSelect();
		}, 300)
        

        // Shop
        setTimeout(function(){
            shopMasonry();
        }, 10);
        stickyProduct();
        singleProductGallery();
        handleMobileFilter();
        handleQuickviewPopup();
        productGridHoverSecondType()

        // Portfolio
        handlePortfolio();
        if ( !Clb.isPad ) {
            handleScrollContent();
        }
        handleScrollEffects();
        handleSliders();
        handleLazyLoadClick();
        handleLazyLoadScroll();


        instagramFeedBtn();

        handleMutationObserver();

        removeUnderlineFromImg();
       

        //type2 without gallery
        $(function () {
            var imgContainer = $('.woo_c-product-image');

            imgContainer.each(function () {
                var productImg = $(this).find('.product_images')

                if (!productImg.hasClass('owl-loaded')) {
                    $(this).addClass('without-gallery');
                }
            });
        });

        //Centered image
        if ( !Clb.isMobile ) {
            var images = $('[class*="type1"] .woo_c-product-image .gimg')
            centeredImage(images);
        }

        if ( Clb.isPad && !Clb.isMobile ) {
            var images = $('[class*="type4"] .woo_c-product-image .gimg')
            centeredImage(images);
        }

        zoomProductImage();

        //Buttons
        btnPreloader();

        if ($( 'body' ).hasClass( 'woocommerce-checkout' )) {
            setTimeout(function(){
                btnPreloader();
            }, 1500)
        }

        //logo SC
        logoOverlay();
        //Product grid 4
        centeredFourthProductsImages();


        // Scroll top button
        $('.scroll-top').on("click", function () {
            $('html, body').animate({scrollTop: 0}, 500);
            return false;
        });

        // Tooltips
        $('.tooltip').each(function () {
            if ($(this).find('.tooltip-top, .tooltip-bottom').length) {
                var content = $(this).find('.tooltip-text');
                content.css('left', ($(this).outerWidth() / 2 - content.outerWidth() / 2) + 'px');
            }
        });

        // Message boxes
        $('body').on('click', '.message-box .close', function () {
            $(this).parent().slideUp({duration: 300, queue: false}).fadeOut(300);
            var self = $(this).parents('.message-box');
            setTimeout(function () {
                self.remove();
            }, 350);
        });

        $('body').on('click', '.notification-bar .close, .notification-bar .notification-btn a', function (e) {
            if ($(this).hasClass('close')) {
                e.preventDefault();
            }
            

            setCookie('notification', 'enabled', +stockieVariables.notification_expires);
            $(this).parents('.notification-bar').removeClass('active');
        });


        // Masonry && AOS
        if ($('.stockie-masonry').length) {
            setTimeout(function () {
                $('.stockie-masonry').each(function () {
                    var columnWidth = '.grid-item';
                    if ($(this).find('.grid-item').length == 0) {
                        columnWidth = '.masonry-block';
                    }
                    $(this).masonry({
                        itemSelector: '.masonry-block',
                        columnWidth: columnWidth,
                        horizontalOrder: true,
                        isAnimated: false,
                        hiddenStyle: {
                            opacity: 0,
                            transform: ''
                        }
                    });
                });

                setTimeout(function () {
                    handleAOS();
                }, 50);
            }, 50);
        } else {
            handleAOS();
        }

        // Stockie attrs
        $('[data-stockie-bg-image]').each(function () {
            $(this).css('background-image', 'url(' + $(this).attr('data-stockie-bg-image') + ')');
        });

        // Fixed google maps equal height in percent
        $('.wpb_wrapper').each(function () {
            var divs = $(this).find('> div');

            if (divs.length == 1 && divs.eq(0).hasClass('google-maps')) {
                $(this).css('height', '100%');
            }
        });

        $('div[data-dynamic-text="true"]').each(function () {
            var options = JSON.parse($(this).attr('data-dynamic-text-options'));
            var typed = new Typed('#' + $(this).attr('id') + ' .dynamic', options);
        });

        if (jQuery('body').hasClass('stockie-anchor-onepage')) {
            jQuery('body').on('click', 'a[href^="#"]', function (event) {
                if (!$(this).parent().attr('data-menuanchor')) {
                    event.preventDefault();
                    var href = jQuery.attr(this, 'href');
                    if (jQuery(href).length) {
                        jQuery('html, body').animate({
                            scrollTop: (jQuery(href).offset().top)
                        }, 500, function () {
                            window.location.hash = href;
                        });
                    }
                    return false;
                }
            });

            if (window.location.hash.substring(0, 1) == '#') {
                if (jQuery(window.location.hash).length) {
                    jQuery('html, body').animate({
                        scrollTop: (jQuery(window.location.hash).offset().top)
                    }, 500);
                }
            }
        }

        // Refresh composter waypoints after magic
        if (window.vc_waypoints) {
            setTimeout(function () {
                window.vc_waypoints();
            }, 600);
        }

        // Mobile share button
        $('.mobile-social').on('click', function (e) {
            e.stopPropagation();

            if ($(this).hasClass('active')) {
                $(this).find('.social').css('height', '0px');
                $(this).removeClass('active');
            } else {
                var social = $(this).find('.social');
                var self = $(this);

                social.css('height', '');

                social.addClass('no-transition');

                $(this).addClass('active');
                var height = social.outerHeight();
                $(this).removeClass('active');

                setTimeout(function () {
                    social.css('height', height + 'px');
                    social.removeClass('no-transition');
                    self.addClass('active');
                }, 50);

            }
        });

        /*Blog slider*/
        $('.blog-slider').owlCarousel({
            items: 1,
            dots: false,
            autoHeight: true,
            navRewind: true,
            navClass: ['owl-prev btn-round', 'owl-next btn-round'],
            navText: ['<i class="ion ion-ios-arrow-back"></i>', '<i class="ion ion-ios-arrow-forward"></i>'],
            loop: true,
        });

        if (Clb.header.hasClass('header-3')) {
            Clb.header.find('.left-part, .right-part').css('width', menuOtherEqualWidth(Clb.header));
            Clb.header.css({'opacity': '1'});
        }

        /* Breadcrumbs filters handler */
        $('.filter .select select').change(function() {
            let $selected = $(this).find('option:selected');
            if ($selected.attr('data-select-href')) {
                window.location.assign($selected.attr('data-select-href'));
            }
        });
        

        $(window).on('scroll', function () {

            var handleAnim = function () {
                handleMobileHeader();
                handleFixedHeader();
                handleHeaderTitle();
                handleBarScroll();
                handleCounterBox();
                handleProgressBar();
                handleParallax();
                handleScrollEffects();
                handleLazyLoadScroll();
            };

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(function () {
                    handleAnim();
                });
            } else {
                handleAnim();
            }


            // Scroll top button
            if ($(window).scrollTop() > 800) {
                $('#page-scroll-top, #purchase-link').fadeIn(600);
                $('.social-bar').addClass('social-bar-move');
            } else {
                $('#page-scroll-top, #purchase-link').fadeOut(600);
                $('.social-bar').removeClass('social-bar-move');
            }
        });

        $(window).on('resize', function () {
            Clb.resize();
            handleStockieHeight();
            handleHeaderSize();
            handleHeaderTitle();
            handleFooterSize();
            handleStretchContent();
            handleAlignContentInStretchRow();
            handleOnepageSize();
            handleAccordionBoxSize();
            handleBannerBoxSize();
            handleCounterBox();
            handleCoverBoxSize();
            handleParallax();
            handleProgressBarSize();
            handlePriceTable();
            handleTabBoxSize();
            handleProgressBar();
            handleScrollEffects();
            handleLazyLoadScroll();
            handleSliders();
            shopMasonry();
            zoomProductImage();

            //Centered image
            $(function(){
                if ( !Clb.isMobile ) {
                    let images = $('[class*="type1"] .woo_c-product-image .gimg');
                    centeredImage(images);
                }
            });

            $(function(){
                let images = $('[class*="type4"] .woo_c-product-image .gimg');

                if ( Clb.isPad && !Clb.isMobile ) {
                    centeredImage(images);
                } else {
                    images.css({'transform': '',
                                'width': '',
                                'height': ''
                                });

                    images.removeClass('horizontal-img');
                }
            });
            
            if ( !Clb.isPad ) {
                handleScrollContent();
            }

            if ( !Clb.isMobile ) {
                centeredImage($('[class*="type1"] .woo_c-product-image .gimg'));
                if ( Clb.headerIsFifth ) {
                    $('#site-navigation').removeAttr('style');

                    centeredLogo();
                }
            }

            if ( Clb.isMobile ) {
                if ( Clb.headerIsFifth ) {
                    $('#site-navigation, .left-part, .right-part, .nav-item').removeAttr('style');
                }
            }

            if ($(window).width() < 1025 && $(window).width() > 768) {
                centeredImage($('[class*="type4"] .woo_c-product-image .gimg'));
            }

            if (AOS) {
                setTimeout(function () {
                    AOS.refresh();
                }, 10);
                // Isotope animation
                setTimeout(function () {
                    AOS.refresh();

                    if (window.vc_waypoints) {
                        window.vc_waypoints();
                    }
                }, 600);
            }
            if ( Clb.shopProductsType.hasClass('shop-product-type_4') ) {
                setTimeout(function(){
                    centeredFourthProductsImages();
                }, 300);
            }
            
        });

        handleMutationObserver();

        $('#page-preloader, .container-loading').addClass('closed');
        $('.gimg, .shop-product-type_4 img, .woo-c_upsells, .woo-c_related').addClass('visible-content');
    });


    $(document).on('click', '.search_results_btn', function(){
       $('.woocommerce-product-search').on("submit");
    });

    // Search action to keyup
    $('.woocommerce-product-search input[name=s]').on("keyup", function (event) {
        if (!$('.woocommerce-product-search .search-submit').hasClass('btn-loading')) {
            $('.woocommerce-product-search .search-submit').addClass('btn-loading');
        }

        var form = $(this).closest('form');
        var data = {
            'action': 'stockie_ajax_search',
            'search_query': $(this).val(),
            'search_term': $('select[name="search_term"]').val()
        };

        $.post(stockieVariables.url, data, function (response) {
            $('.search_results').empty();
            $('.woocommerce-product-search .search-submit').removeClass('btn-loading');
            $('.search_results').append(response);
            form.attr('action', $('#search_form_action').attr('data-href'));
            btnPreloader();
        });
    });

    // Search action to focus
    $('.woocommerce-product-search input[name=s]').on("focus", function (event) {

        if ($('.search_results').children().length == 0) {
            if (!$('.woocommerce-product-search .search-submit').hasClass('btn-loading')) {
                $('.woocommerce-product-search .search-submit').addClass('btn-loading');
            }

            var form = $(this).closest('form');
            var data = {
                'action': 'stockie_ajax_search',
                'search_query': $(this).val(),
                'search_term': $('select[name="search_term"]').val()
            };

            $.post(stockieVariables.url, data, function (response) {
                $('.search_results').empty();
                $('.woocommerce-product-search .search-submit').removeClass('btn-loading');
                $('.search_results').append(response);
                form.attr('action', $('#search_form_action').attr('data-href'));
                btnPreloader();
            });
        }
    });

    // Search action to select category
    $(document).on('change', '.woocommerce-product-search select', function(){
        if (!$('.woocommerce-product-search .search-submit').hasClass('btn-loading')) {
            $('.woocommerce-product-search .search-submit').addClass('btn-loading');
        }

        var form = $(this).closest('form');
        var data = {
            'action': 'stockie_ajax_search',
            'search_query': $('input[name=s]').val(),
            'search_term': $('select[name="search_term"]').val()
        };

        $.post(stockieVariables.url, data, function (response) {
            $('.search_results').empty();
            $('.woocommerce-product-search .search-submit').removeClass('btn-loading');
            $('.search_results').append(response);
            form.attr('action', $('#search_form_action').attr('data-href'));
        });
    });

    //Btn preloader
    function btnPreloader() {
        var buttons = $('.btn-loading-disabled');
        btnLoading(buttons);

        function btnLoading(btn) {
            btn.on('click', function () {
                if (!($(this).hasClass('disabled'))) {
                    $(this).toggleClass('btn-loading');
                    $(this).find('i').hide();
                }
            });
        }
    }


    /*Single product*/

    //Sticky product

    var stickyProduct = function () {
        var productImg = $('.woo_c-product-image');
        var stickyProduct = $('.sticky-product');
        var stickyProductImg = stickyProduct.find('.sticky-product-img');

        $(window).on('scroll', function () {
            if ($(window).scrollTop() > productImg.height()) {
                stickyProduct.css({
                    'opacity': 1,
                    'visibility': 'visible',
                    'z-index': '100'
                });
            } else {
                stickyProduct.css({
                    'opacity': 0,
                    'visibility': 'hidden',
                    'z-index': '-1'
                })
            }
        });

        if (Clb.isMobile) {
            var contentWidth = $('#content').height();
            var contentOffset = $('#content').offset().top;
            var contentEnd = contentWidth + contentOffset - $(window).height();

            $(window).on('scroll', function () {
                if ($(window).scrollTop() > contentEnd) {
                    stickyProduct.css({
                        'opacity': 0,
                        'visibility': 'hidden'
                    })
                }
            });
        }

        stickyProductImg.on("click", function () {
            $('body, html').animate({scrollTop: 0}, 500);
        });
    }

    //type4 owl navigation position

    if ($(window).width() > 1024) {
        var type4 = $('[class*="type4"]');

        type4.each(function () {
            var imgSlider = $('.woo_c-product-image-slider');
            var navSlider = $('.owl-nav, .owl-dots, .owl-dots-images');
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > 10) {
                    imgSlider.addClass('nav-after-scroll');
                }
                else {
                    imgSlider.removeClass('nav-after-scroll');
                }
            })
        });
    }

    //type1, 4 with header3

    $(function () {
        var productType = $('[class*="type1"], [class*="type4"]');
        var header = $('#masthead');
        var product = $('.woo_c-product');
        var productImg = product.find('.woo_c-product-image-slider');

        productType.each(function () {
            if (header.hasClass('header-3')) {
                if (product.hasClass('spacer_included') && product.hasClass('subheader_included')) {
                    productImg.css('height', 'calc(100vh - 188px)');
                }

                else if (product.hasClass('subheader_included')) {
                    productImg.css('height', 'calc(100vh - 88px)');
                }

                else if (product.hasClass('spacer_included')) {
                    productImg.css('height', 'calc(100vh - 150px)');
                }
            }
        });
    });

    /*language dropdown*/

    //*Hide empty language container*
    $(function () {
        var language = $('.header-wrap .right .languages');

        if (language.find('.sub-nav.languages').children().length == 0) {
            language.hide();
        }
    });

    //Position in fullscreen menu
    $(window).on('load', function () {
        $(function () {
            var languages = $('.fullscreen-nav .copyright .languages-dropdown');

            switch (languages.find('> li').length) {

                case 1:
                    languages.css('top', '-40px');
                    break;

                case 2:
                    languages.css('top', '-80px');
                    break;

                default:
                    languages.css('top', '-120px');
                    break;
            }
        });
    });

    function centeredLogo() {
        /*header-5 centered logo*/
        var header = $('.header-5');
        var headerNav = header.find('.main-nav');
        var headerContainer = header.find('.page-container').length > 0;
        var topPart = header.find('.top-part');

        //Menu-others must be equal width
		Clb.header.find('.left-part, .right-part').css('width', '');

		setTimeout(function(){
			Clb.header.find('.left-part, .right-part').css('width', menuOtherEqualWidth(Clb.header));
		}, 100)

        var nav = $('.site-branding');
        var navMenu = $('#mega-menu-wrap').find('> ul > li');
        var logoWidth = nav.width();
        var centerLi = findCenterLi(navMenu);
        var firstElems = navMenu.slice(0, centerLi + 1);
        var lastElems = navMenu.slice(centerLi + 1);
        var navResidual = headerContainer ? 0 : 25;
        var offsetNav = headerContainer ? nav.position().left : nav.offset().left;

        $(navMenu[centerLi]).css('margin-right', logoWidth + "px");

        if (navMenu.length > 0) {
            var firstElemsW = widthElements(firstElems),
                lastElemsW = widthElements(lastElems);

            if (firstElemsW < lastElemsW) {
                var widthElems = (lastElemsW - firstElemsW) / 2;
                var centerMenu = (headerNav.width() / 2) - widthElems - logoWidth / 2 + navResidual;
                headerNav.css("transform", "translateX(-" + centerMenu + "px)");
            } else {
                var widthElems = (firstElemsW - lastElemsW) / 2;
                var centerMenu = (headerNav.width() / 2) + widthElems - logoWidth / 2 + navResidual;
                headerNav.css("transform", "translateX(-" + centerMenu + "px)");
            }
        } else {
            headerNav.css({
                "left": "auto",
                "right": "170px"
            });
        }

        headerNav.css({
            "left": offsetNav + "px",
        });
        $(".header-5").css('opacity', '1');
        
    }

    //Calculate width first and last elements
    function widthElements(elements) {
        var elemsWidth = 0;

        $.each(elements, function (i, li) {
            var w_li = $(li).width();
            elemsWidth = elemsWidth + w_li;
        });

        return elemsWidth;
    }

    //Find center Li element
    function findCenterLi(menu) {
        if (menu.length % 2 == 0) {
            return Math.round((menu.length / 2) - 1);
        }
        else {
            return Math.round((menu.length / 2) - 2);
        }
    }

    //Menu other equal width
    function menuOtherEqualWidth(header) {
        var menuOther = header.find('.left-part, .right-part');
        var menuOtherWidth = 0;

        menuOther.each(function(){
            if (menuOtherWidth < $(this).width() ) {
                menuOtherWidth = $(this).width();
            }
        });

        return menuOtherWidth + 1;
    }

    /*Share bar*/
    var share = $('.share-bar');

    share.find(".title").on("click", function (event) {
        share.toggleClass('active');
    });

    $(document).on("click", function (event) {
        if ($(event.target).closest(share).length == 0) {
            share.removeClass('active');
        }
    });

    /*Header 6*/

    $.each($('header.header-6'), function () {
        $(".menu-depth-1").removeClass('sub-menu-wide');
    });

    /*Curency switcher*/
    $('.currency_switcher').css('opacity', '1');

    /*Products grid*/

    //Type 4
    function centeredFourthProductsImages() {
        var image = $('.shop-product-type_4 .product');
        var imageContainer = $('.shop-product-type_4 .product .image-wrap');

        image.each(function () {
            var self = $(this),
                selfImage = $(this).find('img');

            selfImage.each(function () {
                if ($(this).width() < imageContainer.width()) {
                    $(this).addClass('small-width');
                }
            });

            centeredImage(selfImage, imageContainer);
        });
    }

    // WooCommerce hide custom color variations for "out of stock"
    setTimeout(() => {
        $('.variation .color_attr > span').each(function() {
            const $option = $(this).closest('.variation').find('select option[value="' + $(this).data('option') + '"]');
            if ( $option.length ) {
                $(this).show();
            }
        });
    }, 250);

    /* MENU */
    //Count items
    $(function () {
        var menuItem = $('#mega-menu-wrap ul > li.nav-item');

        menuItem.each(function () {
            var subItems = $(this).find('li.mega-menu-item').length;
            if (subItems > 0) {
                $(this).find('> a').append('<sup class="menu-sub-items"> ' + subItems + '</sup>')
            }
        });
    });

    //Logo Overlay style

    function logoOverlay() {
        var logoItems = $('.client-logo .client-logo-overlay');

        logoItems.each(function () {
            var logoDetails = $(this).find('.client-logo-details');
            var logoDetailWidth = logoDetails.outerHeight();

            logoDetails.css({
                'height': logoDetailWidth,
                'bottom': '-' + logoDetailWidth + 'px',
            })
        });
    }

    //Product grid filter
    function handleMobileFilter() {
        var btn = $('.btn-filter a.btn');
        var filter = $('.filter-container');
        var close = $('.close-bar, .mbl-overlay-bg');

        btn.on('click', function () {
            event.preventDefault();
            filter.addClass('active');
        });
        close.on('click', function () {
            event.preventDefault();
            filter.removeClass('active');
        });
    }

    function SubscribeModal() {

        var data = {
            action: 'stockie_subscribe_modal'
        };

        jQuery.post(stockieVariables.url, data, function (data) {
            handlePopup();
            var popupInner = $('.modal-content').addClass('subscribe-popup');
            popupInner.siblings('.btn-loading-disabled').removeClass('btn-loading');
            popupInner.append(data);

            var wpcf7_form = $('.wpcf7-form');
            [].forEach.call(wpcf7_form, function (form) {
                wpcf7.init(form);
                handleSubscribeContactForm();
            });
			
        });
    }

    function handleSubscribeModal() {
        switch (stockieVariables.subscribe_popup_type) {
            case 'time':
                setTimeout(function () {
                    SubscribeModal();
                }, +stockieVariables.subscribe_popup_var * 1000);
                break;
            case 'scroll':
                var ckeck = true;
                $(window).on('scroll', function (e) {
                    var scrollTop = $(window).scrollTop();
                    var docHeight = $(document).height();
                    var winHeight = $(window).height();
                    var scrollPercent = (scrollTop) / (docHeight - winHeight);
                    var scrollPercentRounded = Math.round(scrollPercent * 100);
                    if (ckeck && scrollPercentRounded > stockieVariables.subscribe_popup_var) {
                        SubscribeModal();
                        ckeck = false;
                    }
                });
                break;
            case 'exit':
                var ckeck = true;
                $(document).on('mouseleave',function () {
                    if (ckeck) {
                        SubscribeModal();
                        ckeck = false;
                    }
                });
                break;
        }
    }

    if (stockieVariables.subscribe_popup_enable && !getCookie('subscribeCookie')) {
        handleSubscribeModal();
    }
})(jQuery);