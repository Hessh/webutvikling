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

/** Initializing the render function */
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

        exitAddPopup()
        renderCasesAdmin()

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

    exitEditPopup()
    renderCasesAdmin()

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