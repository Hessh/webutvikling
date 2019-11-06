/** Getting todays date */
let date = new Date().toLocaleDateString();

/** Array with predefined caseobjects */
let id = 0;
let caseNumber = 1000;
let staticCases = [
    {
        id: id++,
        caseNumber: caseNumber++,
        title: "Arne Treholt",
        type: "Spionasje",
        description: "Mulig spion for Sovjet",
        imgURL: "treholt.jpg",
        date: "20/04/84",
        isSolved: true
    },
    {
        id: id++,
        caseNumber: caseNumber++,
        title: "Gunvor Galtung Haavik",
        type: "Spionasje",
        description: "Mulig spion for Sovjet",
        imgURL: "haavik.jpg",
        date: "08/10/76",
        isSolved: true
    },
    {
        id: id++,
        caseNumber: caseNumber++,
        title: "Høyskolen Kristiania",
        type: "Trygghetsrådgivning",
        description: "Administrasjonen på HK har bedt om en trygghetsrådgivning fra oss, der de vil at vi skal gå igjennom trusselnivåer og snakke til studentene om tips og triks i hverdagen. OBS: Midt i fadderuka.",
        imgURL: "kristiania-logo.jpg",
        date: "22/08/19",
        isSolved: true
    },
    {
        id: id++,
        caseNumber: caseNumber++,
        title: "Grefsenveien 10",
        type: "Etterforskning",
        description: "Mulig spredning av masseødeleggelsesvåpen, Dette må bekjempes med ryddig etterforskning av mistenkt person. Sist sett ved Grefsenveien 10.",
        imgURL: "gass.jpg",
        date: date,
        isSolved: false
    },
    {
        id: id++,
        caseNumber: caseNumber++,
        title: "Fransk baguette",
        type: "Informasjonsinnhenting",
        description: "Vi har lenge visst at franskmennene har spionert på våre militære baser. Vi er avhengig av en rapport med informasjon om hva de kan finne ut av, og hva de absolutt ikke kan finne ut av. Gjør dette i all hemmelighet (need to know)",
        imgURL: "person-etterforskning-1.jpg",
        date: date,
        isSolved: false
    },
    {
        id: id++,
        caseNumber: caseNumber++,
        title: "Rolando Gonzalez",
        type: "Livvakt",
        description: "Rolando Gonzalez er per dags dato den mest populære foreleseren, og administrasjonen på Høyskolen Kristiania har i den forbindelse bedt om daglig livvakt.",
        imgURL: "folkemengde.jpg",
        date: date,
        isSolved: false
    }
];

/** Setting/storing the predefined objects to localstorage */
for (let i = 0; i < staticCases.length; i++) {
    window.localStorage.setItem(`cases-${i}`, JSON.stringify(staticCases[i]));
}

/** Declaring empty array for all caseobjects */
id = 0;
let cases = [];

/** Defining the empty array with all objects from localstorage */
for (let i = 0; i < localStorage.length; i++) {
    let localArray = JSON.parse(window.localStorage.getItem(`cases-${i}`));
    cases.push(localArray)
    id++;
}

/** Function for rendering cases to the admin page */
let outputSolvedAdmin = document.getElementById("admin-solved-case-container");
let outputUnsolvedAdmin = document.getElementById("admin-unsolved-case-container")

async function renderCasesAdmin() {

    outputSolvedAdmin.innerHTML = "";
    outputUnsolvedAdmin.innerHTML = "";

    cases.forEach(caseObject => {
        /*style="background-image: url(img/${caseObject.imgURL})"*/
        let boxContent =
            `<article class="single-case" id="${caseObject.id}" data-id="${caseObject.id}">
                <div class="img-container">
                    <img style="background-image: url(./img/${caseObject.imgURL})">
                </div>
                <div class="text-content">
                    <h2 class="case-title">${caseObject.title}</h2>
                    <h3 class="case-type">${caseObject.type}</h3>
                    <p class="case-id">ID: ${caseObject.caseNumber}</p>
                </div>
                <div class="button-container">
                    <button class="edit-button" onclick="editCase('cases-${caseObject.id}', ${caseObject.id}, ${caseObject.caseNumber})">REDIGER</button>
                    <button class="delete-button" onclick="deleteCase('${caseObject.id}')">SLETT</button>
                </div>
            </article>`;
        if (caseObject.isSolved) {
            outputSolvedAdmin.innerHTML += boxContent;
        } else if (!caseObject.isSolved) {
            outputUnsolvedAdmin.innerHTML += boxContent;
        }
    })
}

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

/** Initializing the render functions */
renderCasesIndex();
renderCasesAdmin();

/** Functions for adding new case to array and storing it in localstorage */
let add = document.getElementById("add-container");
let addType = document.getElementById("add-type");
let addImg = document.getElementById("add-img");
let addTitle = document.getElementById("add-title");
let addDesc = document.getElementById("add-desc");
let addSolved = document.getElementById("add-solved");

function addCase() {
    add.style.display = "flex";
}

function addFinished() {

    if (addTitle.value === "") {

        addTitle.style.border = "1px solid #F15E5D"

    } else {

        addTitle.style.border = "1px solid lightgrey"

        let input = {
            id: id,
            caseNumber: caseNumber,
            title: addTitle.value,
            type: addType.value,
            imgURL: addImg.value,
            date: date,
            isSolved: addSolved.checked,
            description: addDesc.value
        }

        window.localStorage.setItem(`cases-${id}`, JSON.stringify(input));
        cases.push(JSON.parse(window.localStorage.getItem(`cases-${id}`)))

        id++;
        caseNumber++

        addTitle.value = "";
        addType.value = "";
        addImg.value = "";
        addDesc.value = "";
        addSolved.checked = false;

        renderCasesAdmin()
        renderCasesIndex()
        exitAddPopup()

    }

    return id, cases;
}

function exitAddPopup() {
    add.style.display = "none";
    addTitle.style.border = "1px solid lightgrey"
}

//** Functions for editing caseobject */
let edit = document.getElementById("edit-container");
let editType = document.getElementById("edit-type");
let editImg = document.getElementById("edit-img");
let editTitle = document.getElementById("edit-title");
let editDesc = document.getElementById("edit-desc");
let editSolved = document.getElementById("edit-solved");
let caseID;
let caseKey;

function editCase(key, id, number) {
    edit.style.display = "flex";

    caseKey = key;
    caseID = id;
    caseNumber = number;

    editType.value = cases[caseID].type
    editImg.value = cases[caseID].imgURL
    editTitle.value = cases[caseID].title
    editDesc.value = cases[caseID].description
    editSolved.checked = cases[caseID].isSolved

    return caseKey, caseID, caseNumber;
}

function editFinished() {

    let input = {
        id: caseID,
        caseNumber: caseNumber,
        title: editTitle.value,
        type: editType.value,
        imgURL: editImg.value,
        date: date,
        isSolved: editSolved.checked,
        description: editDesc.value
    }
    window.localStorage.setItem(caseKey, JSON.stringify(input));
    cases.splice(caseID, 1, JSON.parse(window.localStorage.getItem(caseKey)));

    addTitle.value = "";
    addType.value = "";
    addImg.value = "";
    addDesc.value = "";
    addSolved.checked = false;

    renderCasesAdmin()
    renderCasesIndex()
    exitEditPopup()

    return cases;
}

function exitEditPopup() {
    edit.style.display = "none";
    //renderCases();
}

/** Functions for deleting caseobjects from the sites, the array and from localstorage */
let deleteContainer = document.getElementById("delete-container");
let element;

function deleteCase(el) {

    deleteContainer.style.display = "flex";
    element = document.getElementById(el);
    return element;
}

function deleteFinished() {

    let elementId = element.id;

    /* Removing element from site */
    element.remove();

    /** Removing object from array */
    if (elementId === (cases.length)) {
        cases.pop()
    } else {
        cases.splice(elementId, 1);
    }

    /** Giving all objects the right data-id after removal of one object from array */
    let singleCase = document.querySelectorAll(".single-case");

    for (let i = 0; i < singleCase.length; i++) {
        if (cases[i].id > elementId) {

            let singleElementId = singleCase[i].dataset.id;
            singleCase[i].setAttribute("data-id", `${singleElementId - 1}`);

            let singleId = singleCase[i].id;
            singleCase[i].setAttribute("id", `${singleId - 1}`);

            cases[i].id--
        }
    }

    /** Removing object from localstorage - Original thought */

    /*window.localStorage.removeItem(`cases-${elementId}`);
    for (let i = 0; i < localStorage.length; i++) {
        
        let keyName = window.localStorage.key(i)
        let keyID = keyName.replace("cases-", "")

        if(keyID > (elementId)){
            console.log(keyID)
            let storageValue = window.localStorage.getItem(`cases-${keyID}`)
            window.localStorage.setItem(`cases-${keyID - 1}`, storageValue)
        }   
    }
    window.localStorage.removeItem(`cases-${window.localStorage.length - 1}`);*/

    /** Removing all objects from localstorage and setting new localstorage from updated array - Because original thought didnt work*/
    window.localStorage.clear();

    for (let i = 0; i < cases.length; i++) {
        window.localStorage.setItem(`cases-${i}`, JSON.stringify(cases[i]))
    }

    exitDeletePopup();
    id--;
    return id;
}

function exitDeletePopup() {
    deleteContainer.style.display = "none";
}

/** Show each case in case.html when button is clicked from index.html */
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

// Functions for setting cases to solved / unsolved
function caseStatus(status, id) {

    let statusEl = document.getElementById("status")
    let statusButton = document.getElementById(`button-${id}`)
    let caseBanner = document.getElementById("case-banner")

    if (status) {
        statusEl.textContent = "Uløst"
        statusButton.textContent = "Flytt til løst"
        statusButton.style.backgroundImage = "linear-gradient(#32AD36, #2b8b2e)"
        caseBanner.style.backgroundImage = "linear-gradient(#F15E5D, #e45555)"

    } else {
        statusEl.textContent = "Løst"
        statusButton.textContent = "Flytt til uløst"
        statusButton.style.backgroundImage = "linear-gradient(#F15E5D, #e45555)"
        caseBanner.style.backgroundImage = "linear-gradient(#32AD36, #2b8b2e)"
    }

    for (let i = 0; i < cases.length; i++) {
        if (cases[i].id === id) {
            if (cases[i].isSolved) {
                cases[i].isSolved = false
            } else {
                cases[i].isSolved = true
            }
        }
    }

    window.localStorage.clear();

    for (let i = 0; i < cases.length; i++) {
        window.localStorage.setItem(`cases-${i}`, JSON.stringify(cases[i]))
    }
}