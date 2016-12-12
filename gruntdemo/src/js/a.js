//a.js
var touchFlag = false;
var touchY = 0;
var distanceY = 0;
var Y = 0;
$(document.body).on('touchmove', function(e) {
	e.stopPropagation();
	// console.log(e.stopPropagation);
});
$("div.content").on('touchstart', ".item-slide", function(e) {
	touchFlag = true;
	touchY = e.touches[0].pageY;
	// console.log("touchstart>>>" + touchY);
});

$("div.content").on('touchmove', ".item-slide", function(e) {
	touchFlag = true;
	distanceY = e.touches[0].pageY - touchY;
	// console.log("touchmove>>>>" + distanceY);
	var $this = $(this);
	var $next = $this.next();
	var $pre = $this.prev();
	if (distanceY > 0 && $pre.length > 0) {
		$("ul.list-slide").removeClass("transform");
		$("ul.list-slide").css("transform", "translateY(" + (Y + distanceY) + "px)");
	}
	if (distanceY < 0 && $next.length > 0) {
		$("ul.list-slide").removeClass("transform");
		$("ul.list-slide").css("transform", "translateY(" + (Y + distanceY) + "px)");
	}
});