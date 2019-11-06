// Functions for setting cases to solved / unsolved
function caseStatus(status, id) {

    let statusEl = document.getElementById("status")
    let statusButton = document.getElementById(`button-${id}`)
    let caseBanner = document.getElementById("case-banner")

    if (status) {
        statusEl.textContent = "Uløst"
        statusButton.textContent = "Flytt til løst"
        statusButton.setAttribute("onclick", `caseStatus(${false}, ${id})`);
        statusButton.setAttribute("class", "status-button solved")
        statusButton.style.backgroundImage = "linear-gradient(#32AD36, #2b8b2e)"
        caseBanner.style.backgroundImage = "linear-gradient(#F15E5D, #e45555)"

    } else {
        statusEl.textContent = "Løst"
        statusButton.setAttribute("onclick", `caseStatus(${true}, ${id})`);
        statusButton.setAttribute("class", "status-button unsolved")
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