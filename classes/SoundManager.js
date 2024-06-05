class SoundManager {
    constructor() {
      this.sounds = [
        "music/fight_music.mp3",
        "music/fight_music_2.mp3",
        "music/fight_music_3.mp3",
        "music/fight_music_4.mp3",
        "music/fight_music_5.mp3",
        "music/fight_music_6.mp3",
        "music/main_theme.mp3",
        "music/final_battle_music.mp3",
      ];
      this.gameSound = null; // It's not clear what this is for, initializing for clarity
      this.sound = document.createElement("audio");
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "controls");
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
  
    play() {
      this.sound.play().catch(error => console.error("Error playing sound:", error));
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
  