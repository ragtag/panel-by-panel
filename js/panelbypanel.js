//'use strict';
// Set the speed of animatons.
//const speed = 2000;

class PanelByPanel {
    constructor(pages) {
	this.pages = pages;
	console.log("Starting Panel by Panel");
	console.log(this.pages);
	var self = this;
	document.getElementById('nextbtn').onclick = function() { self.next() }
	document.getElementById('prevbtn').onclick = function() { self.prev() }
	document.getElementById('menubtn').onclick = function() { self.menu() }
    }

    next() {
	console.log("NEXT");
	console.log(this.pages);
    }

    prev() {
	console.log("PREV");
	console.log(this.pages);
    }

    menu() {
	console.log("MENU");
	console.log(this.pages);
    }
}

class Comic {
    constructor(request) {
	console.log("Ragnar was here!");
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
	this.pages = JSON.parse(json);
	let img = document.getElementById('page');
    }
}

/*var w = 0;
var h = 0;

var pages = [];
var page = 0;
var panels = [];
var pos = 0;

var img;
var prev;
var menu;
var next;

var nexttime = false
var menuvis = true
*/

// INIT

/*window.onload = function() {
    loadPages();
    // readSVG();
    assignButtons();
}*/

/*window.onresize = function() {
    focus();
}

function init() {
    oldspeed = speed;
    speed = 1;
    focus();
    focus();
    speed = oldspeed

}

function getSize() {
    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //console.log('Width: ' + w + ' - Height: '+ h);
}

function assignButtons() {
    next = document.getElementById('nextbtn');
    next.onclick = function () {
	nextPanel();
    }

    menu = document.getElementById('menubtn');
    menu.onclick = function () {
	menuToggle();
    }

    prev = document.getElementById('prevbtn');
    prev.onclick = function () {
	prevPanel();
    }
}

// MENU

function menuHide() {
    var hidemenu = anime({
	targets: '#menu',
	translateY: -60,
	duration: speed,
	easing: 'easeOutExpo',
	loop: false
    });
}

function menuShow() {
    var showmenu = anime({
	targets: '#menu',
	translateY: 0,
	duaration: speed,
	easing: 'easeOutExpo',
	loop: false
    });
}

function menuToggle() {
    if (menuvis == true) {
	menuHide();
    } else {
	menuShow();
    }
    menuvis = !menuvis;
}
*/

// Pages

/*function loadPages() { 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    storePages(JSON.parse(this.responseText));
	}
    };
    xmlhttp.open("GET", "./pages.json", true);
    xmlhttp.send();
}

function storePages(json) {
    for (i = 0; i<json.pages.length; i++) {
	p = {
	    image: json.pages[i],
	    svg: json.pages[i].replace(/\.[^\.]+$/, '.svg'),
	    thumb: json.pages[i].replace(/\.[^\.]+$/, '-thumbnail.jpg'),
	}
	pages.push(p);
    }
    console.log(pages);
    readSVG();
}

// SVG Parsing

function sortPanels(a,b) {
    if (a.id < b.id)
	return -1;
    if (a.id > b.id)
	return 1;
    return 0
}


function readSVG() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    parseSVG(this);
	}
    };
    xmlhttp.open("GET", pages[page].svg, true);
    xmlhttp.send();
}


function parseSVG(xml) {
    var x, i, xmlDoc, txt;
    panels = [];
    img = document.getElementById('page');
    xmlDoc = xml.responseXML;
    svg = xmlDoc.getElementsByTagName('svg');
    svgwidth = parseFloat(svg[0].getAttribute('width').replace(/[^0-9.]/g,''));
    svgheight = parseFloat(svg[0].getAttribute('height').replace(/[^0-9.]/g,''));
    rect = xmlDoc.getElementsByTagName("rect");

    // Create the page as panel 0
    var panel = {
	id: '  the_page',
	width: img.clientWidth,
	height: img.clientHeight,
	ratio: img.clientWidth / img.clientHeight,
	x: '-50%',
	y: '-50%'
    }
    panels.push(panel)

    for (i = 0; i<rect.length; i++) {
	panel = {};
	panel.id = rect[i].getAttribute('id');
	
	// Get scale values
	panel.height = (img.clientHeight / svgheight) * parseFloat(rect[i].getAttribute('height'));
	panel.width = (img.clientWidth / svgwidth) * parseFloat(rect[i].getAttribute('width'));
	panel.ratio = parseFloat(rect[i].getAttribute('width')) / parseFloat(rect[i].getAttribute('height'));

	// Center of panel
	x = parseFloat(rect[i].getAttribute('width')) / 2 + parseFloat(rect[i].getAttribute('x'));
	// Center as percentage of page
	x = (x / svgwidth * 100) * (-1);
	panel.x = x + '%';

	// Center of panel
	y = parseFloat(rect[i].getAttribute('height')) / 2 + parseFloat(rect[i].getAttribute('y'));
	// Center as percentage of page
	y = y / svgheight * 100 * (-1);
	panel.y = y + '%';

	panels.push(panel)
    }
    panels.sort(sortPanels)
    console.log(page)
    console.log(panels);
    init();
}
*/

// NAVIGATION
/*
function focus() {
    getSize();
    var scale = 1.0;
    var viewratio = (w / h);
    //console.log(panels[pos])
    if (panels[pos].ratio >= (w / h)) {
	scale = w / panels[pos].width;
    } else {
	scale = h / panels[pos].height;
    }
    anime({
	targets: ".page",
	transformOrigin: panels[pos].x + ' ' + panels[pos].y,
	scale: scale,
	translateX: panels[pos].x,
	translateY: panels[pos].y,
	duration: speed,
	easing: 'easeOutExpo',
	loop: false,
    });
}


function prevPanel() {
    menuHide();
    pos--;
    if (pos < 0) {
	// TODO! Go to previous page
	page--;
	readSVG();
	pos = panels.length -1;
	console.log("GOING TO PREVIOUS PAGE");
	console.log(pos);
	img.src = pages[page].image;
    }
    focus();
}

function nextPanel() {
    menuHide();
    pos++;
    if (pos >= panels.length) {
	// TODO! Go to next page
	page++;
	readSVG();
	pos = 0;
	console.log("GOING TO NEXT PAGE");
	console.log(pos);
	img.src = pages[page].image;
    }
    focus();
}
*/


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

