function displayShopItems(){
    const shop = document.getElementById("shop");
    shop.innerHTML = "";
    const itemsContainer = document.createElement("div");
    const shopTitle = document.createElement("h2");
    shopTitle.innerText = "SHOP"
    itemsContainer.className = "items-container";
    itemsContainer.innerHTML = "";
    shop.appendChild(shopTitle)

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
            selectItem(item);
            descContainer.innerText = item.desc;
            console.log(descContainer);
        })
    });
    shop.appendChild(itemsContainer);

    const descContainer = document.createElement("div");
    descContainer.className = "desc-container";
    descContainer.innerText = desc;
    shop.appendChild(descContainer);
}



function selectItem(item) {
    switch(item.tag) {
        case "health":
            console.log("you chose: ", item.name);
            break;
        case "rebirth":
            console.log("you chose: ", item.name);
            break;
        case "rez":
            console.log("you chose: ", item.name);
            break;
        case "prot":
            console.log("you chose: ", item.name);
            break;
        case "speed":
            console.log("you chose: ", item.name);
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