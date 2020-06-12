window.onload = dataload;

function dataload() {
    $.ajax({
        type: 'get',
        url: '/feedback_load',
        success: function (data) {
            // console.log(data);
            let result = document.createElement('tbody');
            for (let i = 0; i < data.searching.length; i++) {
                let tr = document.createElement('tr');
                let td = new Array;
                for (let j = 0; j < 6; j++) {
                    td[j] = document.createElement('td');
                }
                let img = document.createElement('img');
                if (data.searching[i].F_isRead) {
                    img.setAttribute("src", "./public/images/yes.png");
                    img.setAttribute("alt", "已读");
                }
                else {
                    img.setAttribute("src", "./public/images/no.png");
                    img.setAttribute("alt", "未读");
                }
                td[0].append(img);
                td[1].innerHTML = data.searching[i].FeedbackID;
                td[2].innerHTML = data.searching[i].username;
                td[3].innerHTML = data.searching[i].F_detail;
                td[4].innerHTML = data.searching[i].F_addtime.replace(/T/, " ").slice(0, 19);  //格式化时间数据

                let seeBtn = document.createElement('input');
                seeBtn.setAttribute('type', 'button');
                seeBtn.setAttribute('value', '查看');
                seeBtn.setAttribute('class', 'seeBtn');
                seeBtn.onclick = function () {
                    $('.feedback_detail')[0].innerHTML = data.searching[i].F_detail;
                    $('.pop_wrap').show();
                    $('.pop_tab').show();
                }
                td[5].append(seeBtn);

                let readBtn = document.createElement('input');
                readBtn.setAttribute('type', 'button');
                if (data.searching[i].F_isRead) {
                    readBtn.setAttribute('value', '标为未读');
                    readBtn.setAttribute('class', 'toUnreadBtn');
                }
                else {
                    readBtn.setAttribute('value', '标为已读');
                    readBtn.setAttribute('class', 'toReadBtn');
                }
                td[5].append(readBtn);

                let delBtn = document.createElement('input');
                delBtn.setAttribute('type', 'button');
                delBtn.setAttribute('value', '删除');
                delBtn.setAttribute('class', 'delBtn');
                td[5].append(delBtn);

                for (let j = 0; j < 6; j++) {
                    tr.append(td[j]);
                }
                result.append(tr);
            }
            $('tbody').replaceWith(result);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

$(function () {
    $('.closeBtn').on('click', function () {
        $('.pop_wrap').hide();
        $('.pop_tab').hide();
    })
    $('body').on('click','.toUnreadBtn',function(){
        let ID = this.parentNode.parentNode.children[1];
        let form = {
            FeedbackID: ID.innerHTML
        }
        $.ajax({
            type: 'get',
            url: '/feedback_toUnread',
            data: form,
            success: function (data) {
                dataload();
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
    $('body').on('click','.toReadBtn',function(){
        let ID = this.parentNode.parentNode.children[1];
        let form = {
            FeedbackID: ID.innerHTML
        }
        $.ajax({
            type: 'get',
            url: '/feedback_toRead',
            data: form,
            success: function (data) {
                dataload();
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
    $('body').on('click','.delBtn',function(){
        let ID = this.parentNode.parentNode.children[1];
        let form = {
            FeedbackID: ID.innerHTML
        }
        $.ajax({
            type: 'get',
            url: '/feedback_del',
            data: form,
            success: function (data) {
                alert('删除成功！');
                dataload();
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
})