let currentPNJ = null;
let indexPNJ = 0;

function setupChallengers() {
    const challengersContainer = document.querySelector(".challengers-icon");
    const challengersSelection = document.createElement("div");
    challengersSelection.className = "challengers-container"
    challengersSelection.innerHTML = "";
    challengersContainer.innerHTML = "";  // Clear the container to avoid duplicating content

    // Loop through each group in the challengers object (e.g., villagers, temple)
    Object.entries(challengers).forEach(([groupName, members]) => {
        // Create a container for each category
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container", groupName.toLowerCase());

        // Create a title for the category
        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = groupName;
        categoryContainer.appendChild(categoryTitle);

        // Create a container for the icons within this category
        const iconsContainer = document.createElement("div");
        iconsContainer.classList.add("icons-container");

        // Loop through each member in the current category
        Object.values(members).forEach(pnj => {
            // Create an icon for each member
            let icon = document.createElement("div");
            icon.classList.add("icon-pnj");
            icon.innerHTML = `
                <span class="icon-container" style="background-image: url('./img/challengers/${groupName.toLowerCase()}/${pnj.pic}'); background-size: cover;">
                </span>
            `;

            // Attach click event listener if all monsters are alive
            if (checkAllMonstersAlive(pnj)) {
                icon.addEventListener("click", () => {
                    indexPNJ = 0;
                    setupArena(pnj);
                    console.log(`Clicked on: ${pnj.name} from ${groupName}`);
                });
            }

            // Append the icon to the icons container
            iconsContainer.appendChild(icon);
        });

        // Append the icons container to the category container
        categoryContainer.appendChild(iconsContainer);

        // Append the category container to the main container
        challengersSelection.appendChild(categoryContainer);

        challengersContainer.appendChild(challengersSelection);
    });

    // Setup global listeners for the main container
    setupGlobalListeners(challengersContainer);
}

function checkAllMonstersAlive(pnj) {
  return pnj.team.every(monster => monster.currentHp > 0);
}

function setupGlobalListeners(element) {
  element.addEventListener("click", function (event) {
    switch (event.target.id) {
      case "attack-button":
        attack(currentPNJ, indexPNJ);
        break;
      case "superattack-button":
        superAttackMove(currentPNJ, indexPNJ);
        break;
      case "team-button":
        teamMenu();
        break;
      case "dodge-button":
        dodgeMove();
        break;
      default:
        console.log("No action matched.");
    }
  });
}

function setupArena(pnj, message) {

    const challengersIcon = document.querySelector(".challengers-icon");
    currentPNJ = pnj;
    const monster = pnj.team[indexPNJ];
    const arena = `
            <div class="arena"> 
                <div>
                    <div class="img-container">
                        <img class="sprite-fight" src="./img/monsters/${
                        currentMonster.pic[currentMonster.current].back
                        }.png" />
                    </div>
                    <div class="monster-ui">
                        <div>
                            <p class="name">${currentMonster.name}</p>
                            <p>Lv.${currentMonster.level}</p>
                        </div>
                                        <p class="hp">hp ${currentMonster.currentHp} / ${
                        currentMonster.life
                    }</p>
                    </div>
                </div>
                <div>
                    <img class="sprite-fight" src="./img/monsters/${
                    monster.pic
                    }.png" />
                    <div class="monster-ui">
                        <div>
                            <p class="name">${monster.name}</p>
                            <p>Lv.${monster.level}</p>
                        </div>
                        <p class="hp">hp ${monster.currentHp} / ${monster.maxHp}</p>
                    </div>
                </div>
            </div>
        `;

    /*
            I tried to used an event listener strictly to the button but it does not work because
            I dynamically adding it to the DOM.
            Regarding to chat gpt I should use Event Delegation to avoid any issues
        */

    challengersIcon.innerHTML = arena + fightMenu;

    
    updateArena(message)
}

function updateArena(message){
    const fightInfo = document.querySelector('.fight-info');
    fightInfo.innerText = message;
}

const fightMenu = `
<p class="fight-info">Choose what to do.</p>
<div class="fightMenu">
    <span id="attack-button">Attack</span>
    <span id="superattack-button">Super Attack</span>
    <span id="team-button">Team</span>
    <span id="dodge-button">Dodge</span>
</div>
`;

function clearElementContents(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function allKO() {
    const goldUI = document.querySelector(".gold")
    const messages = [
        { text: `${text.defeat} ${currentPNJ.name}!`, delay: 0 },
        { text: `${text.gold} ${gold} gold.`, delay: 3000 } 
    ]
    if (currentPNJ && currentPNJ.team.every(monster => monster.currentHp <= 0)) {
        console.log("All monsters KO: true, updating screen with new menu...");
        displayMessagesSequentially(messages);
        clearElementContents(screen); // Clearing the content explicitly
        screen.innerHTML = menuCat.fight;
        gold += currentPNJ.reward;
        goldUI.innerText = `gold: ${gold}`;
        setupArena(currentPNJ, messages[0].text, indexPNJ);
    }
}

function checkOpponentKO() {
    opponent = currentPNJ.team[indexPNJ];
    if(opponent.currentHp <= 0 && indexPNJ <= 2) {
      if(opponent.level >= currentMonster.level){
        levelUp();
      }
        indexPNJ++;
    }
    setupArena(currentPNJ, indexPNJ);
    allKO();
}


function attack(pnj, index) {
    opponent = pnj.team[index];
    const message1 = `Attacking: ${opponent.name} with ${currentMonster.name}`;
    const message2 = "mange mon zob"
    setupArena(currentPNJ, message1, indexPNJ);
    console.log(`Attacking: ${opponent.name} with ${currentMonster.name}`);
    currentMonster.fight(opponent);
    checkOpponentKO();
    opponentMove(opponent, currentMonster);
    currentMonster.die();
    setupArena(currentPNJ, message2, indexPNJ);
}

function superAttackMove(pnj, index) {
    console.log(`Attacking: ${opponent.name} with ${currentMonster.name}`);
  opponent = pnj.team[index];
  currentMonster.superAttack(opponent);
  checkOpponentKO();
  opponentMove(opponent, currentMonster);
  currentMonster.die();
  setupArena(currentPNJ, indexPNJ);
}

function dodgeMove() {
  currentMonster.dodge();
  console.log(currentMonster.isDodge);
  opponentMove(opponent, currentMonster);
  currentMonster.die();
  setupArena(currentPNJ, indexPNJ);

}

function opponentMove(monster, opponent){
    const actions = ['fight', 'superAttack', 'dodge'];
    const randomAction = actions[Math.floor(Math.random()*actions.length)];

    switch (randomAction){
        case 'fight':
            console.log(`${monster.name} chooses to fight`);
            monster.fight(opponent);
            break;
        case 'superAttack':
            console.log(`${monster.name} chooses to do a super Attack`);
            monster.superAttack(opponent);
            break;
        case 'dodge':
            console.log(`${monster.name} chooses to dodge`);
            monster.dodge();
            break;
        default:
            console.log('No valid action was performed');
    }
    setupArena(currentPNJ, indexPNJ);
}

function teamMenu() {
    console.log("oppening team menu...");
  opponentMove(opponent, currentMonster);
  currentMonster.die();
  setupArena(currentPNJ, indexPNJ);
}