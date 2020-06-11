$(function () {
    $('.loginBtn button').on('click', function () {
        $('.pop_wrap').show();
        $('.login_tab').show();
    })
    $('.login_close').on('click', function () {
        $('.pop_wrap').hide();
        $('.login_tab').hide();
    })
    $('.registerBtn button').on('click', function () {
        $('.pop_wrap').show();
        $('.register_tab').show();
    })
    $('.register_close').on('click', function () {
        $('.pop_wrap').hide();
        $('.register_tab').hide();
    })
    $('.login_submit').on('click', function () {
        let form = {
            "username": $('#log_username').val(),
            "password": $('#log_password').val()
        };
        $.ajax({
            type: 'post',
            url: '/login',
            data: form,
            success: function (data) {
                // console.log(data);
                if (data.isLogin) {
                    localStorage.setItem('username',form.username);
                    window.location.href = 'level_choosing';
                }
                else {
                    alert('用户名或密码错误！');
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
    $('.register_submit').on('click', function () {
        let username = $('#reg_username').val();
        let password = $('#reg_password').val();
        let password_confirm = $('#reg_password_confirm').val();

        let patt_name = new RegExp(/^[a-zA-Z0-9]{4,10}$/);
        let patt_pwd = new RegExp(/^[a-zA-Z0-9]{8,16}$/);

        if (password !== password_confirm) {
            alert('请确认第二次输入的密码与第一次一致！');
            $('#reg_password_confirm').focus();
        }
        else if (!patt_name.test(username)) {
            alert('用户名必须为4-10位数字或字母！');
            $('#reg_username').focus();
        }
        else if (!patt_pwd.test(password)) {
            alert('密码必须为8-16位数字或字母！');
            $('#reg_password').focus();
        }
        else {
            let form = {
                "username": username,
                "password": password
            };
            $.ajax({
                type: 'post',
                url: '/reg',
                data: form,
                success: function (data) {
                    // console.log(data);
                    if (data.reged) {
                        alert('该用户名已注册！');
                    }
                    else {
                        alert('注册成功！请重新登录。');
                        $('.pop_wrap').hide();
                        $('.register_tab').hide();
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    })
})