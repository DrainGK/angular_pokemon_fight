let currentPNJ = null;
let currentGroup = "Villagers";
let groupIndex = 1;
let indexPNJ = 0;

function setupChallengers() {
    const challengersContainer = document.querySelector(".challengers-icon");
    const challengersSelection = document.createElement("div");
    challengersSelection.className = "challengers-container"
    challengersContainer.innerHTML?? "";  // Clear the container to avoid duplicating content

    // Loop through each group in the challengers object (e.g., villagers, temple)
    Object.entries(challengers).forEach(([groupName, members]) => {
        // Create a container for each category
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container", groupName.toLowerCase());

        // Create a title for the category
        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = groupName;
        categoryContainer.appendChild(categoryTitle);

        // Create another div for category

        const corner = document.createElement("div");
        corner.classList.add("corner");
        corner.style.backgroundImage = `url(${challengersBg[groupName] ?? "/img/background/village.webp"})`
        console.log(challengersBg[groupName] ?? "zob");
        categoryContainer.appendChild(corner)

        // Create a container for the icons within this category
        const iconsContainer = document.createElement("div");
        iconsContainer.classList.add("icons-container");

        // Loop through each member in the current category
        Object.values(members).forEach(pnj => {
            // Create an icon for each member
            let icon = document.createElement("div");
            icon.classList.add("icon-pnj");
            icon.innerHTML = `
                <span class="icon-container" style="background-image: url('./img/challengers/${groupName.toLowerCase()}/${pnj.pic}'); background-size: cover;" data-name="${pnj.name}">
                <svg viewBox="0 0 15 15" version="1.1" id="cross" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1
                c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1
                c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1
                c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1
                C2.2404,1.0029,2.4701,1.0998,2.64,1.27z"></path> </g></svg>
                </span>
            `;

            let svg = icon.querySelector('svg');

            pnj.lock ? icon.classList.add("pnj-lock") : "";
            pnj.win ? svg.classList.add("won"): "";

            // Attach click event listener if all monsters are alive
            if (!pnj.lock && !pnj.win) {
                icon.addEventListener("click", () => {
                    indexPNJ = 0;
                    setupArena(pnj);
                    goldUI.classList.remove("gold-open");
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

    });
    
    challengersContainer.appendChild(challengersSelection);
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

    currentPNJ = pnj;
    const monster = pnj.team[indexPNJ];
    const arena = `
            <div class="arena" style= "background-image:url(${challengersBg[currentGroup] ?? "/img/background/village.webp"})"> 
                <div>
                    <div class="img-container">
                        <img class="sprite-fight" src="./img/monsters/${
                        currentMonster.pic[currentMonster.current].back
                        }.png" />
                    </div>
                    <div class="monster-ui">
                        <div>
                            <p class="name">${currentMonster.name}</p>
                            <p>Lv.${currentMonster.level === 10 ? " MAX" : currentMonster.level}</p>
                        </div>
                    <span class="health-bar">
                            <span class="health"
                            style="width: calc((${currentMonster.currentHp} / ${currentMonster.maxHp}) * 100%);
                            background-color: ${getHealthColor(currentMonster.currentHp, currentMonster.maxHp)};
                            "
                            >
                    </span>
                        </span>
                    </div>
                </div>
                <div>
                    <img class="sprite-fight" src="./img/monsters/${
                    monster.pic
                    }.png" />
                    <div class="monster-ui">
                        <div>
                            <p class="name">${monster.name}</p>
                            <p>Lv.${monster.level === 10 ? " MAX" : monster.level}</p>
                        </div>
                        <span class="health-bar">
                            <span class="health"
                            style="width: calc((${monster.currentHp} / ${monster.maxHp}) * 100%);
                            background-color: ${getHealthColor(monster.currentHp, monster.maxHp)};
                            "
                            >
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        `;

    /*
            I tried to used an event listener strictly to the button but it does not work because
            I dynamically adding it to the DOM.
            Regarding to chat gpt I should use Event Delegation to avoid any issues
        */

        document.querySelector(".challengers-icon").innerHTML = arena + fightMenu;

    updateArena(message)
}

function updateArena(message){
    const fightInfo = document.querySelector('.fight-info');
    fightInfo.innerText = message;
}

function getHealthColor(currentHp, maxHp) {
    const healthPercentage = (currentHp / maxHp) * 100;
    if (healthPercentage < 25) {
        return '#6d0000';  // Health is below 25%
    } else if (healthPercentage < 50) {
        return '#ff9600';  // Health is below 50% but above 25%
    } else {
        return '68d2e8';  // Health is 50% or above
    }
}

const fightMenu = `

<div class="fightMenu">
    <p class="fight-info">Choose what to do.</p>

    <div class="fight-button-container">
        <span id="attack-button" class="button">Attack</span>
        <span id="superattack-button" class="button">Super Attack</span>
        <span id="team-button" class="button">Team</span>
        <span id="dodge-button" class="button">Dodge</span>
    </div>
</div>
`;

function clearElementContents(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function allKO() {
    const challengersIcon = document.querySelector(".challengers-icon");
    const messages = [
        { text: `${text.defeat} ${currentPNJ.name}!`, delay: 3000 },
        { text: `${text.gold} ${gold} gold.`, delay: 5000 },
    ];

    if (currentPNJ && currentPNJ.team.every(monster => monster.currentHp <= 0)) {
        gold += currentPNJ.reward;
        goldText.innerText = `${gold}`;
        clearElementContents(screen); // Clearing the content explicitly
        screen.innerHTML = menuCat.fight;
        setupArena(currentPNJ, messages[0].text, indexPNJ);
        // displayMessagesSequentially(messages);
        
        winScreen();
        unlockNextPNJ(); // Unlock the next PNJ
    }
}

function winScreen(){
    console.log("t'as gagne gros pd");
}

function unlockNextPNJ() {
    challengers[currentGroup][groupIndex].win = true;
    groupIndex++;
    
    // Get the total number of challengers in the current group
    const totalChallengersInGroup = Object.keys(challengers[currentGroup]).length;
    
    if (groupIndex > totalChallengersInGroup) {
        // Reset groupIndex to 1
        groupIndex = 1;
        
        // Move to the next group
        const groupKeys = Object.keys(challengers);
        const currentGroupIndex = groupKeys.indexOf(currentGroup);
        const nextGroupIndex = (currentGroupIndex + 1) % groupKeys.length;
        currentGroup = groupKeys[nextGroupIndex];
    }
    
    // Unlock the challenger
    challengers[currentGroup][groupIndex].lock = false;
}

function checkOpponentKO() {
    opponent = currentPNJ.team[indexPNJ];
    if(opponent.currentHp <= 0 && indexPNJ <= 2) {
      if(opponent.level >= currentMonster.level){
        levelUp(currentMonster);
      }
        indexPNJ++;

    } else if(opponent.currentHp <= 0 && indexPNJ === 3) {
        if(opponent.level >= currentMonster.level){
            levelUp(currentMonster);
          }
    }
    setupArena(currentPNJ, indexPNJ);
    allKO();
}


function attack(pnj, index) {
    opponent = pnj.team[index];
    const message1 = `Attacking: ${opponent.name} with ${currentMonster.name}`;
    if(opponent.luck > currentMonster.luck){
        opponentMove(opponent, currentMonster);
        currentMonster.fight(opponent);
    } else {
        currentMonster.fight(opponent);  
        opponentMove(opponent, currentMonster);
    }
    checkOpponentKO();
    currentMonster.die();
    setupArena(currentPNJ, message1, indexPNJ);
}

function superAttackMove(pnj, index) {
    opponent = pnj.team[index];

    if(opponent.luck > currentMonster.luck){
        opponentMove(opponent, currentMonster);
        currentMonster.superAttack(opponent);
    } else {
        console.log(opponent.luck);
        currentMonster.superAttack(opponent);  
        opponentMove(opponent, currentMonster);
    }
    checkOpponentKO();
    currentMonster.die();
    setupArena(currentPNJ, indexPNJ);
}

function dodgeMove() {
    if(opponent.luck > currentMonster.luck){
        opponentMove(opponent, currentMonster);
        currentMonster.dodge();
    } else {
        currentMonster.dodge();  
        opponentMove(opponent, currentMonster);
    }
    currentMonster.die();
    setupArena(currentPNJ, indexPNJ);
}

function opponentMove(monster, opponent){
    const actions = ['fight', 'superAttack', 'dodge'];
    const randomAction = actions[Math.floor(Math.random()*actions.length)];
    if(monster.currentHp > 0){
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

}

function teamMenu() {
    opponentMove(opponent, currentMonster);
    currentMonster.die();
    setupArena(currentPNJ, indexPNJ);
}