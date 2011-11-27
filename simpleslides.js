(function() {
	var SPACEBAR = 32,
		ARROW_RIGHT = 39,
		ARROW_LEFT = 37,
		FORWARD = 1,
		BACKWARD = -1,
		currentSlide = 0,
		slideCount,
		screenWidth,
		screenHeight;

	$(function() {
		setup();
		$(window).resize(setup)
				 .click(nextPage)
				 .keydown(function(event) {
			if ([SPACEBAR, ARROW_RIGHT].indexOf(event.which) !== -1) {
				nextPage();
			} else if ([ARROW_LEFT].indexOf(event.which) !== -1) {
				prevPage();
			}
			return false;
		});
	});

	function setup() {
		var $presentation = $('#presentation'),
			$slides = $('.slide'),
			$window = $(window),
			totalPresentationWidth,
			$slideContainers;

		$slides.wrap('<div class="slide-container" style="float: left" />');
		$slideContainers = $('.slide-container');

		screenWidth = $window.width();
		screenHeight = $window.height();
		slideCount = $slides.length;
		totalPresentationWidth = slideCount * screenWidth;
		$presentation.css('width', totalPresentationWidth);
		$slideContainers.css('width', screenWidth + 'px')
						.css('height', screenHeight + 'px');
	}

	function nextPage() {
		changePage(FORWARD);
	}

	function prevPage() {
		changePage(BACKWARD);
	}

	function changePage(direction) {
		if (currentSlide + direction >= 0 && 
				currentSlide + direction < slideCount) {
			currentSlide += direction;
			$('body').animate({scrollLeft: currentSlide * screenWidth}, 400);
		}	
	}
})();