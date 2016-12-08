/**
 * Created by Eleder on 2016/11/14.
 */
;(function (exports) {
    var KeyBoard = function (input, price, curuserId,userName) {
        console.log(curuserId)
        var body = document.getElementsByTagName('body')[0];
        var DIV_ID = '__w_l_h_v_c_z_e_r_o_divid';
        if (document.getElementById(DIV_ID)) {
            body.removeChild(document.getElementById(DIV_ID));
        }
        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }
        var userid = getCookie("userid");
        this.input = input;
        this.el = document.createElement('div');
        var self = this;
        var mobile = typeof orientation !== 'undefined';
        this.el.id = DIV_ID;
        var str = '';
        var curprice = null;
        if(curuserId==userid){
            if (price < 500) {
                curprice = Number(price) + 20;

            } else if (price < 1000) {
                curprice = Number(price) + 40;

            } else if (price < 5000) {
                curprice = Number(price) + 100;

            } else if (price < 10000) {
                curprice = Number(price) + 200;

            } else if (price < 20000) {
                curprice = Number(price) + 400;

            } else if (price < 50000) {
                curprice = Number(price) + 1000;


            } else if (price < 100000) {
                curprice = Number(price) + 2000;

            } else if (price > 100000) {
                curprice = Number(price) + 4000;
            }
        }else {
            if (price <= 500) {
                curprice = Number(price) + 10;

            } else if (price <= 1000) {
                curprice = Number(price) + 20;

            } else if (price <= 5000) {
                curprice = Number(price) + 50;

            } else if (price <= 10000) {
                curprice = Number(price) + 100;

            } else if (price < 20000) {
                curprice = Number(price) + 200;

            } else if (price < 50000) {
                curprice = Number(price) + 500;
            } else if (price < 100000) {
                curprice = Number(price) + 1000;

            } else if (price > 100000) {
                curprice = Number(price) + 2000;
            }
        }


        str += '<div class="keyWord">';
        str += ' <div class="price">价格 ￥<i id="priceL">' + curprice + '</i></div>'
        str += '<span>1</span>'
        str += '<span>2</span>'
        str += '<span>3</span>'
        str += '<div class="close"><em class="del"></em></div>';
        str += '  <span>4</span>';
        str += '<span>5</span>';
        str += ' <span>6</span>';
        str += '<span>7</span>';
        str += ' <span>8</span>';
        str += '<span>9</span>';
        str += '<div class="yes">确定</div>';
        str += ' <span>.</span>';
        str += '<span>0</span>';
        str += ' <span><i  class="keyboard" id="keyB"></i></span>';
        str += '</div>'
        this.el.innerHTML = str;


        function addEvent(e) {
            var ev = e || window.event;
            var clickEl = ev.element || ev.target;
            var value = clickEl.textContent || clickEl.innerText;
            var priceL = document.getElementById('priceL');
        if(clickEl.className=='keyboard'){
                body.removeChild(self.el);
            }
            if (clickEl.tagName.toLocaleLowerCase() === 'span' && value !== "删除") {
                if (self.input) {
                    priceL.innerText += Number(value);
                    curprice = Number(priceL.innerText);

                }
            }else if (clickEl.tagName.toLocaleLowerCase() === 'div' && value === "确定") {

                var priceAddOne = 0;
                price =Number(price);
                if (curprice <= price) {
                    alert('出价不能低于或等于当前价哦！')
                    return
                } else if (curprice < 500) {
                    if (curprice % 10 != 0) {
                        alert('加价不符合规则哦！加价必须是10的倍数哦');
                        return
                    }
                    priceAddOne = price + 10;
                    //startPrice.innerHTML = curprice;

                } else if (curprice < 1000) {
                    if (curprice % 20 != 0) {
                        alert('加价不符合规则哦！加价必须是20的倍数哦');
                        return
                    }
                    priceAddOne = price + 20;
                    //startPrice.innerHTML = curprice;
                } else if (curprice < 5000) {
                    if (curprice % 50 != 0) {
                        alert('加价不符合规则哦！加价必须是50的倍数哦');
                        return
                    }
                    priceAddOne = price + 50;
                    //startPrice.innerHTML = curprice;
                } else if (curprice < 10000) {
                    if (curprice % 100 != 0) {
                        alert('加价不符合规则哦！加价必须是100的倍数哦');
                        return
                    }
                    priceAddOne = price + 100;
                    //startPrice.innerHTML = curprice;
                } else if (curprice < 20000) {
                    if (curprice % 200 != 0) {
                        alert('加价不符合规则哦！加价必须是200的倍数哦');
                        return
                    }
                    priceAddOne = price + 200;
                    startPrice.innerHTML = curprice;
                } else if (curprice < 50000) {
                    if (curprice % 500 != 0) {
                        alert('加价不符合规则哦！加价必须是500的倍数哦');
                        return
                    }
                    priceAddOne = price + 500;
                    //startPrice.innerHTML = curprice;
                } else if (curprice < 100000) {
                    if (curprice % 1000 != 0) {
                        alert('加价不符合规则哦！加价必须是1000的倍数哦');
                        return
                    }
                    priceAddOne = price + 1000;
                    //startPrice.innerHTML = curprice;
                } else if (curprice >= 100000) {
                    if (curprice % 2000 != 0) {
                        alert('加价不符合规则哦！加价必须是2000的倍数哦');
                        return
                    }
                    priceAddOne = price + 2000;
                   //startPrice.innerHTML = curprice;
                }

                //----开始出价
                if (userid == curuserId) {
                    if (curprice == priceAddOne) {
                        alert('不能重复出价');
                        return;
                    } else if (curprice > priceAddOne) {/*如果当前出价大于加一口价 就调埋价接口*/
                        //埋价接口！！！
                        doPreprice(userid, auctionId, curprice, false, "0");
                    }

                } else  {
                    if (curprice == priceAddOne) {/*如果当前出价==加一口价 并且出价用户不是我 就调出价接口*/
                        //出价接口
                        doOfferPrice(userid,auctionId,curprice);
                    } else if (curprice > priceAddOne) {/*出价用户不是我 并且大于*/
                        //埋价接口，收到埋价返回后调出价接口

                        doPreprice(userid, auctionId, curprice,true, priceAddOne);
                    }
                }
                body.removeChild(self.el);

            } else if (clickEl.tagName.toLocaleLowerCase() === 'em' && clickEl.className=='del'|| clickEl.className=='close') {
                var num = priceL.innerText;
                if (num) {
                    var newNum = num.substr(0, num.length - 1);
                    priceL.innerText = newNum;
                }
            }
        }

        if (mobile) {
            this.el.ontouchstart = addEvent;
        } else {
            this.el.onclick = addEvent;
        }
        body.appendChild(this.el);
    };

    exports.KeyBoard = KeyBoard;
})(window);

//出价接口
function doOfferPrice(userid,auctionId,curprice) {
    $.ajax({
        url: 'http://139.196.223.209/server/interface/doOfferPrice.json',
        type: 'post',
        dataType: "json",
        data: {
            "ApiKey": "yicangonline_h5",
            "Param1": userid,
            "Param2": auctionId,
            "Param3": curprice,
            "Param4": "0"
        },
        success: function (data) {
            var head = data.head;
            if (head.status == 0) {
                console.log('成功');
                //document.getElementById('curName').innerHTML =showName;
                curuserId = userid;
                price = curprice;
                //text1.innerHTML='预埋价';
                //startPrice.innerHTML = curprice;

                var content = {
                    price:curprice,
                    userid:userid,
                    nickname:showName
                };
                var msg = chatroom.sendText({
                    text: '[price]',
                    custom: JSON.stringify(content),
                    done: sendChatroomMsgDone
                });

                //重新调用detail接口
                doGetAuctionDetail(auctionId,userid);
                console.log('正在发送聊天室text消息, id=' + msg.idClient);
            } else {
                alert(head.msg)
                //重新调用detail接口
                doGetAuctionDetail(auctionId,userid);
            }
        }
    })
}
//埋价接口
function doPreprice(userid, auctionId, curprice, flag, priceAddOne) {
    $.ajax({
        url: 'http://139.196.223.209/server/interface/doPrePrice.json',
        type: 'post',
        dataType: "json",
        data: {
            "ApiKey": "yicangonline_h5",
            "Param1": userid,
            "Param2": auctionId/*"11f28b041eb545f0852c2902b1a0129f"*/,
            "Param3": curprice
        },
        success: function (data) {
            var head = data.head;

            if (head.status == 0 || head.status == 3) {
                var tempPrice = $('#tempPrice');
                tempPrice.html('预埋价:' + curprice);
                tempPrice.css('display', 'block');

                if (flag == true) {
                    //出价接口
                    doOfferPrice(userid, auctionId, priceAddOne);
                }


            } else {
                alert(head.msg)
            }

        }
    })
}

function sendMsg(message) {
    var msg = chatroom.sendText({
        text: message,
        done: sendChatroomMsgDone
    });
}