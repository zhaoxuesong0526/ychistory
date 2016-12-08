function queryURLParameter(url) {
    url = url || window.location.href;
    url=decodeURI(url);
    var reg = /([^?&=#]+)=([^?&=#]+)/g,
        obj = {};
    url.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}
companyId = queryURLParameter()["id"];

var header=document.getElementById('header');
var sectoion=document.getElementById('section');
function historyList(jsonData) {
    console.log(jsonData);
    var data = jsonData.body;
    var str='';
    var strTop='';
    strTop+='<span id="hisBtn"></span>';
    strTop+='<h1>'+data.resultlist[0].companyName+'</h1>';
    header.innerHTML=strTop;

    for (var i = 0; i < data.resultlist.length; i++) {
        var surData=data.resultlist[i];
        // if( surData.periodStatus==2){
        //     surData.periodStatus='已结束拍卖'
        // }else if(surData.periodStatus==0){
        //     surData.periodStatus='正在拍卖中'
        // }
            str+='<dl class="hisList " periodId="'+surData.periodId+'">';
            str+='<dt><img src="'+surData.picurl+'" alt=""></dt>';
            str+='<dd>';
            if(surData.auctionMode==1){
                str+='<span>定时拍卖</span>';
            }else {
                str+='<span>实时拍卖</span>';
            }
            str+='<span>描述<i>'+surData.periodDesc+'</i></span>';
            str+='<span>所属: <i>'+surData.companyName+'</i></span>';
            str+='<span>拍卖时间:<i> '+surData.periodDate+'</i></span>';
            str+='<span>拍卖数量<i>&nbsp;：   '+surData.goodsCount+'</i></span>';
            str+='<strong></strong>';
            str+='</dd>';
            str+='</dl>';
        if(surData.periodStatus==2){
            str +='<div class="status" style="background: grey">拍卖已结束</div>';
        }else if(surData.periodStatus==1){
            str +='<div class="status">正在预展</div>';
        }

            str+=' <div class="split"></div>';



        sectoion.innerHTML=str;
        myScroll.refresh();
        var hisList=document.getElementsByClassName('hisList');
        for (var k=0;k<hisList.length;k++){
            (function (k) {
                hisList[k].onclick=function (e) {
                    var tar = e.target || e.srcElement;
                    var tarTag = tar.tagName.toUpperCase();
                    var tarP = tar.parentNode;
                    if (tarP.parentNode.tagName == 'DL') {
                        var cur = tarP.parentNode.getAttribute("periodId");
                        window.location.href = "list.html?id=" + cur;
                    }
                    if (tarP.tagName === "DL") {
                        window.location.href = "list.html?id=" + tarP.getAttribute("periodId");
                    }
                    if(tarP.parentNode.parentNode.tagName == 'DL'){
                        window.location.href = "list.html?id=" + tarP.parentNode.parentNode.getAttribute("periodId");
                    }
                }
            })(k)
        }

        $('#hisBtn').click('on',function () {
            window.history.go(-1);
        })

     }

}


var Ajax = {
    ajaxPost: function (url, data, callback) {
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            dataType: "json",
            success: function (d) {
                callback(d);

            }
        })
    }
};

Ajax.ajaxPost('http://139.196.223.209/server/interface/doSearchPeriodByCompany.json',{"ApiKey":"yicangonline_h5","Param1":companyId,"Param2":2,"sort":"startDate","order":"desc"},historyList);



