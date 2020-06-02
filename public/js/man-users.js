function onSearch() {
    
    var input, filter, table, tr, td, i;
    input = document.getElementById("mysearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("m-users-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }
  // 删除
  function deleteRow(r){
    var i=r.parentNode.parentNode.rowIndex;
    document.getElementById('m-users-table').deleteRow(i);
  }
  // 编辑
  function changeContent(r){
    var i=r.parentNode.parentNode.rowIndex;
    var x=document.getElementById('m-users-table').rows[i].cells;
    x[0].innerHTML="新内容";
    x[1].innerHTML="新内容";
    x[2].innerHTML="新内容";
    x[3].innerHTML="新内容";
    x[4].innerHTML="新内容";
  }