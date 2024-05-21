const start = document.querySelector(".start-game");
const menu = document.querySelector(".menu");
const monsterButton = document.querySelector(".monster-button");
const fightButton = document.querySelector(".fight-button");
const shopButton = document.querySelector(".shop-button");
const questButton = document.querySelector(".quest-button");

const modal = document.querySelector(".modal");
const overlay = document.getElementById("overlay");
const screen = document.getElementById("screen");
const formTitle = document.querySelector(".form-title");
const nav = document.querySelector(".menu-test");
const iconTest = document.querySelector(".icon-test");
const line1 = document.querySelector(".line-1");
const line2 = document.querySelector(".line-2");
const line3 = document.querySelector(".line-3");

const audio = document.getElementById("audio");
const audioPara = document.querySelector(".audio-parameter");

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

iconTest.addEventListener("click", function(){
  toggleMenu()
})

start.addEventListener("click", function () {
  menu.style.display = "none";
  nav.style.display = "flex";
  iconTest.style.display = "flex";
  const polygon = document.querySelector("#polygon");
  polygon.style.display = "none";
  const button = document.querySelector(".button-container");
  button.style.display = "none";
});

monsterButton.addEventListener("click", function () {
    toggleMenu();
    getRole();
    screen.innerHTML = menuCat.team;
    attachEventListeners();
    displayTeam();

});

overlay.addEventListener("click", function(){
  modal.style.display = "none";
  overlay.style.display = "none";
})

fightButton.addEventListener("click", function () {
  toggleMenu();
  screen.innerHTML = menuCat.fight;
  setupChallengers();
});

shopButton.addEventListener("click", function () {
  const coin = document.querySelector(".gold-container");
  coin.style.display = "flex";

  toggleMenu();
  screen.innerHTML = menuCat.shop;
  displayShopItems();
});
questButton.addEventListener("click", function () {
  screen.innerHTML = menuCat.quest;
  toggleMenu();
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
    team[currentMonsterIndex] = team[0];
    team[0] = temp;
    currentMonster = team[0];
  }
}

function toggleMenu(){
  nav.classList.toggle('open-menu');
  line1.classList.toggle('icon-open');
  line2.classList.toggle('icon-open2');
  line3.classList.toggle('icon-open3');

  const items = nav.querySelectorAll('.menu-container-test p');

  items.forEach((item, index) => {
      // Delay the animation of each item
      item.style.animationDelay = `${index * 0.4}s`;
  });

  if (nav.classList.contains('expand')) {
    nav.classList.remove('expand');
    nav.classList.add('collapse');
} else {
    nav.classList.remove('collapse');
    nav.classList.add('expand');
}
}

audioPara.addEventListener("click", function(){
  audio.classList.toggle("audio-toggle");
})



