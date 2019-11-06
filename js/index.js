
/** Jquery function for animating banner images */
let imageId = 1;

function imageSwitch() {

    let $activeElement = $('.banner-img');

    for (let i = 0; i < $activeElement.length; i++) {
        $activeElement[i].style.display = "none"
    }

    imageId++

    if (imageId > $activeElement.length) {
        imageId = 1
    }

    $activeElement[imageId - 1].style.display = "block";

}

/** Time-interval for banner animation */
$(function () {
    setInterval("imageSwitch()", 5000);
});

/** Function for rendering cases to the index page */
let outputSolvedIndex = document.getElementById("index-solved-case-container");
let outputUnsolvedIndex = document.getElementById("index-unsolved-case-container");

async function renderCasesIndex() {

    outputSolvedIndex.innerHTML = "";
    outputUnsolvedIndex.innerHTML = "";

    cases.forEach(caseObject => {
        /*style="background-image: url(img/${caseObject.imgURL})"*/
        let boxContent =
            `<article class="single-case" id="${caseObject.id}" data-id="${caseObject.id}">
                <div class="img-container">
                    <img style="background-image: url(./img/${caseObject.imgURL})">
                </div>
                <div class="text-content">
                    <h2>${caseObject.title}</h2>
                    <h3>${caseObject.type}</h3>
                    <p>ID: ${caseObject.caseNumber}</p>
                </div>
                <div class="button-container">
                    <a href="case.html?${caseObject.id}"><button class="detail-button">VIS DETALJER</button></a>
                </div>
            </article>`;
        if (caseObject.isSolved) {
            outputSolvedIndex.innerHTML += boxContent;
        } else if (!caseObject.isSolved) {
            outputUnsolvedIndex.innerHTML += boxContent;
        }
    })
}

/** Initializing the render function */
renderCasesIndex();