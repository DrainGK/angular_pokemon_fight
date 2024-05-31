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

    this.maxHp = this.life;
    this.currentHp = this.life;
    this.isDodge = false;
    this.lock = true;
  }

  fight(opponent) {
    if (!this.rest && opponent.isDodge === false && this.currentHp > 0){
      
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
  
          console.log(`Damage dealt by ${this.name} to ${opponent.name}: ${damage}`);
          if(damage === 0) damage = 0.5;
          opponent.currentHp -= damage;  // Reduce opponent's life
          console.log(`Remaining life of ${opponent.name}: ${opponent.currentHp}`);
          return damage;  // Returning damage for information, not necessary for functionality
    } else {
      console.log(`${this.name} is too tired to perform an attack`);
      this.rest = false; // Reset rest status, but consider the gameplay logic
    }
  }

  superAttack(opponent) {
    if (!this.rest && opponent.isDodge === false && this.currentHp > 0) {
      // Correct use of boolean check
      this.fight(opponent);
      console.log(`${this.name} is attacking again`);
      this.fight(opponent);
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
    console.log(Math.random() < totalDodgeChance);
    if(Math.random() < totalDodgeChance){
      this.isDodge = !this.isDodge;
    }
    return Math.random() < totalDodgeChance;
  }

  levelUp() {
    if(this.level <= 10){
      this.level++;
      this.points += 10;
    }
  }

  die() {
    if (this.currentHp <= 0) {
      console.log(`${this.name} is KO`);
      currentMonsterId++;
      if(team[currentMonsterId]) currentMonster = team[currentMonsterId];
      console.log(currentMonster);
    }
  }
}
