(function($){
	$(document).ready(function(){
		setQuoteListeners();
		var firstTile = $('.tile-1');
		if (firstTile.length > 1) {
			var firstTile = $('.tab-pane.active .tile-1');
		}

		firstTile.click();

	});

	function setQuoteListeners(){
		$('.persona-tile').on('click', function(){
			// quote is stored in hidden div inside each tile
			var quote = $(this).find('.overlay-quote').text();
			// update text if quote is found
			if (quote){
				appendQuote(quote);
			}
			$('.persona-tile').removeClass('selected');
			$(this).addClass('selected');
		});


		$('.persona-tile').on('mouseenter', function(e){
			var quote = $(this).find('.overlay-quote').text();
			// update text if quote is found
			if (quote){
				appendQuote(quote);
			}
		});

	}

	function appendQuote(str){
		$('.main-quote').stop().animate({opacity: 0}, 200, function(){
			$(this).empty().text(str).animate({opacity: 1}, 200);
		});
	}

})(jQuery);


(function($){


	$(document).ready(function(){

		setUpSliders();

		// Listen for radio button updates to form
		$( '#lk-credit-form input:radio[name=credit-rating]' ).click(calculatePayment);

		// Safari form validation fix
		$( '.calc-form-wrapper' ).on('submit', function(e){
			var selectFields = $(this).find('select');
			selectFields.each(function(i){
				if(selectFields[i].value === ""){
					$(selectFields[i]).css('border', '2px solid red');
					e.preventDefault();
				}
			});
		})


		$('.product-popup .fa').on('click', function(e){
			var popUp = $('.product-popup .content-wrapper');
			if (popUp.length) {
				$(popUp).animate({top: '-48px', opacity: 0})
			}
		});

		detectLoanRefer();

	});


	function setUpSliders(){
		// Create Sliders (namespace, minimum, maximum, step value, unit label)

		// create interest rate slider only if it exists on the page
		var currentPaymentSlider = $( '.current-payment' );

		if( currentPaymentSlider.length ){
			// Student Loan Refi
			createSlider('loan-amount', 5000, 175000, 80000, 1000, '$');
			createSlider('current-payment', 200, 2500, 750, 50, '$');
		} else {
			// Private Student Loan
			createSlider('loan-amount', 5000, 100000, 30000, 1000, '$');
		}

		// set initial amount based on starting values
		calculatePayment();

		// listen for change on any of the sliders, but wait for user to stop sliding to calculate
		$( '.slider' ).on("slidestop", calculatePayment);
	}

	function calculatePayment(){
		// grab the values of each slider
		var loanAmount = $( ".loan-amount .slider" ).slider("value");
		var currentMonthly = $( ".current-payment .slider" ).slider("value");
		var creditRadioSelect = $('#lk-credit-form input:radio[name=credit-rating]:checked').val()

		var rateLookup = {
			fair: 0.00583,
			good: 0.0045,
			excellent: 0.00243
		}

		// look up rate based on user's selection
		var rate = rateLookup[creditRadioSelect];

		// do some maths
		var denominator = Math.pow( ( rate+1 ), 180 ) - 1;
		var monthlyPayment = (rate + ( rate / denominator)) * loanAmount;

		// clean it up
		var roundedPayment = Math.round( monthlyPayment );

		// calculate savings
		var currentAnnual = currentMonthly * 12;
		var newAnnual = roundedPayment * 12;
		var totalAnnualSavings = currentAnnual - newAnnual;

		// animate monthly payment display to user
		$( '.monthly-payment .monthly-amount' ).stop().animate({opacity:0}, 100, function(){
			$(this).text("$" + commafyNumber(roundedPayment) + "/month").stop().animate({opacity:1}, 300);
		});

		var calcOutput = $( '.calculator-output .savings-amount' );

		if(calcOutput.length){
			calcOutput.stop().animate({opacity:0}, 100, function(){
				if ( totalAnnualSavings < 0) {
					totalAnnualSavings = "Results do not show annual savings"
					$(this).text(totalAnnualSavings).stop().animate({opacity:1}, 300);
					$(this).css({fontSize: "18px", display: "block" });
				} else {
					$(this).text("$" + commafyNumber(totalAnnualSavings)).stop().animate({opacity:1}, 300);
					$(this).css({fontSize: "30px" });
				}
			});
		}

	}

	function createSlider(name, min, max, initialValue, step, unit){
		// select class name for JQuery
		var cssSelector = "." + name;

		// grab JQuery elements of slider and its label
		var slider = $( cssSelector + " .slider" );
		var label = $( cssSelector + " .slider .ui-slider-handle" );
		// $('.ui-slider-handle').text('yo')

		// initiate JQueryUI Slider with supplied values
		slider.slider({
			animate: "slow",
			value: initialValue,
			min: min,
			max: max,
			step: step,
			slide: function(event, ui){
				var amount = commafyNumber(ui.value);
				if (unit === "$"){
					$(this).children('.ui-slider-handle').text( unit + amount );
				} else {
					$(this).children('.ui-slider-handle').text( amount + unit );
				}
			}
		});

		// set initial label value to slider's value
		// label.text( slider.slider('value') + " " + unit );
		//
		if ( unit === "$" ){
			slider.value = initialValue;
			slider.children('.ui-slider-handle').text( unit + commafyNumber(initialValue) );
		} else {
			slider.value = initialValue;
			slider.children('.ui-slider-handle').text( commafyNumber(initialValue) + unit );
		}


		// set initial range labels to min/max
		if ( unit === "$"){
			$( cssSelector + ' ' + '.min' ).text( unit + ' ' + commafyNumber(min) );
			$( cssSelector + ' ' + '.max' ).text( unit + ' ' + commafyNumber(max) );
		} else {
			$( cssSelector + ' ' + '.min' ).text( commafyNumber(min) + ' ' + unit);
			$( cssSelector + ' ' + '.max' ).text( commafyNumber(max) + ' ' + unit);
		}
	}

	function commafyNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

 function detectLoanRefer(){
 	var ref = document.referrer;
 	if(ref.toLowerCase().indexOf('custudentloans') >= 0) {
 		$('.product-popup .content-wrapper').animate({top: '0px', opacity: 1})
 	}
 }


})(jQuery);



(function($){


	$(document).ready(function(){
		setTimeout(function(){
			var odometer = $( '#odometer' );
			animateOdometer(odometer);
		}, 100);
	});

	$('.scroll-down-leader a').click(function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(target).offset().top - 50
		}, 500);
	});

	$('sup').click(function(){
		var target = $('#disclaimer');
		target.addClass('in');
		target.attr("aria-expanded","true");
		$('html, body').animate({
			scrollTop: $(target).offset().top - 50
		}, 500);
	});

	$('a.main-cta').click(function(e){
		var href = $(this).attr('href');
		if ( href && href[0] == "#" ) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $(href).offset().top - 50
			}, 1000);
		}
	});

	$('a.lenders-cta').click(function(e){
		var href = $(this).attr('href');
		if ( href && href[0] == "#" ) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $(href).offset().top - 50
			}, 1000);
		}
	});

	$('a.lender-cta').click(function(e){
		var href = $(this).attr('href');
		if ( href && href[0] == "#" ) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $(href).offset().top - 50
			}, 1000);
		}
	});



	$('#disclaimer').on('shown.bs.collapse', function () {
		// scroll down when bottom disclaimers are shown
		$('html, body').animate({
			scrollTop: document.body.scrollHeight
		}, 500);
	});

	var topNav = $( '.top-nav' );
	var navBar = $( '.navbar' );

	$(window).on('scroll', function(){
		stop = Math.round($(window).scrollTop());
		if ( stop > 100) {
			shrinkNavBars();
		} else {
			restoreNavBars();
		}
	});

	function shrinkNavBars(){
		topNav.addClass('shrinkTopNav')
		navBar.addClass('shrinkNavBar')
	}

	function restoreNavBars(){
		topNav.removeClass('shrinkTopNav')
		navBar.removeClass('shrinkNavBar')
	}

	function animateOdometer(odometer){
		var dayInMilliseconds = 1000*60*60*24; // 1 second x 1 minute x 1 hour x 24 hours (1 day)
		var dayZero = new Date(2015,03,23);
		var todaysDate = new Date();

		var diffDays = Math.round( (todaysDate.getTime() - dayZero.getTime() )/(dayInMilliseconds) ) - 1;

		var dataSpan = $( '.odometer-data' );
		var odometerStart = dataSpan.data('start');
		var odometerDaily = dataSpan.data('step');

		var finalNumber = odometerStart + ( diffDays * odometerDaily );
		odometer.text(finalNumber);
	}

})(jQuery);



(function($){
	function updateCurrentStep(index){
		// strip all steps of current-step styling
		listItems.removeClass( 'current-step' );
		// give the correct step the styling based off the index
		var currentStep = listItems.get(index);
		currentStep.className += ' current-step';
	}

	function updateStepContent(index){
		// raw html of content div currently active on screen
		var incomingDiv = contentWrapper.children()[index];

		// get text content of the current step
		var incomingBody = incomingDiv.childNodes[1].innerHTML;

		// get # of minutes from incoming step
		var incomingEstimate = incomingDiv.childNodes[3].innerHTML;

		// fade out the parent div, run function after that finishes
		viewableDivContent.stop().animate({opacity: 0}, 200, function(){
			// update the text body
			$(this).children('.step-body').text(incomingBody);
			// update the number
			$(this).find('.number').text(incomingEstimate);
			// then show it to the user, animate back in over a half second
			$(this).animate({opacity: 1}, 500)
		})
	}

	var step = $('#step')
	if (step.length > 0){
		var currentIndex = 0;
		var viewableDivContent = $( '.step-content-viewable' )
		// jQuery collection of li's that represent steps
		var listItems = $( '.step-link' );

		// Main Bootstrap Carousel element
		var monitorCarousel = $( '#monitor-carousel' );

		var contentWrapper = $( '.step-content-wrapper' );
		updateCurrentStep(0);
		updateStepContent(0);
		// Update current step styling on auto cycle of carousel
		monitorCarousel.on('slide.bs.carousel', function(slideEvent){
			// Get data attribute 'slide-index' from the incoming carousel item
			var currentSlide = slideEvent.relatedTarget.dataset.slideIndex

			// send the slide index to the update functions
			updateCurrentStep(currentSlide);
			updateStepContent(currentSlide);

			// update stored variable in case it's needed
			currentIndex = currentSlide;
		});


	}
})(jQuery);


(function($){
	var parentLinks = $( '.menu-item-has-children' );

	$('#menu-main-menu>li>a').click(function(e){
		e.preventDefault();
	});

	$('#menu-main-menu-1>li>a').click(function(e){
		e.preventDefault();
	});

})(jQuery);


(function($){
	$(document).ready(function(){
		var menuRight = document.getElementById( 'cbp-spmenu-s2' ),
				body = document.body;

		function disableOther( button ) {
			if( button !== 'showRightPush' ) {
				$('.showRightPush').toggleClass( 'disabled' );
			}
		}

		$('.showRightPush').on('click', function(e) {
			e.preventDefault();
			$(this).toggleClass( 'active' );
			$('.page-wrapper').toggleClass( 'cbp-spmenu-push-toleft' );
			$('#cbp-spmenu-s2').toggleClass( 'cbp-spmenu-open' );
			disableOther( 'showRightPush' );
		});
	});
})(jQuery);

(function($) {

  // Matches trailing non-space characters.
  var chop = /(\s*\S+|\s)$/;

  // Return a truncated html string.  Delegates to $.fn.truncate.
  $.truncate = function(html, options) {
    return $('<div></div>').append(html).truncate(options).html();
  };

  // Truncate the contents of an element in place.
  $.fn.truncate = function(options) {
    if ($.isNumeric(options)) options = {length: options};
    var o = $.extend({}, $.truncate.defaults, options);

    return this.each(function() {
      var self = $(this);

      if (o.noBreaks) self.find('br').replaceWith(' ');

      var text = self.text();
      var excess = text.length - o.length;

      if (o.stripTags) self.text(text);

      // Chop off any partial words if appropriate.
      if (o.words && excess > 0) {
        excess = text.length - text.slice(0, o.length).replace(chop, '').length - 1;
      }

      if (excess < 0 || !excess && !o.truncated) return;

      // Iterate over each child node in reverse, removing excess text.
      $.each(self.contents().get().reverse(), function(i, el) {
        var $el = $(el);
        var text = $el.text();
        var length = text.length;

        // If the text is longer than the excess, remove the node and continue.
        if (length <= excess) {
          o.truncated = true;
          excess -= length;
          $el.remove();
          return;
        }

        // Remove the excess text and append the ellipsis.
        if (el.nodeType === 3) {
          $(el.splitText(length - excess - 1)).replaceWith(o.ellipsis);
          return false;
        }

        // Recursively truncate child nodes.
        $el.truncate($.extend(o, {length: length - excess}));
        return false;
      });
    });
  };

  $.truncate.defaults = {

    // Strip all html elements, leaving only plain text.
    stripTags: false,

    // Only truncate at word boundaries.
    words: false,

    // Replace instances of <br> with a single space.
    noBreaks: false,

    // The maximum length of the truncated html.
    length: Infinity,

    // The character to use as the ellipsis.  The word joiner (U+2060) can be
    // used to prevent a hanging ellipsis, but displays incorrectly in Chrome
    // on Windows 7.
    // http://code.google.com/p/chromium/issues/detail?id=68323
    ellipsis: '\u2026' // '\u2060\u2026'

  };

})(jQuery);
