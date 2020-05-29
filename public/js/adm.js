$('.login_submit').on('click', function (){
    var form = {
        "username" : $('#username').val(),
        "password" : $('#password').val()
    };
    console.log(form.username);
    $.ajax({
        type: 'post',
        url: '/login',
        data: form,
        success: function (data) {
            // console.log(data);
            if (data.isLogin) {
                window.location.href='index';
            }
            else
            {
                alert('用户名或密码错误！');
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
})