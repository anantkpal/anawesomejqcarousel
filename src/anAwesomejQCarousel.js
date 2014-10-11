(function ( $ ) {
$.fn.anAwesomejQCarousel = function( options ) {
  var settings = $.extend({
    interval: 10000,
    rotation: "none",
    animationinterval: 2000,
    navRightSelector :'.acarousel-next',
	navLeftSelector : '.acarousel-prev',
    navLCarouselSelector : 'img',
	hideEffectFunc : function(currenel){
		currenel.slideUp(2000);
	},
	showEffectFunc : function(nextel){
		nextel.slideDown(2000);	
	},
	callBackFunc:function(){
	},
	callBackAfterEachSlide:function(prevElement,nextElement){
	}
  }, options );
  this.addClass('acarousel');
  var _childrens= this.children(settings.navLCarouselSelector);
  _childrens.addClass('acarousel-el');
  _childrens.not(':first').hide();
  
  var self = this;
  this.pagination={
    settings : settings,
    currentNav: $(this).children('.acarousel-el:first'),
	nextNav: '',
    navroute :'left',
	rotaionstarted:true,
    timout :function(){}, 
    slide:function(){
		self.pagination.settings.hideEffectFunc(self.pagination.currentNav);
		self.pagination.settings.showEffectFunc(self.pagination.nextNav);
		self.pagination.rotate();
		self.pagination.settings.callBackAfterEachSlide(self.pagination.nextNav,self.pagination.currentNav);
    },
    navigate : function(){
		self.pagination.navroute = $(this).is(self.find(self.pagination.settings.navRightSelector)) ? 'right' : 'left';
		self.pagination.currentNav=$(self).children('.acarousel-el:visible');
		_currentVisibleElement = self.pagination.currentNav;
		if(self.pagination.navroute==='right'){
			_nextElement = _currentVisibleElement.next('.acarousel-el:first'); 
        if(_nextElement.length===0)
			_nextElement = _currentVisibleElement.parent().find('.acarousel-el:first');
		}else{
			_nextElement = _currentVisibleElement.prev('.acarousel-el:first');
			if(_nextElement.length===0)
				_nextElement = _currentVisibleElement.parent().find('.acarousel-el:last');
		}
		self.pagination.nextNav=_nextElement;
		self.pagination.slide();
    },
	rotate:function(){
		clearTimeout(self.pagination.timeout);
		if(self.pagination.settings.rotation=='right' && self.pagination.rotaionstarted){
			self.pagination.timeout=setTimeout(function(){$(self).find(self.pagination.settings.navRightSelector).click();},self.pagination.settings.interval);
		}else if(self.pagination.settings.rotation=='left' && self.pagination.rotaionstarted){
			self.pagination.timeout=setTimeout(function(){$(self).find(self.pagination.settings.navLeftSelector).click();},self.pagination.settings.interval);
		}
	},
	stopRotation:function(){
		clearTimeout(self.pagination.timeout);
		 self.pagination.rotaionstarted=false;
	},
	startRotation:function(){
		 self.pagination.rotaionstarted=true;
		 self.pagination.rotate();
	}
  };
	if(this.find(self.pagination.settings.navRightSelector+','+self.pagination.settings.navLeftSelector).length===0){
		this.find('.acarousel-el:first').before('<a href="javascript:void(0)" class="acarousel-prev">PREV</a><a href="javascript:void(0)" class="acarousel-next">NEXT</a>');
		self.pagination.settings.navRightSelector='.acarousel-next';
		self.pagination.settings.navLeftSelector='.acarousel-prev';
	} 
	$(this).find(self.pagination.settings.navRightSelector+','+self.pagination.settings.navLeftSelector).click(this.pagination.navigate);
	self.pagination.startRotation();
	self.pagination.settings.callBackFunc();
return {
			el:this,
			startTransition:function(){
				self.pagination.startRotation();
			},
			stopTransition:function(){
				self.pagination.stopRotation();
			},
			updatesettings:function(options){
				var cannotOverrideSettings={navRightSelector :self.pagination.settings.navRightSelector,
											navLeftSelector : self.pagination.settings.navLeftSelector,
											navLCarouselSelector : self.pagination.settings.navLCarouselSelector}
				 var settings = $.extend(self.pagination.settings, options);
					settings= $.extend(settings, cannotOverrideSettings);
					self.pagination.settings=settings;
				 self.pagination.stopRotation()
				 self.pagination.startRotation()
			},
			slideTo:function(elementTo){
					self.pagination.currentNav=$(self).children('.acarousel-el:visible');
					self.pagination.nextNav=$(elementTo);
					self.pagination.slide();
			}
		};
};
}( jQuery ));
