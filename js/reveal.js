var speed = 500

var prev = document.getElementById('prevbtn');
var menu = document.getElementById('menubtn');
var next = document.getElementById('nextbtn');

var nexttime = false
var menuvis = true

next.onclick = function () {
    if (nexttime == false) {
	var zoomin = anime({
	    targets: '#pagecontainer',
	    scale: 2.0,
	    translateX: 200.0,
	    duration: speed,
	    easing: 'easeOutExpo',
	    loop: false
	});
    } else {
	var zoomout = anime({
	    targets: "#pagecontainer",
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
    if (menuvis == true) {
	var hidemenu = anime({
	    targets: '#menu',
	    translateY: -60,
	    duration: speed,
	    easing: 'easeOutExpo',
	    loop: false
	});
    } else {
	var showmenu = anime({
	    targets: '#menu',
	    translateY: 0,
	    duaration: speed,
	    easing: 'easeOutExpo',
	    loop: false
	});
    }
    menuvis = !menuvis;
}

prev.onclick = function () {
    var zoomout = anime({
	targets: "#pagecontainer",
	scale: 0.5,
	translateX: 2.0,
	duration: speed,
	easing: 'easeOutExpo',
	loop: false,
    });
}
