$(function () {
    $('.avatar button').on('click', function () {
        $('.avatar_tab').show();
    })
    $('.avatar_close').on('click', function () {
        $('.avatar_tab').hide();
    })
    $('.announcement button').on('click', function () {
        $('.announcement_tab').show();
    })
    $('.announcement_close').on('click', function () {
        $('.announcement_tab').hide();
        $('.seeBtn_tab').hide();
    })
    $('.ranking_list button').on('click', function () {
        $('.ranking_tab').show();
    })
    $('.ranking_close').on('click', function () {
        $('.ranking_tab').hide();
    })
    $('.feedback button').on('click', function () {
        $('.feedback_tab').show();
    })
    $('.feedback_close').on('click', function () {
        $('.feedback_tab').hide();
    })
    $('.setting button').on('click', function () {
        $('.setting_tab').show();
    })
    $('.setting_close').on('click', function () {
        $('.setting_tab').hide();
    })
    $('.compile button').on('click', function () {
        $("h").replaceWith(document.createElement("input"));
        $("p").replaceWith(document.createElement("textarea"));
        this.style.visibility = "hidden";
    });
    $('.seeBtn button').on('click', function () {
        $('.seeBtn_tab').show();
    })
    $('.seeBtn_close').on('click', function () {   
        $('.seeBtn_tab').hide();
    })
})