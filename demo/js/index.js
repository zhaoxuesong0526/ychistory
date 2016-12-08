/**
 * Created by admin on 2016/10/17.
 */
var page1 = document.getElementById('page1');
var scroll = document.getElementById('scroll');
var selectRight = document.getElementById('selectRight');
var activeR = document.getElementById('activeR');
var carouselPic = document.getElementById('CarouselPic');
var url = "http://139.196.223.209/server/interface/";
var timeAuctio = document.getElementById('timeAuction');
var selectLeft = document.getElementById('selectLeft');
var historyTrad=document.getElementById('historyTrad');
var activeL = document.getElementById('activeL');

//页卡之间的切换
    tabChange();
    function tabChange() {

    $(function () {
        function fn1(e) {
            var index = $(this).index();
            $(".tabWrap>ul>li").eq(index).addClass('bgcolor').siblings().removeClass("bgcolor")

            $('.tabWrap>div')
                .eq(index).addClass("selecte").siblings('div').removeClass("selecte")
        }

        $(".tabWrap>ul>li").click(fn1);




        function mask() {
            var saleMask = document.getElementsByClassName('saleMask')[0];
            if (saleMask.style.display == "none") {
                saleMask.style.display = 'block';
            } else {
                saleMask.style.display = 'none';
            }
        }

        $('.allGoods>ul>li').click(mask)


    });
}
//首页轮播图
    function CarouselPic(jsonData) {
        var data = jsonData.body;
        console.log(data, '轮播图');
        var str = '';
        for (var i = 0; i < data.resultlist.length; i++) {
            var curData = data.resultlist[i];
            var reg=/http/;
            if(!reg.test(curData.adPic)){
                curData.adPic='http://139.196.223.209' + curData.adPic + ''
            }
            str += '<div data-pic="'+curData.adUrl+'"  class="swiper-slide banner"  ><img class="bannerPic" src="' + curData.adPic + '" alt=""></div>';
        carouselPic.innerHTML = str;
        }
        var bannerPic=document.getElementsByClassName('banner');
        for(var k=0;k<bannerPic.length;k++){
            (function (k) {
                bannerPic[k].onclick=function (e) {
                    window.location.href= bannerPic[k].dataset.pic;
                }
            })(k)
        }
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        speed: 500,
        loop: true,
        observer:true,
        observeParents:true,
        autoplayDisableOnInteraction : false,
        autoplay:3000
    });



}

    //定时拍卖
    curTime=null;
    var timer=null;
    function timeAuction(jsonData) {
        console.log(jsonData,"定时拍卖")
        var data = jsonData.body;
        var liveAuctionsL = '';
    for(var i=0;i<data.resultlist.length;i++){

        var curData=data.resultlist[i];
        curTime=curData.lastPeriodEndDate
        if(curData.lastPeriodAuctionStatus==0){
            liveAuctionsL += '<dl class="selectDl change wpDw" companyId="'+ curData.lastPeriodId + '">';
        }else {
            liveAuctionsL += '<dl class="selectDl timeing wpDw" companyId="'+ curData.lastPeriodId+ '">';
        }
            liveAuctionsL += ' <dt><img src="' + curData.avatar + '" width="100%" height="100%"/></dt>';
            liveAuctionsL += ' <dd>';
            liveAuctionsL += '<p>' + curData["companyName"] + '<span> | '+curData.city+'</span></p>'
            liveAuctionsL += '<h4>' + curData["lastPeriodName"] + '</h4>';
        if(curData.lastPeriodAuctionMode==1){
            liveAuctionsL += ' <h3><span>定时拍卖 </span> | 共 <i>'+curData.goodsCount+'</i> 件拍品</h3>';
        }else {
            liveAuctionsL += ' <h3><span>实时拍卖 </span> | 共 <i>'+curData.goodsCount+' </i>件</h3>';
        }

            liveAuctionsL += '<p class="timeSlot"><b>' + curData.lastPeriodStartDate + '</b> 至 <b>' + curData.lastPeriodEndDate + '</b></p>'
            liveAuctionsL += '</dd>';
            liveAuctionsL += '</dl>';

            liveAuctionsL +='<div style="display: block" class="imgbox clear">';

            liveAuctionsL += ' <ul class="imgWrap" id="wrapperP" companyId="'+ curData.lastPeriodId+ '">';
        var curDataaucton=curData.auctionGoodsList;

        for(var j=0;j<curDataaucton.length;j++){

            var listData=curDataaucton[j];
            liveAuctionsL += ' <li><img src="' + listData.auctionUrl + '" alt=""><span style="color: #fff"></span><p>'+curData.desp+'</p></li>'
        }
            liveAuctionsL += '</ul>';

            liveAuctionsL +='<span  class="time" data-time='+curTime+' style="overflow: hidden"></span>';
        if(curData.lastPeriodAuctionStatus==0){
            liveAuctionsL +='<span class="status">正在预展</span>'
        }else {
            liveAuctionsL +='<span class="status">正在拍卖</span>'
    };

            liveAuctionsL +='</div>';
            liveAuctionsL += '<span class="split"></span>';

    };
        bindHTML();
        timeAuctio.innerHTML = liveAuctionsL;

        // window.load=function () {
        //
        // }



        var timeList=document.getElementsByClassName('time');
        for(var k=0;k<timeList.length;k++){
            getCountTime(timeList[k],timeList[k].dataset.time);
            (function (k) {
                timeList[k].timer=setInterval(function(){
                    getCountTime(timeList[k],timeList[k].dataset.time)
                },60000);
            })(k)
        }
        var  wpDw=document.getElementsByClassName('wpDw');
        var imgWrap=document.getElementsByClassName('imgWrap');
        for(var w=0;w<wpDw.length;w++){
            (function (w) {
                wpDw[w].onclick=function (e) {
                    var tar = e.target || e.srcElement;
                    var tarTag = tar.tagName.toUpperCase();
                    var tarP = tar.parentNode;
                    if (tarP.parentNode.tagName == 'DL') {
                    var cur = tarP.parentNode.getAttribute("companyId");
                    console.log(cur)
                    window.location.href = "list.html?id=" + cur;
                }
                if (tar.tagName === "DL") {
                    var cur = tar.getAttribute("companyId");
                    console.log(cur)
                   window.location.href = "list.html?id=" + tarP.getAttribute("companyId");
                }
            }

        })(w)
    }

         for(var p=0;p<imgWrap.length;p++){
        (function (p) {
            imgWrap[p].onclick=function (e) {

                var tar = e.target || e.srcElement;
                var tarTag = tar.tagName.toUpperCase();
                var tarP = tar.parentNode;
                console.log(tarP)
                if (tarP.parentNode.tagName == 'UL') {
                    var cur = tarP.parentNode.getAttribute("companyId");
                    console.log(cur)
                     window.location.href = "list.html?id=" + cur;
                }
                if (tar.tagName === "UL") {
                    var cur = tar.getAttribute("companyId");
                    console.log(cur)
                     window.location.href = "list.html?id=" + tar.getAttribute("companyId");
                }
            }

        })(p)
    }


}


//倒计时
var spanTime=null;
function getCountTime(time,curTime){
    // var time=document.getElementsByClassName('time')[0];
    var now  = new Date();
    var cur  = new Date(curTime);

    spanTime = cur.getTime()-now.getTime();

    var str='';
    if(spanTime<=0){
        window.clearInterval(time.timer);
        str  = '距离开始:<em>00</em> 天<em>00</em> 时<em style="text-align: center">00</em> 分</em>';
        time.innerHTML =str;
        return
    }
    var day=Math.floor(spanTime/(24*60*60*1000));
    spanTime=spanTime-day*(24*60*60*1000);
    var hour = Math.floor(spanTime/(60*60*1000));
    spanTime = spanTime - hour*(60*60*1000);
    var minute = Math.floor(spanTime/(60*1000));
    spanTime  = spanTime - minute*(60*1000);
    var second = Math.floor(spanTime/1000);
    if(day<10){

        day="0"+day
    }
    if(hour<10)
        hour="0"+hour;
    if(minute<10)
        minute="0"+minute;


    if(spanTime>0){
        str = '距离开始:<em>'+day+'</em> 天<em>'+hour+'</em> 时<em style="text-align: center">'+minute+'</em> 分</em>';
    }


    time.innerHTML =str;

}

//历史交易
    function hisTrade(jsonData) {
    var history = document.getElementById('history');
    console.log(jsonData, '历史交易');
    var data = jsonData.body;
    str = '';
    for (var i = 0; i < data.resultlist.length; i++) {
        var curData = data.resultlist[i];
        var reg=/http/;
        if(!reg.test(curData.avatar)){
            curData.avatar='http://139.196.223.209' + curData.avatar + ''
        }
        str += '<dl class="selectDl" id="selectD1" companyId="' + curData.companyId + '">';
        str += '<dt><img src="' + curData.avatar + '" width="100%" height="100%"/></dt>';
        str += '<dd>';
        str += '<h4><i>' + curData.companyName + '</i>-成交历史专场</h4>';
        str += '<p>地址：' + curData.companyAddress + '</p>';
        str += '</dd>';
        str += '</dl>';
        str+='<div class="splitHis"></div>';
        history.innerHTML = str;



    }
    var selectD1 = document.getElementsByClassName('selectDl');
    for (var j = 0; j < selectD1.length; j++) {
        (function (j) {
            selectD1[j].onclick = function (e) {
                var tar = e.target || e.srcElement;
                var tarTag = tar.tagName.toUpperCase();
                var tarP = tar.parentNode;
                console.log(tarP.parentNode.id)
                if (tarP.parentNode.tagName == 'DL') {
                    var cur = tarP.parentNode.getAttribute("companyId");
                    window.location.href = "historyList.html?id=" + cur;
                }
                if (tar.tagName === "DL") {
                    window.location.href = "historyList.html?id=" + tar.getAttribute("companyId");
                }
            }
        })(j)
    }
    console.log(history, 'ssss')
}


//后台接口数据
    Interface()
    function Interface() {
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
//首页轮播图接口
        Ajax.ajaxPost(url + 'doGetAdList.json', {"ApiKey": "yicangonline_h5"}, CarouselPic);



//拍卖 接口
         Ajax.ajaxPost(url + 'doSearchAuctionsForCompanyType.json', {"ApiKey": "yicangonline_h5","page":1,"rows":10,"sort":"startDate","order":"ASC"}, timeAuction);
//



//历史交易接口
        ;(function () {
            var isOk = true;
            historyTrad.onclick = function () {
                if (isOk) {
                    Ajax.ajaxPost(url + 'doSearchAllCompany.json', {"ApiKey": "yicangonline_h5"},hisTrade);
                }
                isOk = false;
            };
        })();

    }


//跳转系统消息
$('.headerIcon').on('click',function (e) {
    alert(111)
    // window.location.href='sysMsg.html';
});


function bindHTML() {
    var myScroll;
        myScroll=  new IScroll('#wrapper', {});
    myScroll.refresh();
}





