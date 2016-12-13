/**
 * Created by qiang on 2016/11/21.
 */


var lightBoxImg = ["img/b-w1.jpg","img/b-w2.jpg","img/b-w3.jpg","img/b-w4.jpg"];
var lightBoxTxt = ['Chaise longue','Fauteuil','Fainting couch','Mattress Brands'];

(function($,lightBoxImg){
    //添加图片
    $('.lightBox_img').append('<img class="lightBox_move1" src="'+lightBoxImg[0]+'" />');
    $('.lightBox_img').append('<img class="lightBox_move1" src="'+lightBoxImg[1]+'" />');
    $('.lightBox_img').append('<img class="lightBox_move1" src="'+lightBoxImg[2]+'" />');
    $('.lightBox_img').append('<img class="lightBox_move1" src="'+lightBoxImg[3]+'" />');
    $('.lightBox_img img').wrapAll('<div style="width: 4300px"></div>');

    var imgNum;
    var lightBoxDownTime;
    var lightBoxTopTime;
    var wonmd = true;
    var lightBox = {
        //点击出现
        bgClick:function(){
            $('.service_ulBg').each(function(index){
                $('.service_ulBg').eq(index).click(function(){
                    var that = this;
                    var e = window.event||arguments[0];
                    var lightTop = e.pageY-e.clientY; //获取当前窗口的高度
                    //console.log(e.pageY-e.clientY);
                    $('.service_ulBg').each(function(index){
                        if(that == $('.service_ulBg').get(index)){
                            //图片添加
                            //$('.lightBox_img img').remove();
                            imgNum = index;
                            $('.lightBox_img img').eq(index).removeClass('lightBox_move1');//添加之前先删除！
                            $('.lightBox_img img').eq(index).addClass('lightBox_move2');
                            $('.lightBox_img div').css({marginLeft:(-index*1000)+'px'});

                            //添加文字
                            $('.lightBox_Top').html('<p>'+lightBoxTxt[index]+'</p>');

                            $('#lightBox').css({display:'block',top:lightTop});
                            $('#lightBox').fadeTo(800,1);
                            setTimeout(function(){
                                //让滚动条消失
                                $('body').css({overflow:'hidden'});
                            },800);

                            if(index==0){$('.lightBox_down span').eq(1).addClass('lightLeftEnd');}
                            else{ $('.lightBox_down span').eq(1).removeClass('lightLeftEnd');}

                            if(index==3){$('.lightBox_down span').eq(2).addClass('lightRightEnd');}
                            else{$('.lightBox_down span').eq(2).removeClass('lightRightEnd');}
                        }
                    });

                    wonmd = true;
                    // 上下栏隐藏
                    lightBox.hideMenu();
                });
            })
        },
        //点击消失
        noneClick:function(){
            $('.lightBox_down span').eq(0).click(function(){
                $('#lightBox').fadeTo(800,0);

                wonmd = false;
                //关闭则清除上下栏关闭的定时器
                lightBox.hideMenu();


                setTimeout(function(){
                    //让灯箱消失
                    $('#lightBox').css({display:'none'});
                    $('.lightBox_img img').eq(imgNum).removeClass('lightBox_move2');//添加之前先删除！
                    $('.lightBox_img img').eq(imgNum).addClass('lightBox_move1');
                },800);

                $('body').css({overflow:''});

            });
        },

        //向左向右点击移动
        moveClick:function(){
            //向左移动
            $('.lightBox_down span').eq(1).click(function(){
                // 上下栏隐藏
                //lightBox.hideMenu();
               if(imgNum>0){
                   setTimeout(function(){
                       $('.lightBox_img img').eq(imgNum+1).removeClass('lightBox_move2');//添加之前先删除！
                       $('.lightBox_img img').eq(imgNum+1).addClass('lightBox_move1');
                   },150);
               }

                imgNum--;
                if(imgNum<=0){$('.lightBox_down span').eq(1).addClass('lightLeftEnd');}
                else{ $('.lightBox_down span').eq(1).removeClass('lightLeftEnd');}

                if(imgNum>=3){$('.lightBox_down span').eq(2).addClass('lightRightEnd');}
                else{$('.lightBox_down span').eq(2).removeClass('lightRightEnd');}

                $('.lightBox_img img').eq(imgNum).removeClass('lightBox_move1');//添加之前先删除！
                $('.lightBox_img img').eq(imgNum).addClass('lightBox_move2');

                imgNum = (imgNum<0)?0:imgNum;
                //添加文字
                $('.lightBox_Top').html('<p>'+lightBoxTxt[imgNum]+'</p>');

                $('.lightBox_img div').css({marginLeft:(-imgNum*1000)+'px'});
            });

            //向右移动
            $('.lightBox_down span').eq(2).click(function(){
                // 上下栏隐藏
                //lightBox.hideMenu();
                if(imgNum<3){
                    setTimeout(function(){
                        $('.lightBox_img img').eq(imgNum-1).removeClass('lightBox_move2');//添加之前先删除！
                        $('.lightBox_img img').eq(imgNum-1).addClass('lightBox_move1');
                    },150);
                }

                imgNum++;
                if(imgNum<=0){$('.lightBox_down span').eq(1).addClass('lightLeftEnd');}
                else{ $('.lightBox_down span').eq(1).removeClass('lightLeftEnd');}

                if(imgNum>=3){$('.lightBox_down span').eq(2).addClass('lightRightEnd');}
                else{$('.lightBox_down span').eq(2).removeClass('lightRightEnd');}


                $('.lightBox_img img').eq(imgNum).removeClass('lightBox_move1');//添加之前先删除！
                $('.lightBox_img img').eq(imgNum).addClass('lightBox_move2');

                imgNum = (imgNum>=3)?3:imgNum;
                //添加文字
                $('.lightBox_Top').html('<p>'+lightBoxTxt[imgNum]+'</p>');

                $('.lightBox_img div').css({marginLeft:(-imgNum*1000)+'px'});
            });
        },

        //上下栏出现
        chuMenu:function(){
            $('#lightBox').click(function(){
                $('.lightBox_down').animate({bottom:'0'},500);
                $('.lightBox_Top').animate({top:'0'},500);

                // 上下栏隐藏
                lightBox.hideMenu();
            });

            $('.lightBox_Top,.lightBox_down').mouseover(function(){
                clearInterval(lightBoxDownTime);
                clearInterval(lightBoxTopTime);
            });
            $('.lightBox_Top,.lightBox_down').mouseout(function(){
                // 再次继续上下栏隐藏
                //console.log('in');
                lightBox.hideMenu();
            });
        },
        //上下栏隐藏
        hideMenu:function(){
            clearInterval(lightBoxDownTime);
            clearInterval(lightBoxTopTime);

            if(wonmd){
                // 再次继续上下栏隐藏
                lightBoxDownTime = setInterval(function(){
                    $('.lightBox_down').animate({bottom:'-8%'},500);
                },3000);
                lightBoxTopTime = setInterval(function(){
                    $('.lightBox_Top').animate({top:'-8%'},500);
                },3000);
            }


        }

    }



    window.lightBox = lightBox;
})(jQuery,lightBoxImg,lightBoxTxt)
//


lightBox.bgClick();
lightBox.noneClick();
lightBox.moveClick();
lightBox.chuMenu();