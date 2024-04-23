const createform = document.getElementById("createMonsterForm");
const levelUpButton = document.getElementById("levelUp");
const points = document.getElementById("points");
const team = [];
let currentMonster = null;
const mode = document.getElementById("formMode").value;
const inputs = document.querySelectorAll(".number");
let initialStats = {};
let levelStats = {};
let remainingPoints = 10;

function initializeForm() {
  createform.addEventListener("submit", function (event) {
    event.preventDefault();
    if (mode === "create" && team.length < 4) {
      createMonster();
    } else if (mode === "update") {
      updateMonster();
    }

    modal.style.display = "none";
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
    levelStats[input.id] = initialStats[input.id];
  });
  updatePointsDisplay();
}

function statsChange(input) {
  console.log(initialStats);
  console.log(levelStats);
  const statId = input.id;
  const newValue = parseInt(input.value) || 0;
  const oldValue = currentMonster.initialStats[statId];
  const levelOldValue = levelStats[statId]; // Use level stats if available
  const difference = newValue - oldValue;

  if (newValue < levelOldValue) {
    input.value = levelOldValue;
    alert("You cannot decrease stats.");
    return;
  }

  if (remainingPoints - difference >= 0 && newValue >= levelOldValue) {
    remainingPoints -= difference;
    initialStats[statId] = newValue;
    updatePointsDisplay();
  } else {
    input.value = oldValue;
    alert("not enough points");
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

  currentMonster = new Monster(
    name,
    hp,
    attack,
    defense,
    luck,
    remainingPoints
  );
  levelStats = { ...initialStats };
  team.push(currentMonster);

  alert(`${currentMonster.name} created succesfully`);
  console.log(team);
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
  levelStats = { ...initialStats };
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
initializeStats();

levelUpButton.addEventListener("click", function () {
  currentMonster.levelUp();
  remainingPoints = currentMonster.points;
  updatePointsDisplay();
  console.log(currentMonster);
  switchToUpdateMode(currentMonster);
});
