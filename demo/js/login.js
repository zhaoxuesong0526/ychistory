



function confirm(){
    var tel=document.getElementById('tel').value;
    var pwd=document.getElementById('pwd').value;
    var loginCode=document.getElementById('loginCode')
    if(tel==""|| pwd==""){//判断两个均不为空
        alert("手机号密码均不能为空！")
        return false;
    }else{
        document.cookie='userTel='+tel;
        $.ajax({
            url:'http://139.196.223.209/server/interface/doLogin.json',
            type:'post',
            dataType: "json",
            data:{ "Param1":"18510718164","Param2":"7818261","ApiKey": "yicangonline_h5"},
            success:function(data){
                console.log(data)
                if(data.head['status']==0){//如果返回来的信息说明提交的信息为正确的
                    var customerId = data.body['userid'];//将数据中用户信息的ID赋值给变量
                     // document.cookie='userid='+customerId;
                     document.cookie='username='+data.body['username'];
                     document.cookie='nickname='+data.body['nickName'];
                     document.cookie='checkphone='+data.body['checkphone'];
                     document.cookie='yxtoken='+data.body['yxtoken'];

                     setCookie('userid', customerId)
                    function setCookie(name, value) {

                        var exp = new Date();
                        exp.setTime(exp.getTime() + (24*60*60 * 1000));
                        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

                    }

                    window.history.go(-1);
                    // window.location.href='.html';//正确登录后页面跳转至
                }
                else{//如果返回来的信息说明提供的信息为错误的
                    if(tel != data.body['phone']){//判断是用户名还是密码错误，提示相应信息
                        alert(data.message);
                        // $tel.val("");
                        // $pwd.val("");
                        return false;
                    }
                    // if(pwd != data.pwd){
                    //     alert(data.message);
                    //     $pwd.val("");
                    //     return false;
                    // }
                }
            }
        })
    }
}


$("#read").click(function () {
    $(this).toggleClass("yes");
    console.log(this.className)
    if(this.className=='no yes'){
        var loginCode=document.getElementById('loginCode');
        loginCode.onclick=confirm;
    }

});





