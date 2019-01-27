var speed = 2000;

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var page = {};
var panels = [];
var pos = -1;
var panel = { scale: 1.0, x: 0.0, y: 0.0 }

var img = document.getElementById('page');
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


// SVG Parsing

function init() {
    readSVG()
}

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
    page.svgwidth = parseFloat(svg[0].getAttribute('width').replace(/[^0-9.]/g,''));
    page.svgheight = parseFloat(svg[0].getAttribute('height').replace(/[^0-9.]/g,''));
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



// NAVIGATION

function getSize() {
    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    page.imgwidth = img.clientWidth;
    page.imgheight = img.clientHeight;
    page.ratiowidth = page.imgwidth / page.svgwidth;
    page.ratioheight =  page.imgheight / page.svgheight;
    console.log(page);
}

function focus() {
    console.log(panel)
    var zoomout = anime({
	targets: ".page",
	transformOrigin: panel.origin,
	scale: panel.scale,
	translateX: panel.x + '%',
	translateY: panel.y + '%',
	duration: speed,
	easing: 'easeOutExpo',
	loop: false,
    });
}

function nextPanel() {
    menuHide();
    getSize();
    pos++;
    console.log(pos)
    console.log(panels.length)
    if (pos > panels.length) {
	pos = -1;
	// TODO! Go to next page
    } else {

    // If panel aspect is greater than viewport aspect, use panel width for scale
    if ((page.ratiowidth * panels[pos].width) / (page.ratioheight * panels[pos].height) >= (w / h)) {
	// Use width
	panel.scale = w / (page.ratiowidth * panels[pos].width);

	x = panels[pos].width / 2 + panels[pos].x; // Center of panel
	x = (x / page.svgwidth * 100) * (-1); // Center as percentage of page
	panel.x = x;

	y = panels[pos].height / 2 + panels[pos].y;
	y = y / page.svgheight * 100 * (-1);
	panel.y = y;

	panel.origin = panel.x + '% ' + panel.y + '%'

    } else {
	// Use height
	panel.scale = h / (page.ratioheight * panels[pos].height);
    }
	focus();
    }
}

next.onclick = function () {
    nextPanel();
}
/*next.onclick = function () {
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
}*/

menu.onclick = function () {
    menuToggle();
}

prev.onclick = function () {
    getSize();
}
