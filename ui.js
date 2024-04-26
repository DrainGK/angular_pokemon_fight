const start = document.querySelector(".start-game");
const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");
const monsterButton = document.querySelector(".monster-button");
const fightButton = document.querySelector(".fight-button");
const shopButton = document.querySelector(".shop-button");
const questButton = document.querySelector(".quest-button");

const modal = document.querySelector(".modal");
const screen = document.getElementById("screen")
const formTitle = document.querySelector(".form-title");
let currentMonsterId = null;
let isSelected = false;
let remainingPoints = 0;

const team = [];
let currentMonster = null;

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

start.addEventListener("click", function () {
  menu.style.display = "none";
  nav.style.display = "flex";
});

monsterButton.addEventListener("click", function () {
    screen.innerHTML = menuCat.team;
    attachEventListeners();
    displayTeam();

});

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
        // Check if the clicked element is a .plus button
        if (event.target.classList.contains('plus')) {
            console.log("Clicked a plus button");
            formTitle.innerText = "Create your monster";
            resetFormAndStats();
            currentMonsterId = event.target.getAttribute('data-monster');
            currentMonster = team[currentMonsterId]; // assuming team is defined
            //   if(!isSelected) this.classList.toggle("selected");
            if (!currentMonster) {
                modal.style.display = "flex";
            }
            console.log(currentMonster);
        }
    });
}
