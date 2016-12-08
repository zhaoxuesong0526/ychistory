/**
 * Created by Eleder on 2016/11/25.
 */

$(function () {
    var search=$('#search');
    search.on('focus',function () {
        $('.headSe').css('display','block')
    });
    $('.backSerch').on('click',function () {
        $('.headSe').css('display','none')
    });
    InputVal=null;
    $('.headIcon').on('click',function () {
        console.log()
         InputVal=$('#headSearch').val();
        window.location.href='list.html?InputVal='+InputVal;
        // SearchAuctions(InputVal)
    })
});


