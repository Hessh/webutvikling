/** Display and hide burgermenu for mobile */
var topnav = document.getElementById("topnav");
var menuShow = false;
function showMenu(){
    if(!menuShow) {
        topnav.style.left = 0;
        menuShow = true;
    }else {
        topnav.style.left = -999 + "%";
        menuShow = false;
    }
}

/** Function for scrolling to top with smooth "animation" */
function topScroll() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    setTimeout(1000)
}