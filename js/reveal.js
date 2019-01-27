// Adjust the speed of animatons.
var speed = 2000;

var w = 100;
var h = 100;

var page = {};
var panels = [];
var pos = 0;

var img;
var prev;
var menu;
var next;

var nexttime = false
var menuvis = true


// INIT

window.onload = function() {
    init();
    readSVG();

    // TODO! Hacky way to get around incorrect position on first run.
    oldspeed = speed;
    speed = 1;
    focus(pos);
    focus(pos);
    speed = oldspeed

    assignButtons();
}

function init() {   
    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    img = document.getElementById('page');

    page = { w: w, h: h };

    var panel = {
	id: 'AAAAA',
	ratio: img.clientWidth / img.clientHeight,
	scalex: 1.0,
	scaley: 1.0,
	x: '-50%',
	y: '-50%'
    }
    panels.push(panel)
    pos = 0;
}

function getSize() {
    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    page.ratiowidth = img.clientWidth / page.svgwidth;
    page.ratioheight =  img.clientHeight / page.svgheight;
    console.log(page);
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
    xmlhttp.open("GET", "./images/the-pillow-method-1.svg", true);
    xmlhttp.send();
}

function parseSVG(xml) {
    page = {};
    var x, i, xmlDoc, txt;
    xmlDoc = xml.responseXML;
    svg = xmlDoc.getElementsByTagName('svg');
    page.svgwidth = parseFloat(svg[0].getAttribute('width').replace(/[^0-9.]/g,''));
    page.svgheight = parseFloat(svg[0].getAttribute('height').replace(/[^0-9.]/g,''));
    getSize();
    rect = xmlDoc.getElementsByTagName("rect");

    for (i = 0; i<rect.length; i++) {
	panel = {};
	panel.id = rect[i].getAttribute('id');
	
	// Get scale values
	height = parseFloat(rect[i].getAttribute('height'));
	panel.scaley = h / (page.ratioheight * height);
	width = parseFloat(rect[i].getAttribute('width'));
	panel.scalex = w / (page.ratiowidth * width);
	panel.ratio = width / height;

	// Center of panel
	x = parseFloat(rect[i].getAttribute('width')) / 2 + parseFloat(rect[i].getAttribute('x'));
	// Center as percentage of page
	x = (x / page.svgwidth * 100) * (-1);
	panel.x = x + '%';

	// Center of panel
	y = parseFloat(rect[i].getAttribute('height')) / 2 + parseFloat(rect[i].getAttribute('y'));
	// Center as percentage of page
	y = y / page.svgheight * 100 * (-1);
	panel.y = y + '%';

	panels.push(panel)
    }
    panels.sort(sortPanels)
    console.log(panels);
}


// NAVIGATION

function focus(p) {
    console.log("FOCUS")
    var scale = 1.0;
    var viewratio = (w / h);
    if (panels[p].ratio >= (w / h)) {
	scale = panels[p].scalex;
    } else {
	scale = panels[p].scaley;
    }
    anime({
	targets: ".page",
	transformOrigin: panels[p].x + ' ' + panels[p].y,
	scale: scale,
	translateX: panels[p].x,
	translateY: panels[p].y,
	duration: speed,
	easing: 'easeOutExpo',
	loop: false,
    });
}

function nextPanel() {
    menuHide();
    getSize();
    pos++;
    if (pos >= panels.length) {
	// TODO! Go to next page
	pos = 0;
    }
    focus(pos);
}

function prevPanel() {
    menuHide();
    getSize();
    pos--;
    if (pos < 0) {
	// TODO! Go to previous page
	pos = panels.length -1;
    }
    focus(pos);
}

