var modal = document.getElementById('nodalid');

// 鼠标点击外区域关闭登录框
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}