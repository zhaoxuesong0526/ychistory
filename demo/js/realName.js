/**
 * Created by Eleder on 2016/11/15.
 */


var btn = document.getElementById('btn');
console.log(btn)
function realName() {
    var name = $('#name').val(),
        phone = $('#phone').val(),
        ID = $('#ID').val(),
        address = $('#address').val();
    if (name == "") {
        alert('姓名不能为空')
        return;
    }
    if (address == "") {
        alert('地址不能为空');
        return
    }
    if (phone == "") {
        alert("手机号不能为空！");
        return false;
    } else {//以上均符合要求，则调用登录esb接口
        $.ajax({
            url: 'http://139.196.223.209/server/interface/checkUserInfo.json',
            type: 'post',
            dataType: "json",
            data: {
                "ApiKey": "yicangonline_h5",
                "Param1": "dd1cd5e81b174dfba1546e04feb97902",
                "Param3": "name",
                "Param4": "phone"
            },
            success: function (data) {

                if (data.head['status'] == 0) {
                    var realname = name;
                    // sessionStorage.username= realname

                    document.cookie = 'userName=' + realname;
                    window.history.go(-1);
                    // window.location.href='listDetail.html';//正确登录后页面跳转至

                }
                else {//如果返回来的信息说明提供的信息为错误的
                    // if (tel != data.body['phone']) {//判断是用户名还是密码错误，提示相应信息
                    //     alert(data.message);
                    //     // $tel.val("");
                    //     // $pwd.val("");
                    //     return false;
                    // }
                    // if (pwd != data.pwd) {
                    //     alert(data.message);
                    //     $pwd.val("");
                    //     return false;
                    // }
                }
            }
        })
    }


};


btn.onclick = realName;
var backBtn = document.getElementById('backBtn');
backBtn.onclick = function () {
    // window.history.go(-1)
    window.history.back()

};