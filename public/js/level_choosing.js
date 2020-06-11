$(function () {
    let form = {
        username: localStorage.getItem('username')
    }
    console.log(form.username);

    $('.avatar button').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/user_info_load',
            data: form,
            success: function (data) {
                // console.log(data);
                let result = document.createElement('table');
                result.setAttribute('id', 'avatar-table');
                // console.log(data.searching.length);
                let heads = new Array("昵称：", "性别：", "个人简介：");
                let bodys = new Array(data.searching[0].P_nickname, data.searching[0].P_gender, data.searching[0].P_signature);
                for (let i = 0; i < 3; i++) {
                    let tr = document.createElement('tr');
                    let td = new Array;
                    for (let j = 0; j < 2; j++) {
                        td[j] = document.createElement('td');
                    }
                    td[0].innerHTML = heads[i];
                    td[1].innerHTML = bodys[i];

                    for (let j = 0; j < 2; j++) {
                        tr.append(td[j]);
                    }
                    result.append(tr);
                }
                $('#avatar-table').replaceWith(result);
            },
            error: function (err) {
                console.log(err);
            }
        })
        $('.avatar_tab').show();
    })
    $('.avatar_close').on('click', function () {
        $('.avatar_tab').hide();
    })
    $('.announcement button').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/user_ann_load',
            success: function (data) {
                // console.log(data);
                let result = document.createElement('tbody');
                result.setAttribute('id', 'ann_body');
                // console.log(data.searching.length);
                for (let i = 0; i < data.searching.length; i++) {
                    let tr = document.createElement('tr');
                    let td = new Array;
                    for (let j = 0; j < 3; j++) {
                        td[j] = document.createElement('td');
                    }
                    td[0].innerHTML = data.searching[i].A_title;
                    td[1].innerHTML = data.searching[i].A_detail;
                    let seeBtn = document.createElement('div');
                    seeBtn.setAttribute('class', 'btn seeBtn');
                    let btn = document.createElement('button');
                    btn.innerHTML = "查看";
                    seeBtn.append(btn);
                    seeBtn.onclick = function () {
                        $('.ann-txt')[0].innerHTML = data.searching[i].A_detail;
                        $('.seeBtn_tab').show();
                    }
                    td[2].append(seeBtn);

                    for (let j = 0; j < 3; j++) {
                        tr.append(td[j]);
                    }
                    result.append(tr);
                }
                $('#ann_body').replaceWith(result);
            },
            error: function (err) {
                console.log(err);
            }
        })
        $('.announcement_tab').show();
    })
    $('.announcement_close').on('click', function () {
        $('.announcement_tab').hide();
        $('.seeBtn_tab').hide();
    })
    $('.ranking_list button').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/user_rank_load',
            data: form,
            success: function (data) {
                // console.log(data);
                let result = document.createElement('tbody');
                result.setAttribute('id', 'rank_body');
                // console.log(data.searching.length);
                for (let i = 0; i < data.searching.length; i++) {
                    let tr = document.createElement('tr');
                    let td = new Array;
                    for (let j = 0; j < 3; j++) {
                        td[j] = document.createElement('td');
                    }
                    td[0].innerHTML = i + 1;
                    td[1].innerHTML = data.searching[i].username;
                    td[2].innerHTML = data.searching[i].totalScore;

                    for (let j = 0; j < 3; j++) {
                        tr.append(td[j]);
                    }
                    result.append(tr);
                }

                $('#rank_body').replaceWith(result);
                
                let result_self = document.createElement("table");
                result_self.setAttribute("class", "rank-table")
                result_self.setAttribute("id", "rank_self");
                result_self.setAttribute("border","1");
                let tr = document.createElement('tr');
                let td = new Array;
                for (let j = 0; j < 3; j++) {
                    td[j] = document.createElement('td');
                }
                td[0].innerHTML = data.rank_self.ranking;
                td[1].innerHTML = data.rank_self.username;
                td[2].innerHTML = data.rank_self.totalScore;

                for (let j = 0; j < 3; j++) {
                    tr.append(td[j]);
                }
                result_self.append(tr);

                $('#rank_self').replaceWith(result_self);
            },
            error: function (err) {
                console.log(err);
            }
        })
        $('.ranking_tab').show();
    })
    $('.ranking_close').on('click', function () {
        $('.ranking_tab').hide();
    })
    $('.feedback button').on('click', function () {
        $('.feedback_tab').show();
    })
    $('.commit button').on('click', function () {
        let detail = $('.feedback-txt').val();
        if (detail == "")
        {
            alert ("留言内容不能为空！");
        }
        else
        {
            let feedback = {
                detail : detail,
                username : form.username
            }
            $.ajax({
                type: 'get',
                url: '/feedback_add',
                data: feedback,
                success: function (data) {
                    // console.log(data);
                    alert("留言成功！");
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }

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

    $('.seeBtn_close').on('click', function () {
        $('.seeBtn_tab').hide();
    })
})