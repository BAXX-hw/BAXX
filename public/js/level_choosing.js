$(function () {
    $('.avatar').on('click', function () {
        $('.avatar_tab').show();
    })
    $('.avatar_close').on('click', function () {
        $('.avatar_tab').hide();
    })
    $('.announcement').on('click', function () {
        $('.announcement_tab').show();
    })
    $('.announcement_close').on('click', function () {
        $('.announcement_tab').hide();
        $('.seeBtn_tab').hide();
    })
    $('.ranking_list').on('click', function () {
        $('.ranking_tab').show();
    })
    $('.ranking_close').on('click', function () {
        $('.ranking_tab').hide();
    })
    $('.feedback').on('click', function () {
        $('.feedback_tab').show();
    })
    $('.feedback_close').on('click', function () {
        $('.feedback_tab').hide();
    })
    $('.setting').on('click', function () {
        $('.setting_tab').show();
    })
    $('.setting_close').on('click', function () {
        $('.setting_tab').hide();
    })
    $('.compile').on('click', function () {
        $(".name").replaceWith(document.createElement("input"));
        $(".sex").replaceWith(document.createElement("select"));
        $(".intro").replaceWith(document.createElement("textarea"));
        this.style.visibility = "hidden";
    })
    $('.save').on('click', function () {
        $("input").replaceWith(document.createElement("h"));
        $("select").replaceWith(document.createElement("h"));
        $("textarea").replaceWith(document.createElement("h"));
    })
    $('.seeBtn').on('click', function () {
        $('.seeBtn_tab').show();
    })
    $('.seeBtn_close').on('click', function () {   
        $('.seeBtn_tab').hide();
    })
})