class SoundManager {
  constructor() {
    this.musics = [
      "music/fight_music.mp3",
      "music/fight_music_2.mp3",
      "music/fight_music_3.mp3",
      "music/fight_music_4.mp3",
      "music/fight_music_5.mp3",
      "music/fight_music_6.mp3",
      "music/main_theme.mp3",
      "music/final_battle_music.mp3",
    ];
    this.sounds = [
        "sound/click.mp3",
        "sound/level_up.mp3",
        "sound/monster.mp3",
        "sound/button.mp3",
        "sound/swap.mp3",
        "sound/quest_validation.mp3",
        "sound/menu.mp3",
        "sound/bloop.mp3",
        "sound/doding.mp3",
        "sound/error.mp3",
        "sound/object.mp3",
        "sound/rez.mp3",
        "sound/rebirth.mp3",
        "sound/role.mp3",
        "sound/tap.mp3",
        "sound/heal.mp3",
        "sound/attack.mp3",
        "sound/game_over.mp3",
    ];
    this.gameSound = null; // It's not clear what this is for, initializing for clarity
    this.sound = document.createElement("audio");
    this.sound.setAttribute("preload", "auto");
    // this.sound.setAttribute("controls", "none");
    this.sound.classList = "audio";
    document.body.appendChild(this.sound);
  }

  loadSound(index, loop = false) {
    if (index >= 0 && index < this.sounds.length) {
      this.sound.src = this.sounds[index];
      this.sound.loop = loop;
    } else {
      console.error("Sound index out of bounds");
    }
  }

  loadMusic(index, loop = false) {
    if (index >= 0 && index < this.musics.length) {
      this.sound.src = this.musics[index];
      this.sound.loop = loop;
    } else {
      console.error("Sound index out of bounds");
    }
  }

  play() {
    this.sound
      .play()
      .catch((error) => console.error("Error playing sound:", error));
  }

  pause() {
    this.sound.pause();
  }

  stop() {
    this.sound.pause();
    this.sound.currentTime = 0;
  }

  setVolume(volume) {
    if (volume >= 0 && volume <= 1) {
      this.sound.volume = volume;
    } else {
      console.error("Volume out of range (0-1)");
    }
  }
}
