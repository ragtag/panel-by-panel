'use strict';

// Set the speed of animations.
const speed = 750;  // Moving from panel to panel in milliseconds
const menuDelay = 1500; // How long to keep the menu on screen after the page loads in milliseconds



class PanelByPanel {
    constructor(comic) {
	this.comic = comic;
	this.currentPage;
	this.panelMode = true;
	const img = document.getElementById('page');
	let self = this;
	document.getElementById('nextbtn').onclick = function() { self.next() }
	document.getElementById('prevbtn').onclick = function() { self.prev() }
	document.getElementById('menubtn').onclick = function() { self.menu() }
	this.panelButton = document.getElementById('pbpbtn');
	this.panelButton.onclick = function() { self.togglePanelMode() }
	
	let url = new URL(window.location.href);
	let p = parseInt(url.searchParams.get("page"));
	if (!isNaN(p)) {
	    this.comic.goto(p);
	}

	this.artist = new Draw(this.comic);
	this.artist.focus();
	this.artist.setTitle();
	this.keyboardNav();
	this.touchNav();
	this.artist.hideMenu(menuDelay);
	window.onresize = function() { self.artist.focus() }
	this.comic.preload();
    }

    next() {
	if (this.panelMode) {
	    this.comic.next();
	} else {
	    this.comic.goto(this.comic.currentPage + 2);
	}
	this.artist.hideMenu();
	this.artist.focus();
    }

    prev() {
	if (this.panelMode) {
	    this.comic.prev();
	} else {
	    this.comic.goto(this.comic.currentPage);
	}
	this.artist.hideMenu();
	this.artist.focus();
    }

    menu() {
	if (document.getElementById("menu").getBoundingClientRect().top < -32) {
	    this.artist.showMenu();
	} else {
	    this.artist.hideMenu();
	}
    }

    togglePanelMode() {
	if (this.panelMode == true) {
	    this.panelMode = false;
	    this.panelButton.style.opacity = 0.5;
	} else {
	    this.panelMode = true;
	    this.panelButton.style.opacity = 1.0;
	}
	this.artist.hideMenu;
    }

    keyboardNav() {
	let self = this;
	document.onkeyup = function(e) {
	    switch(e.which) {
	    case 37: // Left arrow
		self.prev();
		break;
	    case 32: // Space
	    case 39: // Rigth arrow
		self.next();
		break;
	    case 33: // Page Up
		self.comic.goto(self.comic.currentPage + 2);
		self.artist.focus();
		self.artist.setTitle();
		self.comic.preload();
		break;
	    case 34: // Page Down
		self.comic.goto(self.comic.currentPage);
		self.artist.focus();
		self.artist.setTitle();
		self.comic.preload();
		break;
	    default:
	    }
	}
    }

    touchNav() {
	let self = this;
	let swiper = new Swipe(document.querySelector('#container'));
	swiper.onLeft(function() { self.next() });
	swiper.onRight(function() { self.prev() });
	swiper.run();
    }
}

/*
  Thanks to Marwelln (https://stackoverflow.com/users/397195/marwelln) for the Swipe class,
  which I got in his reply to the following StackOverflow question:
  https://stackoverflow.com/questions/2264072
*/
class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
	this.element = element;

        this.element.addEventListener('touchstart', function(evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);

    }

    onLeft(callback) {
        this.onLeft = callback;
        return this;
    }

    onRight(callback) {
        this.onRight = callback;
        return this;
    }

    onUp(callback) {
        this.onUp = callback;
        return this;
    }

    onDown(callback) {
        this.onDown = callback;
        return this;
    }

    handleTouchMove(evt) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) {
            if ( this.xDiff > 0 ) {
                this.onLeft();
            } else {
                this.onRight();
            }
        } else {
            if ( this.yDiff > 0 ) {
                this.onUp();
            } else {
                this.onDown();
            }
        }

        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchmove', function(evt) {
            this.handleTouchMove(evt).bind(this);
        }.bind(this), false);
    }
}


class Draw {
    constructor(comic) {
	this.comic = comic;
	this.drawnPage = 0;
	this.drawnPanel = -1;
	this.getViewportSize();
	this.getImageSize();
    }

    getViewportSize() {
	this.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	this.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }

    getImageSize() {
	this.imageHeight = document.getElementById('page').naturalHeight;
	this.imageWidth = document.getElementById('page').naturalWidth;
    }

    panelRatio() {
	return (this.imageWidth * this.panel.width) / (this.imageHeight * this.panel.height);
    }

    viewportRatio() {
	return (this.viewportWidth / this.viewportHeight);
    }

    flip() {
	document.getElementById('page').src = this.comic.pages[this.comic.currentPage].image;
	this.setTitle();
    }
    
    setTitle() {
	let p = this.comic.currentPage + 1;
	document.title = this.comic.title + " - " + p + " of " + this.comic.pages.length;
	window.history.pushState("", "", '/index.html?page=' + p);
    }
    
    focus() {
	if (this.comic.currentPage != this.drawnPage) {
	    this.flip();
	}

	this.getViewportSize();
	this.getImageSize();

	let scale = 1;
	this.panel = { x: 50, y: 50, width: 100, height: 100 };
	if (this.comic.currentPanel > -1) {
	    this.panel = this.comic.pages[this.comic.currentPage].panels[this.comic.currentPanel];
	}

	if (this.panelRatio() <= this.viewportRatio()) {
	    scale = 100 / this.panel.height * this.viewportHeight / this.imageHeight;
	} else {
	    scale = this.viewportWidth / this.imageWidth * 100 / this.panel.width;
	}

	anime({
	    targets: "#page",
	    scale: scale,
	    translateX: (50 - this.panel.x) + '%',
	    translateY: (50 - this.panel.y) + '%',
	    duration: speed,
	    easing: 'easeOutExpo',
	    loop: false,
	});
	this.drawnPage = this.comic.currentPage;
    }

    hideMenu(delay=0) {
	anime({
	    targets: "#menu",
	    translateY: "-64px",
	    duration: speed,
	    delay: delay,
	    easing: 'easeOutExpo',
	    loop: false,
	});
    }

    showMenu() {
	anime({
	    targets: "#menu",
	    translateY: "0",
	    duration: speed,
	    easing: 'easeOutExpo',
	    loop: false,
	});
    }
}

class Comic {
    constructor(request) {
	this.currentPage = 0;
	this.currentPanel = -1;
	request.addEventListener("progress", this.updateProgress);
	request.addEventListener("load", this.transferComplete);
	request.addEventListener("error", this.transferFailed);
	request.addEventListener("abort", this.transferCanceled);
	request.open("GET", "./images/pages.json", true);
	request.send();
    }

    updateProgress (oEvent) {
	if (oEvent.lengthComputable) {
	    var percentComplete = oEvent.loaded / oEvent.total * 100;
	} else {
	    console.log("Unable to get progress");
	}
    }
    
    transferComplete(event) {
	console.log("The transfer is complete");
    }
	
    transferFailed(event) {
	console.log("An error occurred");
    }
    
    transferCanceled(event) {
	console.log("The transfer has been cancelled by the user")
    }

    parseResponse(json) {
	let conf = JSON.parse(json);
	this.title = conf.title;
	this.pages = conf.pages;
	this.home = conf.home;
	this.exit = conf.exit;
    }

    next() {
	this.currentPanel++;
	if (this.currentPanel >= this.pages[this.currentPage].panels.length) {
	    this.currentPanel = -1;
	    this.currentPage++;
	    if (this.currentPage >= this.pages.length) {
		this.currentPage = this.pages.length - 1;
		this.currentPanel = this.pages[this.currentPage].panels.length - 1;
		window.location.href = this.exit;
	    } else {
		this.preload();
	    }
	}
    }

    prev() {
	this.currentPanel--;
	if (this.currentPanel < -1) {
	    this.currentPanel = this.pages[this.currentPage].panels.length - 1;
	    this.currentPage--;
	    if (this.currentPage < 0) {
		this.currentPage = 0;
		this.currentPanel = -1;
		window.location.href = this.home;
	    } else {
		this.preload();
	    }
	}
    }

    goto(page) {
	this.currentPage = page - 1;
	this.currentPanel = -1;
	if (this.currentPage < 0) {
	    this.currentPage = 0;
	}
	if (this.currentPage >= this.pages.length) {
	    this.currentPage = this.pages.length - 1;
	}
    }
    
    preload() {
	if (this.currentPage < this.pages.length - 1) {
	    let nextimg = new Image();
	    nextimg.src = this.pages[this.currentPage + 1].image;
	}
	if (this.currentPage > 0) {
	    let previmg = new Image();
	    previmg.src = this.pages[this.currentPage - 1].image;
	}
    }

}


window.onload = function () {
    const request = new XMLHttpRequest();
    const comic = new Comic(request);
    request.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    comic.parseResponse(this.responseText);
	    const pbp = new PanelByPanel(comic);

	    //const pbp = new PanelByPanel(JSON.parse(this.responseText));
	}
    }
}

