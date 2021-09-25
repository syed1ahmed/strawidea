(function ($) {
	"use strict";

	var wacChange = function(el_qty) {

        if ( !wacZeroQuantityCheck(el_qty) ) {
            return false;
        }

        if ( el_qty.val() == 0 ) {
            var removeLink = el_qty.closest('.woo-c_cart_table_item').find('.woo-c_cart_table_item_remove a');
            removeLink.trigger('click');

            // return false;
        }

        var updateButton = $("button[name='update_cart'],input[name='update_cart']");
        updateButton.removeAttr('disabled')
                    .trigger('click')
					.val( wooajaxcart_localization.updating_text )
					.text( wooajaxcart_localization.updating_text )
					.addClass('btn-loading')
                    .prop('disabled', true);

        // change the Update cart button
        $("a.checkout-button.wc-forward").addClass('disabled')
										 .addClass('btn-loading')
										 .html( wooajaxcart_localization.updating_text );

        return true;
    };

    var wacPostCallback = function(resp) {
        // ajax response
        $('.cart-collaterals').html(resp.html);

        el_qty.closest('.cart_item').find('.product-subtotal').html(resp.price);

        $('#update_cart').remove();
        $('#is_wac_ajax').remove();
        $('#cart_item_key').remove();

        $("button[name='update_cart'],input[name='update_cart']").val(resp.update_label).prop('disabled', false);

        $("a.checkout-button.wc-forward").removeClass('disabled').html(resp.checkout_label);

        // when changes to 0, remove the product from cart
        if ( el_qty.val() == 0 ) {
            el_qty.closest('.woo-c_cart_table_item').remove();
        }

        // hide or show the "+" button based on max stock limit (snippet based on @evtihii idea)
        maxStock = el_qty.attr('max');
        if ( maxStock > 0 ) {
            incrementButton = el_qty.parent().find('.wac-btn-inc');

            exceded = ( parseInt( el_qty.val() ) >= parseInt( maxStock ) );
            exceded ? incrementButton.hide() : incrementButton.show();
        }

        // fix to update "Your order" totals when cart is inside Checkout page (thanks @vritzka)
        if ( $( '.woocommerce-checkout' ).length ) {
            $( document.body ).trigger( 'update_checkout' );
        }

        $( document.body ).trigger( 'updated_cart_totals' );
        $( document.body ).trigger( 'wc_fragment_refresh' );
    };

    // overrided by wac-js-calls.php
    var wacZeroQuantityCheck = function(el_qty) {
        if ( el_qty.val() == 0 ) {
        	$('.page-preloader').addClass('closed');
            if ( !confirm(wooajaxcart_localization.warn_remove_text) ) {
                el_qty.val(1);
                return false;
            }
        }

        return true;
    };

    var wacListenChange = function() {
        $(".qty").unbind('change').on( 'change', function(e) {
        	// $('.page-preloader').removeClass('closed');
            // prevent to set invalid quantity on select
            if ( $(this).is('select') && ( $(this).attr('max') > 0 ) && ( $(this).val() > $(this).attr('max') ) ) {
                $(this).val( $(this).attr('max') );

                e.preventDefault();
                return false;
            }

            return wacChange( $(this) );
        });
    };

    var wacQtyButtons = function() {
        $(document).on('click','.wac-btn-inc', {} ,function(e){
            var inputQty = $(this).parent().find('.qty');
            inputQty.val( function(i, oldval) { return ++oldval; });
            inputQty.trigger( 'change' );
            return false;
        });

        $(document).on('click','.wac-btn-sub', {} ,function(e){
            var inputQty = $(this).parent().find('.qty');
			if ( !inputQty.parents('.woo_c-product.single-product').length ) {
				inputQty.val( function(i, oldval) { return oldval > 0 ? --oldval : 0; });
				inputQty.trigger( 'change' );
			} else {
				inputQty.val( function(i, oldval) { return oldval > 1 ? --oldval : 1; });
			}
            return false;
        });
    };

    wacListenChange();
    wacQtyButtons();

    $(document).on('updated_wc_div', function(){
    	$('.page-preloader').addClass('closed');
        wacListenChange();

    });

	// Quantities - plus, minus
	$("body").on("click", ".woo-quantity .plus:not(.cart_plus)", function(){
		var input = $(this).siblings("input[type=number]");
		if(input.attr("max") != input.attr("value")){
			input.val( +input.val() + 1 );
		}
		input.trigger( 'change' );
	});

	$("body").on("click", ".woo-quantity .minus:not(.cart_minus)", function(){
		var input = $(this).siblings("input[type=number]");
		if(input.attr("max") != input.attr("value")){
			input.val( +input.val() - 1 );
		}
		input.trigger( 'change' );
	});

	// Fixed wishlist button in single page
	if($('.summary .yith-wcwl-add-to-wishlist').length) {
		$('.single_add_to_cart_button').after($('.summary .yith-wcwl-add-to-wishlist').clone());
		$('.summary .yith-wcwl-add-to-wishlist').eq(1).remove();
	}

	if($('.single-product .summary .yith-wcwl-add-to-wishlist').length > 0) {
		var wishlistBtn = $('.single-product .summary .yith-wcwl-add-to-wishlist')
		wishlistBtn.each(function(i){
			if ( i > 0 ) {
				$(this).remove();
			}
		});
	}

	var checkoutFormRight = function(){
		var order = $("#order_review"), customer = $('.customer_details');

		if( order && customer){
			var cHeight = customer.outerHeight();
			var oHeight = order.outerHeight();

			$(".woo-c_checkout").css("min-height", ((cHeight > oHeight) ? cHeight : oHeight) + 100 + "px");
		}
	};

	// $('.stockie-slider .woo_c-products').removeClass('stockie-masonry');

	// Single product price
	var fixedPrice = function(price){
		var ins = price.find('ins');
		var del = price.find('del');

		if( price.length && ins.length == 1 && del.length && price.find('.price-discount').length == 0 ) {
			var separator = price.data('separator');
			var regular = del.text().split(separator);
			var regular = parseInt(regular[0].replace(/\D+/g,""));
			var sale = ins.text().split(separator);
			var sale = parseInt(sale[0].replace(/\D+/g,""));
			var percent = $(document.createElement('div'));

			if ( del.text().substring(del.text().indexOf(separator) + 1) > 0) {
				regular = del.text().replace(/[^0-9.]/g, "")
				sale = ins.text().replace(/[^0-9.]/g, "")
			}

			if ( price.find('.amount').length == 2 ) {
				var saleText = stockieVariables.saleL10n.toUpperCase();
				if( price.attr('data-sale-text') ) {
					saleText = price.attr('data-sale-text');
				}
				percent.addClass('price-discount brand-bg-color').html( '-' + parseInt( 100 - sale * 100 / regular ) + '% ' + saleText );
				price.append(percent);
			}

			del.insertAfter(ins);
		}
	};

	// Single product slider
	var handleSingleProduct = function(){

		// Resize images for single product slider
		$('[data-wc-slider] img').each(function(){
			$(this).parent().removeClass('true');
			if( $(this).outerHeight() < $(window).height() ){
				$(this).parent().addClass('true');
			}
		});
	};

	if($('[data-wc-slider] img').length > 1) {
		$('[data-wc-slider]').owlCarousel({
			items: 		1,
			slideBy: 	1,
			nav: 		false,
			dots: 		true,
			loop: 		false,
			autoHeight: false,
			autoplay: 	false,
			mouseDrag: 	true,
			touchDrag: 	true
		});
		owl.on('changed.owl.carousel', function(obj){
			var currentItem = obj.item.index;
			$('#product-thumbnails .image').removeClass('selected');
			$($('#product-thumbnails .image')[currentItem]).addClass('selected');
		});

		$('[data-wc-toggle-image]').on('click', function(){
			$('[data-wc-slider]').trigger('to.owl.carousel', [parseInt($(this).attr('data-wc-toggle-image')), 0, true]);
		});
	} else {
		$('[data-wc-slider]').addClass('empty');
	}

	function refreshWooCategory(){
		$('li.product-category').each(function(){
			var info = $(this).find('.info-wrap'),
				contentCenter = $(this).find('.center-aligned');

			$(this).find('>.wrap').css('height','0');

			var ratio = $(this).width() / this.imgWidth;
			var padding = info.innerHeight() - info.height();
			var height = this.imgHeight * ratio;

			$(this).find('>.wrap').css({
				'height': height + 'px',
				'min-height': (contentCenter.outerHeight() + padding ) + 'px'
			});
		});
	}

	$(window).on('load', function(){

		// Shop product gallery
		$('[data-product-item] .slider').each(function(){

			if($(this).find('img').length > 1) {
				var slider = $(this);

				if ( slider.parents('.shop-product-type_4').length == 1 && !slider.parents('.product-hover-2').length) {

					slider.owlCarousel({
						items: 1,
						slideBy: 1,
						nav: false,
						dots: true,
						loop: true,
						autoHeight: true,
						autoplay: false,
						autoplayTimeout: 5000,
						autoplayHoverPause: true,
						autoplaySpeed: 1000,
						mouseDrag: false,
						navClass:   ['owl-prev btn-round', 'owl-next btn-round'],
						navText: [ '<i class="ion ion-ios-arrow-back"></i>', '<i class="ion ion-ios-arrow-forward"></i>' ],
					});

				}

				if ( !slider.parents('.product-hover-2').length) {
					slider.owlCarousel({
						items: 1,
						slideBy: 1,
						nav: false,
						dots: true,
						loop: true,
						autoHeight: true,
						autoplay: false,
						autoplayTimeout: 5000,
						autoplayHoverPause: true,
						autoplaySpeed: 1000,
						navClass:   ['owl-prev btn-round', 'owl-next btn-round'],
						navText: [ '<i class="ion ion-ios-arrow-back"></i>', '<i class="ion ion-ios-arrow-forward"></i>' ],
					});
				}
			}
		});

		$('.woocommerce .images .slider, .woo_c-products .slider').addClass('visible');

		handleSingleProduct();
		fixedPrice( $('.product .summary p.price').eq(0) );

		// Change single product variations price
		$('.variations select').on('change', function(){
			setTimeout(function(){
				fixedPrice( $('.woo-variation-price') );
				handleSingleProduct();
			}, 10);
		});

		// If variation changed main image
		var mainImage = $('[data-wc-slider]').find('img').eq(0);
		var oldSrc = mainImage.attr('src');
		mainImage.on('load', function(){
			if( oldSrc != mainImage.attr('src') ){
				$('[data-wc-slider]').trigger('to.owl.carousel', [0, 0, true]);
				handleSingleProduct();
			}
		});

		fixedPrice( $('.woo-variation-price') );
		checkoutFormRight();

		// handleWooSwatches();

		$('a.hamburger, a.cart').on('click', function(e){
			e.preventDefault(e);
		});
		
		archiveProductsSlider();
	});

	$(window).on('resize', function(){
		handleSingleProduct();
		checkoutFormRight();
	});

	function archiveProductsSlider() {

		var wrapper = $('.shop-product-type_4 ');
		var slider = wrapper.find('.woo-products-slider');
		var mouseUpEnabled = true;
		var mouseDownEnabled = true;
		if ( slider.length > 0 ) {
			slider.owlCarousel({
				nav: true,
                navClass: ['owl-prev btn-round', 'owl-next btn-round'],
                navText: ['<i class="ion ion-ios-arrow-back"></i>', '<i class="ion ion-ios-arrow-forward"></i>'],
				loop: true,
				smartSpeed: 500,
				responsive:{
				  0:{
				      items: wrapper.attr('data-mobile-items'),
				  },
				  768:{
				      items: wrapper.attr('data-tablet-items'),
				  },
				  1025:{
				      items: wrapper.attr('data-desktop-items'),
				  }
				}
			});
			slider.on('changed.owl.carousel', function (e) {
				setTimeout(function(){
					if( e.item.index == 0 ){
						mouseUpEnabled = true;
					} else {
						mouseUpEnabled = false;
					}
					if( e.item.index + e.page.size == e.item.count ) {
						mouseDownEnabled = true;
					} else {
						mouseDownEnabled = false;
					}
				}, 300);
			});

			var test = true;

			slider.on('wheel mousewheel', '.owl-stage', function(e) {
				var y = e.originalEvent.deltaY;

				if ( test && ( (y > 0 && !mouseDownEnabled) || (y < 0 && !mouseUpEnabled) ) ) {
					$('html, body').animate({
						scrollTop: slider.offset().top - ( $(window).height() - slider.outerHeight() ) / 2
					}, 400);
					slider.trigger( (( y > 0 ) ? 'next.owl' : 'prev.owl'), 350 );
					test = false;
					setTimeout(function(){
						test = true;
					}, 350 );
				}

				if ( ( y > 0 && !mouseDownEnabled ) || ( y < 0 && !mouseUpEnabled ) ) {
					return false;
				}
			});
		}
	}
	

	$( document ).on( 'click', '.variations_button.sticky-product-btn', function () {
		var variationBtn = $( '#variation_form_anchor .variations_button .single_add_to_cart_button' );

		if (!variationBtn.hasClass('added')) {
			variationBtn.trigger( 'click' );
		}
	});

	$('.checkout_coupon #coupon_code').change(function () {
		$('[name=coupon_code]').val($(this).val());
	});

	$('.checkout_coupon [name=apply_coupon]').click(function (e) {
		e.preventDefault();
		$('#coupon_form').submit();
	});

	jQuery( document ).ajaxComplete( function() {
	    if ( jQuery( 'body' ).hasClass( 'woocommerce-cart' ) ) {
	        jQuery( 'html, body' ).stop();
	    }
	} );

})(jQuery);