const challengers = {
  Villagers: {
    1: {
      name: "Gamin",
      pic: "gamin.png",
      reward: 100,
      lock: false,
      win: false,
      team: [
        new Monster(
          "Bug monster",
          3,
          3,
          2,
          2,
          0,
          monsterDex.bugMonster[1].front,
          1
        ),
        new Monster(
          "Pingo Monster",
          3,
          2,
          3,
          2,
          0,
          monsterDex.pingoMonster[1].front,
          1
        ),
        new Monster(
          "Snake Monster",
          2,
          1,
          1,
          6,
          0,
          monsterDex.snakeMonster[1].front,
          1
        ),
        new Monster(
          "Bird Monster",
          4,
          4,
          4,
          8,
          0,
          monsterDex.birdMonster[1].front,
          2
        ),
      ],
    },
    2: {
      name: "Hage",
      pic: "hage.png",
      reward: 250,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Cat monster",
          2,
          1,
          5,
          2,
          0,
          monsterDex.catMonster[1].front,
          1
        ),
        new Monster(
          "Sleepy Monster",
          3,
          2,
          2,
          3,
          0,
          monsterDex.sleepyMonster[1].front,
          1
        ),
        new Monster(
          "Cerf Monster",
          5,
          5,
          5,
          5,
          0,
          monsterDex.cerfMonster[1].front,
          2
        ),
        new Monster(
          "Capy Monster",
          8,
          5,
          5,
          2,
          0,
          monsterDex.capyMonster[1].front,
          2
        ),
      ],
    },
    3: {
      name: "Jakson",
      pic: "jakson.png",
      reward: 500,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Do monster",
          7,
          5,
          8,
          10,
          0,
          monsterDex.doMonster[1].front,
          3
        ),
        new Monster(
          "Bug Monster",
          3,
          2,
          3,
          2,
          0,
          monsterDex.bugMonster[1].front,
          3
        ),
        new Monster(
          "Bird Monster",
          6,
          6,
          6,
          12,
          0,
          monsterDex.birdMonster[1].front,
          3
        ),
        new Monster(
          "Snake Monster",
          8,
          4,
          4,
          24,
          0,
          monsterDex.snakeMonster[1].front,
          4
        ),
      ],
    },
    4: {
      name: "Angry",
      pic: "angry.png",
      reward: 1000,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Bug monster",
          12,
          12,
          8,
          8,
          0,
          monsterDex.bugMonster[2].front,
          4
        ),
        new Monster(
          "Pingo Monster",
          12,
          8,
          12,
          8,
          0,
          monsterDex.pingoMonster[2].front,
          4
        ),
        new Monster(
          "Occelot Monster",
          8,
          4,
          20,
          8,
          0,
          monsterDex.catMonster[2].front,
          4
        ),
        new Monster(
          "Dofin Monster (full power)",
          15,
          15,
          15,
          15,
          0,
          monsterDex.doMonster[2].front,
          5
        ),
      ],
    },
  },
  Temple: {
    1: {
      name: "Sorcerer",
      pic: "sorcerer.png",
      reward: 100,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Mage monster",
          16,
          4,
          16,
          4,
          0,
          monsterDex.gossMonster[2].front,
          4
        ),
        new Monster(
          "Tanuki Monster",
          8,
          12,
          12,
          8,
          0,
          monsterDex.tanukiMonster[1].front,
          4
        ),
        new Monster(
          "Python Monster",
          8,
          4,
          4,
          24,
          0,
          monsterDex.pythonMonster[1].front,
          4
        ),
        new Monster(
          "Pomking Monster",
          10,
          15,
          15,
          10,
          0,
          monsterDex.pomMonster[2].front,
          5
        ),
      ],
    },
    2: {
      name: "Jiji",
      pic: "jiji.png",
      reward: 250,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Cat monster",
          2,
          1,
          5,
          2,
          0,
          monsterDex.catMonster[1].front,
          5
        ),
        new Monster(
          "Sleepy Monster",
          3,
          2,
          2,
          3,
          0,
          monsterDex.sleepyMonster[1].front,
          5
        ),
        new Monster(
          "Cerf Monster",
          5,
          5,
          5,
          5,
          0,
          monsterDex.cerfMonster[1].front,
          6
        ),
        new Monster(
          "Capy Monster",
          8,
          5,
          5,
          2,
          0,
          monsterDex.capyMonster[1].front,
          6
        ),
      ],
    },
    3: {
      name: "Monk",
      pic: "monk.png",
      reward: 500,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Do monster",
          7,
          5,
          8,
          10,
          0,
          monsterDex.doMonster[1].front,
          6
        ),
        new Monster(
          "Bug Monster",
          3,
          2,
          3,
          2,
          0,
          monsterDex.bugMonster[1].front,
          6
        ),
        new Monster(
          "Bird Monster",
          6,
          6,
          6,
          12,
          0,
          monsterDex.birdMonster[1].front,
          7
        ),
        new Monster(
          "Snake Monster",
          6,
          3,
          3,
          18,
          0,
          monsterDex.snakeMonster[1].front,
          7
        ),
      ],
    },
    4: {
      name: "Gros",
      pic: "gros.png",
      reward: 1000,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Bug monster",
          12,
          12,
          8,
          8,
          0,
          monsterDex.bugMonster[2].front,
          7
        ),
        new Monster(
          "Pingo Monster",
          12,
          8,
          12,
          8,
          0,
          monsterDex.pingoMonster[2].front,
          8
        ),
        new Monster(
          "Occelot Monster",
          8,
          4,
          20,
          8,
          0,
          monsterDex.catMonster[2].front,
          8
        ),
        new Monster(
          "Dofin Monster (full power)",
          20,
          20,
          20,
          20,
          0,
          monsterDex.doMonster[2].front,
          9
        ),
      ],
    },
  },
  Ninjas: {
    1: {
      name: "Green Ninja",
      pic: "green.png",
      reward: 100,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Mage monster",
          16,
          4,
          16,
          4,
          0,
          monsterDex.gossMonster[2].front,
          10
        ),
        new Monster(
          "Tanuki Monster",
          8,
          8,
          12,
          4,
          0,
          monsterDex.tanukiMonster[1].front,
          10
        ),
        new Monster(
          "Python Monster",
          8,
          4,
          4,
          24,
          0,
          monsterDex.pythonMonster[1].front,
          10
        ),
        new Monster(
          "Pomking Monster",
          10,
          20,
          20,
          10,
          0,
          monsterDex.pomMonster[2].front,
          10
        ),
      ],
    },
    2: {
      name: "Black Ninja",
      pic: "ninja.png",
      reward: 250,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Cat monster",
          2,
          1,
          5,
          2,
          0,
          monsterDex.catMonster[1].front,
          5
        ),
        new Monster(
          "Sleepy Monster",
          3,
          2,
          2,
          3,
          0,
          monsterDex.sleepyMonster[1].front,
          5
        ),
        new Monster(
          "Cerf Monster",
          5,
          5,
          5,
          5,
          0,
          monsterDex.cerfMonster[1].front,
          6
        ),
        new Monster(
          "Capy Monster",
          8,
          5,
          5,
          2,
          0,
          monsterDex.capyMonster[1].front,
          6
        ),
      ],
    },
    3: {
      name: "Red Ninja",
      pic: "red.png",
      reward: 500,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Do monster",
          7,
          5,
          8,
          10,
          0,
          monsterDex.doMonster[1].front,
          6
        ),
        new Monster(
          "Bug Monster",
          3,
          2,
          3,
          2,
          0,
          monsterDex.bugMonster[1].front,
          6
        ),
        new Monster(
          "Bird Monster",
          6,
          6,
          6,
          12,
          0,
          monsterDex.birdMonster[1].front,
          7
        ),
        new Monster(
          "Snake Monster",
          6,
          3,
          3,
          18,
          0,
          monsterDex.snakeMonster[1].front,
          7
        ),
      ],
    },
    4: {
      name: "Aniki",
      pic: "Aniki.png",
      reward: 1000,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Bug monster",
          12,
          12,
          8,
          8,
          0,
          monsterDex.bugMonster[2].front,
          7
        ),
        new Monster(
          "Pingo Monster",
          12,
          8,
          12,
          8,
          0,
          monsterDex.pingoMonster[2].front,
          8
        ),
        new Monster(
          "Occelot Monster",
          8,
          4,
          20,
          8,
          0,
          monsterDex.catMonster[2].front,
          8
        ),
        new Monster(
          "Dofin Monster (full power)",
          20,
          20,
          20,
          20,
          0,
          monsterDex.doMonster[2].front,
          9
        ),
      ],
    },
  },
  Samourais: {
    1: {
      name: "Sam",
      pic: "sam.png",
      reward: 100,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Mage monster",
          16,
          4,
          16,
          4,
          0,
          monsterDex.gossMonster[2].front,
          4
        ),
        new Monster(
          "Tanuki Monster",
          8,
          8,
          12,
          4,
          0,
          monsterDex.tanukiMonster[1].front,
          4
        ),
        new Monster(
          "Python Monster",
          8,
          4,
          4,
          24,
          0,
          monsterDex.pythonMonster[1].front,
          4
        ),
        new Monster(
          "Pomking Monster",
          10,
          20,
          20,
          10,
          0,
          monsterDex.pomMonster[2].front,
          5
        ),
      ],
    },
    2: {
      name: "Eye",
      pic: "eye.png",
      reward: 250,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Cat monster",
          2,
          1,
          5,
          2,
          0,
          monsterDex.catMonster[1].front,
          5
        ),
        new Monster(
          "Sleepy Monster",
          3,
          2,
          2,
          3,
          0,
          monsterDex.sleepyMonster[1].front,
          5
        ),
        new Monster(
          "Cerf Monster",
          5,
          5,
          5,
          5,
          0,
          monsterDex.cerfMonster[1].front,
          6
        ),
        new Monster(
          "Capy Monster",
          8,
          5,
          5,
          2,
          0,
          monsterDex.capyMonster[1].front,
          6
        ),
      ],
    },
    3: {
      name: "Blue",
      pic: "blue.png",
      reward: 500,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Do monster",
          7,
          5,
          8,
          10,
          0,
          monsterDex.doMonster[1].front,
          6
        ),
        new Monster(
          "Bug Monster",
          3,
          2,
          3,
          2,
          0,
          monsterDex.bugMonster[1].front,
          6
        ),
        new Monster(
          "Bird Monster",
          6,
          6,
          6,
          12,
          0,
          monsterDex.birdMonster[1].front,
          7
        ),
        new Monster(
          "Snake Monster",
          6,
          3,
          3,
          18,
          0,
          monsterDex.snakeMonster[1].front,
          7
        ),
      ],
    },
    4: {
      name: "Masked Samourai",
      pic: "masked.png",
      reward: 1000,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Bug monster",
          12,
          12,
          8,
          8,
          0,
          monsterDex.bugMonster[2].front,
          7
        ),
        new Monster(
          "Pingo Monster",
          12,
          8,
          12,
          8,
          0,
          monsterDex.pingoMonster[2].front,
          8
        ),
        new Monster(
          "Occelot Monster",
          8,
          4,
          20,
          8,
          0,
          monsterDex.catMonster[2].front,
          8
        ),
        new Monster(
          "Dofin Monster (full power)",
          20,
          20,
          20,
          20,
          0,
          monsterDex.doMonster[2].front,
          9
        ),
      ],
    },
  },
  Lions: {
    1: {
      name: "Rion",
      pic: "Rion.png",
      reward: 100,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Mage monster",
          16,
          4,
          16,
          4,
          0,
          monsterDex.gossMonster[2].front,
          4
        ),
        new Monster(
          "Tanuki Monster",
          8,
          8,
          12,
          4,
          0,
          monsterDex.tanukiMonster[1].front,
          4
        ),
        new Monster(
          "Python Monster",
          8,
          4,
          4,
          24,
          0,
          monsterDex.pythonMonster[1].front,
          4
        ),
        new Monster(
          "Pomking Monster",
          10,
          20,
          20,
          10,
          0,
          monsterDex.pomMonster[2].front,
          5
        ),
      ],
    },
    2: {
      name: "Simba",
      pic: "simba.png",
      reward: 250,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Cat monster",
          2,
          1,
          5,
          2,
          0,
          monsterDex.catMonster[1].front,
          5
        ),
        new Monster(
          "Sleepy Monster",
          3,
          2,
          2,
          3,
          0,
          monsterDex.sleepyMonster[1].front,
          5
        ),
        new Monster(
          "Cerf Monster",
          5,
          5,
          5,
          5,
          0,
          monsterDex.cerfMonster[1].front,
          6
        ),
        new Monster(
          "Capy Monster",
          8,
          5,
          5,
          2,
          0,
          monsterDex.capyMonster[1].front,
          6
        ),
      ],
    },
    3: {
      name: "Lion",
      pic: "scar.png",
      reward: 500,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Do monster",
          7,
          5,
          8,
          10,
          0,
          monsterDex.doMonster[1].front,
          6
        ),
        new Monster(
          "Bug Monster",
          3,
          2,
          3,
          2,
          0,
          monsterDex.bugMonster[1].front,
          6
        ),
        new Monster(
          "Bird Monster",
          6,
          6,
          6,
          12,
          0,
          monsterDex.birdMonster[1].front,
          7
        ),
        new Monster(
          "Snake Monster",
          6,
          3,
          3,
          18,
          0,
          monsterDex.snakeMonster[1].front,
          7
        ),
      ],
    },
    4: {
      name: "Scar",
      pic: "Lion.png",
      reward: 1000,
      lock: true,
      win: false,
      team: [
        new Monster(
          "Bug monster",
          12,
          12,
          8,
          8,
          0,
          monsterDex.bugMonster[2].front,
          7
        ),
        new Monster(
          "Pingo Monster",
          12,
          8,
          12,
          8,
          0,
          monsterDex.pingoMonster[2].front,
          8
        ),
        new Monster(
          "Occelot Monster",
          8,
          4,
          20,
          8,
          0,
          monsterDex.catMonster[2].front,
          8
        ),
        new Monster(
          "Dofin Monster (full power)",
          20,
          20,
          20,
          20,
          0,
          monsterDex.doMonster[2].front,
          9
        ),
      ],
    },
  },
};

const challengersBg = {
  Villagers: "/img/background/village.webp",
  Temple: "/img/background/temple.webp",
  Ninjas: "/img/background/ninjas.webp",
}
