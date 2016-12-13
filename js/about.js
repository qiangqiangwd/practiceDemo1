/**
 * Created by qiang on 2016/11/22.
 */


var changeList = function(){
    $(".capabList ul").on('click',function(){
        //console.log('in');
        var that = this;
        var num;
        $(".capabList ul").each(function(index){
            if(that == $(".capabList ul").get(index)){
                $(".capabList>div").eq(index).slideToggle(250);
            }
        });

    });
}

changeList();