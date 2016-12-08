

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
    periodId = queryURLParameter()["id"];
    typeId = queryURLParameter()["typeId"];
    key=queryURLParameter()["key"];
    InputVal=queryURLParameter()["InputVal"];


    var goodsList=document.getElementById('goodsList');
    var header=document.getElementById('header');
    //数据绑定
    function list(jsonData) {
    var data = jsonData.body;
    console.log(data);
    var str='';
    var strTop='';
        if(key!=undefined){
            strTop = '<h2>'+key+'</h2>';
            title.innerHTML=strTop;
        }
        //

    for(var i=0;i<data.resultlist.length;i++){
        var curData = data.resultlist[i];
        if(key==undefined){
                strTop = '<h2>' + curData.auctionPeriod + '</h2>';
        title.innerHTML=strTop;
        }

        if (curData.productPhase == 'nakedCurrency') {
            curData.productPhase = '裸币'
        } else if (curData.productPhase == 'originalTicket') {
            curData.productPhase = '原票'
        } else if (curData.productPhase == 'grade') {
            curData.productPhase = '评级币'
        } else if (curData.productPhase == 'other') {
            curData.productPhase = '其他'
        } else if (curData.productPhase == 'qpyf') {
            curData.productPhase = '全品原封'
        } else if (curData.productPhase == 'qplz') {
            curData.productPhase = '全品裸章'
        } else if (curData.productPhase == 'fqp') {
            curData.productPhase = '非全品'
        };
            str += '<dl class="list " auctionId="'+curData.auctionId+'">';
            str += ' <dt class="clear"><img src="'+curData.headPic+'"/></dt>';
            str += ' <dd class="clear">';
             str+='<span class="small">拍号 : <i>'+curData.goodsIndex+'/</i><i>'+curData.goodsCount+'</i></span>';
            str += '<h3>'+curData.nameShow+'</h3>';
            str+='<span >品相 : <i>'+curData.productPhase+'</i></span>';
            str+='<div class="desp">'+curData.desp+'</i></div>';
            str+='<span class="auctionPrice">起拍价：￥<i>'+parseInt(curData.price)+'</i></span>';

            str+='<strong></strong>';

            str += '</dd>';
            str += '</dl>';
            if(curData.currentStatus==0){
                str +='<div class="status" style="background: #f72a34">正在拍卖</div>';
            }else if(curData.currentStatus==1){
                str +='<div class="status ">正在预展</div>';
            }else {
                str +='<div class="status" style="background: gray">拍卖已结束</div>';
            }

            str+=' <div class="split "></div>';
        goodsList.innerHTML=str;

            //点击带参数跳转
            var List=document.getElementsByClassName('list');
           for (var k=0;k<List.length;k++){
               (function (k) {
                   List[k].onclick=function (e) {
                       var tar = e.target || e.srcElement;
                       var tarTag = tar.tagName.toUpperCase();
                       var tarP = tar.parentNode;
                       if (tarP.parentNode.tagName == 'DL') {
                           var cur = tarP.parentNode.getAttribute("auctionId");
                           window.location.href = "listDetail.html?id=" + cur;
                       }
                       if (tarP.tagName === "DL") {
                           window.location.href = "listDetail.html?id=" + tarP.getAttribute("auctionId");
                       }
                       if(tarP.parentNode.parentNode.tagName == 'DL'){
                           window.location.href = "listDetail.html?id=" + tarP.parentNode.parentNode.getAttribute("auctionId");
                       }
                   }
               })(k)
           }
    };



}
    //后台接口
    server();
    function server() {
        var Ajax = {

            ajaxPost: function (url, data, callback) {

                $.ajax({
                    url: url,
                    type: "POST",
                    data: dat,
                    dataType: "json",
                    success: function (d) {
                        callback(d);

                    }
                })
            }
        };

        if(typeId!=undefined){
            var dat={"ApiKey":"yicangonline_h5","Param3":typeId,"Param5":"all"};
        }else if(periodId!=undefined)  {
            dat={"ApiKey":"yicangonline_h5","Param6":periodId};
        }else if(InputVal==undefined){
            InputVal='';
            dat={"Param1":InputVal,"Param5":"all","page":3,"rows":30,"sort":"createDate","order":"DESC","ApiKey": "yicangonline_h5"};
        }

        Ajax.ajaxPost('http://139.196.223.209/server/interface/doSearchAuctions.json',dat,list);
    }

    //
    // var backBtn=document.getElementById('backBtn');
    // backBtn.onclick=function () {
    //     // window.location.href = "index.html";
    //     // history.go(-1)
    //     window.history.back()
    //
    // }


$('#backBtn').click(function () {

    window.history.back()
});
