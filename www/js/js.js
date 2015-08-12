$(document).ready(function(){

    var $owl = $('.owl-carousel'),
        $comparisons = $('#comparisons');


	if($owl.length){
		$owl.owlCarousel({
		    margin:0,
		    nav:false,
		    items: 1,
		    dotsContainer:".carousel_nav",

		});
        // $owl.on('initialized.owl.carousel', function(event) {
        //     if($('.active .item').find('.slide_references').length < 1){
        //         $('#open_ref').fadeIn(200);
        //     }else{
        //         $('#open_ref').fadeOut(200);

        //     }
        // });
        $owl.on('changed.owl.carousel', function(event) {

            $('#open_ref,.slide_references').removeClass('open');
            if($('#sticky_background').length){
                if(event.item.count - event.item.index <= 1){
                    $('#sticky_background').insertAfter('.owl-carousel');
                }
                if(event.item.count - event.item.index >= 3){
                    $('#sticky_background').appendTo('#second-last');
                }
            }

            //if($('.story').length && $('.active .item').find('.slide_references').length < 1){
            if($('.owl-item').eq(event.item.index).find('.slide_references').length < 1){
                //if(event.item.count - event.item.index <= 1){
                $('#open_ref').fadeOut(200);
            }else{
                $('#open_ref').fadeIn(200);

            }

        });
	}

	$('.open-popup-link').magnificPopup({
		type:'inline',
		midClick: true,
        mainClass: 'mfp-fade',
        closeMarkup: '<button title="%title%" class="mfp-close"></button>',
        removalDelay: 500,
        callbacks: {
            open: function(){
                if($comparisons.length){
                    $.fn.fullpage.setAllowScrolling(false);
                    $.fn.fullpage.setKeyboardScrolling(false);
                }
            },
            beforeClose: function(){
                $("#ra_diagram").attr("coords", "90,20,20");
                $("#as_diagram").attr("coords", "110,20,20");
                $("#psa_diagram").attr("coords", "110,20,20");

                $("#as_story_diagram1").attr("coords", "105,20,20");
                $("#as_story_diagram2").attr("coords", "345,20,20");
                $("#as_story_diagram3").attr("coords", "605,20,20");

                $("#psa_story_diagram1").attr("coords", "105,20,20");
                $("#psa_story_diagram2").attr("coords", "345,20,20");
                $("#psa_story_diagram3").attr("coords", "605,20,20");

                $("#ra_story_diagram1").attr("coords", "95,20,20");
                $("#ra_story_diagram2").attr("coords", "205,20,20");
                $("#ra_story_diagram3").attr("coords", "330,20,20");
                $("#ra_story_diagram4").attr("coords", "620,20,20");
            },
            close: function(){
                $('.popup_container').removeClass('ref_text_open');
                $('.popup_container.open_by_default').addClass('ref_text_open');
                //resizeMap();
                $('.marker_img').removeClass('active');
                //$('.popup_container').removeClass('ref_text_open');

                if($comparisons.length){
                    $.fn.fullpage.setAllowScrolling(true);
                    $.fn.fullpage.setKeyboardScrolling(true);
                }
            }

        }
	});

	if($comparisons.length){

		$comparisons.fullpage({
            controlArrows: false,
            resize: true,
            normalScrollElements:'.mfp-wrap',
            afterLoad: function(anchorLink, index){
                if(index == 2){
                    $('#heads').fadeIn();
                }
            },
	        onLeave: function(index, nextIndex, direction){
	            if(index == 2 && direction == 'up'){
	                $('#heads').hide();
	            }
	        }
		});
        $('.next_section').click(function(){
            $.fn.fullpage.moveSectionDown();
        });
        $('.backtotop').click(function(){
            $.fn.fullpage.moveTo(1);
            $('#heads').fadeOut(100);
        });
	}

    function resizeMap(){
      if($("map").length){
          $("map").each(function() {
            var img = $("img[usemap='#" + $(this).attr("name") + "']");
            var ogW = img.width();
            setTimeout(function(){
                var newW = img.width();

                widthchange = newW/ogW;
                //borrowed this from Nick's answer.  It was spot on!
                $("area").each(function() {
                  var pairs = $(this).attr("coords").split(',');
                  for(var i=0; i<pairs.length; i++) {
                      var nums = pairs[i].split(',');
                      for(var j=0; j<nums.length; j++) {
                          nums[j] = parseFloat(nums[j]) * widthchange;
                      }
                      pairs[i] = nums.join(',');
                  }
                  $(this).attr("coords", pairs.join(', '));
                });
            }, 250);
          });
        }
    }

    $('.open_references').click(function(){
        $(this).closest('.popup_container').toggleClass('ref_text_open');
        resizeMap();
        return false;
    });

    $('.diagram_marker').click(function(){
        var markerimg = $(this).data('markerimg');
        //if($('.marker_img.active').length){
        $('.marker_img.active').not(markerimg).removeClass('active');
        //}
        $(markerimg).toggleClass('active');
        return false;
    });

    $('header .menu_toggle').click(function(){
        $('body').toggleClass('menu_open');
        return false;
    });

    $('.button .menu_toggle').click(function(){
		if (!$('body').hasClass('menu_open')) {
			$('body').addClass('menu_open');
		}
		$('.menu.open .has_ul').parent('li').toggleClass('submenu_open');
        $('.menu.open .has_ul').next('ul').slideToggle();
        return false;
    });

    $('.has_ul').click(function(){
        $(this).parent('li').toggleClass('submenu_open')
        $(this).next('ul').slideToggle();
    });
    // detect class submenu_open on parent ul //
    if($('.submenu_open .has_ul').length){
        var $active_ul = $('.submenu_open').find('ul');
        $active_ul.show();
    }
    // detect class active on ul li's //
    if($('.menu ul li.active').length){
        var $active_ul = $('.menu ul li.active').parent('ul');
        $active_ul.show();
        $active_ul.closest('li').addClass('submenu_open');
    }
    $('.tab').click(function(){
        var menuid = $(this).data('menuid');
        if(!$(menuid).hasClass('open')){
            $('.tab.active').removeClass('active');
            $(this).addClass('active');
            $('.menu.open').fadeOut(200,function(){
                $(this).removeClass('open');
                $(menuid).fadeIn(200).addClass('open');
            });
        }
    });

    //$('#open_info').click(function(){
    $(document).on('click','#open_info',function(){
        //if($('#open_ref').hasClass('open')){
        if($('#open_ref.open').length){
            $('.slide_references,#open_ref').removeClass('open');
            setTimeout(function(){
                $('#info,#open_info').addClass('open');
            }, 220);
        }else{
            $('#info,#open_info').toggleClass('open');
        }
        return false;
    });
    $('#info_button').click(function(){
        $('#info,#open_info').addClass('open');
        $('.slide_references,#open_ref').removeClass('open');
    });

    $('#info .close_popup').click(function(){
        $('#info,#open_info').removeClass('open');
    });

    //$(document).on('click','#open_ref',function(){
    $('#open_ref').on('click',function(){
        if($('#info.open').length){
            $('#info,#open_info').removeClass('open');
            setTimeout(function(){
                $('.active .slide_references,#open_ref').addClass('open');
            }, 220);
        }else{
            $('.active .slide_references,#open_ref').toggleClass('open');
        }
        return false;
    });
    $(document).on('click','.slide_references .close_popup',function(){
        $('.active .slide_references,#open_ref').removeClass('open');
    });


});