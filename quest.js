function setupQuestMenu(){
    const questMenu = document.getElementById("quest-menu");

    const mainQuestTitle = document.createElement("h2");
    mainQuestTitle.classList = "main-quest-title";
    mainQuestTitle.innerText = "MAIN QUEST";

    const mainQuestContainer = document.createElement("div");
    mainQuestContainer.classList = "main-quest-container";

    const sideQuestTitle = document.createElement("h2");
    sideQuestTitle.classList = "side-quest-title";
    sideQuestTitle.innerText = "SIDE QUEST";
    const sideQuestContainer = document.createElement("div");
    sideQuestContainer.classList = "side-quest-container";

    const mainQuest = quests.filter(quest => quest.type === "main");
    const sideQuest = quests.filter(quest => quest.type === "side");

    mainQuest.forEach((quest) => {
        const questDiv = document.createElement("div");
        questDiv.classList = "quest";
        questDiv.innerHTML = `
            <h3>
                ${quest.desc}
            </h3>
        `;
        mainQuestContainer.appendChild(questDiv);
    });

    sideQuest.forEach((quest) => {
        const questDiv = document.createElement("div");
        questDiv.classList = "quest";
        questDiv.innerHTML = `
            <h3>
                ${quest.desc}
            </h3>
        `;
        sideQuestContainer.appendChild(questDiv);
    });
    console.log(mainQuestTitle, mainQuestContainer, sideQuestTitle, sideQuestContainer);

    questMenu.appendChild(mainQuestTitle);
    questMenu.appendChild(mainQuestContainer);
    questMenu.appendChild(sideQuestTitle);
    questMenu.appendChild(sideQuestContainer);
}

