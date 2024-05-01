const challengers = {
  villagers: {
    1: {
      name: "Gamin",
      pic: "gamin.png",
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
          40,
          40,
          40,
          40,
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
    button.addEventListener("click", () => {
      setupArena(pnj); // Logs the name of the clicked villager
    });

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
                    <p class="hp">hp ${currentMonster.life} / ${
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
                    <p class="hp">hp ${monster.life} / ${monster.life}</p>
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

function checkOpponentKO() {
  opponent = currentPNJ.team[indexPNJ];
  if (opponent.life <= 0) {
    indexPNJ++;
    setupArena(currentPNJ, indexPNJ);
  }
}

function attack(pnj, index) {
  opponent = pnj.team[index];
  console.log(`Attacking: ${opponent.name} with ${currentMonster.name}`);
  currentMonster.fight(opponent);
  checkOpponentKO();
  console.log(indexPNJ);
  setupArena(currentPNJ, indexPNJ);
}

function superAttackMove(pnj, index) {
  console.log(`Attacking: ${opponent.name} with ${currentMonster.name}`);
  opponent = pnj.team[index];
  currentMonster.superAttack(opponent);
  checkOpponentKO();
  setupArena(currentPNJ, indexPNJ);
}

function dodgeMove() {
  currentMonster.dodge();
}

function teamMenu() {
  console.log("oppening team menu...");
}
