var foo1anAwesomejQCarousel
$(document).ready(function(){
	$('input[name="transitionTowards"],input[name="transitionInterval"]').on('focusout change',function(){
			var transitionInterval= $('input[name="transitionInterval"]').val()
			if($.trim($('input[name="transitionInterval"]').val())==='')
				transitionInterval=5000;
			foo1anAwesomejQCarousel.updatesettings({rotation:$('input[name="transitionTowards"]:checked').val(),interval:transitionInterval});
	});
	var transitionInterval= $('input[name="transitionInterval"]').val()
	if($.trim($('input[name="transitionInterval"]').val())==='')
		transitionInterval=5000;
	 foo1anAwesomejQCarousel=$('#foo1').anAwesomejQCarousel({
																rotation:$('input[name="transitionTowards"]:checked').val(),
																interval:transitionInterval,
																callBackAfterEachSlide:function(curel,prevel){
																	$('.slidto.btn-default').addClass('btn-primary').removeClass('btn-default');
																	$('.slidto:contains("'+$(curel).attr('alt')+'")').addClass('btn-default').removeClass('btn-primary');
								}});
	$('#foo1 .starttransition').on('click',function(){
		foo1anAwesomejQCarousel.startTransition();
	});
	$('#foo1 .stoptransition').on('click',function(){
		foo1anAwesomejQCarousel.stopTransition();
	});
	$('#foo1 .slidto').on('click',function(){
		var selector = $(this).text();
		foo1anAwesomejQCarousel.slideTo($('img[alt="'+selector+'"]'));
	});
});