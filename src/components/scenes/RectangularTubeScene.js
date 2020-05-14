//import * as Dat from 'dat.gui';
import { Scene, Color, TextureLoader, RepeatWrapping } from "three";
import {
  Flower,
  Land,
  RectangularTube,
  Headphones,
  Obstacle,
  Boombox,
} from "objects";
import { AcousticGuitar, Piano, Violin } from "instruments";
import { BasicLights } from "lights";
import { Audio, AudioListener, AudioLoader, AudioAnalyser } from "three";
import MUSIC1 from "./You Gotta Be.mp3";
import MUSIC2 from "./Kirby.mp3";
import MUSIC3 from "./Offenbach.mp3";
import BACKGROUND from "./stars.jpg";
import { Vector3 } from "three";

class RectangularTubeScene extends Scene {
  constructor(audioListener, camera) {
    // Call parent Scene() constructor
    super();

    // Init state
    this.state = {
      updateList: [],
      music: null,
      analyser: null,
      player: null,
      startBegin: true,
      gamePlay: false,
      loseEnd: false,
      currentSpeed: 0.15,
      camera: camera,
      tube: null,
      obstacles: [],
      life: 3,
      lifeText: null,
      obstacleCollision: false,
      musicSelect: 0,
      listener: audioListener,
    };

    // Set background to a nice color
    let bgTexture = new TextureLoader().load(BACKGROUND);
    bgTexture.wrapS = RepeatWrapping;
    bgTexture.wrapT = RepeatWrapping;
    bgTexture.repeat.set(4, 4);

    this.background = bgTexture;

    // Add meshes to scene
    const lights = new BasicLights();
    const boombox = new Boombox(this);
    const headphones = new Headphones(this);

    // add instruments to scene
    const acoustic = new AcousticGuitar();
    const piano = new Piano();
    const violin = new Violin();

    this.add(acoustic, piano, violin);

    // set random position for instruments
    var instruments = [acoustic, piano, violin];
    this.instruments = instruments;

    for (let i = 0; i < instruments.length; i++) {
      instruments[i].position.x = this.generateRandom(
        instruments[i].minX,
        instruments[i].maxX
      );
      instruments[i].position.y = this.generateRandom(
        instruments[i].minY,
        instruments[i].maxY
      );
      instruments[i].visible = false;
    }

    this.state.player = headphones;
    this.add(lights, headphones, boombox);
    this.addTube();
    this.addObstacles();

    this.addMusic();

    // life text
    const life = document.createElement("p");
    life.id = "life";
    life.className = "life";
    life.innerText = "life: " + this.state.life;
    document.body.appendChild(life);
    this.state.lifeText = life;
  }

  // add global music to scene
  addMusic() {
    let sound = new Audio(this.state.listener);

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new AudioLoader();

    this.audioLoader = audioLoader;

    // load song 2
    if (this.state.musicSelect === 1) {
      audioLoader.load(MUSIC1, function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.5);
        sound.play();
      });
    }

    // load song 2
    if (this.state.musicSelect === 2) {
      audioLoader.load(MUSIC2, function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.5);
        sound.play();
      });
    }

    // load song 3
    if (this.state.musicSelect === 3) {
      audioLoader.load(MUSIC3, function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.5);
        sound.play();
      });
    }

    this.state.music = sound;

    // Analyze frequency
    var analyser = new AudioAnalyser(this.state.music, 64);
    this.state.analyser = analyser;

    // show win menu after song ends
    this.state.music.onEnded = () => {
      this.state.winRestart = true;
    };
  }

  // generate random value in between min and max
  generateRandom(min, max) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.random() * (max - min) + min;
  }

  // choose 
  randomIndex(length) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * Math.floor(length));
  }

  // reset position of instrument
  resetPosition(instrument) {

    // set x value to random value within range
    instrument.position.x = this.generateRandom(
      instrument.minX,
      instrument.maxX
    );

    // set y value to random value within range
    instrument.position.y = this.generateRandom(
      instrument.minY,
      instrument.maxY
    );
  }

  // choose random instrument
  chooseInstrument(instrumentsArray) {
    var index = this.randomIndex(instrumentsArray.length);
    return instrumentsArray[index];
  }

  // determine if instrument has collided with instrument
  checkInstrumentCollision(instrument) {
    if (instrument.boundingBox) {
      const iBound = instrument.boundingBox;
      iBound.min.z += 2;
      iBound.max.z += 2;
      const hBound = this.state.player.boundingBox;

      // player loses if avatar bounding box intersects instrument bounding box
      if (iBound.intersectsBox(hBound)) {
        this.state.life = 0;
        this.state.lifeText.innerText = "life: " + this.state.life;

        this.state.loseEnd = true;
      }
    }
  }

  // bring instrument forward
  loom(instrument) {

    //ensure bounding box has been created
    if (instrument.boundingBox) {
      
      // make instrument visible
      instrument.visible = true;

      // check if player intersects instrument
      this.checkInstrumentCollision(instrument); 

      //ensure instrument is not already moving
      if (instrument.moving == false) {
        

        instrument.moveForward(() => {
          instrument.moving = false;
        });
        instrument.moving = true;
      }
    }
  }

  // check if all instruments are not moving
  allStopped() {

    var stoppedCount = 0; // number of instruments not moving
    var instruments = this.instruments;
    var total = instruments.length;

    //ensure all bounding boxes have been created
    if (instruments[total - 1].boundingBox) {
      
      // count instruments that are not moving
      for (let i = 0; i < total; i++) {
        if (instruments[i].moving === false) {
          stoppedCount++;
        }
      }

      // if all instruments are stopped, execute 
      if (stoppedCount === total) {

        // choose instrument to move forward
        var instrument = this.chooseInstrument(instruments);

        // randomize position of chosen instrument
        this.resetPosition(instrument);

        //bring instrument forward
        this.loom(instrument);
      }
    }

    return instrument;
  }

  // add object to update list
  addToUpdateList(object) {
    this.state.updateList.push(object);
  }

  // play music
  play() {
    this.state.music.play();
  }

  // pause music
  pause() {
    this.state.music.pause();
  }

  // add tube to scene
  addTube() {
    let depth = this.state.player.position.z;
    const rectangularTube = new RectangularTube(this, depth);
    this.state.tube = rectangularTube;
    this.add(rectangularTube);
  }

  // add obstacles to scene
  addObstacles() {
    for (let y = 0; y < 4; y += 2) {
      for (let z = 20; z > -4; z -= 2) {
        let position1 = new Vector3(-4.1, y, z);
        let obstacle1 = new Obstacle(this, position1);
        let position2 = new Vector3(4.1, y, z);
        let obstacle2 = new Obstacle(this, position2);
        this.state.obstacles.push(obstacle1);
        this.state.obstacles.push(obstacle2);
        this.add(obstacle1, obstacle2);
      }
    }
  }

  // update necessary scene components
  update(timeStamp) {
    const { rotationSpeed, updateList } = this.state;

    // get the average frequency of the sound
    var data = this.state.analyser.getFrequencyData();

    // Call update for each object in the updateList
    let i = 0;
    for (const obj of updateList) {
      obj.update(timeStamp, data[i], this.state.player);
      i++;
    }

    // check if all instruments are not moving
    this.allStopped();

    // check if avatar has collided with instruments
    for (let i = 0; i < this.instruments.length; i++) {
      this.checkInstrumentCollision(this.instruments[i]);
    }

    // if avator collides with obstacle, update lives
    if (this.state.obstacleCollision) {
      this.state.life -= 1;
      this.state.lifeText.innerText = "life: " + this.state.life;
      this.state.player.position.set(0, 0, 0);
      this.state.obstacleCollision = false;
    }

    // player loses if lives reach 0
    if (this.state.life === 0) this.state.loseEnd = true;

    // stop music and reset lives if player loses
    if (this.state.loseEnd) {
      if (this.state.music.isPlaying) {
        this.state.music.stop();
      }
      this.state.lifeText.innerText = "life: " + this.state.life;
      this.state.life = 3;
    }
  }
}

export default RectangularTubeScene;
