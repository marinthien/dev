/*  Author:Hieu Thien Nguyen
 * 
 */

$(document).ready(function(){
    $(".box").lazyLoading({
        itemList:[],
        index:0
    });  
    
    if( $("#Company-Space").length>0)
    $("#Company-Space").whatSlider({
       width:"100%",
       height:"900px",
       duration:3000,
       speed:500,
       sort:true,
       effect:"bar"
    });
    
    $(window).bind('scroll', function() {
        if($(window).scrollTop() > 50)
        {
           $('#Site-Nav').css({  
            "z-index":300,
            position:'fixed'
            });
           
        }
        else
        {
             $('#Site-Nav').css({position:'relative',"z-index":100, top:0});
        }
       
     
    });
    
   
    
    
var mtran= $("div.ttt").children("img");
var xPos=30;
var yPos=-60;
var zPos=-1200;
var xSize=1;
var ySize=1;
/*
$.each(mtran,function(i,obj){
     $(this).css({
           opacity:1
         //animation:"door 2s linear"
        //transform: "matrix3d("+xSize+",0,-2,0,0,"+ySize+",0,0,0.703279,0,0,0,"+xPos+","+yPos+","+zPos+",1)",
       // width:60+"%"
    });
    xPos+=120;
    yPos+=39;
    zPos+=30;
    
        (function(){
            var t=i;
            setTimeout(function(){
                $(mtran[t]).css({                    
                    animation:"door 4s ease",
                    transform: "rotateX(70deg)",
                    opacity:0
                });
            },1000*t);
        }());
       
        
        
});*/
    
  var tempArr=[];
  for(var i=0; i<mtran.length;i++){
      tempArr.push(mtran[i]);
  }
  //console.log(tempArr);
var i=0;
 (function nextPic(i){
            
     setTimeout(function(){
         
           $(tempArr[i]).css({
            //animation:"door .4s ease-in reverse",
            transform: "rotateY(0deg)",
            transition:"all 1s linear",
            opacity:1         
           });
            if(i<tempArr.length-1) i++; else i=0;
             var target=(i===0)?$(tempArr[tempArr.length-1]):$(tempArr[i-1]);
             setTimeout(function(){
                   target.css({
                        //animation:"door 1s ease-in",
                        transform: "rotateY(70deg)",
                        opacity:0
                        });
                   //console.log("here first");
               },3000);
               setTimeout(function(){
                  
                       
                        
                   // console.log(i);
                  nextPic(i);
                },4000);
     },100*i);
   
}(i));

/**
 * 
 * var cssCache="";
$(".mtran").mouseover(function(){
     cssCache=$(this).css('transform');
   $(this).css({
       // transform: "matrix3d(1,0,0,0,0,1,0,0,0.503279,0,1,0,0,0,0,1)",
        animation:"door .01s linear reverse",
        //width:60+"%"
    });
});  
$(".mtran").mouseout(function(){
     
   $(this).css({
        //transform:  cssCache,
        //width:60+"%"
    });
    cssCache="";
});  
 */


var galleryList= $("div.Gallery").children("img");

$.each(galleryList,function(k,obj){ 

$(obj).hide();
//$("div.Gallery").html("");
});

var imgWidth=100;
var imgHeight=400;

var tile=[]; var $tiles="";

for(var i=0; i<10; i++)
{
  tile.push("<div></div>");
}

$tiles=$(tile.join('')); 

    $tiles.css({
        width:imgWidth/2 +"%",
        //width: 120,
        height:imgHeight/5,
        float: "left",
        background:'url("css/images/slide1.png")'   
        //background:'url("'+$(obj).attr("src")+'")'   
    });


    $("div.Gallery").append($tiles);
    
    //console.log($tiles);
    
    var animateArr=[];
    $tiles.each(function(i,obj){
        
        
        /**/
        var pos=$(this).position();
        //console.log("first 1: " +pos.left+ "-"+pos.top);
        $(this).css('background-position',-pos.left+"px"+" "+-pos.top+"px");
         //$(this).css({visibility:"hidden"});
        $(this).css("animation","dis-app 2s linear");
       
                        
    });
    //$("div.Gallery").children("img").eq(1).animate({width:"10px"},3000);
 
  

 function randomArr(){
     var temp=[];
     
 } 
 function animateMy(arr){
     console.log("test run"+ arr.length);
     
     $(arr[0]).slideUp(2000);
     var pos=$(arr[0]).position();
        //console.log("first 1: " +pos.left+ "-"+pos.top);
        $(arr[0]).css('background-position',-pos.left+"px"+" "+-pos.top+"px");
     $(arr[0]).css("animation","dis-app 2s linear");
     arr.shift();
     setTimeout(function(){
         if(arr.length>0)
             animateMy(arr);
     },1000);
 } 
 //animateMy(animateArr);
    //console.log(animateArr.length);
/*
*/














//function to slideMenuBar on resize
$('.Btn-Menu').click(function() {    
      //$('#shop-nav').slideToggle();  
      console.log($('#shop-nav').is(':visible'));
      if($('#shop-nav').is(':visible')===true)  
      $('#shop-nav').css({
          animation:"horizontalBarOut 1s linear",
          opacity:0,
          transition:"all 1s linear",
          display:"none"
      });
      else
      $('#shop-nav').css({
          animation:"horizontalBarOut .8s reverse",
          opacity:1,
          display:"inline"
      });
      
});
//animate the main navigation while loading

var itemMenu=$("ul#shop-nav").children("li");
$.each(itemMenu,function(i,obj){
    //$(this).css('width','10%');
   //$(this).css('animation','infinite-spinning 2s');
   //$(this).css('-webkit-animation','infinite-spinning 2s');
   // $(this).css('animation-iteration-count','infinite');
    //$(this).css('-webkit-animation','infinite-spinning 2s infinite');
    
});

$(window).resize(function(){
     //$('#shop-nav').show();
});

var list= $("div.Gallery").children("img");
var myPics=[];
var indexImg=0;
$.each(list,function(i,obj){ 
    myPics.push(obj); 
    $(this).hide();
});  
/*

if($("div.Gallery").length>0)
    slideMe();
*/

var innerGallery=$("div.innerGallery").children("img");
var rotateDeg=5;
$.each(innerGallery,function(i,obj){ 
  $(this).css('animation','app 4s reverse');
  $(this).css('-webkit-animation','app 4s reverse');
  $(this).css('transform','rotate('+rotateDeg+'deg)'); 
  $(this).css('margin-left','3px'); 
  rotateDeg+=5;
});  

function nextSlide()
{
    
    indexImg++;       
    if(indexImg>(myPics.length-1))
        indexImg=0;    
    setTimeout(function(){
      if(indexImg==0){
      $(myPics[myPics.length-1]).hide();
      }
      else        {
        $(myPics[indexImg-1]).hide();
      }
      slideMe();
    },3000);
       
}
function slideMe()
{
   
    //$(myPics[indexImg]).css('animation','dis-app 2s');
    //$(myPics[indexImg]).show();    
    //console.log( $("div.Gallery").children("div").length);
    $("div.Gallery").children().remove("div");
    //console.log(myPics[indexImg]["src"]);
    /*Start the animation*/
    var imgWidth=100;
    var imgHeight=800;

    var tile=[]; var $tiles="";

    for(var i=0; i<50; i++)
    {
      tile.push("<div class='my-ani'></div>");
    }

    $tiles=$(tile.join('')); 

    $tiles.css({
        width:imgWidth/5 +"%",
        //width: 120,
        height:imgHeight/10,
        float: "left",
        background:'url("'+myPics[indexImg]["src"]+'")',    
       
    });

    $("div.Gallery").append($tiles);   
    var animateArr=[];
    $tiles.each(function(i, obj){
        animateArr.push(obj);     

    }); 
   
    for(var i=0; i<animateArr.length; i++)
    {
        var pos=$(animateArr[i]).position();    
        $(animateArr[i]).css('background-position',-pos.left+"px"+" "+-pos.top+"px");
        $(animateArr[i]).css("animation","dis-app 2s linear");
      
    }
   
    setTimeout(function(){        
       nextSlide();        
    },2000);
    /*
for(var i=0; i<animateArr.length; i++)
    {
        var pos=$(animateArr[i]).position();    
        $(animateArr[i]).css('background-position',-pos.left+"px"+" "+-pos.top+"px");
        $(animateArr[i]).css("animation","dis-app 2s linear");
      
    }
   */ 
    
    
    
 
}

});




