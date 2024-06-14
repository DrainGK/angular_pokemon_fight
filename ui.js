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
const panel = document.querySelector(".overlay-transition");

const sound = new SoundManager();
const music = new SoundManager();

const audio = document.querySelector(".audio");
const audioPara = document.querySelector(".audio-parameter");

const goldUI = document.querySelector(".gold-container");
const goldText = document.querySelector(".gold");

let currentMonsterId = null;
let isSelected = false;
let remainingPoints = 0;

const team = [];
let currentMonster = team[0];

let loadArena = false;

function populateSelect() {
  const select = document.getElementById("monsterSprite");

  Object.entries(monsterDex).forEach(([key, value]) => {
    // let sprites = value[2] ? value[2].front : value[1].back;
    let option = new Option(
      key.replace(/Monster/, " Monster"),
      JSON.stringify(value)
    );
    select.appendChild(option);
  });
}

function showSelectedMonster() {
  const select = document.getElementById("monsterSprite");
  const imageContainer = document.getElementById("selectedMonsterImage");
  const selectedValue = JSON.parse(select.value);

  const firstKey = Object.keys(selectedValue)[0];
  const spritePath = selectedValue[firstKey].front;
  imageContainer.innerHTML = `<img src="./img/monsters/${spritePath}.png" alt="${selectedValue}" style="height: 80px;">`;
}

document
  .getElementById("monsterSprite")
  .addEventListener("change", showSelectedMonster);

populateSelect();

iconTest.addEventListener("click", function () {
  toggleMenu();
  soundSetting();
  sound.loadSound(6);
  sound.play();
});

start.addEventListener("click", function () {
  sound.loadSound(0);
  sound.play();
  transition();
  setTimeout(() => {
    menu.style.display = "none";
    nav.style.display = "flex";
    iconTest.style.display = "flex";
    const polygon = document.querySelector("#polygon");
    polygon.style.display = "none";
    const button = document.querySelector(".button-container");
    button.style.display = "none";
    showDialog(introDialog, () => {
      sound.loadSound(0);
      sound.play();
      transition();
      setTimeout(() => {
        getRole();
        screen.innerHTML = menuCat.team;
        attachEventListeners();
        displayTeam();
        goldUI.style.display = "none";
      }, 1000);
    });
  }, 1000);
});

monsterButton.addEventListener("click", function () {
  const dialogBox = document.getElementById("dialog-box");
  dialogBox.style.display = 'none';
  sound.loadSound(0);
  sound.play();
  transition();
  setTimeout(() => {
    toggleMenu();
    getRole();
    screen.innerHTML = menuCat.team;
    attachEventListeners();
    displayTeam();
    goldUI.style.display = "none";
  }, 1000);
});

overlay.addEventListener("click", function () {
  sound.loadSound(9);
  sound.play();
  modal.style.display = "none";
  overlay.style.display = "none";
});

fightButton.addEventListener("click", function () {
  const dialogBox = document.getElementById("dialog-box");
  dialogBox.style.display = 'none';
  sound.loadSound(0);
  sound.play();
  transition();
  setTimeout(() => {
    toggleMenu();
    screen.innerHTML = menuCat.fight;
    setupChallengers();
    goldUI.style.display = "none";
  }, 1000);
});

shopButton.addEventListener("click", function () {
  const dialogBox = document.getElementById("dialog-box");
  dialogBox.style.display = 'none';
  loadArena = false;
  sound.loadSound(0);
  sound.play();
  transition();
  setTimeout(() => {
    goldUI.style.display = "flex";
    goldUI.classList.remove("gold-open");
    toggleMenu();
    screen.innerHTML = menuCat.shop;
    displayShopItems();
  }, 1000);
});
questButton.addEventListener("click", function () {
  const dialogBox = document.getElementById("dialog-box");
  dialogBox.style.display = 'none';
  sound.loadSound(0);
  sound.play();
  transition();
  setTimeout(() => {
    screen.innerHTML = menuCat.quest;
    toggleMenu();
    setupQuestMenu();
    goldUI.style.display = "none";
  }, 1000);
});

function attachEventListeners() {
  const teamMenu = document.querySelector(".create-monster-container");
  teamMenu.addEventListener("click", function (event) {
      let target = event.target;

      // Find the closest parent with class "plus" if target doesn't have it
      let button = target.closest('.plus');

      if (button) {
          sound.loadSound(3);
          sound.play();

          let monsterId = button.getAttribute("data-monster");
          let monster = team[monsterId];

          if (monster) {
              if (monsterId !== "0") {
                  swapMonster(team, monsterId);
                  displayTeam();
              }
          } else {
              modal.style.display = "flex";
              overlay.style.display = "block";
              formTitle.innerText = "Create your monster";
              resetFormAndStats();
          }
      }
  });
}


function swapMonster(team, currentMonsterId) {
  let currentMonsterIndex = parseInt(currentMonsterId);
  if (currentMonsterIndex !== 0) {
    sound.loadSound(4);
    sound.play();
    let temp = team[currentMonsterIndex];
    team[currentMonsterIndex] = team[0];
    team[0] = temp;
    currentMonster = team[0];
  }
}

function toggleMenu() {
  nav.classList.toggle("open-menu");
  line1.classList.toggle("icon-open");
  line2.classList.toggle("icon-open2");
  line3.classList.toggle("icon-open3");

  const items = nav.querySelectorAll(".menu-container-test p");

  items.forEach((item, index) => {
    // Delay the animation of each item
    item.style.animationDelay = `${index * 0.4}s`;
  });

  if (nav.classList.contains("expand")) {
    nav.classList.remove("expand");
    nav.classList.add("collapse");
  } else {
    nav.classList.remove("collapse");
    nav.classList.add("expand");
  }
}

audioPara.addEventListener("click", function () {
  const items = document.querySelectorAll(".audio-item");
  const audioRange = document.querySelectorAll(".audio-range");
  if (this.classList.contains("audio-open")) {
    this.classList.remove("audio-open");
    this.classList.add("audio-close");
    items.forEach((item) => {
      item.classList.remove("audio-item-open");
    });
    audioRange.forEach((item) => {
      item.classList.remove("audio-item-open");
    });
  } else {
    this.classList.add("audio-open");
    this.classList.remove("audio-close");
    items.forEach((item) => {
      item.classList.add("audio-item-open");
    });
    audioRange.forEach((item) => {
      setTimeout(() => {
        item.classList.add("audio-item-open");
      }, 300);
    });
  }
});

document.querySelectorAll(".audio-range").forEach((range) => {
  range.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

function snackBarMessage(message) {
  const snackBar = document.createElement("div");
  snackBar.classList = "snackbar";
  const text = document.createElement("p");
  text.innerText = message;

  snackBar.appendChild(text);
  screen.appendChild(snackBar);

  setTimeout(() => {
    sound.loadSound(9);
    sound.play();
    // Add the closing animation directly using style
    snackBar.style.animation = "snackbar-close 0.5s ease-in-out";

    // Remove the element after the animation ends
    snackBar.addEventListener("animationend", () => {
      snackBar.remove();
    });
  }, 2500); // Adjust the delay as needed before closing
}

function transition() {
  const panel = document.createElement("div");
  panel.classList.add("overlay-transition");
  document.body.appendChild(panel); // Utiliser document.body au lieu de screen

  panel.addEventListener("animationend", () => {
    panel.remove();
  });
}

function soundSetting() {
  const musicInput = document.getElementById("music");
  const soundInput = document.getElementById("sound");

  musicInput.addEventListener("change", function () {
    music.setVolume(this.value);
  });
  soundInput.addEventListener("change", function () {
    sound.setVolume(this.value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const waveContainer = document.getElementById("waveContainer");
  music.setVolume(0.2);
  music.loadMusic(4, true);
  music.play();

  waveContainer.addEventListener("click", () => {
    // isPlaying = !isPlaying;
    if (music.isPaused) {
      music.setVolume(0.2);
      music.play();
      playWave();
      waveContainer.classList.remove("paused");
    } else {
      music.pause();
      pauseWave();
      waveContainer.classList.add("paused");
    }
  });
});

const originalPaths = [];

// Initialize originalPaths with the original 'd' attribute values
document.querySelectorAll("#wave path").forEach((path, index) => {
  originalPaths[index] = path.getAttribute("d");
});

function pauseWave() {
  const paths = document.querySelectorAll("#wave path");
  paths.forEach((path, index) => {
    const originalD = originalPaths[index];
    const xCoordinate = originalD.match(/M(\d+.\d+),/)[1]; // Extract the x-coordinate from the original 'd' attribute
    path.setAttribute(
      "d",
      `M${xCoordinate},15L${xCoordinate - 0.13},15A1,1,0,0,0,${
        xCoordinate - 0.91
      },16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H${xCoordinate - 0.09}Z`
    );
  });
}

function playWave() {
  const paths = document.querySelectorAll("#wave path");
  paths.forEach((path, index) => {
    path.setAttribute("d", originalPaths[index]); // Restore the original 'd' attributes
  });
}
