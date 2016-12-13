/**
 * Created by qiang on 2016/11/22.
 */


(function($){
    var dirs = ['top','right','bottom','left'];
    var imgDirs;

    var imgMOve = {
        checkDire:function(element,e){

            var x1,y1,x0,y0,x2,y2;

            //�����������һ�����ζ��󣬰����ĸ����ԣ�left��top��right��bottom���ֱ��ʾԪ�ظ�����ҳ���ϱߺ���ߵľ��롣
            var rect = element.getBoundingClientRect();

            //����ⲻ��rect.widthʱ��������ֵ
            if(!rect.width){
                rect.width = rect.right - rect.left;
            }
            //����ⲻ��rect.heightʱ��������ֵ
            if(!rect.height){
                rect.height =  rect.bottom - rect.top;
            }

            //������Ͻǵ�����
            x1 = rect.left;
            y1 = -rect.top;
            ////������½ǵ�����
            x2 = rect.left + rect.width;
            y2 = -(rect.top + rect.height);

            //���ĵ��λ�ã���
            x0 = rect.left + rect.width/2;
            y0 = -(rect.top + rect.height/2);

            //����Խ���б��
            var k = (y1 - y2) / (x1 - x2);  //��ʾб�ʣ����Ϻ����£�
            var range = [k,-k];

            var x = e.clientX; //���ھ�����x��λ��
            var y = -e.clientY;//���ھ�����y��λ��

            //�������ĵ������ɵ�б��
            var mk = (y - y0)/(x - x0);

            //���б����range��Χ�ڣ�������Ǵ����ҷ��������Ƴ���
            if (isFinite(mk) && range[0] < mk && mk < range[1]) {
                //����x��x0�ж�����,������ֵ
                //console.log(dirs[x > x0 ? 1 : 3]);
                return x > x0 ? 1 : 3;
            } else {
                //����y��y0�ж�����,������ֵ
                return y > y0 ? 0 : 2;
            }


        },
        //�����жϸ�����
        giveAnimate:function(){
            $('.gallery_ul ul li').on('mouseenter',function(){
                var e = window.event||arguments[0];
                var that = this;

                //�жϷ���
                imgDirs = imgMOve.checkDire(that,e);
                //���ö���
                imgMOve.setAnimate(that,'in',dirs[imgDirs]);
            }).on('mouseleave',function(){
                var e = window.event||arguments[0];
                var that = this;

                //�жϷ���
                imgDirs = imgMOve.checkDire(that,e);
                //���ö���
                imgMOve.setAnimate(that,'out',dirs[imgDirs]);
            });
        },
        //����
        setAnimate:function(that,which,dirs){
            var inOutMove ={
                left:{
                    left:'-100%',
                    top:'0%'
                },
                right:{
                    left:'100%',
                    top:'0%'
                },
                top:{
                    top:'-100%',
                    left:'0'
                },
                bottom:{
                    top:'100%',
                    left:'0'
                }
            };
            var num;

            //�жϵ�ǰ����һ��ͼƬ
            $('.gallery_ul ul li').each(function(index){
                if($('.gallery_ul ul li').get(index) == that){
                    num = index;
                }
            });

            if(which == 'in'){
                if(dirs=='left'||dirs=='right'){
                    $('.gallery_ul ul li span').eq(num).css(inOutMove[dirs]).animate({
                        left:'0%'
                    },250);
                }else{
                    $('.gallery_ul ul li span').eq(num).css(inOutMove[dirs]).animate({
                        top:'0%'
                    },250);
                }
            }else{
                //$('.gallery_ul ul li span').css({top:'0%',left:'0%'}); //�Ƚ����е�span����λ�ó�ʼ��
                $('.gallery_ul ul li span').eq(num).css({top:'0%',left:'0%'}).animate(inOutMove[dirs],250);
            }
        }
    }

    window.imgMOve = imgMOve;
})(jQuery);

imgMOve.giveAnimate();