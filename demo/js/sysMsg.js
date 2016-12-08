/**
 * Created by Eleder on 2016/11/24.
 */


sysmsg();
function sysmsg() {
    $.ajax({
        url: 'http://139.196.223.209/server/interface/sysMsgSearch.json',
        type: 'post',
        dataType: "json",
        //
        data: {Param1:"0","page":1,"rows":10,"sort":"createDate","order":"DESC","ApiKey": "yicangonline_h5"},
        success: function (data) {
            var curData=data.body;
            console.log(curData);
            str='';
            for(var i=0;i<curData.resultlist.length;i++){
                var sysData=curData.resultlist[i];
                str+='<div class="content">';
                str+=' <h3>'+sysData.title+'</h3>';
                str+='<span class="time">'+sysData.postTime+'</span>';
                str+='<span>'+sysData.content+'</span>';
                str+='</div>';
                str+='<b class="split"></b>';
                var section=document.getElementById('section');
                section.innerHTML=str;
            }

        }

    });
    $('#backBtn').click('on',function (e) {
        window.history.go(-1);
    })
}
