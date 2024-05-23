function displayShopItems(){
    const shop = document.getElementById("shop");
    shop.innerHTML = "";
    const itemsContainer = document.createElement("div");
    const shopTitle = document.createElement("h2");
    shopTitle.innerText = "SHOP"
    itemsContainer.className = "items-container";
    itemsContainer.innerHTML = "";
    shop.appendChild(shopTitle)
    goldUI.innerText = `${gold}`;

    let desc = "Choose an Item to reinforce your mythics!";

    items.forEach((item)=>{
        const itemDiv = document.createElement("div");
        itemDiv.className = "items";
        itemDiv.style.backgroundImage = `url(${item.img})`;
        console.log(item.img);
        itemDiv.innerHTML = `
            <span class="item-price">
                <img src="./img/coin.gif" alt="coin" height="20" width="20">
                <p class="gold">${item.cost}</p>
            </span>
            <h3>${item.name}</h3>
        `;
        itemsContainer.appendChild(itemDiv);

        itemDiv.addEventListener("click", ()=>{
            gold < item.cost ? alert("not enough gold") : teamModale(item);
            descContainer.innerText = item.desc;
        })
    });
    shop.appendChild(itemsContainer);

    const descContainer = document.createElement("div");
    descContainer.className = "desc-container";
    descContainer.innerText = desc;
    shop.appendChild(descContainer);
}



function selectItem(item, monster) {
    switch(item.tag) {
        case "health":
            console.log("you chose: ", item.name, monster.currentHp);
            if(monster.currentHp > 0) monster.currentHp = monster.maxHp;
            break;
        case "rebirth":
            console.log("you chose: ", item.name, monster.currentHp);
            if(monster.currentHp <= 0) monster.currentHp = (monster.maxHp)/2
            break;
        case "rez":
            console.log("you chose: ", item.name, monster.currentHp);
            if(monster.currentHp <= 0) monster.currentHp = monster.maxHp
            break;
        case "prot":
            console.log("you chose: ", item.name);
            break;
        case "speed":
            console.log("you chose: ", item.name);
            monster.luck += 5;
            monster.levelStats.monsterLuck = monster.luck; 
            console.log(monster.levelStats);
            break;
        case "power":
            console.log("you chose: ", item.name);
            break;
        case "life":
            console.log("you chose: ", item.name);
            break;
        default:
            console.log("Invalid item tag");
            break;
    }
}

function teamModale(item){
    const shop = document.getElementById("shop");

    const teamContainer = document.createElement("div");
    teamContainer.classList = "team-modale";
    
    teamContainer.innerHTML = menuCat.team;

    shop.appendChild(teamContainer);

    displayTeam();

    teamContainer.addEventListener('click', function(event) {
        let target = event.target;
  
        if (target.classList.contains('plus')) {
            let monsterId = target.getAttribute('data-monster');
            let monster = team[monsterId];
  
            if (monster && gold >= item.cost) {
                gold -= item.cost;
                goldUI.innerText = `${gold}`;
                selectItem(item, monster);
                displayTeam(); // Update UI to reflect change
            }
        }
    });
}