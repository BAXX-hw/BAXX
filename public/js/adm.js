$('.login_submit').on('click', function (){
    let form = {
        "username" : $('#username').val(),
        "password" : $('#password').val()
    };
    $.ajax({
        type: 'post',
        url: '/admlogin',
        data: form,
        success: function (data) {
            // console.log(data);
            if (data.isLogin) {
                window.location.href='admin_house';
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