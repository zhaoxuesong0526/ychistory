/**
 * Created by Eleder on 2016/11/23.
 */






    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    var Status = getCookie("Status");
    if(Status==0){


        var data = {};
        var chatroom = undefined;
        var nim = NIM.getInstance({
            // debug: true,
            appKey: '4e43160fc9f9327197d6a7ce7ad4898a',
            account: userid,
            token: yxtoken,
            onconnect: onConnect,
            onwillreconnect: onWillReconnect,
            ondisconnect: onDisconnect,
            onerror: onError
        });

        function onConnect() {
            console.log('连接成功');
            nim.getChatroomAddress({
                chatroomId: auction.roomId,
                done: getChatroomAddressDone
            });
        }
        function onWillReconnect(obj) {
            // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
            console.log('即将重连');
            console.log(obj.retryCount);
            console.log(obj.duration);
        }
        function onDisconnect(error) {
            // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
            console.log('丢失连接');
            console.log(error);
            if (error) {
                switch (error.code) {
                    // 账号或者密码错误, 请跳转到登录页面并提示错误
                    case 302:
                        break;
                    // 被踢, 请提示错误后跳转到登录页面
                    case 'kicked':
                        break;
                    default:
                        break;
                }
            }
        }
        function onError(error) {
            console.log(error);
        }
        function getChatroomAddressDone(error, obj) {

            console.log('获取聊天室地址' + (!error ? '成功' : '失败'), error, obj);
            chatroom = Chatroom.getInstance({
                appKey: '4e43160fc9f9327197d6a7ce7ad4898a',
                account: userid,
                token: yxtoken,
                chatroomId: auction.roomId,
                chatroomAddresses: [obj.address],
                onconnect: onChatroomConnect,
                onerror: onChatroomError,
                onwillreconnect: onChatroomWillReconnect,
                ondisconnect: onChatroomDisconnect,
                // 消息
                onmsgs: onChatroomMsgs
            });

            function onChatroomConnect(chatroom) {
                console.log('进入聊天室', chatroom);

            }

        }
        function onChatroomWillReconnect(obj) {
            // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
            console.log('即将重连', obj);
        }
        function onChatroomDisconnect(error) {
            // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
            console.log('连接断开', error);
            if (error) {
                switch (error.code) {
                    // 账号或者密码错误, 请跳转到登录页面并提示错误
                    case 302:
                        break;
                    // 被踢, 请提示错误后跳转到登录页面
                    case 'kicked':
                        break;
                    default:
                        break;
                }
            }
        }
        function onChatroomError(error, obj) {
            console.log('发生错误', error, obj);
        }

        function sendChatroomMsgDone(error, msg) {
            console.log('发送聊天室' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient, error, msg);
        }


        function onChatroomMsgs(msgs) {
            console.log('收到聊天室消息', msgs[0]);

            if (msgs[0].chatroomId == auction.roomId) {
//               console.log(msgs[0].text);


                if (msgs[0].fromClientType == "Server" && msgs[0].type == "text") {
                    //调detail接口
                    //用 msgs[0].text
                    doGetAuctionDetail(auctionId, userid);

                } else if (msgs[0].text == "[price]") {
                    msgs[0].custom = JSON.parse(msgs[0].custom);
                    auction.price = Number(msgs[0].custom.price)

                    if (auction.price >= preMoney) {
                        var tempPrice = $('#tempPrice');
                        tempPrice.css('display', 'none');
                        $('#prePup').css('display', 'none');
                    }

                    auction.user.userId = msgs[0].custom.userid;

                    /*auction.user.*/
                    userName = msgs[0].custom.nickname;
                    text1.innerHTML = '我要出价';
                    // console.log(userName);
                    // var showName = userName
                    // if (!isNaN(Number(userName))) {
                    //     showName = showName.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                    // } else if (!isNaN(userName)) {
                    //     showName = showName.replace(showName.slice(1), '****');
                    // }
                    // ocument.getElementById('startPrice').innerText = auction.price;
                    // document.getElementById('curName').innerText = showName;
                    doGetAuctionDetail(auctionId, userid);
                }
            }


        }


}





