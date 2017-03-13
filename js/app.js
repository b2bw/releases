$('.js-scroll-to').click(function(e) {

	target = $($(this).attr('href'));

	if (target.offset()) {
		$('html, body').animate({scrollTop: target.offset().top + 'px'}, 600);
	}

	e.preventDefault();
});



$('.js-next').click(function(e) {
	console.log("click down");
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
$('#mobile-menu-toggler, #main-menu-toggler').on('click',function(){
	console.log("toggle that menu!")
	TweenMax.to($('#helpbar'),.2,{autoAlpha:1})
});


$('#close-help').on('click',function(){
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
