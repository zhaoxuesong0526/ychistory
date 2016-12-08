/**
 * Created by Eleder on 2016/12/5.
 */
<!--REM-->

~function () {
    var desW = 640;
    var winW = document.documentElement.clientWidth;
    if (winW > 640) return;
    document.documentElement.style.fontSize = winW / desW * 100 + 'px';
}();
$(function () {
    function fn1(e) {
        $(this).addClass('bg').siblings('li').removeClass("bg");
         var index = $(this).index();
        $(this).children().addClass('on');
        $(this).siblings().children().removeClass('on');

        $('.ordSection>div').eq(index).addClass('apper').siblings('div').removeClass('apper');

    }
    $(".ordChange>ul>li").on('touchend',fn1);
});
