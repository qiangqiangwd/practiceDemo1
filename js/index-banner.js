/**
 * Created by qiang on 2016/11/21.
 */


var imgSrc = ["img/banner.jpg","img/banner1.jpg","img/banner2.jpg"];


//轮播封装
(function($,imgSrc){
    var flag = true;
    var autoPlayTime;
    var leftClick = false;
    var imgNum = 0;//最开始的图片
    $('#banner').append('<div class="bannerTop"><img src="'+imgSrc[imgNum+1]+'" width="1349px" height="500" /></div>');
    $('#banner').append('<div class="bannerDown"><img src="'+imgSrc[imgNum]+'" width="1349px" height="500" /></div>');
    var myBanner = {
        autoPlay:function(){
            //生成图片
            if(flag){
                $('.bannerTop img').remove();
                $('.bannerDown img').remove();

                if(leftClick){
                    $('.bannerDown').append('<img src="'+imgSrc[imgNum]+'" width="1349px" height="500" />');
                    imgNum--;
                    imgNum = (imgNum<0)?2:imgNum;
                    $('.bannerTop').append('<img src="'+imgSrc[imgNum]+'" width="1349px" height="500" />');
                    leftClick = false;
                }else{
                    $('.bannerDown').append('<img src="'+imgSrc[imgNum]+'" width="1349px" height="500" />');
                    imgNum++;
                    imgNum = (imgNum>=3)?0:imgNum;
                    $('.bannerTop').append('<img src="'+imgSrc[imgNum]+'" width="1349px" height="500" />');
                }

                $('.bannerTop').css({zIndex:-1});
                $('.bannerDown').css({zIndex:1});

                $('.bannerTop').fadeTo(1000,1);
                $('.bannerDown').fadeTo(1000,0);
                flag = false;
            }else{
                $('.bannerTop img').remove();
                $('.bannerDown img').remove();
                if(leftClick){
                    $('.bannerTop').append('<img src="'+imgSrc[imgNum]+'" width="1349px" height="500" />');
                    imgNum--;
                    imgNum = (imgNum<0)?2:imgNum;
                    $('.bannerDown').append('<img src="'+imgSrc[imgNum]+'" width="1349px" height="500" />');
                    leftClick = false;
                }else{
                    $('.bannerTop').append('<img src="'+imgSrc[imgNum]+'" width="1349px" height="500" />');
                    imgNum++;
                    imgNum = (imgNum>=3)?0:imgNum;
                    $('.bannerDown').append('<img src="'+imgSrc[imgNum]+'" width="1349px" height="500" />');
                }


                $('.bannerDown').css({zIndex:-1});
                $('.bannerTop').css({zIndex:1});

                $('.bannerDown').fadeTo(1000,1);
                $('.bannerTop').fadeTo(1000,0);
                flag = true;
            }

            //console.log(imgNum);
        },
        //设定定时器
        Time:function(){
            autoPlayTime = setInterval(myBanner.autoPlay,3000);
        },
        //按钮
        clickImg:function(){
            $('.leftBtn').remove();
            $('.rightBtn').remove();
            $('#banner').append('<div class="leftBtn"></div><div class="rightBtn"></div>');
            $('.leftBtn').click(function(){
                leftClick = true;
                clearInterval(autoPlayTime);
                myBanner.autoPlay();
                autoPlayTime = setInterval(myBanner.autoPlay,3000);
            });
            $('.rightBtn').click(function(){
                clearInterval(autoPlayTime);
                myBanner.autoPlay();
                autoPlayTime = setInterval(myBanner.autoPlay,3000);
            });
        }
    }

    window.myBanner = myBanner;
})(jQuery,imgSrc)

//myBanner.autoPlay();
myBanner.Time();
myBanner.clickImg();