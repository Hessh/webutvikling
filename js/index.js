
/** jquery function for animating banner images */
let imageId = 1;

function imageSwitch() {

    let $activeElement = $('.banner-img');
    
    for (let i = 0; i < $activeElement.length; i++){
        $activeElement[i].style.display = "none"
    }

    imageId++

    if (imageId > $activeElement.length) {
        imageId = 1
    }
    
    $activeElement[imageId - 1].style.display = "block";
    
}

$(function() {
    setInterval("imageSwitch()", 5000);
});