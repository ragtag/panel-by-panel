'use strict';

// Set the speed of animations.
const speed = 750;



class PanelByPanel {
    constructor(comic) {
	this.comic = comic;
	this.currentPage
	const img = document.getElementById('page');
	console.log("Starting Panel by Panel");
	console.log(this.comic);
	var self = this;
	document.getElementById('nextbtn').onclick = function() { self.next() }
	document.getElementById('prevbtn').onclick = function() { self.prev() }
	document.getElementById('menubtn').onclick = function() { self.menu() }
	
	this.artist = new Draw(this.comic);
	this.artist.focus();
	window.onresize = function() { self.artist.focus() }
	this.comic.preload();
    }

    next() {
	this.comic.next();
	console.log("PAGE:  "+this.comic.currentPage);
	console.log("PANEL: "+this.comic.currentPanel);
	this.artist.focus();
    }

    prev() {
	this.comic.prev();
	console.log("PAGE:  "+this.comic.currentPage);
	console.log("PANEL: "+this.comic.currentPanel);
	this.artist.focus();
    }

    menu() {
	console.log(this.comic.pages);
    }

}

class Draw {
    constructor(comic) {
	console.log("DRAWING");
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
	document.getElementById('page').src = this.comic.pages[this.comic.currentPage].image
    }
    
    focus() {
	console.log("Previous: "+this.drawnPage+" - Current: "+this.comic.currentPage);
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
}

class Comic {
    constructor(request) {
	this.currentPage = 0;
	this.currentPanel = -1;
	console.log("COMIC");
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
	    console.log("Progress: " + percentComplete + "%");
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
	console.log('in parse method');
	let conf = JSON.parse(json);
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
		console.log("THE END I NIGH!!!");
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
		console.log("THIS IS THE BEGINNING!!!");
		this.currentPage = 0;
		this.currentPanel = -1;
		window.location.href = this.home;
	    } else {
		this.preload();
	    }
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
    console.log("Page loaded");
    const request = new XMLHttpRequest();
    const comic = new Comic(request);
    request.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    console.log('Parsing output');
	    comic.parseResponse(this.responseText);
	    console.log(comic);
	    const pbp = new PanelByPanel(comic);

	    //const pbp = new PanelByPanel(JSON.parse(this.responseText));
	}
    }
}

