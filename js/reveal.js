var speed = 500

var page = {};
var panels = [];

var prev = document.getElementById('prevbtn');
var menu = document.getElementById('menubtn');
var next = document.getElementById('nextbtn');

var nexttime = false
var menuvis = true

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


// NAVIGATION

// Parse SVG


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
    panels = [];
    var x, i, xmlDoc, txt;
    xmlDoc = xml.responseXML;
    svg = xmlDoc.getElementsByTagName('svg');
    page.width = parseFloat(svg[0].getAttribute('width').replace(/[^0-9.]/g,''));
    page.height = parseFloat(svg[0].getAttribute('height').replace(/[^0-9.]/g,''));
    console.log(page);
    rect = xmlDoc.getElementsByTagName("rect");
    for (i = 0; i<rect.length; i++) {
	var panel = {}
	panel.id = rect[i].getAttribute('id');
	panel.x = parseFloat(rect[i].getAttribute('x'));
	panel.y = parseFloat(rect[i].getAttribute('y'));
	panel.height = parseFloat(rect[i].getAttribute('height'));
	panel.width = parseFloat(rect[i].getAttribute('width'));
	panels.push(panel)
    }
    panels.sort(sortPanels)
    console.log(panels);
}

next.onclick = function () {
    console.log(page);
    menuHide();
    if (nexttime == false) {
	var zoomin = anime({
	    targets: '.page',
	    scale: 2.0,
	    translateX: 200.0,
	    duration: speed,
	    easing: 'easeOutExpo',
	    loop: false
	});
    } else {
	var zoomout = anime({
	    targets: ".page",
	    scale: 1.0,
	    translateX: 0.0,
	    duration: speed,
	    easing: 'easeOutExpo',
	    loop: false,
	});
    }
    nexttime = !nexttime;
}

menu.onclick = function () {
    menuToggle();
}

prev.onclick = function () {
    readSVG();
}
