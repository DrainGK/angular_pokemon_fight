const start = document.querySelector(".start-game");
const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");
const monsterButton = document.querySelector(".monster-button");
const monsterMenu = document.querySelector(".create-monster-container");
const plusButton = document.querySelectorAll(".plus");
const modal = document.querySelector(".modal");

start.addEventListener("click", function(){
    menu.style.display = "none";
    nav.style.display = "flex";
})

monsterButton.addEventListener("click", function(){
    console.log("clicked");
    monsterMenu.style.display = "flex";
})

plusButton.forEach((button) => {
    button.addEventListener("click", function(){
        modal.style.display = "flex";
    })
})