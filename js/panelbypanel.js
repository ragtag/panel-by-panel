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
    }

    next() {
	console.log("NEXT");
	this.comic.currentPanel++;
	this.artist.focus();
    }

    prev() {
	console.log("PREV");
	this.comic.currentPanel--;
	this.artist.focus();
    }

    menu() {
	console.log("MENU");
	console.log(this.comic.pages);
    }

}

class Draw {
    constructor(comic) {
	console.log("DRAWING");
	this.comic = comic;
	console.log(this.comic);
	this.drawnPage = 0;
	this.drawnPanel = 0;
	this.getViewportSize();
	this.getImageSize();
	console.log(this);
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

    focus() {
	this.getViewportSize();
	this.getImageSize();

	console.log("Current panel: "+this.comic.currentPanel);

	let scale = 1;
	this.panel = { x: 50, y: 50, width: 100, height: 100 };
	if (this.comic.currentPanel > -1) {
	    this.panel = this.comic.pages[this.comic.currentPage].panels[this.comic.currentPanel];
	} else {
	    console.log("Show page");
	}

	console.log(this.panel);
	console.log("Panel ratio "+this.panelRatio());
	console.log("Viewport ratio "+this.viewportRatio());
	if (this.panelRatio() <= this.viewportRatio()) {
	    console.log("TALL");
	    scale = 100 / this.panel.height * this.viewportHeight / this.imageHeight;
	    console.log(100+" / "+this.panel.height+" * "+this.viewportHeight+" / "+ this.imageHeight);
	} else {
	    console.log("WIDE");
	    scale = this.viewportWidth / this.imageWidth * 100 / this.panel.width;
	    console.log(this.viewportWidth+" / "+this.imageWidth+" * "+100+" / "+this.panel.width);
	}

	console.log(scale);
	anime({
	    targets: "#page",
	    scale: scale,
	    translateX: (50 - this.panel.x) + '%',
	    translateY: (50 - this.panel.y) + '%',
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
	this.pages = JSON.parse(json).pages;
    }

    next() {
	// Go to next panel or page
    }

    prev() {
	// Go to previous panel or page
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

