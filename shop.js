function displayShopItems(){
    const shop = document.getElementById("shop");
    shop.innerHTML = "";

    const itemsContainer = document.createElement("div");
    const shopTitle = document.createElement("h2");
    shopTitle.innerText = "SHOP";
    itemsContainer.className = "items-container";
    shop.appendChild(shopTitle);

    const next = document.createElement("span");
    next.className = "next";
    next.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="#ff9600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    `;
    
    const prev = document.createElement("span");
    prev.className = "prev";
    prev.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="#ff9600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    `;

    shop.appendChild(next);
    shop.appendChild(prev);

    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";

    const carousel = document.createElement("div");
    carousel.id = "carousel";

    let desc = "Choose an Item to reinforce your mythics!";

    items.forEach((item)=>{
        const itemDiv = document.createElement("div");
        itemDiv.className = "items";
        itemDiv.style.backgroundImage = `url(${item.img})`;
        itemDiv.innerHTML = `
            <span class="item-price">
                <img src="./img/coin.gif" alt="coin" height="20" width="20">
                <p class="gold">${item.cost}</p>
            </span>
            <h3>${item.name}</h3>
        `;
        itemsContainer.appendChild(itemDiv);

        itemDiv.addEventListener("click", ()=>{
           if(team.length != 0) {
               if(gold < item.cost) {
                   alert("not enough gold");
               } else {
                   teamModale(item);
               }
           } else {
               descContainer.style.color = "#00262e";
               descContainer.innerText = "You do not have any Mythics";
            }
        });

        itemDiv.addEventListener("mouseover", ()=>{
            descContainer.innerText = item.desc;
            descContainer.style.color = "white";
        });
    });
    console.log("Total width of items: ", items.reduce((acc, item) => acc + item.offsetWidth, 0));

    carousel.appendChild(itemsContainer);
    wrapper.appendChild(carousel);
    shop.appendChild(wrapper);

    const descContainer = document.createElement("div");
    descContainer.className = "desc-container";
    descContainer.innerText = desc;
    shop.appendChild(descContainer);
    const gap = 64;
    let width = carousel.offsetWidth; 

    
    
    next.addEventListener("click", e => {
        carousel.scrollBy(width + gap, 0);
        prev.style.display = "flex";
        if (itemsContainer.scrollWidth - carousel.scrollLeft <= carousel.clientWidth) {
            next.style.display = "none";
        }
    });
    prev.addEventListener("click", e => {
        carousel.scrollBy(-(width + gap), 0);
        next.style.display = "flex";
        if (carousel.scrollLeft <= 0) {
            prev.style.display = "none";
        }
    });
    
    window.addEventListener("resize", e => (width = carousel.offsetWidth));
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