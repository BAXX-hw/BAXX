$(function () {
  $('#mysearch').on('keydown', function (e) {
    if (e.keyCode === 13) {
      searching();
    }
  });

  $('.searchbtn').on('click', searching);

  function searching() {
    let form = {
      search: $('#mysearch').val()
    }

    $.ajax({
      type: 'get',
      url: '/searchname',
      data: form,
      success: function (data) {
        // console.log(data.searching);
        let result = document.createElement('tbody');
        console.log(data.searching.length);
        for (let i = 0; i < data.searching.length; i++) {
          let tr = document.createElement('tr');
          let td = new Array;
          for (let j = 0; j <= 5; j++) {
            td[j] = document.createElement('td');
          }
          td[0].innerHTML = i + 1;
          td[1].innerHTML = data.searching[i].username;
          td[2].innerHTML = data.searching[i].P_nickname;
          td[3].innerHTML = data.searching[i].P_gender;
          td[4].innerHTML = data.searching[i].P_signature;
          td[5].innerHTML = data.searching[i].totalScore;
          for (let j = 0; j <= 5; j++) {
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
})