function setupQuestMenu() {
  const questMenu = document.getElementById("quest-menu");

  const questMenuContainer = document.createElement("div");
  questMenuContainer.classList = "quest-menu-container";
  const questContainer = document.createElement("div");
  questContainer.classList = "quest-container";
  const descContainer = document.createElement("div");
  descContainer.classList = "quest-desc-container";

  const titleContainer = document.createElement("div");
  titleContainer.classList = "title-container";

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

  const mainQuest = quests.filter((quest) => quest.type === "main");
  const sideQuest = quests.filter((quest) => quest.type === "side");

  updateQuestAvailability(quests);

  mainQuest.forEach((quest) => {
    const questDiv = document.createElement("div");
    questDiv.classList = "quest";
    questDiv.innerHTML = `
            <h3>
            ${quest.title}
            </h3>
        `;
    mainQuestContainer.appendChild(questDiv);

    if (quest.available) questDiv.classList.add("available");

    questDiv.addEventListener("click", () => {
      sound.loadSound(14);
      sound.play();
      descContainer.innerHTML = `
        <h3>${quest.type} quest</h3>
        <div class="divider">
            <p class="quest-title"> ${quest.title}</p>
            <span class="line"></span>
        </div>
        <p>${quest.desc}</p>
        <div class="divider">
            <p>Rewards</p>
            <span class="line"></span>
        </div>
            <p>${quest.reward}</p>
        `;
      questValidation(quest);
    });
  });

  sideQuest.forEach((quest) => {
    console.log(quest);
    const questDiv = document.createElement("div");
    questDiv.classList = "quest";
    questDiv.innerHTML = `
            <h3>
            ${quest.title}
            </h3>
        `;
    sideQuestContainer.appendChild(questDiv);

    if (quest.available) questDiv.classList.add("available");

    questDiv.addEventListener("click", () => {
      sound.loadSound(14);
      sound.play();
      descContainer.innerHTML = `
        <h3>${quest.type} quest</h3>
        <div class="divider">
            <p class="quest-title"> ${quest.title}</p>
            <span class="line"></span>
        </div>
        <p>${quest.desc}</p>
        <div class="divider">
            <p>Rewards</p>
            <span class="line"></span>
        </div>
            <p>${quest.reward}</p>
        `;
      questValidation(quest);
    });
  });

  questMenu.appendChild(questMenuContainer);
  questMenuContainer.appendChild(questContainer);
  questMenuContainer.appendChild(descContainer);

  titleContainer.appendChild(mainQuestTitle);
  titleContainer.appendChild(sideQuestTitle);

  questContainer.appendChild(titleContainer);
  questContainer.appendChild(mainQuestContainer);
  questContainer.appendChild(sideQuestContainer);

  mainQuestTitle.addEventListener("click", function () {
    sound.loadSound(7);
    sound.play();
    this.classList.toggle("selected-main-quest");
    sideQuestTitle.classList.toggle("selected-side-quest");
    mainQuestContainer.classList.toggle("open-main");
    sideQuestContainer.classList.toggle("open-side");
    updateQuestAvailability(quests);
  });

  sideQuestTitle.addEventListener("click", function () {
    sound.loadSound(7);
    sound.play();
    this.classList.toggle("selected-side-quest");
    mainQuestTitle.classList.toggle("selected-main-quest");
    sideQuestContainer.classList.toggle("open-side");
    mainQuestContainer.classList.toggle("open-main");
    updateQuestAvailability(quests);
  });
}

function updateQuestAvailability(quests) {
  quests.forEach((quest) => {
    if (!quest.lock && quest.condition()) {
      quest.available = true;
    } else {
      quest.available = false;
    }
  });
}

function questValidation(quest) {
  if (quest.condition() && !quest.lock) {
    switch (quest.reward) {
      case "blue_card":
        console.log(quest.reward, quest.condition());
        break;
      case "red_card":
        console.log(quest.reward, quest.condition());
        break;
      case "green_card":
        console.log(quest.reward, quest.condition());
        break;
      case "yellow_card":
        console.log(quest.reward, quest.condition());
        break;
      case "purple_card":
        console.log(quest.reward, quest.condition());
        break;
      case "level":
        teamModaleQuest(quest);
        console.log(quest.reward, quest.condition());
        break;
      case "400":
        gold += quest.reward;
        goldText.innerText = `${gold}`;
        console.log(quest.reward, quest.condition());
        break;
      case "800":
        gold += quest.reward;
        goldText.innerText = `${gold}`;
        console.log(quest.reward, quest.condition());
        break;
      case "1200":
        gold += quest.reward;
        goldText.innerText = `${gold}`;
        console.log(quest.reward, quest.condition());
        break;
      case "1600":
        gold += quest.reward;
        goldText.innerText = `${gold}`;
        console.log(quest.reward, quest.condition());
        break;
      case "2000":
        gold += quest.reward;
        goldText.innerText = `${gold}`;
        console.log(quest.reward, quest.condition());
        break;
    }
    sound.loadSound(5);
    sound.play();
    quest.lock = true;
  }
  updateQuestAvailability(quests);
}

function teamModaleQuest(item) {
  const questMenu = document.getElementById("quest-menu");

  const overlay = document.createElement("div");
  overlay.className = "team-modale-overlay";

  const modaleContent = document.createElement("div");
  modaleContent.classList = "team-modale";

  const teamContainer = document.createElement("div");

  const modaleTitle = document.createElement("h3");
  modaleTitle.innerText = "Select your Mythic";

  teamContainer.innerHTML = menuCat.team;

  modaleContent.appendChild(modaleTitle);
  modaleContent.appendChild(teamContainer);

  questMenu.appendChild(modaleContent);
  questMenu.appendChild(overlay);

  displayTeam();

  teamContainer.addEventListener("click", function (event) {
    let target = event.target;

    let button = target.closest(".plus");

    if (button) {
      let monsterId = button.getAttribute("data-monster");
      let monster = team[monsterId];

      if (monster) {
        selectItem(item, monster);
        displayTeam(); // Update UI to reflect change
        modaleContent.style.display = "none";
        overlay.style.display = "none";
      }
    }
  });

  overlay.addEventListener("click", function () {
    modaleContent.style.display = "none";
    this.style.display = "none";
    sound.loadSound(9);
    sound.play();
  });
}
