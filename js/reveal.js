var prev = document.getElementById('prevbtn');
var next = document.getElementById('nextbtn');

var nexttime = false

next.onclick = function () {
    if (nexttime == false) {
	var zoomin = anime({
	    targets: '#pagecontainer',
	    scale: 2.0,
	    translateX: 200.0,
	    duration: 750,
	    easing: 'easeOutExpo',
	    loop: false
	});
    } else {
	    var zoomout = anime({
	targets: "#pagecontainer",
	scale: 1.0,
	translateX: 0.0,
	duration: 750,
	easing: 'easeOutExpo',
	loop: false,
	    });
    }
    nexttime = !nexttime;
}

prev.onclick = function () {
    var zoomout = anime({
	targets: "#pagecontainer",
	scale: 0.5,
	translateX: 2.0,
	duration: 750,
	easing: 'easeOutExpo',
	loop: false,
    });
}
