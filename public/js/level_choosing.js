$(function () {
    $('.avatar').on('click', function () {
        if (localStorage.getItem('username') === "-1") {
            $('.pop_wrap').show();
            $('.visitor_tab').show();
        }
        else {
            avatar_load();
            $('.pop_wrap').show();
            $('.avatar_tab').show();
        }
    })

    function avatar_load() {
        let form = {
            username: localStorage.getItem('username')
        }

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
                let classes = new Array("name", "gender", "intro")
                for (let i = 0; i < 3; i++) {
                    let tr = document.createElement('tr');
                    let td = new Array;
                    for (let j = 0; j < 2; j++) {
                        td[j] = document.createElement('td');
                    }
                    td[0].innerHTML = heads[i];
                    td[1].innerHTML = bodys[i];
                    td[1].setAttribute("class", classes[i]);

                    for (let j = 0; j < 2; j++) {
                        tr.append(td[j]);
                    }
                    result.append(tr);
                }
                $('#avatar-table').replaceWith(result);

                let admbtn = document.createElement('div');
                admbtn.setAttribute('class', 'admBtn');
                let compilebtn = document.createElement('div');
                compilebtn.setAttribute('class', 'btn compile');
                let btn = document.createElement('button');
                btn.setAttribute('type', 'button');
                compilebtn.append(btn);
                admbtn.append(compilebtn);
                $('.admBtn').replaceWith(admbtn);
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

    $('.avatar_close').on('click', function () {
        $('.pop_wrap').hide();
        $('.avatar_tab').hide();
    })
    $('.announcement').on('click', function () {
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
        $('.pop_wrap').show();
        $('.announcement_tab').show();
    })
    $('.announcement_close').on('click', function () {
        $('.pop_wrap').hide();
        $('.announcement_tab').hide();
        $('.seeBtn_tab').hide();
    })
    $('.ranking_list').on('click', function () {
        if (localStorage.getItem('username') === "-1") {
            $('.pop_wrap').show();
            $('.visitor_tab').show();
        }
        else {
            let form = {
                username: localStorage.getItem('username')
            }
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
                    result_self.setAttribute("border", "1");
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
            $('.pop_wrap').show();
            $('.ranking_tab').show();
        }
    })
    $('.ranking_close').on('click', function () {
        $('.pop_wrap').hide();
        $('.ranking_tab').hide();
    })
    $('.feedback').on('click', function () {
        if (localStorage.getItem('username') === "-1") {
            $('.pop_wrap').show();
            $('.visitor_tab').show();
        }
        else {
            $('.pop_wrap').show();
            $('.feedback_tab').show();
        }
    })
    $('.commit button').on('click', function () {
        let detail = $('.feedback-txt').val();
        if (!detail) {
            alert("留言内容不能为空！");
        }
        else {
            let feedback = {
                detail: detail,
                username: localStorage.getItem('username')
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
        $('.pop_wrap').hide();
        $('.feedback_tab').hide();
    })
    $('.setting').on('click', function () {
        if (localStorage.getItem('username') === "-1") {
            $('.exit').hide();
        }
        $('.pop_wrap').show();
        $('.setting_tab').show();
    })
    $('.setting_close').on('click', function () {
        $('.pop_wrap').hide();
        $('.setting_tab').hide();
    })
    $('body').on('click', '.compile', function () {
        let nametd = document.createElement("td");
        let name = document.createElement("input");
        name.setAttribute('id', 'nickname');
        let username = $('.name')[0].innerHTML;
        name.setAttribute('value', username);
        nametd.append(name);
        $(".name").replaceWith(nametd);

        let gendertd = document.createElement("td");
        let gender = document.createElement("select");
        gender.setAttribute('id', 'gender');
        let man = document.createElement("option");
        man.setAttribute('value', '男');
        man.innerHTML = "男";
        let woman = document.createElement("option");
        woman.setAttribute('value', '女');
        woman.innerHTML = "女";
        gender.append(man);
        gender.append(woman);
        gendertd.append(gender);
        $(".gender").replaceWith(gendertd);

        let introtd = document.createElement("td");
        let intro = document.createElement("textarea");
        intro.setAttribute('id', 'intro');
        let detail = $('.intro')[0].innerHTML;
        intro.innerHTML = detail;
        introtd.append(intro);
        $(".intro").replaceWith(introtd);

        let admbtn = document.createElement('div');
        admbtn.setAttribute('class', 'admBtn');
        let savebtn = document.createElement('div');
        savebtn.setAttribute('class', 'btn save');
        let btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        savebtn.append(btn);
        admbtn.append(savebtn);
        $('.admBtn').replaceWith(admbtn);
    })

    $('body').on('click', '.save', function () {
        let nickname = $('#nickname').val();
        let gender = $('#gender').val();
        let signature = $('#intro').val();

        if (!nickname) {
            alert("昵称不能为空！");
        }
        else if (!gender) {
            alert("性别不能为空！");
        }
        else if (!signature) {
            alert("个性签名不能为空！");
        }
        else {
            let info = {
                nickname: nickname,
                gender: gender,
                signature: signature,
                username: localStorage.getItem('username')
            }
            $.ajax({
                type: 'get',
                url: '/user_info_update',
                data: info,
                success: function (data) {
                    alert("修改成功！");
                    avatar_load();
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    })

    $('.seeBtn_close').on('click', function () {
        $('.seeBtn_tab').hide();
    })

    $('.exit').on('click', function () {
        let isExit = confirm("确定要退出登录吗？");
        if (isExit) {
            localStorage.setItem('username', -1);
        }
    })

    $('.visitor_close').on('click', function () {
        $('.pop_wrap').hide();
        $('.visitor_tab').hide();
    })

    $('.toLogin').on('click', function () {
        window.location.href = "index";
    })
})