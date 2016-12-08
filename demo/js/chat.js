/**
 * Created by Eleder on 2016/11/14.
 */



var sendOut=document.getElementById('sendOut');
var keyboard=document.getElementsByClassName('keyboard')[0];
var Input=keyboard.getElementsByTagName('input')[0];

var chatRoom=document.getElementsByClassName('chatRoom')[0];
 var chatWrap=document.getElementById('chatWrap');
// var ary=[];
var obj={};

    function chatroom(jsonData) {
        console.log(jsonData,'这里是聊天室数据');
        var roomData=jsonData.body['resultlist'];
        console.log(roomData,'这里是chat')
        var str='';
        for(var i=0;i<roomData.length;i++) {
            var resultList = roomData[i];
            if(userid!==resultList.user.userId){
                str+='<div class=" chatWrap clear ">';
                if(resultList.user.userAvatar!=''){
                    str+='<img style="" src="'+resultList.user.userAvatar+'" src="" alt="">'
                }else {
                    str+='<img style="" src="images/listDetail/head.png" alt="">';
                }
                if(resultList.content!=''){
                    str+='<span>'+ resultList.content+'</span>'
                }

                str+='</div>'
            }else {
                str+='<div class="selfR clear ">';
                if(resultList.user.userAvatar!=''){
                    str+='<img style="" src="'+resultList.user.userAvatar+'" src="" alt="">'
                }else {
                    str+='<img style="" src="images/listDetail/head.png" alt="">';
                }
                if(resultList.content!=''){
                    str+='<span>'+ resultList.content+'</span>'
                }

                str+='</div>'
            }

        }
        chatRoom.innerHTML=str;
    }


    Ajax.ajaxPost('http://139.196.223.209/server/interface/doSearchComment.json', {
        "ApiKey": "yicangonline_h5",
        "Param1": auctionId,
        "Param2": userid
    }, chatroom);



sendOut.onclick=function () {
   // ary.unshift(Input.value)
    obj.value=Input.value;
    // console.log(ary);
    var frg = document.createDocumentFragment();
    this.div=document.createElement('div');
    this.div.className='selfR clear';
    this.span = document.createElement('span');

    this.span.innerHTML=obj.value;
    this.img=document.createElement('img');
    this.img.src='images/listDetail/head.png';
    this.div.appendChild(this.img);
    this.div.appendChild(this.span);
    frg.appendChild(this.div);
    chatRoom.insertBefore(frg,chatRoom.childNodes[0]);
  

    var objVal=obj.value;

    sendMsg(objVal);
    Ajax.ajaxPost('http://139.196.223.209/server/interface/doComment.json', {
        "ApiKey": "yicangonline_h5",
        "Param1":userid ,
        "Param2": auctionId,
        "Param3":objVal
    }, chatcomment);
    function chatcomment(jsonData) {
        console.log(jsonData,'fas1111111111111111111111111111111111')
    }
};







