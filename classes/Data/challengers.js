const challengers = {
    villagers:{
        1:{
            name: "Gamin",
            pic: "gamin.png",
            team: [
                new Monster("Bug monster", 3, 3, 2, 2, 0, monsterDex.bugMonster[1].front,1), 
                new Monster("Pingo Monster", 3, 2, 3, 2, 0,  monsterDex.pingoMonster[1].front,1) , 
                new Monster("Snake Monster", 2, 1, 1, 6, 0,  monsterDex.bugMonster[1].front,1), 
                new Monster("Bird Monster", 2, 2, 2, 4, 0,  monsterDex.bugMonster[1].front,1)
            ]
        },
        2:{
            name: "Hage",
            pic: "hage.png",
            team: [
                new Monster("Cat monster", 2, 1, 5, 2, 0, monsterDex.catMonster[1].front,1), 
                new Monster("Sleepy Monster", 3, 2, 2, 3, 0,  monsterDex.sleepyMonster[1].front,1) , 
                new Monster("Cerf Monster", 5, 5, 5, 5, 0,  monsterDex.cerfMonster[1].front,2), 
                new Monster("Capy Monster", 8, 5, 5, 2, 0,  monsterDex.capyMonster[1].front,2)
            ]
        },
        3:{
            name: "Jakson",
            pic: "jakson.png",
            team: [
                new Monster("Do monster", 7, 5, 8, 10, 0, monsterDex.doMonster[1].front,3), 
                new Monster("Bug Monster", 3, 2, 3, 2, 0,  monsterDex.bugMonster[1].front,3) , 
                new Monster("Bird Monster", 6, 6, 6, 12, 0,  monsterDex.birdMonster[1].front,3),
                new Monster("Snake Monster", 6, 3, 3, 18, 0,  monsterDex.snakeMonster[1].front,3), 
            ]
        },
        4:{
            name: "Angry",
            pic: "angry.png",
            team: [
                new Monster("Bug monster", 12, 12, 8, 8, 0, monsterDex.bugMonster[2].front,4), 
                new Monster("Pingo Monster", 12, 8, 12, 8, 0,  monsterDex.pingoMonster[2].front,4) , 
                new Monster("Occelot Monster", 8, 4, 20, 8, 0,  monsterDex.catMonster[2].front,4), 
                new Monster("Dofin Monster (full power)", 40, 40, 40, 40, 0,  monsterDex.doMonster[2].front,4)
            ]
        },
    }
}

console.log(challengers.villagers[4].team);


function setupChallengers(){
    const challengersIcon = document.querySelector(".challengers-icon");
    const villagers = Object.values(challengers.villagers);

    challengersIcon.innerHTML = "";
    
    villagers.forEach(pnj => {
        // Create a container for each villager
        let button = document.createElement('div');
        button.classList.add("icon-pnj"); // Adding class before setting inner HTML
        button.innerHTML = `
        <span class="icon-container" style="background-image: url('./img/challengers/villagers/${pnj.pic}'); background-repeat: no-repeat; background-size: cover">
        </span>
        `; // Closed img tag and added alt attribute

        // Attach an event listener to the new div
        button.addEventListener('click', () => {
            setupArena(pnj); // Logs the name of the clicked villager
        });

        // Append the button to the challengersIcon container
        challengersIcon.appendChild(button);
    });
}

function setupArena(pnj){
    const challengersIcon = document.querySelector(".challengers-icon");
    console.log(pnj.name);
    const index = 3;
    const monster = pnj.team[index]
    const arena = `
        <div> 
            <div>
                <h2>${team[0].name}</h2>
                <img src="./img/monsters/${team[0].pic[team[0].current].back}.png" />
            </div>
            <div>
                <h2>${monster.name}</h2>
                <img src="./img/monsters/${monster.pic}.png" />
            </div>
        </div>
    `;

    challengersIcon.innerHTML = arena;
}