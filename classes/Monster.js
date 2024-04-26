class Monster {
  constructor(name, hp, attack, defense, luck, points,pic,level) {
    this.name = name;
    this.level = level;
    this.points = points;
    this.life = hp;
    this.attack = attack;
    this.defense = defense;
    this.luck = luck;
    this.rest = false;
    this.pic = pic;
    this.current = 1;
    this.levelStats = {};
  }

  attack(opponent) {
    if (Math.random() < 0.05 - this.luck * 0.005) {
      console.log(`${this.name}'s attack missed`);
      return 0;
    }
    let damage = this.attack - opponent.defense;
    damage = damage < 0 ? 0 : damage;

    if (Math.random() < this.luck * 0.01) {
      damage *= 1.5;
      console.log("Critical Hit!");
    }

    opponent.life -= damage;
    return damage;
  }

  superAttack() {
    if (!this.rest) {
      // Correct use of boolean check
      this.attack(opponent);
      console.log(`${this.name} is attacking again`);
      this.attack(opponent);
      console.log(`${this.name} is tired`);
      this.rest = true; // Monster needs to rest after a super attack
    } else {
      console.log(`${this.name} is too tired to perform a super attack`);
      this.rest = false; // Reset rest status, but consider the gameplay logic
    }
  }

  dodge() {
    let baseDodgeChance = 0.25;
    let maxDodgeChance = 0.5;
    let luckContribution =
      (this.luck / 10) * (maxDodgeChance - baseDodgeChance);
    let totalDodgeChance = baseDodgeChance + luckContribution;

    return Math.random() < totalDodgeChance;
  }

  levelUp() {
    this.level++;
    this.points += 10;
  }

  die() {
    if (this.life <= 0) {
      alert("The monster is K.O");
    }
  }
}
