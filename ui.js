const start = document.querySelector(".start-game");
const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");
const monsterButton = document.querySelector(".monster-button");
const fightButton = document.querySelector(".fight-button");
const shopButton = document.querySelector(".shop-button");
const questButton = document.querySelector(".quest-button");

const modal = document.querySelector(".modal");
const overlay = document.getElementById("overlay");
const screen = document.getElementById("screen");
const formTitle = document.querySelector(".form-title");
const menuTest = document.querySelector(".menu-test");
let currentMonsterId = null;
let isSelected = false;
let remainingPoints = 0;

const team = [];
let currentMonster = team[0];

function populateSelect() {
    const select = document.getElementById('monsterSprite');

    Object.entries(monsterDex).forEach(([key, value]) => {
        // let sprites = value[2] ? value[2].front : value[1].back;
        let option = new Option(key.replace(/Monster/, ' Monster'), JSON.stringify(value));
        select.appendChild(option);
    });
}

function showSelectedMonster(){
    const select = document.getElementById('monsterSprite');
    const imageContainer = document.getElementById('selectedMonsterImage');
    const selectedValue = JSON.parse(select.value);

    const firstKey = Object.keys(selectedValue)[0];
    const spritePath = selectedValue[firstKey].front;
    imageContainer.innerHTML = `<img src="./img/monsters/${spritePath}.png" alt="${selectedValue}" style="height: 80px;">`;
}

document.getElementById('monsterSprite').addEventListener('change', showSelectedMonster);

populateSelect();

menuTest.addEventListener("click", function(){
  this.classList.toggle('open-menu');
  const items = this.querySelectorAll('.menu-container-test p');
  items.forEach((item, index) => {
      // Delay the animation of each item
      item.style.animationDelay = `${index * 0.1}s`;
  });
})

start.addEventListener("click", function () {
  menu.style.display = "none";
  nav.style.display = "flex";
  const polygon = document.querySelector("#polygon");
  polygon.style.display = "none";
  const button = document.querySelector(".button-container");
  button.style.display = "none";
});

monsterButton.addEventListener("click", function () {
    screen.innerHTML = menuCat.team;
    attachEventListeners();
    displayTeam();

});

overlay.addEventListener("click", function(){
  modal.style.display = "none";
  overlay.style.display = "none";
})

fightButton.addEventListener("click", function () {
  screen.innerHTML = menuCat.fight;
  setupChallengers();
});

shopButton.addEventListener("click", function () {
  screen.innerHTML = menuCat.shop;
});
questButton.addEventListener("click", function () {
  screen.innerHTML = menuCat.quest;
});

function attachEventListeners() {
  screen.addEventListener('click', function(event) {
      let target = event.target;

      if (target.classList.contains('plus')) {
          let monsterId = target.getAttribute('data-monster');
          let monster = team[monsterId];

          if (monster) {
              // Only swap if the monster is not already the first one
              if (monsterId !== '0') {
                  swapMonster(team, monsterId);
                  displayTeam(); // Update UI to reflect changes
              }
          } else {
              // If there is no monster, show creation modal
              modal.style.display = "flex";
              overlay.style.display = "block";
              formTitle.innerText = "Create your monster";
              resetFormAndStats();
          }
      }
  });
}

function swapMonster(team, currentMonsterId){
  let currentMonsterIndex = parseInt(currentMonsterId);
  if (currentMonsterIndex !== 0){
    let temp = team[currentMonsterIndex];
    team[currentMonsterId] = team[0];
    team[0] = temp;
  }
}



