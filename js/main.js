$(document).ready(function() {
	var SCROLL_OFSET_TOP = 50;
	var headerHeight = 56;		// $('nav').height();
	var $window = $(window);
	var $navbar = $('.navbar');
	var $animateElems = $('.tc-animated');
	var animatedCount = 0;
	var $socialBtn = $('.tc-social-btn');

	function scrollToElement(event) {
		var elem = event.data.elem;
		if (elem) {
			$(".navbar-collapse").collapse('hide');
			scrollTo(elem);
		}
	}
	
	function scrollTo(elem, duration) {		
		var top = $(elem).offset().top - headerHeight;
		duration = duration ? duration : 700;
		$('html, body').animate({ scrollTop: top }, 700);
	}

	function checkInView() {
		var winTopPosition = $window.scrollTop();
		var winWidth = $window.width();

		// Expand header 
		if (winTopPosition > 5) {
			$navbar.addClass('small');
		} else {
			$navbar.removeClass('small');
		}

		// Show/hide social buttons
		if (winWidth >= 768) {
			if (winTopPosition >= SCROLL_OFSET_TOP) {
				$socialBtn.addClass('display');
			} else {
				$socialBtn.removeClass('display');
			}
		}

		// Show animation of elements at the first time
		if (animatedCount < $animateElems.length) {
			var winHeight = $window.height();
			var winBottomPosition = winTopPosition + winHeight;

			$.each($animateElems, function() {
				var $elem = $(this);
				if (!$elem.hasClass('in-view')) {
					var elemHeight = $elem.outerHeight();
					var elemTopPosition = $elem.offset().top;
					var elemBottomPosition = elemTopPosition + elemHeight;

					// Check whether current element is in viewport or not
					if (elemBottomPosition >= winTopPosition && elemTopPosition <= winBottomPosition) {
						$elem.addClass('in-view');
						animatedCount++;
					}	
				}
			});
		}		
	}

	function initRecruitPage() {
		$('.job-sum').click(function() {
			var id = $(this).attr('jobid');				
			$('.jobs-container').hide();
			$('.jobs-detail-container').show();
			$('[class^=job-detail]').hide();		
			$('.job-detail-' + id).show();
			scrollTo('.jobs-detail-container', 10);
		});

		$('#returnToSum').click(function(){
			$('.jobs-container').show();
			$('.jobs-detail-container').hide();
			scrollTo('.jobs-container', 10);
		});
	}

	function init() {
		$('.intro-link').click({elem: '.introduction'}, scrollToElement);
		$('.products-link').click({elem: '.products'}, scrollToElement);
		$('.benefits-link').click({elem: '.benefits'}, scrollToElement);
		
		$(document).click(function(event) {
			var clickover = $(event.target),
				navbar = $('.navbar-collapse'),
				opened = navbar.hasClass('show');
			if (opened && !clickover.hasClass('navbar-toggle'))	{
				navbar.collapse('hide');
			}
		});

		initRecruitPage();

		$window.on('scroll', checkInView);
		$window.trigger('scroll');
	}
	
	init();
});