/*! slider erayliu 2016-07-27 */
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
//b.js
$("div.content").on('touchend', ".item-slide", function(e) {
	if (!touchFlag) {
		return;
	}
	var $this = $(this);
	var $next = $this.next();
	var $pre = $this.prev();
	var translateY = $this.height();
	// console.log(translateY);
	if (distanceY > 0 && $pre.length > 0) {
		/* 方案2*/
		/*  	 $this.addClass("zindex").addClass("transform");
		  	 $pre.removeClass("zindex").removeClass("transform")
		  	 			.css("transform", "translateY(0)");
		     $this.css("transform", "translateY(" + translateY +"px)");*/
		/*方案1*/
		$("ul.list-slide").addClass("transform");
		if (translateY / 4 < Math.abs(distanceY)) {
			Y += translateY;
			$("ul.list-slide").css("transform", "translateY(" + Y + "px)");
		} else {
			$("ul.list-slide").css("transform", "translateY(" + Y + "px)");
		}
	}
	if (distanceY < 0 && $next.length > 0) {
		/* 方案2*/
		/*$this.addClass("zindex").addClass("transform");
    $next.addClass("active").removeClass("zindex").removeClass("transform")
    				.css("transform", "translateY(0)");
    $this.css("transform", "translateY(" + (0-translateY) +"px)"); */
		/*方案1*/
		$("ul.list-slide").addClass("transform");
		if (translateY / 4 < Math.abs(distanceY)) {
			Y -= translateY;
			$("ul.list-slide").css("transform", "translateY(" + Y + "px)");
		} else {
			$("ul.list-slide").css("transform", "translateY(" + Y + "px)");
		}
	}
	distanceY = 0;
	touchFlag = false;
});