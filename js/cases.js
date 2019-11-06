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