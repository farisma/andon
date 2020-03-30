console.log("Load script.js");

// Instantiating the global app object
var app = {
    menubtn: $('.slide'),
    slideMenuBtn:$('.slide_menu'),
    menu:$('#menu'),
    wrapper:$('.content'),
    slidedUpContentClass:"front-page-slide-up",
    introContent:'.intro-content',
    footerContent:'.front-page-footer',
    footerContentContact:'.contact-details',
    logo_menu_frontpage:'.front-page-slide-up .logo-wrap',
    nav_item:'#menu .nav-item',
    findMenuWidth: function(){
        var winW = this.findWinWidth();
        return (winW>400)?400:winW;
        
    },
    findContentSlideDistance:function(){
        var WinH = this.findWinHeight();
        var footerHeight = $(this.footerContent).height();
        return WinH - footerHeight;
    },
    slideMenu: function(){          
           this.menu.addClass('show');           
           var tl = new TimelineMax();
           console.log("hi")
           var menuWidth = this.findMenuWidth();
           tl.to(this.menu, .5, {left:-menuWidth, ease:Linear.easeNone},"start")
           .to(this.wrapper, .3, {x:menuWidth, ease:Linear.easeNone})
          // .to(this.menu, .3, {x:menuWidth, css:{zIndex:25}, ease:Linear.easeNone},"+=0.1")          
           .staggerTo(this.nav_item,.5,{x:0,autoAlpha:1,ease:Linear.easeNone},0.15,"-=1.0")
           .from('.closeMenu',0.5,{autoAlpha:0},"+=0.3");
          
    },
    hideMenu: function(){     
        this.menu.removeClass('show');
        var tl = new TimelineMax();  
        var menuWidth = this.findMenuWidth();      
        tl.to(this.menu, 0.25, {left:-menuWidth, ease:Linear.easeNone}) 
        .to(this.nav_item,.25,{x:-50,autoAlpha:0},"-=0.3")     
        .to(this.wrapper, 0.25, {x:0, ease:Linear.easeNone});
          
        },
    loadLogo: function(){
        var tl = new TimelineMax({delay:.5});
        tl.from('.g-logo',0.5,{scaleY:0,transformOrigin:'center',ease:Linear.easeNone},"index")
          .to('.g-logo',0.5,{width:70,ease:Linear.easeNone},"index+=0.6")     
          .to('.g-reverse',0.3,{clip:"rect(0px 45px 45px 0px)",ease:Linear.easeNone},"-=0.3")   
          .to('.g-logo', 0.4, {clip:"rect(0px 70px 70px 70px)",ease:Linear.easeNone})
          .to('.g-yellow', 0.3, {clip:"rect(0px 45px 45px 0px)",ease:Linear.easeNone},'-=0.3')
          .to('.no-g', 3.0,{autoAlpha:1,ease:Linear.easeNone},"-=0.2")
          .from('.separatorline',.75,{width:0,ease:Linear.easeNone},"-=2.5")
          .staggerFrom('.intro-contact-details p.add-copy',1,{y:10,autoAlpha:0,ease:Linear.easeNone},.5,"-=1.5")
          .from('.social',0.5,{y:10,autoAlpha:0,ease:Linear.easeNone},"-=.5")
          .from('.intro-contact-details p.intro-copy',0.5,{y:10,autoAlpha:0,onComplete:this.slideDown.bind(this,1),ease:Linear.easeNone},"-=.25");
    },
    checkHasClass:function(element,className){
        var res = element.hasClass(className)?true:false;   
        return res;    
     },
     findWinWidth: function(){
         return $(document).width();
     },
     findWinHeight: function(){
        //return $(document).height();
        //for avoiding outside bars height in ios
        return (typeof window.outerHeight != 'undefined')?Math.max(window.outerHeight, $(window).height()):$(window).height()

     },
     slideDown: function(secs) {
        var that = this;
        var slideDist = this.findContentSlideDistance();
        setTimeout(function()  { 
        //alert("doc-"+$(document).height()+"window"+$(window).height())
            if(that.checkHasClass(that.wrapper,that.slidedUpContentClass))        
           {
            var tl = new TimelineMax();  
              tl.to(that.wrapper, 1.5, {y:-120, ease:Linear.easeNone},"index")            
              .to([that.introContent,'.landing-logo','.no-g'],0.5,{autoAlpha:0,ease:Linear.easeNone},"-=0.1")    
              .to(that.logo_menu_frontpage,0.5,{y:120,ease:Linear.easeNone},"-=0.75")          
              .to(that.footerContent,0.5,{autoAlpha:1,ease:Linear.easeNone},"+=0.1")
              
           }
             
         }, secs);
   }
};
$(document).ready(function () {
    app.slideMenuBtn.click(function(e){
        e.preventDefault();
        var $this = $(this);
        if($this.hasClass('open'))
        {
            console.log('open')
            app.hideMenu();
            $this.removeClass('open');
        }
        else {
            console.log('close')
            app.slideMenu();
            $this.addClass('open');
        }
        
    });
    $('.closeMenu').click(function(e){
        e.preventDefault();
        var $slideMenuBtn = app.slideMenuBtn;
            app.hideMenu();
            $slideMenuBtn.removeClass('open');
        
      
    })
    app.loadLogo();
})
