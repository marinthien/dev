(function($, window, document, undefined) {
    var whatSlider = function(target, options)
    {

        this.container = target;
        this.options = {};
        if (options !== null)
            this.options = options;
    };
    whatSlider.prototype = {
        defaults: {
            picList: [],
            template: [],
            currentImgIndex: 0,
            defaultCss: "transform: rotate(0deg) scale(1,1), translate(0,0)",
            //transformEffect:["transform: rotate(120deg) scale(0.5,1), translate(30px,0)","transform: rotate(90deg) scale(1.5,1), translate(130px,0)"]
            transformEffect: [],
            width: "100%",
            height: "320px",
            duration: 8000,
            speed: 1800,
            sort: false
        },
        generateTransformEffect: function() {
            var angle = 39, scale = 0.1, translate = 20, transform = "";
            for (var i = 0; i < this.defaults.picList.length; i++) {
                angle = angle + 15;
                scale = scale + 0.03;
                translate = 0;

                transform = "rotateX(" + angle + "deg)";
                //transform="rotateX(" +angle+"deg) scale("+ scale +",1) translateZ("+translate+ "px)";

                //   transform="rotateY(" +angle+"deg) scale("+ scale +",1) translateZ("+translate+ "px)";    
                //var transform= "transform: rotate(" +angle+"deg) scale("+ scale +",1) translate("+translate+ "px)" ;
                this.defaults.transformEffect.push(transform);
            }
        },
        shuffle: function(o) {

            var max = o.length, min = 0;
            var _currentBoxesTemp = null;
            var tempArr = [];
            while (tempArr.length < o.length)
            {
                if (typeof pre === 'undefined')
                    var pre = null;
                var r = Math.floor(Math.random() * (max - min)) + min;
                if (pre !== r && tempArr.indexOf(r) === -1)
                    tempArr.push(r);
                pre = r;

            }
            for (var i = 0; i < tempArr.length; i++)
            {
                //console.log(tempArr[i]);
                _currentBoxesTemp = o[i];
                o[i] = o[tempArr[i]];
                o[tempArr[i]] = _currentBoxesTemp;
            }

            return o;
        },
        sortPic: function(o) {

            var _currentBoxesTemp = [];
            for (var i = o.length - 1; i >= 0; i--)
            {
                _currentBoxesTemp.push(o[i]);
            }
            return _currentBoxesTemp;

        },
        init: function() {
           
            var _this = this;
            var loading = $("<div class='wait'>wait for me</div>");
            loading.css({
                "font-size": "20pt",
                position: "absolute",
                width: "100%", height: "100%",
                background: "#000",
                color: "#fff",
                animation: "circle-color 2s infinite"

            });
            
            var _items = $(this.container).children("img");
            var _template = $(this.container).find("[class=custom]");
            //var _template=$(this.container).find("[class=banner]");
            $(_items).each(function(index, item) {
                //$(item).hide();//hide each image
                $(item).css({opacity: 0});
                //put image object into picList array
                _this.defaults.picList.push(item);
            });
            $(_template).each(function(index, tpl) {
                _this.defaults.template.push(tpl);
            });
            _this.generateTransformEffect();
            //_this.slideImg();
            //$(_this.container).append(loading);
            _this.slideBox();
           
             
           
        },
        slideImg: function() {
            var _this = this;
            var i = 0;
            //create closure to loop 
            (function slidePic(i) {
                var _style = {
                    opacity: 1,
                    //animation:"spinX .3s reverse"
                    transform: "rotateX(0deg) scale(1) translateX(0)"

                };

                $(_this.defaults.picList[i]).css(_style);
                //console.log(_this.defaults.picList[i]);
                //set the array index to loop infinite
                i = (i < _this.defaults.picList.length - 1) ? i + 1 : 0;
                //_nextContainer the current index image
                _this.defaults.currentImgIndex = i;
                //hide the current image before display a new one after 4000
                setTimeout(function() {
                    _this.hidePreviousImg();
                }, 4000);

                setTimeout(function() {
                    //slide to the next one
                    slidePic(i);
                }, 5900);
            }(i));
        },
        hidePreviousImg: function() {
            var preIndex = null;
            preIndex = (this.defaults.currentImgIndex === 0) ? this.defaults.picList.length - 1 : this.defaults.currentImgIndex - 1;
            /*
             * if(this.defaults.currentImgIndex===0){
             preIndex=this.defaults.picList.length-1;
             }               
             else{
             preIndex=this.defaults.currentImgIndex-1;
             }
             */

            //this.defaults.transformEffect=this.shuffle(this.defaults.transformEffect);
            var transform = this.defaults.transformEffect[preIndex];
            var _css = {
                opacity: 0,
                //animation:"door 2s linear"
                //animation:"app 2s linear",
                transform: transform
                        //transform:'rotate(125deg) scale(1.3,1) translate(40px)'
            };

            //console.log(this.defaults.transformEffect[preIndex]);
            $(this.defaults.picList[preIndex]).css(_css);
            //console.log(this.defaults.picList[preIndex]);

        },
        randomBox: function(_currentBoxes) {
            var r = Math.floor(Math.random() * (10 - 1)) + 1;
            var _newRandomBoxes = [];
            switch (r % 9) {
                case 2:

                    _newRandomBoxes = $.map(_currentBoxes, function(x, y) {
                        return [{x: _currentBoxes[0].x + r, y: 1}];
                    });
                    break;
                case 1:
                    _newRandomBoxes = $.map(_currentBoxes, function(x, y) {
                        return [{x: 1, y: _currentBoxes[0].y + r}];
                    });
                    break;
              
                case 0:

                    _newRandomBoxes = $.map(_currentBoxes, function(x, y) {
                        return [{x: _currentBoxes[0].y + r, y: _currentBoxes[0].x + r}];
                    });
                    break;
                default:
                     _newRandomBoxes = $.map(_currentBoxes, function(x, y) {
                        return [{x: _currentBoxes[0].y + r+1, y: _currentBoxes[0].x + r-1}];
                    });
                    
                    break;
            }

            return _newRandomBoxes;
        },
        generateAnimation: function(condition) {
            var animationLibrary =
            [
                //start vertical animation
                {show: "spinOutFromY " + condition[0].speed * 1.1 + "ms reverse", exit: "spinYBar " + condition[0].speed + "ms cubic-bezier(0.250, 0.250, 0.750, 0.750)",required:true},
                {show: "verticalBarOut " + condition[0].speed * 1.2 + "ms linear", exit: "verticalBarOut " + condition[0].speed + "ms reverse",required:true},
                {show: "verticalBarIn " + condition[0].speed * 1.1 + "ms reverse", exit: "verticalBarIn " + condition[0].speed + "ms cubic-bezier(0.250, 0.250, 0.750, 0.750)",required:true},
                {show: "verticalBarIn " + condition[0].speed + "ms linear", exit: "verticalBarOut " + condition[0].speed + "ms reverse",required:true},
                {show: "verticalBarIn " + condition[0].speed + "ms reverse", exit: "verticalBarOut " + condition[0].speed + "ms reverse",required:true},
                {show: "verticalBarRotate " + condition[0].speed + "ms reverse", exit: "verticalBarRotate " + condition[0].speed*1.2 + "ms linear",required:false},
               //start horizontal animation
                {show: "horizontalBarOut " + condition[0].speed* 1.2+ "ms linear", exit: "horizontalBarOut " + condition[0].speed + "ms reverse",required:true},
                {show: "BouncingX " + condition[0].speed+ "ms linear", exit: "BouncingX " + condition[0].speed + "ms reverse",required:false},
            ];
            
           
            if(condition[0].x!==1 && condition[0].y!==1){
                
            }
            else if(condition[0].x===1){
                 animationLibrary.splice(0,6);
                
            }
            else
            {
                
                  animationLibrary.splice(6,2);
            }
             
            var selectedEffect=condition[0].selection % animationLibrary.length;
         
            this.defaults.transformEffect=animationLibrary[selectedEffect];
       

        },
        slideBox: function() {
            var _this = this;
            var index = 0, speed = (_this.options.speed) ? _this.options.speed : _this.defaults.speed;
            //this imgWidth is the expected with of image to appear within the our mainswitch class
            var imgWidth = 100, imgHeight = 100;
            var titleAnimation = "";
            var _duration = (_this.options.duration) ? _this.options.duration : _this.defaults.duration;
            (function slideNext(index) {
                var _xBoxes = 3, _yBoxes = 4;
                var animation = "", _exitAnimation = "";
                var _randomBoxes = [];
                _randomBoxes = _this.randomBox([{x: _xBoxes, y: _yBoxes}]);
                //assign the number of random boxes
                _xBoxes = _randomBoxes[0].x;
                _yBoxes = _randomBoxes[0].y;
                //_xBoxes =1;
                _yBoxes=1;
                //control the animation by deciding the number of boxes
                
                //var _animationName = "", _animationSpeed = "", _animationDirection = "";
                _this.generateAnimation([{speed: speed,selection:_xBoxes,x:_xBoxes,y:_yBoxes}])
               // _this.generateHorizontalAnimation([{speed: speed,selection:_yBoxes}]);
                console.log(_this.defaults.transformEffect);
                
                animation = _this.defaults.transformEffect.show;
                _exitAnimation = _this.defaults.transformEffect.exit;

                $(_this.container).children().remove("div");
                var _boxesArr = [], _boxes = "", _numberOfBoxes = _xBoxes * _yBoxes;
                var _timeToClearTile = speed / _numberOfBoxes;
                //declare next image 
                var _nextBoxesArr = [], _nextBoxes = "";
                //create each div or box
                for (var i = 0; i < _numberOfBoxes; i++) {
                    _boxesArr.push("<div class='techBoy'></div>");
                    _nextBoxesArr.push("<div class='techBoy'></div>");
                }
                _boxes = $(_boxesArr.join(''));
                _nextBoxes = $(_nextBoxesArr.join(''));

                //style the main gallery
                $(_this.container).css({
                    overflow: "hidden",
                    height: _this.options.height,
                    width: _this.options.width
                });
                _boxes.css({
                    width: imgWidth / _xBoxes + "%",
                    height: imgHeight / _yBoxes + "%",
                    float: "left",
                    background: 'url("' + $(_this.defaults.picList[index]).attr('src') + '") no-repeat',
                    "background-size": $(_this.container).width() + "px " + $(_this.container).height() + "px",
                    perspective: "1700px"

                });
                var _nextImgIndex = (index + 1) < _this.defaults.picList.length ? index + 1 : 0;
                _nextBoxes.css({
                    width: imgWidth / _xBoxes + "%",
                    height: imgHeight / _yBoxes + "%",
                    float: "left",
                    background: 'url("' + $(_this.defaults.picList[_nextImgIndex]).attr('src') + '") no-repeat',
                    "background-size": $(_this.container).width() + "px " + $(_this.container).height() + "px",
                    perspective: "1700px"

                });
                var title = $(_this.defaults.template[index]);
                $(_this.container).append(title);
                title.css({
                    transition: "all " + speed * 0.1 + "ms linear",
                    opacity: 0,
                    "z-index": 10
                });
                //append these boxes into main container
                
                var _currentContainer=$("<div/>").addClass('mainSwitch').css({height: $(_this.container).height() + "px"}).append(_boxes);
                $(_this.container).append(_currentContainer);
                var _currentBoxesTemp = [];
              
                $(_boxes).each(function(i, box) {
                    var pos = $(box).position();
                    $(box).css({
                        "background-position": -pos.left + 'px ' + -pos.top + 'px',
                        "box-sizing": "border-box",
                        opacity: 1
                    });
                    _currentBoxesTemp.push(box);
                });


                var _nextContainer = $("<div/>").addClass('mainSwitch').append(_nextBoxes);
                _nextContainer.css({
                    opacity: 0,
                    "z-index": 1,
                    height: $(_this.container).height() + "px"

                });

                $(_this.container).append(_nextContainer);
                var _nextBoxesTemp = [];

                $(_nextBoxes).each(function(i, box) {
                    var pos = $(box).position();
                    $(box).css({
                        "z-index": 1,
                        "background-position": -pos.left + 'px ' + -pos.top + 'px',
                        "box-sizing": "border-box",
                        opacity: 0
                    });
                    _nextBoxesTemp.push(box);
                });


                /*
                 * Create closure to animate each box
                 */

                /* 
                 var i=0;
                 (function nextBox(i){                          
                 $(_currentBoxesTemp[i]).css({
                 opacity:1,
                 perspective:"1700px",
                 animation:_exitAnimation
                 });   
                 if(i<_currentBoxesTemp.length){
                 i++;
                 setTimeout(function(){
                 nextBox(i);
                 },_timeToClearTile);
                 }
                 
                 }(i));
                 */

                title.css({perspective: "1700px", opacity: .75, animation: _exitAnimation});
                var _sort = (_this.options.sort) ? _this.options.sort : _this.defaults.sort;
               
                if (_xBoxes<7)
                {
                    _currentBoxesTemp = _this.sortPic(_currentBoxesTemp);
                    _nextBoxesTemp = _this.sortPic(_nextBoxesTemp);
                }
                console.log(_xBoxes +" -" +_yBoxes);
                
                
                setTimeout(function() {
                    //animate the current to exit
                    /**/
                    $(_currentBoxesTemp).each(function(i, obj) {
                        (function(i) {
                            setTimeout(function() {
                                
                                if(_this.defaults.transformEffect.required===true)
                                    $(_currentBoxesTemp[i]).css({
                                     animation:animation,
                                    opacity: 0,
                                    //transition: "all " + speed * 0.99 + "ms linear"
                                });                               
                                else                                  
                                $(_currentBoxesTemp[i]).css({
                                    //animation:animation,
                                    opacity: 0,
                                    transition: "all " + speed * 0.99 + "ms linear"
                                });
                                
                            }, _timeToClearTile * i);
                            
                            
                        }(i));
                         
                    });
                    
                    
                    //_currentContainer.css({opacity: 0,"z-index": 1});
                    //hide the title
                    title.css({opacity: 0});
                    //show the next image container
                     _nextContainer.css({opacity: 1,"z-index": 4});
                   
                        
                        
                
                    //animate to show the next boxes image
                    for (var i = 0; i < _nextBoxesTemp.length; i++) 
                    {
                        (function(i) {
                            setTimeout(function() {
                                
                                if (_xBoxes%9===5)
                                {
                                    if (i % 2 === 0)
                                        $(_nextBoxesTemp[i]).css({
                                            animation: _exitAnimation,
                                            opacity: 1
                                        });
                                    else
                                        $(_nextBoxesTemp[i]).css({
                                            animation: animation,
                                            opacity: 1
                                        });
                                }
                                else
                                {
                                   
                                    $(_nextBoxesTemp[i]).css({
                                        animation: _exitAnimation,
                                        opacity: 1,
                                        //transition: "all " + speed * 0.99 + "ms linear"
                                    });   
                                }
                                 
                            }, _timeToClearTile * i);
                        }(i));
                    }
                    

                }, _duration - speed*2);









                /**
                 * 
                 *end of hide boxes
                 */

                //check the index of image array to continute the loop
                index = index < _this.defaults.picList.length - 1 ? index + 1 : 0;
                setTimeout(function() {

                    slideNext(index);

                }, _duration);



            }(index));
        }


    };
    $.fn.whatSlider = function(options) {
        var settings = $.extend({}, $.fn.whatSlider.defaults, options);
        return new whatSlider(this, settings).init();

    };
    $.fn.whatSlider.defaults = whatSlider.defaults;
    window.whatSlider = whatSlider;

}(jQuery, window, document));


