var picWrap = document.getElementById('picWrap');
var section = document.getElementById('section');
var time = document.getElementById('time');

function listDetail(jsonData) {
    var data = jsonData.body;
    var str = '';
    var strTop = '';
    var strTime = '';
    var curData = data.auctionGoods;

    /*新加手机号判断*/
    if (!isNaN(Number(curData.user['userName']))) {
        var str1 = curData.user['userName']
        console.log(str1)
        curData.user['userName'] = str1.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    } else {
        var stp = curData.user['userName'];
        strp = stp.replace(curData.user['userName'].slice(1), '****')
        curData.user['userName'] = strp

    }
///////////////////////////////////////////////////////////

    if (curData.isAuction == '是') {
        if (curData.currentStatus == 0) {
            curData.currentStatus = '正在拍卖'
        }
        if (curData.currentStatus == 1) {
            curData.currentStatus = '即将拍卖'
        }
        if (curData.currentStatus == 2) {
            curData.currentStatus = '已完成拍卖';

        }

    } else if (curData.isAuction == '否') {
        curData.currentStatus = '立即购买'
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
    }
    for (var j = 0; j < curData.attach_list.length; j++) {
        var sub = curData.attach_list[j];
        strTop += '<div class="swiper-slide warpBg"><img src="' + sub.content_url + '" alt=""></div>';
    }

    picWrap.innerHTML = strTop;

    // strTime += '<div class="countDown" style="overflow: hidden"><span>距离结束  </span><em> 01 </em> 天 <em> 06 </em> : <em> 49 </em> : <em> 25 </em></div>';
    // time.innerHTML = strTime;
    str += '<div class="one">';
    str += ' <h3>' + curData.nameShow + '</h3>';
    str += '<i class="redHeart"></i>';

    str += ' </div>';
    str += '<div class="two">';
    str += '<p>所属卖方: <i>' + curData.commpanyName + '</i></p>';
    if (curData.isAuction == '是'){
        str += '<span>拍号：<i>' + curData.goodsIndex + '</i><em>/' + curData.goodsCount + '</em></span>';
    }
    str += ' </div>';
    str += '<div class="three">';

    str += '<span>价格：￥<i>' + curData.price + '</i> <b></b> ';
    if(curData.price!=0){
        if (curData.isAuction == '是'){
            str+='<strong style="color: #1a1a1a">['+curData.user["userName"]+']</strong> <em id="maskBtn"></em>' ;
        }
    }
    str+='</span>';
    str += '<span id="status">' + curData.currentStatus + '</span>';
    str += '</div>';
    str += '<span class="split"></span >';
    str += '<span>品相：<i>' + curData.productPhase + '</i></span>'
    str += '<div class="four" id="descDetail">'
    str += '<span>藏品简介：' + curData.desp + '。</span>';
    str += '<span>' + curData.defectDescribe + '</span>';
    str += '</div>';

    section.innerHTML = str;
    var status = document.getElementById('status');
    if (status.innerHTML == '已完成拍卖') {
        status.style.background = 'gray'
    }
    status.onclick = function () {
        if (status.innerHTML == '立即购买') {
            alert('请下载易藏app')
        }
    };

    var maskBtn = document.getElementById('maskBtn');
    if (curData.isAuction == '否') {
        maskBtn.onclick = function () {

            $('.maskWrap').show(100);

        };
    }
    var maskWrap = document.getElementById('maskWrap');
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        observer: true,
        observeParents: true,
        // autoplay:1000,
    })
}

function priceList(jsonData) {
    console.log(jsonData);
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
            var str = curData.user['userName']

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


Ajax.ajaxPost('http://139.196.223.209/server/interface/doGetGoodsDetail.json', {
    "ApiKey": "yicangonline_h5",
    "Param1": "1a6a78f0e17c487d8ca2782c0ed98d40",
    "Param2": "0"
}, listDetail);


Ajax.ajaxPost('http://139.196.223.209/server/interface/doSearchOfferPrice.json', {
    "ApiKey": "yicangonline_h5",
    "Param1": "1a6a78f0e17c487d8ca2782c0ed98d40",
    "Param2": "0"
}, priceList);


