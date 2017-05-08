
(function ($,window, document, undefined ) { 
    var lazyLoading=function(target,options)
    {
        this.target=target;        
        this.options={};
        if(options!==null)
            this.options=options;
    };
    lazyLoading.prototype={
        defaults:{
        itemList:[],
        index:0,
        temp:[]
        },     
        init:function(){   
           var _this=this;
           // var searchItems=$("body").find(_this.options.itemList.join(',')+",[class*='float-']"+",[class*='float-txt']");
            var searchItems=$("body").find(".float-box,.service,.info,.partner","img");
            _this.options.itemList=[];
               $.each(searchItems,function(item,obj){                 
                   _this.options.itemList.push(obj);
               });   
               var temp=[];
               var total=_this.options.itemList.length;
               var handler=function(){
                   var scrollTop=$(window).scrollTop(); 
                   
                   console.log("working fine");
                    $(_this.options.itemList).each(function(index,obj){                   
                       var cur=$(obj).offset().top;
                        if (scrollTop / cur > 0.45){ 
                            temp.push(obj);
                            total= total-1;
                            _this.options.itemList.shift();
                        }      
                    });
                   if( _this.options.itemList.length===0)
                   {
                     console.log("stop already");
                    $(window).unbind("scroll",handler);
                   }
                    if(temp.length>0)
                    {
                         var i=0;
                       (function next(i){   
                            if(temp.length>0)
                              {
                                var animation=(i%2===0)?"moveRightFromX 1s ease":"moveleftFromX .1s ease";
                                $(temp[i]).css({
                                  opacity:1,                         
                                  animation:animation
                                });
                                
                              }
                             
                               if(i<temp.length)                   
                               {
                                   i++;
                                   setTimeout(function(){
                                        next(i);
                                   },10*i);
                               }                   
                         }(i));
                    }
                   
               };
              
               $(window).bind("scroll",handler);
               
               if( _this.options.itemList.length===0)
                   {
                     console.log("stop already");
                    $(window).unbind("scroll",handler);
                   }
    
        }
       
    };
    
   
     $.fn.lazyLoading = function(options) {
          var settings= $.extend({},$.fn.lazyLoading.defaults, options);
            return new lazyLoading(this,settings).init();      
       
    };
    $.fn.lazyLoading.defaults=lazyLoading.defaults;
    window.lazyLoading=lazyLoading;
    
}( jQuery, window , document ));