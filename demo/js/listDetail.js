

    function queryURLParameter(url) {
    url = url || window.location.href;
    url=decodeURI(url);
    var reg = /([^?&=#]+)=([^?&=#]+)/g,
        obj = {};
    url.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
};
    auctionId = queryURLParameter()["id"];
    function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
    var userName = getCookie("userName");
    var cookie = {
        remove: function (name, path, domain) {

                document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
            }

    };
    cookie.remove   (userName,6000)
    var yxtoken = getCookie("yxtoken");
    var checkphone = getCookie("checkphone");
    var nickName = getCookie("nickName");
    var userTel = getCookie("userTel");
    var showName = nickName;
    if (nickName==undefined) {
        showName = userName;
    if (userName==undefined) {
        showName = userTel;
    }
}
    var userid = '0';
    if (getCookie("userid")!=undefined)  {
    userid = getCookie("userid");

}
    var picWrap = document.getElementById('picWrap');
    var section = document.getElementById('section');
    var time = document.getElementById('time');
    var details=document.getElementById('details')
    var aPrice = 0;
    var auction = undefined;
    var curTime=null;
    var curserId=null;


    //详情页
    function listDetail(jsonData) {
    console.log(jsonData,'详情列表')
    var data = jsonData.body;
    var str = '';
    var strTop = '';
    var strTime = '';
    var strT='';
    var curData = data.auctionGoods;
    curTime=curData.endDate;
    auction = data.auctionGoods;
    aPrice = curData.price;
    curserId=curData.user.userId;
     currentStatus=curData.currentStatus;
        document.cookie='Status='+currentStatus;
        console.log( currentStatus)

    //出价列表
    priceList( auctionId)
    if (curData.currentStatus == 0) {
            curData.currentStatus = '我要出价'
        }else if (curData.currentStatus == 1) {
            curData.currentStatus = '即将开始'
        } else if (curData.currentStatus == 2) {
            curData.currentStatus = '已结束拍卖'
      };


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

    for (var j = 0; j < curData.attach_list.length; j++) {
        var sub = curData.attach_list[j];
        strTop += '<div class="swiper-slide warpBg"><img class="bannerPic" src="' + sub.content_url + '" alt=""></div>';
    };

    picWrap.innerHTML = strTop;

        var nowTime  = new Date();
        var curtime  = new Date(curTime);
        var spantime = curtime.getTime()-nowTime .getTime();

    if( curData.currentStatus == '我要出价'&& spantime>0){
        //倒计时
        timer= window.setInterval(function(){
            getCountTime();
        },1000)
        //设置预埋价
        prePrice(userid,auctionId)
    }

    str += '<div class="one">';
    str += ' <h3>' + curData.nameShow + '</h3>';
    str += '<i class="loseHeart" id="heart"></i>';
    str += ' </div>';
    str += '<div class="two">';
    yongj=curData.price*0.03;
    yongj=yongj.toFixed(2)
    str += '<p>所属卖方: <i>' + curData.commpanyName + '【佣金3%:￥<i>'+yongj+'</i>】</i></p>';

    str += ' </div>';
    str += '<div class="three">';
    str += '<span id="pricelist">起拍价格：￥<i id="startPrice">' + parseInt(curData.price) + '</i> ';
    if (!isNaN(Number(curData.user['userName']))&&curData.price!=0) {
        var strl = curData.user['userName']
        curData.user['userName'] = strl.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        if( curData.price!=0){
            str+=  '<strong id="curName" style="color: gray" >['+curData.user['userName']+']</strong>' ;

        }

    } else if(isNaN(Number(curData.user['userName']))&&curData.price!=0) {
        var stp = curData.user['userName'];
        strp = stp.replace(curData.user['userName'].slice(1), '****');
        curData.user['userName'] = strp;
        if( curData.price!=0){
            str+=  '<strong id="curName" style="color: gray" >['+curData.user['userName']+']</strong>' ;

        }
    }

      str+=  ' <em id="maskBtn" ></em></span>';
    str += '<span  id="text1">' + curData.currentStatus+ '</span>';
    str += '</div>';
    str += '<span class="split"></span >';
    str += '<span>品相：<i>' + curData.productPhase + '</i></span>'
    str += '<div class="four" id="descDetail">'
    str += '<span>' + curData.desp + '</span>';
    str +='<span>'+ curData.defectDescribe+'</span>'
    str += '</div>';
        var iscroll= new IScroll("#scrollT",{
            scrollbars: false,
            scrollX: true,
            scrollY: false
        });
     section.innerHTML = str;



        iscroll.refresh();


      var bannerPic=$('.bannerPic');

        // bannerPic.click(function () {
        //
        //     $('.swiper-container').css({'position':'fixed','width':'100%','height':'100%','top':'50%','z-index':'3000','margin-top':'-40%'});
        //         $('.banerWrap').css('display','block');
        //         $('.swiper-pagination').css({'position': 'fixed','z-index': '4500','top': '90%'});
        //         $('.swiper-pagination-bullet').css({'background':'white'});
        //
        //             // $(function () {
        //             //     $('.bannerPic').each(function () {
        //             //         new RTP.PinchZoom($(this), {});
        //             //     });
        //             // });
        //
        // });
        // $('.banerWrap').click(function () {
        //     $('.swiper-container').css({'position':'fixed','width':'80%','height':'200px','top':'0','z-index':'1','margin-top':'0','left':'10%'});
        //     $('.banerWrap').css('display','none');
        //     $('.swiper-pagination').css({'position': 'fixed','z-index': '1','top': '20%'});
        //     $('.swiper-pagination-bullet').css({'background':'white'});
        //     $(function () {
        //         $('.bannerPic').each(function () {
        //             new RTP.PinchZoom(a);
        //         });
        //     });
        // });





        var text1=document.getElementById('text1');
    if(text1.innerHTML=='已结束拍卖'){
        text1.style.background='gray'
    }

        //点击弹出键盘或者跳转登录页面
    var input1 = document.getElementById('text1');
    (function () {
        if (curData.user.userId == userid) {
            input1.innerHTML = '预埋价'
        }
        input1.onclick = function () {
            if (userid == undefined || userid == '0') {
                window.location.href = 'login.html';
                return;
            } else if (userName == undefined) {
                window.location.href = 'realName.html';
                return;
            } else if (userid != undefined && userName != undefined ) {
                if(text1.innerHTML=='我要出价'||text1.innerHTML=='预埋价'){
                    var price = curData.price;
                    var curuserId = curData.user.userId;
                    var auctionId = curData.auctionId;
                    // var userName=curData.user['userName'];
                    // console.log(userName)
                    new KeyBoard(input1, price, curuserId, auctionId);
                }


            }
        }
    })();



    var maskWrap = document.getElementsByClassName('maskWrap')[0];
    var maskBtn = document.getElementById('maskBtn');


    $('#pricelist').click('on',function (e) {
        var e=e.target;
        if(e.parentNode.id=='pricelist'){
            $('.maskWrap').show(100);
        }
    });




    //轮播图
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        // autoplay: 1000,

    });


    //    增加收藏功能
        function Collection(auctionId,userid,flag) {
            console.log(flag,'22')
            $.ajax({
                url:'http://139.196.223.209/server/interface/doFavUnFav.json',
                type:'post',
                dataType: "json",
                data:{"Param1":auctionId,"Param2":userid,"Param3":flag,"ApiKey": "yicangonline_h5"},
                success:function (data) {
                    console.log(data)

                    if(data.head.status==0){

                    }else {

                    }
                }
            })
        }
        if (userid != undefined) {
        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }
        var redHeart = getCookie("redHeart");
        if(redHeart!=undefined){
            $("#heart").addClass("redHeart");
        }
        var is0k=true;
        $("#heart").click(function () {
            if(is0k){
                Collection(auctionId,userid,0);
                $("#heart").addClass("redHeart");
                document.cookie='redHeart='+1;
                is0k=false;


            }else if(is0k==false){
                Collection(auctionId,userid,1);
                $("#heart").removeClass("redHeart");
                function delCookie(name)
                {
                    var exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    var cval=getCookie(name);
                    if(cval!=null)
                        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
                }

                delCookie('redHeart')
                is0k=true;


            }

        });

    }
}

    // 设置预埋价
    var preMoney=null;
    function prePrice(userid,auctionId) {
        console.log(1111)
    $.ajax({
        url: 'http://139.196.223.209/server/interface/getMyPrePrice.json',
        type: 'post',
        dataType: "json",
        data: {
            "ApiKey": "yicangonline_h5",
            "Param1": userid,
            "Param2": auctionId,

        },
        success:function (jsonData) {
            console.log(jsonData)
            var preData = jsonData.head;

            preMoney = preData.msg;

            if (preData.status == 0) {
                if (preData.msg == '') {
                    // alert('埋价失败')
                } else {
                    if (Number(preData.msg) > Number(aPrice)) {

                        //alert('埋价成功');
                        var tempPrice = $('#tempPrice');
                        tempPrice.html('预埋价:' + preData.msg);
                        tempPrice.css('display', 'block')
                    } else {
                        var tempPrice = $('#tempPrice');
                        tempPrice.html('');
                        tempPrice.css('display', 'none')
                    }
                }
            }
        }
    })
}
    //出价列表
    function priceList( auctionId) {
    $.ajax({
        url: 'http://139.196.223.209/server/interface/doSearchOfferPrice.json',
        type: 'post',
        dataType: "json",
        data: {
            "ApiKey": "yicangonline_h5",
            "Param1": auctionId

        },
        success: function (jsonData) {
            var data = jsonData.body;
            var strl = '';
            strl += '<div class="mask"></div>';
            strl += '<div class="maskList">';
            strl += '<div class="ListHead">';
            strl += '<span>出价列表</span>';
            strl += '<span class="btn" id="closeBtn"></span>';
            strl += '<div class="middle">';
            strl += '<span>出价</span>';
            strl += '<span>出价用户</span>';
            strl += '<span>出价时间</span>';
            strl += '</div>';
            strl += '</div>';
            strl += '<ul class="ListReal">';
            strq = '';
            for (var i = 0; i < data.resultlist.length; i++) {
                var curData = data.resultlist[i];
                if (!isNaN(Number(curData.user['userName']))) {
                    var str = curData.user['userName'];
                    curData.user['userName'] = str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                } else {
                    var stp = curData.user['userName'];
                    strp = stp.replace(curData.user['userName'].slice(1), '****')
                    curData.user['userName'] = strp

                }
                strq += '<li>'
                strq += '<span>￥<i>' + curData.money + '</i></span>';
                // for(var j=0;j<curData.user.length;j++){
                //         var curName=curData.user[j];
                strq += '<span class="user">' + curData.user['userName'] + '</span>';
                // }
                strq += '<span>' + curData.postTime + '</span>';
                strq += '</li>';
                strl += '</ul>';
                strl += '</div>';

            }

            maskWrap.innerHTML = strl;
            var closeBtn = document.getElementById('closeBtn');
            closeBtn.onclick = function (e) {
                $('.maskWrap').hide(100)

            };
            var ListReal = document.getElementsByClassName('ListReal')[0];
            ListReal.innerHTML = strq;
        }
    })
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

//倒计时
    function getCountTime(){
    var now  = new Date();
    var cur  = new Date(curTime);
    var spanTime = cur.getTime()-now.getTime();
    if(spanTime<0){
        window.clearInterval(timer)
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
    if(second<10)
        second="0"+second;
    strTime = '<div class="countDown" style="overflow: hidden"><span> 距离结束 : </span><em>'+day+'</em>天<em>'+hour+'</em>时<em style="text-align: center">'+minute+'</em>分<em>'+second+'</em>秒 </div>';
    time.innerHTML = strTime;

}


//点击取消预埋价
    clickcancelPrice(userid, auctionId);
    function clickcancelPrice(userid, auctionId) {
    var tempPrice=$('#tempPrice');
    tempPrice.on('click',function () {
        $('#prePup').css('display','block');
        var prePup=$('#prePup');
        prePup.on('click',function (e) {
            var ev = e || window.event;
            var clickEl = ev.element || ev.target;
            var value = clickEl.textContent || clickEl.innerText;

            if(value=='确定'){
                Ajax.ajaxPost('http://139.196.223.209/server/interface/cancelPrePrice.json', {
                    "ApiKey": "yicangonline_h5",
                    "Param1": userid,
                    "Param2": auctionId
                }, cancelPrice);
                function cancelPrice(jsonData) {/*取消拍卖过程中预埋价*/
                    // alert('取消成功');
                    if (userid==curserId) {
                        text1.innerHTML = '预埋价'
                    } else {
                        text1.innerHTML = '我要出价'
                    }
                    console.log(jsonData)
                    tempPrice.css('display','none')
                    $('#prePup').css('display','none');
                }

            }else {
                $('#prePup').css('display','none');
            }
        })

    });
}


    //详情页面
    function doGetAuctionDetail(auctionId,userid) {
         Ajax.ajaxPost('http://139.196.223.209/server/interface/doGetGoodsDetail.json', {
        "ApiKey": "yicangonline_h5",
        "Param1": auctionId/*"11f28b041eb545f0852c2902b1a0129f"*/,
        "Param2": userid
    }, listDetail);
}
    doGetAuctionDetail(auctionId,userid);


//     var backBtn = document.getElementById('backBtn');
//     backBtn.onclick = function () {
//     // window.location.href = "list.html";
//     window.history.go(-1);
// };

        // $(function () {
        //     $('#chatBtn').click('on',function () {
        //
        //         $(this).toggleClass ("botS");
        //         if( $(this).hasClass('botS')){
        //             $(this).css('Transform','rotate(180deg)')
        //             //对话框
        //             $('#consultation').click('on',function (e) {
        //                     $('#keyboard').show(100)
        //             });
        //             $('#keyHide').click('on',function (e) {
        //                     $('#keyboard').hide(100)
        //                 });
        //
        //
        //             var winH = document.documentElement.clientHeight;
        //             if(winH<=480){
        //
        //                 $('#introduce').animate({bottom:'168px'});
        //                 $('#chatRoom').animate({'bottom':'117px'});
        //
        //
        //             }else if(winH<=568) {
        //                 $('#introduce').animate({bottom: '160px'});
        //                 $('#chatRoom').animate({'bottom': '23px'},180);
        //
        //             }else if(winH<=640) {
        //                 $('#chatRoom').animate({'bottom': '25px'},100);
        //                 $('#introduce').animate({bottom: '233px'});
        //             }else if(winH<=667) {
        //                 $('#chatRoom').animate({'bottom': '0'},100);
        //                 $('#introduce').animate({bottom: '233px'});
        //             }else if(winH<=732){
        //                 $('#chatRoom').animate({'bottom': '-64px'},100);
        //                 $('#introduce').animate({bottom: '233px'});
        //             }else if(winH<=736){
        //                 $('#chatRoom').animate({'bottom': '-69px'},100);
        //                 $('#introduce').animate({bottom: '233px'});
        //             }else if(winH>736){
        //                 $('#chatRoom').animate({'bottom': '-200px'},100);
        //                 $('#introduce').animate({bottom: '40%'});
        //             }
        //             // }  else{
        //             //     $('#chatRoom').animate({'bottom':'0'});
        //             //     $('#introduce').animate({bottom:'168px'});
        //             // }
        //         }else {
        //             $(this).css({'Transform':'rotate(0deg)'})
        //             $('#introduce').animate({bottom:'0px'});
        //             $('#keyboard').css('display','none');
        //             $('#chatRoom').animate({'bottom':'-1000px'});
        //
        //         }
        //     });
        //
        //     $('.homepage').click('on',function () {
        //         window.location.href='index1.html';
        //     })
        // });




