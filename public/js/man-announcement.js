window.onload = dataload;

function dataload() {
    $.ajax({
        type: 'get',
        url: '/ann_load',
        success: function (data) {
            // console.log(data);
            let result = document.createElement('tbody');
            // console.log(data.searching.length);
            for (let i = 0; i < data.searching.length; i++) {
                let tr = document.createElement('tr');
                let td = new Array;
                for (let j = 0; j <= 4; j++) {
                    td[j] = document.createElement('td');
                }
                td[0].innerHTML = data.searching[i].AnnouncementID;
                td[1].innerHTML = data.searching[i].A_title;
                td[2].innerHTML = data.searching[i].A_detail;
                td[3].innerHTML = data.searching[i].A_addtime.replace(/T/, " ").slice(0, 19);  //格式化时间数据
                let delBtn = document.createElement('input');
                delBtn.setAttribute('type', 'button');
                delBtn.setAttribute('value', '删除');
                delBtn.setAttribute('class', 'delbtn');
                td[4].append(delBtn);

                for (let j = 0; j <= 4; j++) {
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

$('body').on('click','input.delbtn',function(){
    let ID = this.parentNode.parentNode.firstElementChild;
    let form = {
        AnnID: ID.innerHTML
    }
    $.ajax({
        type: 'get',
        url: '/ann_del',
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

$(function () {
    // 鼠标点击外区域关闭登录框
    window.onclick = function (event) {
        let modal = document.getElementById('modalid');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $('.submitbtn').on('click', function () {
        let form = {
            title: $('#title').val(),
            detail: $('#detail').val()
        }
        $.ajax({
            type: 'get',
            url: '/ann_add',
            data: form,
            success: function (data) {
                // console.log(data);
                alert('添加成功！');
                $('#modalid').hide();
                dataload();
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
})




