'use strict';

// Animation speed when moving from panel to panel in milliseconds
const speed = 750;  
// How long to keep the menu on screen after the page initally loads in milliseconds
const menuDelay = 2000;
// Switch to panel by panel mode by default, when on a dislpay less than this width or...
const pbpMaxWidth = 800;
// ...this height.
const pbpMaxHeight = 1000;
// Use per page background color. If not set you can control the background from the style sheet
const perPageColor = true;
// Preload the next or previous page or both. Preloading both is going to take longer on a slow connection.
const preloadprev = true
const preloadnext = true
// Use htaccess mod rewrite
const htaccess = true;
// Pops up alerts with viewport height and width, to help debug pbpMaxWidth and Height
const debug = false;

class PanelByPanel {
    constructor(comic) {
	this.comic = comic;

	// Draw the page
	this.artist = new Draw(this.comic);
	this.artist.storeHistory();
	this.artist.focus();
	let self = this;
	window.onresize = function() { self.artist.focus() }
	window.addEventListener("popstate", function(e) {
	    // TODO! Fix the browser back button
	    /*let url = new URL(window.location.href);
	    let p = parseInt(url.searchParams.get("page"));
	    if (htaccess) {
		p = parseInt(url.pathname.split('/').slice(1)[1].replace( /^\D+/g, ''));
	    }
	    p = document.getElementById
	    if (!isNaN(p)) {*/
	    self.comic.gotoPage(self.comic.currentPage);
	    self.artist.focus();
	    //}
	});

	// Top menu
	document.getElementById('menuzone').onmouseover = function() { self.artist.showMenu() }
	document.getElementById('aboutbtn').onclick = function() { self.artist.about() }
	document.getElementById('aboutbtn').addEventListener('click', function(event){ self.dont(event); })
	document.getElementById('about').onclick = function() { self.artist.hideMenu() }
	document.getElementById('helpbtn').onclick = function() { self.artist.help() }
	document.getElementById('helpbtn').addEventListener('click', function(event){ self.dont(event); })
	document.getElementById('help').onclick = function() { self.artist.hideMenu() }
	this.panelButton = document.getElementById('pbpbtn');
	this.panelButton.onclick = function() { self.togglePanelMode() }
	// Page navigation
	document.getElementById('prevbtn').onclick = function() { self.prev() }
	document.getElementById('prevbtn').addEventListener('click', function(event){ self.dont(event); })
	document.getElementById('menubtn').onclick = function() { self.menu() }
	document.getElementById('menubtn').addEventListener('click', function(event){ self.dont(event); })
	document.getElementById('nextbtn').onclick = function() { self.next() }
	document.getElementById('nextbtn').addEventListener('click', function(event){ self.dont(event); })
	this.keyboardNav();
	this.touchNav();

	// Set panel-by-panel navigation, based on ppi and window size
	if ("panelMode" in sessionStorage) {
	    if (sessionStorage.getItem("panelMode") === "true") {
		this.setPanelMode(true);
	    } else {
		this.setPanelMode(false);
	    }
	} else {
	    if ( this.artist.viewportWidth > pbpMaxWidth || this.artist.viewportHeight > pbpMaxHeight ) {
		this.setPanelMode(false);
	    } else {
		this.setPanelMode(true);
	    }
	}
	if ('firstVisit' in sessionStorage) {
	    this.artist.hideMenu(menuDelay);
	} else {
	    sessionStorage.setItem("firstVisit", false);
	}
	if (debug) {
	    console.log("Viewport Width: " + this.artist.viewportWidth);
	    console.log("Viewport Height: " + this.artist.viewportHeight);
	    console.log("Using Panel by Panel mode: " + this.panelMode);
	}

	self.artist.focus();
	// Run after the image has loaded
	document.getElementById('page').onload = function() {
	    // Map out the panels on this page
	    this.artist.pointsToPercent(document.getElementById('page'), this.comic.currentPage);
	    // This re-focuses if the image was not loaded on the inital focus
	    self.artist.focus();
	    this.ready = true
	    document.getElementById('loadingcontainer').style.display = 'none'
	    this.artist.preload()
	}.bind(this);
	this.artist.pointsToPercent(document.getElementById('page'), this.comic.currentPage);
	this.ready = true
    }

    dont(event) {
	event.preventDefault();
    }

    next() {
	if (this.ready) {
	    if (this.panelMode) {
		let page = this.comic.currentPage;
		this.comic.next();
		if (page != this.comic.currentPage) {
		    document.getElementById('loadingcontainer').style.display = 'flex'
		    this.artist.storeHistory();
		    this.ready = false
		}
	    } else {
		document.getElementById('loadingcontainer').style.display = 'flex'
		this.comic.gotoPage(this.comic.currentPage + 1);
		this.artist.storeHistory();
		this.ready = false
	    }
	    this.artist.hideMenu();
	    this.artist.focus();
	}
    }

    prev() {
	if (this.ready) {
	    if (this.panelMode) {
		let page = this.comic.currentPage;
		this.comic.prev();
		if (page != this.comic.currentPage) {
		    document.getElementById('loadingcontainer').style.display = 'flex'
		    this.artist.storeHistory();
		    this.ready = false
		}
	    } else {
		    document.getElementById('loadingcontainer').style.display = 'flex'
		this.comic.gotoPage(this.comic.currentPage - 1);
		this.artist.storeHistory();
		this.ready = false
	    }
	    this.artist.hideMenu();
	    this.artist.focus();
	}
    }

    menu() {
	if (document.getElementById("menu").getBoundingClientRect().top < -32) {
	    this.artist.showMenu();
	} else {
	    this.artist.hideMenu();
	}
    }

    setPanelMode(value) {
	if (value === true) {
	    this.panelMode = true;
	    this.panelButton.style.opacity = 1.0;
	} else {
	    this.panelMode = false;
	    this.panelButton.style.opacity = 0.5;
	    this.artist.focus();
	}
	sessionStorage.setItem("panelMode", this.panelMode);
	this.artist.hideMenu;
    }
	    
    togglePanelMode() {
	if (this.panelMode == true) {
	    this.setPanelMode(false);
	} else {
	    this.setPanelMode(true);
	}
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
		self.comic.gotoPage(self.comic.currentPage + 1);
		self.artist.storeHistory();
		self.artist.focus();
		break;
	    case 33: // Page Up
		self.comic.gotoPage(self.comic.currentPage - 1);
		self.artist.storeHistory();
		self.artist.focus();
		break;
	    default:
	    }
	}
    }

    touchNav() {
	let self = this;
	let swiper = new Swipe(document.querySelector('#navcontainer'));
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
	this.drawnPage = -1;
	this.drawnPanel = -1;
	this.getViewportSize();
    }

    getViewportSize() {
	this.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	this.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }

    imageHeight() {
	return document.getElementById('page').naturalHeight;
    }

    imageWidth() {
	return document.getElementById('page').naturalWidth;
    }

    panelRatio() {
	return (this.imageWidth() * this.panel.width) / (this.imageHeight() * this.panel.height);
    }

    viewportRatio() {
	return (this.viewportWidth / this.viewportHeight);
    }

    flip() {
	if (document.getElementById('page').src != this.comic.root+"/comics/"+this.comic.pages[this.comic.currentPage].image) {
	    document.getElementById('page').src = this.comic.root+"comics/"+this.comic.pages[this.comic.currentPage].image;
	} else {
	    this.drawnPage = this.comic.currentPage
	    this.focus()
	    document.getElementById('loadingcontainer').style.display = 'none'
	    this.preload()
	}
	if (htaccess) {
	    document.getElementById('thumbsbtn').href = this.comic.root+this.comic.name+'/thumbs/'+this.comic.currentPage;
	} else {
	    document.getElementById('thumbsbtn').href = this.comic.root+'thumbs.php?comic='+this.comic.name+'&page='+this.comic.currentPage;
	}
	let prev = this.comic.currentPage - 1;
	let next = this.comic.currentPage + 1;
	if (htaccess) {
	    document.getElementById('prevbtn').href = this.comic.root+this.comic.name+'/page-'+prev;
	} else {
	    document.getElementById('prevbtn').href = this.comic.root+'pbp.php?comic='+this.comic.name+'&page='+prev;
	}
	if (htaccess) {
	    document.getElementById('nextbtn').href = this.comic.root+this.comic.name+'/page-'+next;
	} else {
	    document.getElementById('nextbtn').href = this.comic.root+'pbp.php?comic='+this.comic.name+'&page='+next;
	}
	this.setTitle();
	if (perPageColor) {
	    this.setBackground();
	}
    }

    preload() {
	if (this.comic.currentPage < this.comic.pages.length - 1 &&
	    preloadnext == true) {
	    let nextimg = new Image();
	    let self = this;
	    nextimg.onload = function() {
		self.pointsToPercent(nextimg, self.comic.currentPage + 1);

	    };
	    nextimg.src = this.comic.root+"comics/"+this.comic.pages[this.comic.currentPage + 1].image;
	}
	if (this.comic.currentPage > 0 && preloadprev == true) {
	    let previmg = new Image();
	    let self = this;
	    previmg.onload = function() {
		self.pointsToPercent(previmg, self.comic.currentPage - 1);
	    };
	    previmg.src = this.comic.root+"comics/"+this.comic.pages[this.comic.currentPage - 1].image;
	}
    }

    pointsToPercent(img, pagenumber) {
	let page = this.comic.pages[pagenumber];
	let panels = [];
	let frames = [];

	if (!(page.frames.length == 0 || page.panels.length > 0)) {
	    for (let f = 0; f < page.frames.length; f++) {
		let panel = { x: 50, y: 50, width: 100, height: 100 };
		let min = { "x": 0, "y": 0 };
		let max = { "x": 100, "y": 100 };
		for (let p = 0; p < page.frames[f].length; p++) {
		    let x = parseFloat(page.frames[f][p].x) * (100 / img.naturalWidth);
		    let y = parseFloat(page.frames[f][p].y) * (100 / img.naturalHeight);
		    if (x > min['x']) min['x'] = x;
		    if (y > min['y']) min['y'] = y;
		    if (x < max['x']) max['x'] = x;
		    if (y < max['y']) max['y'] = y;
		    panel['x'] = (min.x + max.x) / 2;
		    panel['y'] = (min.y + max.y) / 2;
		    panel['width'] = min.x - max.x;
		    panel['height'] = min.y - max.y;
		}
		panels.push(panel);
	    }
	    this.comic.pages[pagenumber].panels = panels;
	}
    }

    setTitle() {
	let p = this.comic.currentPage;
	document.title = this.comic.title + " - " + p + " of " + this.comic.pages.length;
    }

    storeHistory() {
	let p = this.comic.currentPage;
	let url = new URL(window.location.href);
	if (htaccess) {
	    window.history.pushState("", "", this.comic.root+this.comic.name+"/page-"+this.comic.currentPage);
	} else {
	    window.history.pushState("", "", this.comic.root+'pbp.php?comic=' + this.comic.name + "&page=" + p);
	}
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

	let scale = 1;
	if (this.comic.currentPanel > -1) {
	    this.panel = this.comic.pages[this.comic.currentPage].panels[this.comic.currentPanel];
	} else {
	    this.panel = { x: 50, y: 50, width: 100, height: 100 };
	}

	if (this.panelRatio() <= this.viewportRatio()) {
	    scale = 100 / this.panel.height * this.viewportHeight / this.imageHeight();
	} else {
	    scale = this.viewportWidth / this.imageWidth() * 100 / this.panel.width;
	}
	if (scale == Infinity) {
	    scale = 1
	}
	if (debug) {
	    console.log("Panel Height: " + this.panel.height);
	    console.log("Panel Width: " + this.panel.width);
	    console.log("ViewP Height: " + this.viewportHeight);
	    console.log("ViewP Width: " + this.viewportWidth);
	    console.log("Image Height: " + this.imageHeight());
	    console.log("Image Width: " + this.imageWidth());
	    console.log("Scale: " + scale);
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
	    translateY: "-48px",
	    duration: speed,
	    delay: delay,
	    easing: 'easeOutExpo',
	    loop: false,
	});
	this.hideAbout();
	this.hideHelp();
    }

    showMenu() {
	anime({
	    targets: "#menu",
	    translateY: 0,
	    duration: speed,
	    easing: 'easeOutExpo',
	    loop: false,
	});
    }

    about() {
	let about = document.getElementById("about");
	if (about.style.display == "none") {
	    about.style.display = "block";
	    this.hideHelp();
	} else {
	    about.style.display = "none";
	}
    }
    hideAbout() {
	document.getElementById("about").style.display = "none";
    }

    help() {
	let help = document.getElementById("help");
	if (help.style.display == "none") {
	    this.hideAbout();
	    help.style.display = "block";
	} else {
	    help.style.display = "none";
	}
    }
    hideHelp() {
	document.getElementById("help").style.display = "none";
    }

}

class Comic {
    constructor(request) {
	this.homepage = document.getElementById('homebtn').href;
	this.exitpage = document.getElementById('exitbtn').href;
	// Defaults to English. No language support 
	this.lang = "en";

	let pbpdata = document.getElementById('pbpdata').dataset;
	this.name = pbpdata.name;
	this.root = pbpdata.root;
	this.currentPage = parseInt(pbpdata.page);
	this.currentPanel = -1;
	this.url = this.root + "comics/" + this.name + "/" + this.name + ".acbf";
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
	if (debug) {
	    console.log("The transfer is complete");
	}
    }
	
    transferFailed(event) {
	console.log("An error occurred");
    }
    
    transferCanceled(event) {
	console.log("The transfer has been cancelled by the user")
    }

    parseACBF(acbf) {
	var dom = null
	try {
	    dom = new DOMParser().parseFromString(acbf, "text/xml");
	}
	catch (e) { dom = null; }
	this.acbf = this.xmlToJson(dom);
	if (this.acbf.ACBF["meta-data"]["book-info"]["book-title"]['#text'] == undefined) {
	    this.title = this.acbf.ACBF["meta-data"]["book-info"]["book-title"][0]["#text"];
	    for (let t = 0; t < this.acbf.ACBF["meta-data"]["book-info"]["book-title"].length; t++) {
		if (this.acbf.ACBF["meta-data"]["book-info"]["book-title"][t]["@attributes"].lang != undefined) {
		    if (this.acbf.ACBF["meta-data"]["book-info"]["book-title"][t]["@attributes"].lang == this.lang) {
			this.title = this.acbf.ACBF["meta-data"]["book-info"]["book-title"][t]["#text"];
		    }
		}
	    }
	} else {
	    this.title = this.acbf.ACBF["meta-data"]["book-info"]["book-title"]["#text"];
	}
	if (this.acbf.ACBF.body["@attributes"] != undefined) {
	    this.background = this.acbf.ACBF.body["@attributes"].bgcolor;
	}
	this.pages = [];
	this.pages.push(this.parsePage(this.acbf.ACBF["meta-data"]["book-info"].coverpage));
	for (let p = 0; p < this.acbf.ACBF.body.page.length; p++) {
	    this.pages.push(this.parsePage(this.acbf.ACBF.body.page[p]));
	}
	if (debug) {
	    console.log(dom);
	    console.log(this);
	}
    }

    parsePage(page) {
	let obj = { "image": this.name + "/" + page.image["@attributes"].href,
		    "background": null,
		    "panels": [],
		    "frames": []
		  };
	if (page["@attributes"] != undefined) {
	    obj.background = page["@attributes"].bgcolor || null;
	}
	if (page.frame != undefined) {
	    for (let f = 0; f < page.frame.length; f++) {
		let frame = []
		let pairs = page.frame[f]["@attributes"].points.split(" ");
		for (let i = 0; i < pairs.length; i++) {
		    frame.push({'x': pairs[i].split(",")[0], 'y': pairs[i].split(",")[1]});
		}
		obj.frames.push(frame);
	    }
	}
	return obj;
    }

    // Modified version from here: http://davidwalsh.name/convert-xml-json
    xmlToJson(xml) {
	var obj = {};
	
	if (xml.nodeType == 1 || xml.nodeType == 3) {
	    if (xml.attributes != undefined) {
		if (xml.attributes.length > 0) {
		    obj["@attributes"] = {};
		    for (var j = 0; j < xml.attributes.length; j++) {
			var attribute = xml.attributes.item(j);
			obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
		    }
		}
	    }
	}
	
	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
	    obj["#text"] = xml.childNodes[0].nodeValue;
	}
	else if (xml.hasChildNodes()) {
	    for(var i = 0; i < xml.childNodes.length; i++) {
		var item = xml.childNodes.item(i);
		var nodeName = item.nodeName;
		if (typeof(obj[nodeName]) == "undefined") {
		    obj[nodeName] = this.xmlToJson(item);
		} else {
		    if (typeof(obj[nodeName].push) == "undefined") {
			var old = obj[nodeName];
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
		window.location.href = this.exitpage;
	    }
	}
    }

    prev() {
	this.currentPanel--;
	if (this.currentPanel < -1) {
	    this.currentPage--;
	    this.currentPanel = this.pages[this.currentPage].panels.length - 1;
	    if (this.currentPage < 0) {
		window.location.href = this.homepage;
	    }
	}
    }

    gotoPage(page) {
	this.currentPage = page;
	this.currentPanel = -1;
	if (this.currentPage < 0) {
	    window.location.href = this.homepage;
	}
	if (this.currentPage >= this.pages.length) {
	    window.location.href = this.exitpage;
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
	}
    }
}

