/** Display and hide burgermenu for mobile */
var topnav = document.getElementById("topnav");
var menuShow = false;
function showMenu() {
    if (!menuShow) {
        topnav.style.left = 0;
        menuShow = true;
    } else {
        topnav.style.left = -999 + "%";
        menuShow = false;
    }
}

/** Function for scrolling to top (with smooth "animation" for laptop) */
function topScroll() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    setTimeout(1000)
}

/** Show each case in case.html when "vis detaljer"-button is clicked in index.html */
let url = window.location.href;
url = url.split("");
let urlParam = parseInt(url[url.length - 1]);

for (i = 0; i < cases.length; i++) {
    if (i == urlParam) {
        let caseBanner = document.getElementById("case-banner")
        let caseBannerLeft = document.getElementById("case-banner-left")
        let caseBannerRight = document.getElementById("case-banner-right")
        let caseContentLeft = document.getElementById("case-content-left");
        let caseContentRight = document.getElementById("case-content-right");

        let buttenText;
        let status;

        if (cases[i].isSolved) {
            status = "Løst"
            buttenText = "Flytt til uløst";
            caseBanner.style.backgroundImage = "linear-gradient(#32AD36, #2b8b2e)"
        } else {
            status = "Uløst"
            buttenText = "Flytt til løst";
            caseBanner.style.backgroundImage = "linear-gradient(#F15E5D, #e45555)"
        }

        let bannerLeftContent = `<h1 id="status">${status}</h1>`

        caseBannerLeft.innerHTML = bannerLeftContent;

        let bannerRightContent = `<button id="button-${cases[i].id}" onclick="caseStatus(${cases[i].isSolved}, ${cases[i].id})">${buttenText}</button>`

        caseBannerRight.innerHTML = bannerRightContent;

        let contentLeft =
            `<section class="header-section">
                <h5>ID: ${cases[i].caseNumber}</h5>
                <h5>Dato: ${cases[i].date}</h5>
            </section>
            <section class="title-section">
                <p>Tittel</p>
                <h1>${cases[i].title}</h1>
            </section>
            <section class="type-section">
                <p>Kategori</p>
                <h3>${cases[i].type}</h3>
            </section>
            <section class="desc-section">
                <p>Beskrivelse</p>
                <p>${cases[i].description}</p>
            </section>`

        caseContentLeft.innerHTML += contentLeft;

        let contentRight = `<img class="case-img" src="./img/${cases[i].imgURL}" alt="Saksbilde">`

        caseContentRight.innerHTML += contentRight;

        let statusButton = document.getElementById(`button-${cases[i].id}`)

        if (cases[i].isSolved) {
            statusButton.setAttribute("class", "status-button unsolved")
        } else {
            statusButton.setAttribute("class", "status-button solved")
        }
    }
}