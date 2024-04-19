const createform = document.getElementById("createMonsterForm");
const levelUpButton = document.getElementById("levelUp");
const points = document.getElementById("points");
let currentMonster = null;
const mode = document.getElementById("formMode").value;
const inputs = document.querySelectorAll(".number");
let initialStats = {};
let remainingPoints = 10;

function initializeForm() {
  createform.addEventListener("submit", function (event) {
    event.preventDefault();
    if (mode === "create") {
      createMonster();
    } else if (mode === "update") {
      updateMonster();
    }
});

}


function updatePointsDisplay(){
  points.innerText = `remaining points: ${remainingPoints}`
}

function createMonster() {
  const name = document.getElementById("monsterName").value;
  const hp = parseInt(document.getElementById("monsterHp").value);
  const attack = parseInt(document.getElementById("monsterAttack").value);
  const defense = parseInt(document.getElementById("monsterDefense").value);
  const luck = parseInt(document.getElementById("monsterLuck").value);

  currentMonster = new Monster(name, hp, attack, defense, luck, remainingPoints );
  console.log(currentMonster);
  alert(`${currentMonster.name} created succesfully`);
  // switchToUpdateMode(currentMonster);
}

function updateMonster() {
  currentMonster.hp = parseInt(document.getElementById("monsterHp").value);
  currentMonster.attack = parseInt(
    document.getElementById("monsterAttack").value
  );
  currentMonster.defense = parseInt(
    document.getElementById("monsterDefense").value
  );
  currentMonster.luck = parseInt(document.getElementById("monsterLuck").value);

  console.log(currentMonster);
  alert(`${currentMonster.name} updated successfully!`);
  mode.value = "create";
}

function switchToUpdateMode(monster) {
  document.getElementById("formMode").value = "update";
  document.getElementById("monsterHp").value = monster.hp;
  document.getElementById("monsterAttack").value = monster.attack;
  document.getElementById("monsterDefense").value = monster.defense;
  document.getElementById("monsterLuck").value = monster.luck;

  document.getElementById("monsterName").value = monster.name;
  document.getElementById("monsterName").disabled = true;
}



window.onload = initializeForm;

levelUpButton.addEventListener("click", function () {
  currentMonster.levelUp();
  remainingPoints = currentMonster.points;
  recalibrateInitialStats();
  updatePointsDisplay();
  console.log(currentMonster);
  switchToUpdateMode(currentMonster);
});
