$('.js-scroll-to').click(function(e) {

	target = $($(this).attr('href'));

	if (target.offset()) {
		$('html, body').animate({scrollTop: target.offset().top + 'px'}, 600);
	}

	e.preventDefault();
});



$('.js-next').click(function(e) {
	// console.log("click down");
  var selected = $(".section.js-current-panel");
  var anchors = $(".section");

  var pos = anchors.index(selected);
  var next = anchors.get(pos+1);
  var prev = anchors.get(pos-1);

  target = $(next);

  $(selected).removeClass("js-current-panel");
  $(next).addClass("js-current-panel");

	if (target.offset()) {
		$('html, body').animate({scrollTop: target.offset().top + 'px'}, 600);
	}


	e.preventDefault();
});




//toggle help
$('#mobile-menu-toggler, #main-menu-toggler').on('click',function(e){
	// console.log("toggle that menu!")
	e.preventDefault();
	TweenMax.to($('#helpbar'),.2,{autoAlpha:1})
});


$('#close-help').on('click',function(e){
	e.preventDefault();
	TweenMax.to($('#helpbar'),.2,{autoAlpha:0})
});



//submit paypal form
function submitPayPal(code){

 form = document.createElement('form');
				formContent = '<input type="hidden" name="cmd" value="_s-xclick">';
				formContent += '<input type="hidden" name="hosted_button_id" value="'+code+'">';
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = 'https://www.paypal.com/cgi-bin/webscr';
        form.target = '_top';
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
			}



var twitter = function(e){
  e.preventDefault()
	// console.log("trying twitt")
  social_url = "https://twitter.com/intent/tweet?source=webclient&text=" + encodeURI(window.location + "#timeline ");
  window.open(social_url, "_blank").focus();
}



var facebook = function(e){
  e.preventDefault()
	// console.log("trying face")
  social_url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(window.location);
  window.open(social_url, "_blank").focus();
}


// floating text-box don't cover the top stuff!!
var $floater = $('.floating-textbox');
function spaceOutTheFloater(){
  if (window.innerHeight <= 820) {
  $floater.addClass('give-room');
  } else {
    $floater.removeClass('give-room');
  }
};

window.onresize = function() {
      spaceOutTheFloater();
}

spaceOutTheFloater();