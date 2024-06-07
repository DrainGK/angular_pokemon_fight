const createform = document.getElementById("createMonsterForm");
const levelUpButton = document.getElementById("levelUp");
const points = document.getElementById("points");
const inputs = document.querySelectorAll(".number");
const roleContainer = document.querySelector(".role-container")
let gold = 100000;
let initialStats = {};

function initializeForm() {
  createform.addEventListener("submit", function (event) {
    event.preventDefault();
    const mode = document.getElementById("formMode").value;
    if (mode === "create" && team.length < 4) {
      createMonster();
      sound.loadSound(2);
      sound.play();
    } else if (mode === "update") {
      updateMonster();
    }
    modal.style.display = "none";
    overlay.style.display = "none";
  });

  inputs.forEach((input) => {
    input.addEventListener("change", function (e) {
      statsChange(e.target);
    });
  });
}

function initializeStats() {
  document.querySelectorAll(".number").forEach((input) => {
    initialStats[input.id] = parseInt(input.value) || 0;
    if(currentMonster != null){
      currentMonster.levelStats[input.id] = initialStats[input.id] ;
    }
  });
  updatePointsDisplay();
}

function statsChange(input) {
  const statId = input.id;
  const newValue = parseInt(input.value) || 0;
  const oldValue = initialStats[statId];
  const levelOldValue = currentMonster?.levelStats[statId] ?? 0;
  const difference = newValue - oldValue;

  console.log(`Stat Change Debug - statId: ${statId}, newValue: ${newValue}, oldValue: ${oldValue}, difference: ${difference}, remainingPoints: ${remainingPoints}`);

  if (newValue < levelOldValue) {
    input.value = levelOldValue;
    alert("You cannot decrease stats.");
    return;
  }

  if (remainingPoints - difference >= 0 && newValue >= levelOldValue) {
    remainingPoints -= difference;
    initialStats[statId] = newValue;

    if (currentMonster) {
      currentMonster.levelStats[statId] = newValue;
      // Update the monster's actual stat
      if (statId === "monsterHp") {
        currentMonster.life = newValue;
        currentMonster.maxHp = newValue;
      } else if (statId === "monsterAttack") {
        currentMonster.attack = newValue;
      } else if (statId === "monsterDefense") {
        currentMonster.defense = newValue;
      } else if (statId === "monsterLuck") {
        currentMonster.luck = newValue;
      }
    }

    console.log(`Updated initialStats: ${JSON.stringify(initialStats)}`);
    console.log(`Updated levelStats: ${JSON.stringify(currentMonster.levelStats)}`);
    updatePointsDisplay();
  } else {
    input.value = oldValue;
    alert("Not enough points");
  }
}

function updatePointsDisplay() {
  points.innerText = `remaining points: ${remainingPoints}`;
}

function createMonster() {
  if (team.length >= 4) {
    alert("Team is full");
    return;
  }
  const name = document.getElementById("monsterName").value;
  const hp = parseInt(document.getElementById("monsterHp").value);
  const attack = parseInt(document.getElementById("monsterAttack").value);
  const defense = parseInt(document.getElementById("monsterDefense").value);
  const luck = parseInt(document.getElementById("monsterLuck").value);
  const sprites = JSON.parse(document.getElementById('monsterSprite').value);
  document.querySelector(".input-sprite-container").style.display = "flex";
  document.querySelector(".role-container").style.display = "flex"

  currentMonster = new Monster(
    name,
    hp,
    attack,
    defense,
    luck,
    remainingPoints,
    sprites,
    1
  );
  currentMonster.levelStats = { ...initialStats };
  team.push(currentMonster);
  displayTeam();
  console.log(currentMonster);

}

function resetFormAndStats() {
  document.getElementById("monsterName").value = "";
  document.getElementById("monsterHp").value = "";
  document.getElementById("monsterAttack").value = "";
  document.getElementById("monsterDefense").value = "";
  document.getElementById("monsterLuck").value = "";

  initialStats = { monsterHp: 0, monsterAttack: 0, monsterDefense: 0, monsterLuck: 0 };
  remainingPoints = 10; // Reset remaining points
  updatePointsDisplay();
  
  currentMonster = null; // Reset current monster
  document.getElementById("formMode").value = "create"; // Set form mode to create
  document.getElementById("monsterName").disabled = false; // Enable name input
}

function updateMonster() {
  currentMonster.points = remainingPoints;
  currentMonster.life = parseInt(document.getElementById("monsterHp").value);
  currentMonster.attack = parseInt(
    document.getElementById("monsterAttack").value
  );
  currentMonster.defense = parseInt(
    document.getElementById("monsterDefense").value
  );
  currentMonster.luck = parseInt(document.getElementById("monsterLuck").value);
  currentMonster.currentHp = currentMonster.life;
  currentMonster.maxHp = currentMonster.life;

  document.getElementById("formMode").value = "create";
  currentMonster.levelStats = { ...initialStats };
  displayTeam();
  if(loadArena) setupArena(currentPNJ, indexPNJ);
  document.getElementById("formMode").value = "create";
  document.querySelector(".input-sprite-container").style.display = "flex";
  document.querySelector(".role-container").style.display = "flex"
}

function switchToUpdateMode(monster) {
  document.getElementById("formMode").value = "update";
  console.log("mode switched to update");
  document.getElementById("monsterHp").value = monster.life;
  document.getElementById("monsterAttack").value = monster.attack;
  document.getElementById("monsterDefense").value = monster.defense;
  document.getElementById("monsterLuck").value = monster.luck;
  
  document.getElementById("monsterName").value = monster.name;
  document.getElementById("monsterName").disabled = true;
  
  document.querySelector(".input-sprite-container").style.display = "none";
  document.querySelector(".role-container").style.display = "none";
}

function displayTeam(){
  const plusButton = document.querySelectorAll('.plus');
  plusButton.forEach((button)=> {
    const index = button.getAttribute('data-monster');
    if(team[index] != null || team[index] != undefined){
      let id = team[index].current
      let teamPosition = parseInt(index) + 1;
      button.classList.add("pokemon-resume")
      button.innerHTML = `

      <span>${teamPosition}</span>
      <h2>${team[index].name} Lv${team[index].level === 10 ? " MAX" : team[index].level}</h2>
      <div class="health-bar">
        <span class="health"
          style="width: calc((${team[index].currentHp} / ${team[index].maxHp}) * 100%);
          background-color: ${getHealthColor(team[index].currentHp, team[index].maxHp)};
                            "
          >
        </span>
        </div>
        <img src="./img/monsters/${team[index].pic[id]?.front ??team[index].pic[1].front}.png" height="80" width="80"/> 
        <div class="resume">
          <p>Hp ${team[index].life}</p>
          <p>Atk ${team[index].attack}</p>
          <p>Dfs ${team[index].defense}</p>
          <p>Lck ${team[index].luck}</p>
        </div>
      `
    }
  })
}

window.onload = initializeForm;
initializeStats();

function levelUp(monster){
  sound.loadSound(1);
  sound.play();
  formTitle.innerText = "Level UP"
  modal.style.display = "flex";
  overlay.style.display = "block";

  monster.levelUp();
  if(monster.level === 4 && monster.pic[2]){
    monster.current = 2;
  } else if (monster.level === 7 && monster.pic[3]){
    monster.current = 3;
  }
  remainingPoints = monster.points;
  updatePointsDisplay();
  switchToUpdateMode(monster);
  console.log(monster);
  console.log(team);
} 

function getRole(){
  document.addEventListener("click", function(event){
    let target = event.target;
    

    if (target.classList.contains('role')){
        let role = target.getAttribute('data-role');
        sound.loadSound(13);
        sound.play();
        switch (role) {
          case "Attack":
            document.getElementById("monsterHp").value = 2;
            document.getElementById("monsterAttack").value = 5;
            document.getElementById("monsterDefense").value = 3;
            document.getElementById("monsterLuck").value = 0;
          break;
          case "Defense":
            document.getElementById("monsterHp").value = 5;
            document.getElementById("monsterAttack").value = 0;
            document.getElementById("monsterDefense").value = 5;
            document.getElementById("monsterLuck").value = 0;
          break;
          case "Luck":
            document.getElementById("monsterHp").value = 4;
            document.getElementById("monsterAttack").value = 0;
            document.getElementById("monsterDefense").value = 2;
            document.getElementById("monsterLuck").value = 4;
          break;
          case "Balanced":
            document.getElementById("monsterHp").value = 2;
            document.getElementById("monsterAttack").value = 3;
            document.getElementById("monsterDefense").value = 3;
            document.getElementById("monsterLuck").value = 2;
          break;
        
          default:
            break;
        }
        remainingPoints = 0;
        initializeStats();
        updatePointsDisplay();
    }
  })
}