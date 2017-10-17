$(document).ready(function(){
  $('.question h3').on('click', function(){
    $('.ask').slideUp();
    $('.question.open-border').removeClass('open-border');
    $(this).parent().addClass('open-border');
    $(this).next('.ask').slideDown();
  });

  $('.q-tab h2').on('click', function(){
    $('.q-inner').slideUp();
    $('.main-ec span').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    $(this).next('.q-inner').slideDown();
    $(this).parent().removeClass('main-closed');
    $(this).find('span').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
  });

  // changes section arrow when clicked on Estimate Your Rate submit button
  $('.graduate-submit').on('click', function(){
    $('.estimate-rate .main-ec .glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    $('.qualify-loan .main-ec .glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
  });

  // user clicks on submit button in left-questions column, close that box and open the next
  $('.left-questions .submit').on('click', function(){
    $(this).parent().slideUp().parent().removeClass('open-border').removeClass('unanswered').addClass('answered').next('.question').addClass('open-border').find('.ask').slideDown();

  });

  // user clicks on final submit button of category, close category, open next
  $('.left-questions .end-submit').on('click', function(){
    $(this).parent().parent().parent().slideUp().parent().next('.q-tab').find('.q-inner').slideDown().find('.income .ask').slideDown();
  });


  // initialize bootstrap tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  $(".soft-pull").click(function(e){
   e.preventDefault();
   $('.apply').prop("disabled", false).addClass('apply-activated').text('APPLY');
  });


// -- CONTROLS FOR FINOVATE DEMO -- //

  // remove lender when selecting undergraduate
  $('.degree .submit').on('click', function(){
    $('#hineguard').delay('500').slideUp();
  });

  // when user clicks on "next" in marketplace, show then fade out loading gif
  $('.submit, .end-submit').on('click', function(){
    $('.each-offer .loader.delay1').show().delay('1000').fadeOut();
    $('.each-offer .loader.delay2').show().delay('2000').fadeOut();
    $('.each-offer .loader.delay3').show().delay('1500').fadeOut();
    $('.each-offer .loader.delay4').show().delay('800').fadeOut();
    $('.each-offer .loader.delay5').show().delay('1250').fadeOut();
  });



  // activate "Submit" final button on Gathering when final check box is set
  $('.ach-authorization').on('click', function(){
    if($(this).is(':checked')) {
      $('#ach-auth .submit-application').prop('disabled', false).addClass('apply-activated');
    } else {
      $('#ach-auth .submit-application').prop('disabled', true).removeClass('apply-activated');
    }
  });

  // activate "Submit Application" button on Application page when final check box is set
  $('.loan-notice-check').on('click', function(){
    if($(this).is(':checked')) {
      $('.submit-application').prop('disabled', false).addClass('apply-activated');
    } else {
      $('.submit-application').prop('disabled', true).removeClass('apply-activated');
    }
  });

  // expand "Sallie Mae" area for Existing Loans for Payoff Letter
  $('.sallie-mae').on('click', function(){
    if($(this).is(':checked')) {
      $('.sallie-mae-expand').slideRow('down');
    } else {
      $('.sallie-mae-expand').slideRow('up');
    }
  });


  $('.fixed-rate-check').on('click', function(){
    if($(this).is(':checked')) {
      $('#onenation').slideDown();
      $('#hineguard').slideDown();
    } else {
      $('#onenation').slideUp();
      $('#hineguard').slideUp();
    }
  });

  $('#dob').focusout(function(){
    $('li.personal-information').addClass('active').wrapInner('<span class="on"></span>');
  });

  $('#borrowerCellPhone').focusout(function(){
    $('li.contact-information').addClass('active').wrapInner('<span class="on"></span>');
  });

  $('#borrowerEmployerPhone').focusout(function(){
    $('li.employment-information').addClass('active').wrapInner('<span class="on"></span>');
  });

  $('#borrowerOtherIncome').focusout(function(){
    $('li.income-information').addClass('active').wrapInner('<span class="on"></span>');
  });

  $('#payoff-information .gathering-btn').click(function(){
    $('li.payoff-information').addClass('active').wrapInner('<span class="on"></span>');
  });

  $('#confirm-identity .gathering-btn').click(function(){
    $('li.confirm-identity').addClass('active').wrapInner('<span class="on"></span>');
    $('.cyi-close').slideUp();
    $('.cyi-success').slideDown();
  });

  $('#proof-income .gathering-btn').click(function(){
    $('li.proof-of-income').addClass('active').wrapInner('<span class="on"></span>');
    $('.poi-close').slideUp();
    $('.poi-success').slideDown();
  });







  // <tr> table row sliding up and down function
  (function($) {
    var sR = {
        defaults: {
            slideSpeed: 400,
            easing: false,
            callback: false
        },
        thisCallArgs: {
            slideSpeed: 400,
            easing: false,
            callback: false
        },
        methods: {
            up: function (arg1,arg2,arg3) {
                if(typeof arg1 == 'object') {
                    for(p in arg1) {
                        sR.thisCallArgs.eval(p) = arg1[p];
                    }
                }else if(typeof arg1 != 'undefined' && (typeof arg1 == 'number' || arg1 == 'slow' || arg1 == 'fast')) {
                    sR.thisCallArgs.slideSpeed = arg1;
                }else{
                    sR.thisCallArgs.slideSpeed = sR.defaults.slideSpeed;
                }

                if(typeof arg2 == 'string'){
                    sR.thisCallArgs.easing = arg2;
                }else if(typeof arg2 == 'function'){
                    sR.thisCallArgs.callback = arg2;
                }else if(typeof arg2 == 'undefined') {
                    sR.thisCallArgs.easing = sR.defaults.easing;
                }
                if(typeof arg3 == 'function') {
                    sR.thisCallArgs.callback = arg3;
                }else if(typeof arg3 == 'undefined' && typeof arg2 != 'function'){
                    sR.thisCallArgs.callback = sR.defaults.callback;
                }
                var $cells = $(this).find('td');
                $cells.wrapInner('<div class="slideRowUp" />');
                var currentPadding = $cells.css('padding');
                $cellContentWrappers = $(this).find('.slideRowUp');
                $cellContentWrappers.slideUp(sR.thisCallArgs.slideSpeed,sR.thisCallArgs.easing).parent().animate({
                                                                                                                    paddingTop: '0px',
                                                                                                                    paddingBottom: '0px'},{
                                                                                                                    complete: function () {
                                                                                                                        $(this).children('.slideRowUp').replaceWith($(this).children('.slideRowUp').contents());
                                                                                                                        $(this).parent().css({'display':'none'});
                                                                                                                        $(this).css({'padding': currentPadding});
                                                                                                                    }});
                var wait = setInterval(function () {
                    if($cellContentWrappers.is(':animated') === false) {
                        clearInterval(wait);
                        if(typeof sR.thisCallArgs.callback == 'function') {
                            sR.thisCallArgs.callback.call(this);
                        }
                    }
                }, 100);
                return $(this);
            },
            down: function (arg1,arg2,arg3) {
                if(typeof arg1 == 'object') {
                    for(p in arg1) {
                        sR.thisCallArgs.eval(p) = arg1[p];
                    }
                }else if(typeof arg1 != 'undefined' && (typeof arg1 == 'number' || arg1 == 'slow' || arg1 == 'fast')) {
                    sR.thisCallArgs.slideSpeed = arg1;
                }else{
                    sR.thisCallArgs.slideSpeed = sR.defaults.slideSpeed;
                }

                if(typeof arg2 == 'string'){
                    sR.thisCallArgs.easing = arg2;
                }else if(typeof arg2 == 'function'){
                    sR.thisCallArgs.callback = arg2;
                }else if(typeof arg2 == 'undefined') {
                    sR.thisCallArgs.easing = sR.defaults.easing;
                }
                if(typeof arg3 == 'function') {
                    sR.thisCallArgs.callback = arg3;
                }else if(typeof arg3 == 'undefined' && typeof arg2 != 'function'){
                    sR.thisCallArgs.callback = sR.defaults.callback;
                }
                var $cells = $(this).find('td');
                $cells.wrapInner('<div class="slideRowDown" style="display:none;" />');
                $cellContentWrappers = $cells.find('.slideRowDown');
                $(this).show();
                $cellContentWrappers.slideDown(sR.thisCallArgs.slideSpeed, sR.thisCallArgs.easing, function() { $(this).replaceWith( $(this).contents()); });

                var wait = setInterval(function () {
                    if($cellContentWrappers.is(':animated') === false) {
                        clearInterval(wait);
                        if(typeof sR.thisCallArgs.callback == 'function') {
                            sR.thisCallArgs.callback.call(this);
                        }
                    }
                }, 100);
                return $(this);
            }
        }
    };

    $.fn.slideRow = function(method,arg1,arg2,arg3) {
        if(typeof method != 'undefined') {
            if(sR.methods[method]) {
                return sR.methods[method].apply(this, Array.prototype.slice.call(arguments,1));
            }
        }
    };
    })(jQuery);

});
