'use strict';

// Animation speed when moving from panel to panel in milliseconds
const speed = 750;  
// How long to keep the menu on screen after the page initally loads in milliseconds
const menuDelay = 1500;
// Switch to panel by panel mode by default, when on a dislpay less than this width or...
const pbpMaxWidth = 800;
// ...this height.
const pbpMaxHeight = 1000;
// Pops up alerts with viewport height and width, to help debug pbpMaxWidth and Height
const debug = false;


class PanelByPanel {
    constructor(comic) {
	this.comic = comic;
	this.currentPage;
	this.panelMode = false;

	// Go to specific page directly
	let url = new URL(window.location.href);
	let p = parseInt(url.searchParams.get("page"));
	if (!isNaN(p)) {
	    this.comic.gotoPage(p);
	}

	// Draw the page
	this.artist = new Draw(this.comic);
	this.artist.storeHistory();
	this.artist.focus();
	this.artist.hideMenu(menuDelay);
	let self = this;
	window.onresize = function() { self.artist.focus() }
	window.addEventListener("popstate", function(e) {
	    let url = new URL(window.location.href);
	    let p = parseInt(url.searchParams.get("page"));
	    if (!isNaN(p)) {
		self.comic.gotoPage(p);
		self.artist.focus();
	    }
	});

	// Enable navigation
	document.getElementById('prevbtn').onclick = function() { self.prev() }
	document.getElementById('prevbtn').addEventListener('click', function(event){ self.dont(event); })
	document.getElementById('menubtn').onclick = function() { self.menu() }
	document.getElementById('menubtn').addEventListener('click', function(event){ self.dont(event); })
	document.getElementById('nextbtn').onclick = function() { self.next() }
	document.getElementById('nextbtn').addEventListener('click', function(event){ self.dont(event); })
	this.panelButton = document.getElementById('pbpbtn');
	this.panelButton.onclick = function() { self.togglePanelMode() }
	this.keyboardNav();
	this.touchNav();

	// Set panel-by-panel navigation, based on ppi and window size
	if ( this.artist.viewportWidth < pbpMaxWidth || this.artist.viewportHeight < pbpMaxHeight ) {
	    this.panelMode = false;
	    this.togglePanelMode(); // Makes it true
	}
	if (debug) {
	    alert("Viewport\n\nWidth: " + this.artist.viewportWidth + "\nHeight: " + this.artist.viewportHeight + "\nUsing Panel by Panel mode: " + this.panelMode);
	}

	// Preload the next/previous page
	this.comic.preload();
    }

    dont(event) {
	event.preventDefault();
    }

    next() {
	if (this.panelMode) {
	    let page = this.comic.currentPage;
	    this.comic.next();
	    if (page != this.comic.currentPage) {
		this.artist.storeHistory();
	    }
	} else {
	    this.comic.gotoPage(this.comic.currentPage + 2);
	    this.artist.storeHistory();
	}
	this.artist.hideMenu();
	this.artist.focus();
    }

    prev() {
	if (this.panelMode) {
	    let page = this.comic.currentPage;
	    this.comic.prev();
	    if (page != this.comic.currentPage) {
		this.artist.storeHistory();
	    }
	} else {
	    this.comic.gotoPage(this.comic.currentPage);
	    this.artist.storeHistory();
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
	    this.comic.gotoPage(this.comic.currentPage + 1);
	    this.artist.storeHistory();
	    this.artist.focus();
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
	    case 34: // Page Down
		self.comic.gotoPage(self.comic.currentPage + 2);
		self.artist.storeHistory();
		self.artist.focus();
		self.comic.preload();
		break;
	    case 33: // Page Up
		self.comic.gotoPage(self.comic.currentPage);
		self.artist.storeHistory();
		self.artist.focus();
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
        }

        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchmove', function(evt) {
            this.handleTouchMove(evt);
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
	this.setBackground();
    }
    
    setTitle() {
	let p = this.comic.currentPage + 1;
	document.title = this.comic.title + " - " + p + " of " + this.comic.pages.length;
    }

    storeHistory() {
	let p = this.comic.currentPage + 1;
	let url = new URL(window.location.href);
	window.history.pushState("", "", url.pathname+'?page=' + p);
    }

    setBackground() {
	let p = this.comic.currentPage;
	let color = document.body.style.backgroundColor;
	if ( this.comic.pages[p].background != null ) {
	    color = this.comic.pages[p].background;
	} else {
	    if ( this.comic.background != null ) {
		color = this.comic.background;
	    }
	}
	document.body.style.backgroundColor = color;
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
	let url = new URL(window.location.href);
	this.name = url.searchParams.get('comic') || "comic";
	this.url = "./" + this.name + "/" + this.name + ".acbf";
	//this.url = "./" + this.name + "/" + "AndasGame" + ".acbf";
	this.currentPage = 0;
	this.currentPanel = -1;
	request.addEventListener("progress", this.updateProgress);
	request.addEventListener("load", this.transferComplete);
	request.addEventListener("error", this.transferFailed);
	request.addEventListener("abort", this.transferCanceled);
	request.open("GET", this.url, true);
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
	this.missing = conf.missing;
	this.background = conf.background;
    }

    parseACBF(acbf) {
	var dom = null
	try {
	    dom = new DOMParser().parseFromString(acbf, "text/xml");
	}
	catch (e) { dom = null; }
	this.acbf = this.xmlToJson(dom);
	this.title = this.acbf.ACBF["meta-data"]["book-title"];
	this.background = this.acbf.ACBF.body["@attributes"].bgcolor;
	this.pages = [];
	this.proportions();
	for (let p = 0; p < this.acbf.ACBF.body.page.length; p++) {
	    this.pages.push(this.parsePage(this.acbf.ACBF.body.page[p]));
	}
	console.log(dom);
	console.log(this.acbf);
	console.log(this);
    }

    parsePage(page) {
	let obj = { "image": page.image["@attributes"].href,
		    "panels": []
		  };
	for (let f = 0; f < page.frame.length; f++) {
	    obj.panels.push(this.parsePanels(page.frame[f]));
	}
	return obj;
    }

    parsePanels(frames) {
	let panel = { x: 50, y: 50, width: 100, height: 100 };
	let pairs = frames["@attributes"].points.split(" ");
	let min = { "x": 0, "y": 0 };
	let max = { "x": 100, "y": 100 };
	for (let i = 0; i < pairs.length; i++) {
	    let xy = pairs[i].split(",");
	    let x = parseFloat(xy[0]) * this.prop.x;
	    let y = parseFloat(xy[1]) * this.prop.y;
	    if (x > min['x']) min['x'] = x;
	    if (y > min['y']) min['y'] = y;
	    if (x < max['x']) max['x'] = x;
	    if (y < max['y']) max['y'] = y;
	    panel['minx'] = min.x;
	    panel['maxx'] = max.x;
	    panel['x'] = (min.x + max.x) / 2;
	    panel['y'] = (min.y + max.y) / 2;
	    panel['width'] = min.x - max.x;
	    panel['height'] = min.y - max.y;
	}
	return panel;
    }

    proportions() {
	this.prop = {
	    "x": 100 / document.getElementById('page').naturalWidth,
	    "y": 100 / document.getElementById('page').naturalHeight
	};
	console.log("Proportions X: " + this.prop.x);
	console.log("Proportions Y: " + this.prop.y);
	console.log("Image width: " + document.getElementById('page').naturalWidth);
	console.log("Image height: " + document.getElementById('page').naturalHeight);
    }

    // From https://gist.github.com/demircancelebi/f0a9c7e1f48be4ea91ca7ad81134459d
    // by demircancelebi https://gist.github.com/demircancelebi
    xmlToJson(xml) {
	// Create the return object
	let obj = {};

	if (xml.nodeType === 1) { // element
	    // do attributes
	    if (xml.attributes.length > 0) {
		obj['@attributes'] = {};
		for (let j = 0; j < xml.attributes.length; j += 1) {
		    const attribute = xml.attributes.item(j);
		    obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
		}
	    }
	} else if (xml.nodeType === 3) { // text
	    obj = xml.nodeValue;
	}
	
	// do children
	// If just one text node inside
	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
	    obj = xml.childNodes[0].nodeValue;
	} else if (xml.hasChildNodes()) {
	    for (let i = 0; i < xml.childNodes.length; i += 1) {
		const item = xml.childNodes.item(i);
		const nodeName = item.nodeName;
		if (typeof (obj[nodeName]) === 'undefined') {
		    obj[nodeName] = this.xmlToJson(item);
		} else {
		    if (typeof (obj[nodeName].push) === 'undefined') {
			const old = obj[nodeName];
			obj[nodeName] = [];
			obj[nodeName].push(old);
		    }
		    obj[nodeName].push(this.xmlToJson(item));
		}
	    }
	}
	return obj;
    }

    next() {
	this.currentPanel++;
	if (this.currentPanel >= this.pages[this.currentPage].panels.length) {
	    this.currentPage++;
	    this.currentPanel = -1;
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
	    this.currentPage--;
	    this.currentPanel = this.pages[this.currentPage].panels.length - 1;
	    if (this.currentPage < 0) {
		this.currentPage = 0;
		this.currentPanel = -1;
		window.location.href = this.home;
	    } else {
		this.preload();
	    }
	}
    }

    gotoPage(page) {
	this.currentPage = page - 1;
	this.currentPanel = -1;
	if (this.currentPage < 0) {
	    window.location.href = this.home;
	}
	if (this.currentPage >= this.pages.length) {
	    window.location.href = this.exit;
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
	    comic.parseACBF(this.responseText);
	    const pbp = new PanelByPanel(comic);

	    //const pbp = new PanelByPanel(JSON.parse(this.responseText));
	}
    }
}

