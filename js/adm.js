$(function(){
    $('.loginBtn button').click(function(){
        $('.pop_wrap').show();
        $('.login_tab').show();
    })
    $('.login_close').click(function(){
        $('.pop_wrap').hide();
        $('.login_tab').hide();
    })
})