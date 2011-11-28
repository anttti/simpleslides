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
		
	window.onload = function() {
		prepare();
		setup();
		
		window.onresize = setup;
		window.onclick = nextPage;
		window.onkeydown = function(event) {
			if ([SPACEBAR, ARROW_RIGHT].indexOf(event.which) !== -1) {
				nextPage();
			} else if ([ARROW_LEFT].indexOf(event.which) !== -1) {
				prevPage();
			}
			return false;
		};
	}
	
	function prepare() {
		var slides = document.getElementsByClassName('slide');
		wrap(slides, '<div class="slide-container" style="float: left"></div>');
	}
	
	function setup() {
		var presentation = document.getElementById('presentation'),
			slides = document.getElementsByClassName('slide'),
			totalPresentationWidth,
			slideContainers;

		
		slideContainers = document.getElementsByClassName('slide-container');

		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
		
		slideCount = slides.length;
		totalPresentationWidth = slideCount * screenWidth;
		
		presentation.style['width'] = totalPresentationWidth + 'px';

		for(var i=0;i<slideContainers.length;i++) {		
			slideContainers[i].style['width'] = screenWidth + 'px';
			slideContainers[i].style['height'] = screenHeight + 'px';
		}
		
		correctScroll();
	}
	
	function wrap(slides, containerHtml) {		
		var containerBase = document.createElement('div');
		containerBase.innerHTML = containerHtml;
	
		for(var i=0;i<slides.length;i++) {		
			var container = containerBase.firstChild.cloneNode(true);
			var parent = slides[i].parentNode;

			parent.insertBefore(container, slides[i]);
			container.appendChild(slides[i]);
		}
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
	
			animateScroll(currentSlide * screenWidth);
		}	
	}
	
	function animateScroll(position) {
		var d = 400;
		var fps = 50;
		var frames = (d / 1000) * fps; // How many frames?
		var perFrame = 1000/fps; // How much time per frame?
		var step = (position - document.body.scrollLeft) / frames;
		
		var intervalID = window.setInterval(function() {
			scrollBody(step);
		}, perFrame);
		
		window.setTimeout(function() {
			window.clearInterval(intervalID);
			correctScroll();
		}, d);
	}
	
	function scrollBody(step) {
		document.body.scrollLeft = document.body.scrollLeft + step;
	}
	
	function correctScroll() {
		document.body.scrollLeft = currentSlide * screenWidth; 
	}
})();