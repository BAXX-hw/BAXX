
function changeSrc(n) {

    switch (n) {
        case 1:
        document.getElementById("myframe").src = "./man_home.html";
        break;
        case 2:
        document.getElementById("myframe").src = "./man_users.html";
        break;
        case 3:
        document.getElementById("myframe").src = "./man_announcement.html";
        break;
        default:
        document.getElementById("myframe").src = "./man_feedback.html";

    }
}



