const challengers = {
  villagers: {
    1: {
      name: "Gamin",
      pic: "gamin.png",
      reward: 100,
      team: [
        new Monster(
          "Bug monster",
          3,
          3,
          2,
          2,
          0,
          monsterDex.bugMonster[1].front,
          1
        ),
        new Monster(
          "Pingo Monster",
          3,
          2,
          3,
          2,
          0,
          monsterDex.pingoMonster[1].front,
          1
        ),
        new Monster(
          "Snake Monster",
          2,
          1,
          1,
          6,
          0,
          monsterDex.snakeMonster[1].front,
          1
        ),
        new Monster(
          "Bird Monster",
          2,
          2,
          2,
          4,
          0,
          monsterDex.birdMonster[1].front,
          1
        ),
      ],
    },
    2: {
      name: "Hage",
      pic: "hage.png",
      reward: 250,
      team: [
        new Monster(
          "Cat monster",
          2,
          1,
          5,
          2,
          0,
          monsterDex.catMonster[1].front,
          1
        ),
        new Monster(
          "Sleepy Monster",
          3,
          2,
          2,
          3,
          0,
          monsterDex.sleepyMonster[1].front,
          1
        ),
        new Monster(
          "Cerf Monster",
          5,
          5,
          5,
          5,
          0,
          monsterDex.cerfMonster[1].front,
          2
        ),
        new Monster(
          "Capy Monster",
          8,
          5,
          5,
          2,
          0,
          monsterDex.capyMonster[1].front,
          2
        ),
      ],
    },
    3: {
      name: "Jakson",
      pic: "jakson.png",
      reward: 500,
      team: [
        new Monster(
          "Do monster",
          7,
          5,
          8,
          10,
          0,
          monsterDex.doMonster[1].front,
          3
        ),
        new Monster(
          "Bug Monster",
          3,
          2,
          3,
          2,
          0,
          monsterDex.bugMonster[1].front,
          3
        ),
        new Monster(
          "Bird Monster",
          6,
          6,
          6,
          12,
          0,
          monsterDex.birdMonster[1].front,
          3
        ),
        new Monster(
          "Snake Monster",
          6,
          3,
          3,
          18,
          0,
          monsterDex.snakeMonster[1].front,
          3
        ),
      ],
    },
    4: {
      name: "Angry",
      pic: "angry.png",
      reward: 1000,
      team: [
        new Monster(
          "Bug monster",
          12,
          12,
          8,
          8,
          0,
          monsterDex.bugMonster[2].front,
          4
        ),
        new Monster(
          "Pingo Monster",
          12,
          8,
          12,
          8,
          0,
          monsterDex.pingoMonster[2].front,
          4
        ),
        new Monster(
          "Occelot Monster",
          8,
          4,
          20,
          8,
          0,
          monsterDex.catMonster[2].front,
          4
        ),
        new Monster(
          "Dofin Monster (full power)",
          20,
          20,
          20,
          20,
          0,
          monsterDex.doMonster[2].front,
          4
        ),
      ],
    },
  },
};

console.log(challengers.villagers[4].team);

let currentPNJ = null;
let indexPNJ = 0;

function setupChallengers() {
  const challengersIcon = document.querySelector(".challengers-icon");
  const villagers = Object.values(challengers.villagers);

  challengersIcon.innerHTML = "";

  villagers.forEach((pnj) => {
    // Create a container for each villager
    let button = document.createElement("div");
    button.classList.add("icon-pnj"); // Adding class before setting inner HTML
    button.innerHTML = `
        <span class="icon-container" style="background-image: url('./img/challengers/villagers/${pnj.pic}'); background-repeat: no-repeat; background-size: cover">
        </span>
        `; // Closed img tag and added alt attribute

    // Attach an event listener to the new div
    const allAlive = checkAllMonstersAlive(pnj);
    console.log("All monsters alive:", allAlive);
    function checkAllMonstersAlive(pnj) {
        return pnj.team.every(monster => monster.currentHp > 0);
    }
    if(allAlive){
        button.addEventListener("click", () => {
            indexPNJ = 0;
            setupArena(pnj); // Logs the name of the clicked villager
        });
    }

    // Append the button to the challengersIcon container
    challengersIcon.appendChild(button);
  });
  setupGlobalListeners(challengersIcon);
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

function setupArena(pnj) {
  const challengersIcon = document.querySelector(".challengers-icon");
  currentPNJ = pnj;
  const monster = pnj.team[indexPNJ];
  const arena = `
        <div class="arena"> 
            <div>
                <div clas="simg-container">
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

  challengersIcon.innerHTML = arena;
  challengersIcon.innerHTML += fightMenu;
}

const fightMenu = `
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
    if (currentPNJ && currentPNJ.team.every(monster => monster.currentHp <= 0)) {
        console.log("All monsters KO: true, updating screen with new menu...");
        clearElementContents(screen); // Clearing the content explicitly
        screen.innerHTML = menuCat.fight;
        gold += currentPNJ.reward;
        console.log(gold);
        console.log(screen.innerHTML); // Log the current innerHTML
    }
}

function checkOpponentKO() {
    opponent = currentPNJ.team[indexPNJ];
    if(opponent.currentHp <= 0 && indexPNJ <= 2) {
        indexPNJ++;
    }
    setupArena(currentPNJ, indexPNJ);
    allKO();
}


function attack(pnj, index) {
  opponent = pnj.team[index];
  console.log(`Attacking: ${opponent.name} with ${currentMonster.name}`);
  currentMonster.fight(opponent);
  checkOpponentKO();
  console.log(indexPNJ);
  setupArena(currentPNJ, indexPNJ);
  console.log(currentMonster.life, currentMonster.currentHp, currentMonster.maxHp);
  opponentMove(opponent, currentMonster);
}

function superAttackMove(pnj, index) {
  console.log(`Attacking: ${opponent.name} with ${currentMonster.name}`);
  opponent = pnj.team[index];
  currentMonster.superAttack(opponent);
  checkOpponentKO();
  setupArena(currentPNJ, indexPNJ);
  opponentMove(opponent, currentMonster);

}

function dodgeMove() {
  currentMonster.dodge();
  console.log(currentMonster.isDodge);
  opponentMove(opponent, currentMonster);
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
}
