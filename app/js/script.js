console.log("Load script.js");

// Instantiating the global app object
var app = {
    menubtn: $('.slide'),
    menu:$('#menu'),
    wrapper:$('.content'),
    slidedUpContentClass:"front-page-slide-up",
    introContent:'.intro-content',
    footerContent:'.front-page-footer',
    footerContentContact:'.contact-details',
    logo_menu_frontpage:'.front-page-slide-up .logo-wrap',
    nav_item:'#menu .nav-item',
    slideMenu: function(){          
           this.menu.addClass('show');           
           var tl = new TimelineMax();
           tl.to(this.menu, .5, {left:0, ease:Linear.easeNone},"start")
           .to(this.wrapper, .3, {x:400, ease:Linear.easeNone})
           .to(this.menu, .3, {x:400, css:{zIndex:25}, ease:Linear.easeNone},"+=0.1")          
           .staggerTo(this.nav_item,.5,{x:0,autoAlpha:1,ease:Linear.easeNone},0.15,"-=1.0");
          
    },
    hideMenu: function(){     
        this.menu.removeClass('show');
        var tl = new TimelineMax();        
        tl.to(this.menu, 0.25, {left:-400, ease:Linear.easeNone}) 
        .to(this.nav_item,.25,{x:-50,autoAlpha:0},"-=0.3")     
          .to(this.wrapper, 0.25, {x:0, ease:Linear.easeNone});
          
        },
    loadLogo: function(){
        var tl = new TimelineMax({delay:.5});
        tl.from('.g-logo',0.5,{scaleY:0,transformOrigin:'center'},"index")
          .to('.g-logo',0.5,{width:70},"index+=0.6")     
          .to('.g-reverse',0.3,{clip:"rect(0px 45px 45px 0px)",ease:Power4.out},"-=0.3")   
          .to('.g-logo', 0.4, {clip:"rect(0px 70px 70px 70px)",ease:Power4.out})
          .to('.g-yellow', 0.3, {clip:"rect(0px 45px 45px 0px)",ease:Power4.out},'-=0.3')
          .to('.no-g', 2.0,{autoAlpha:1,onComplete:this.slideDown.bind(this,1)},"-=0.2");
    },
    checkHasClass:function(element,className){
        var res = element.hasClass(className)?true:false;   
        return res;    
     },
     findWinWidth: function(){
         return $(window).width();
     },
     findWinHeight: function(){
        return $(window).height();
     },
     slideDown: function(secs) {
        var that = this;
        setTimeout(function()  { 
        
            if(that.checkHasClass(that.wrapper,that.slidedUpContentClass))        
           {
            var tl = new TimelineMax();  
            tl//.to(that.wrapper, 1.5, {y:-120, ease:Linear.easeNone},"index")            
             // .to([that.introContent,'.landing-logo','.no-g'],0.5,{autoAlpha:0},"-=0.1")    
              .to(that.logo_menu_frontpage,0.5,{y:120,ease:Linear.easeNone},"-=0.2")          
            // .to(that.footerContent,0.5,{autoAlpha:1},"+=0.1")
              
           }
             
         }, secs);
   }
};
$(document).ready(function () {
    $('.slide_menu').click(function(e){
        e.preventDefault();
        var $this = $(this);
        if($this.hasClass('open'))
        {
            app.hideMenu();
            $this.removeClass('open');
        }
        else {
            app.slideMenu();
            $this.addClass('open');
        }
        
    });
    app.loadLogo();
})
