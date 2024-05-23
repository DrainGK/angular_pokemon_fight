function displayShopItems(){
    const shop = document.getElementById("shop");
    shop.innerHTML = "";
    const itemsContainer = document.createElement("div");
    const shopTitle = document.createElement("h2");
    shopTitle.innerText = "SHOP"
    itemsContainer.className = "items-container";
    itemsContainer.innerHTML = "";
    shop.appendChild(shopTitle)
    goldText.innerText = `${gold}`;

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
           if(team.length != 0) gold < item.cost ? alert("not enough gold") : teamModale(item);
           else {
               descContainer.style.color = "#00262e"
               descContainer.innerText = "You do not have any Mythics";
            } 
            
        });
        
        itemDiv.addEventListener("mouseover", ()=>{
            descContainer.innerText = item.desc;
            descContainer.style.color = "white"
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
            monster.defense += 5;
            monster.levelStats.monsterDefense = monster.defense; 
            console.log(monster.levelStats);
            break;
        case "speed":
            console.log("you chose: ", item.name);
            monster.luck += 5;
            monster.levelStats.monsterLuck = monster.luck; 
            console.log(monster.levelStats);
            break;
        case "power":
            console.log("you chose: ", item.name);
            monster.attack += 5;
            monster.levelStats.monsterAttack = monster.attack; 
            console.log(monster.levelStats);
            break;
        case "life":
            console.log("you chose: ", item.name);
            monster.life += 5;
            monster.levelStats.monsterHp = monster.life; 
            console.log(monster.levelStats);
            break;
        default:
            console.log("Invalid item tag");
            break;
    }
    initialStats = monster.levelStats;
}

function teamModale(item){

    const shop = document.getElementById("shop");
    const overlay = document.createElement("div");
    overlay.className = "team-modale-overlay";

    const modaleContent = document.createElement("div");
    modaleContent.classList = "team-modale";

    const teamContainer = document.createElement("div");

    const modaleTitle = document.createElement("h3");
    modaleTitle.innerText = "Select your Mythic";
    
    teamContainer.innerHTML = menuCat.team;

    modaleContent.appendChild(modaleTitle)
    modaleContent.appendChild(teamContainer)

    shop.appendChild(modaleContent);
    shop.appendChild(overlay);

    displayTeam();

    goldUI.classList.add("gold-open");

    teamContainer.addEventListener('click', function(event) {
        let target = event.target;
  
        if (target.classList.contains('plus')) {
            let monsterId = target.getAttribute('data-monster');
            let monster = team[monsterId];
  
            if (monster && gold >= item.cost) {
                gold -= item.cost;
                goldText.innerText = `${gold}`;
                selectItem(item, monster);
                displayTeam(); // Update UI to reflect change
            }
        }
    });

    overlay.addEventListener("click", function(){
        modaleContent.style.display = "none";
        goldUI.classList.remove("gold-open");
        this.style.display = "none";
    })
}