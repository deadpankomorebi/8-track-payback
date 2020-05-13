import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, RectangularTube, Headphones, Obstacle, Boombox } from 'objects';
import { AcousticGuitar, Piano, Violin } from 'instruments';
import { BasicLights } from 'lights';
import { Audio, AudioListener, AudioLoader, AudioAnalyser } from 'three';
import MUSIC1 from './You Gotta Be.mp3';
import MUSIC2 from './Kirby.mp3';
import MUSIC3 from './Offenbach.mp3';
import { Vector3 } from 'three';

class RectangularTubeScene extends Scene {
    constructor(audioListener, camera) {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            //rotationSpeed: 0,
            updateList: [],
            music: null,
            play: this.play.bind(this),
            pause: this.pause.bind(this),
            analyser: null,
            player: null,
            startBegin: true,
            gamePlay: false,
            loseEnd: false,
            currentSpeed: 0.1,
            camera: camera,
            //test: 20,
            tube: null,
            //tube2: null,
            obstacles: [],
            //obstacles2: [],
            //group1: false,
            life: 3,
            lifeText: null,
            instrumentCollision: false,
            obstacleCollision: false,
            musicSelect: 0,
            listener: audioListener,
        };

        // Set background to a nice color
        this.background = new Color(0x000000);

        // Add meshes to scene
        const land = new Land();
        const lights = new BasicLights();

                const boombox = new Boombox();

                  // add instruments to scene
                const acoustic = new AcousticGuitar();
                const piano = new Piano();
                const violin = new Violin();

                this.add(acoustic, piano, violin);

                var instruments = [acoustic, piano, violin];
                this.instruments = instruments;
                for (let i = 0; i < instruments.length; i++) {
                    instruments[i].position.x = this.generateRandom(instruments[i].minX, instruments[i].maxX);
                    instruments[i].position.y = this.generateRandom(instruments[i].minY, instruments[i].maxY);
                    instruments[i].visible = false;
                }

        const headphones = new Headphones(this);

        this.state.player = headphones;
        //this.add(land, lights, rectangularTube, headphones);
        this.add(lights, headphones, boombox);
        this.addTube();
        this.addObstacles();

        // Populate GUI
        //this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
        this.state.gui.add(this.state, 'play');
        this.state.gui.add(this.state, 'pause');
//if (this.state.musicSelect === 3) {
        // create a global audio source
        /*var sound = new Audio(audioListener);
        //if (this.state.musicSelect === 3) debugger;
        // load a sound and set it as the Audio object's buffer
        var audioLoader = new AudioLoader();

        this.audioLoader = audioLoader;
        //console.log(this.state.musicSelect);
        //if (this.state.musicSelect === 3) {
        audioLoader.load( MUSIC3, function( buffer ) {
          sound.setBuffer( buffer );
          sound.setLoop( false );
          sound.setVolume( 0.5 );
          // uncomment this line to play automatically
          //sound.play();
        });
      //}
        this.state.music = sound;
        // Analyze frequency
        var analyser = new AudioAnalyser(this.state.music, 64 );
        this.state.analyser = analyser;*/
      this.addMusic();

        // YS May 11 - life text
        const life = document.createElement("p");
    		life.id = "life";
    		life.className = "life";
    		life.innerText = "life: " + this.state.life;
    		document.body.appendChild(life);
        this.state.lifeText = life;
    }

    addMusic() {
      let sound = new Audio(this.state.listener);
      //if (this.state.musicSelect === 3) debugger;
      // load a sound and set it as the Audio object's buffer
      var audioLoader = new AudioLoader();

      this.audioLoader = audioLoader;
      //console.log(this.state.musicSelect);
      if (this.state.musicSelect === 1) {
      audioLoader.load( MUSIC1, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume( 0.5 );
        // uncomment this line to play automatically
        //sound.play();
      });
    }
    if (this.state.musicSelect === 2) {
    audioLoader.load( MUSIC2, function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( false );
      sound.setVolume( 0.5 );
      // uncomment this line to play automatically
      //sound.play();
    });
  }
    if (this.state.musicSelect === 3) {
    audioLoader.load( MUSIC3, function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( false );
      sound.setVolume( 0.5 );
      // uncomment this line to play automatically
      //sound.play();
    });
  }
      this.state.music = sound;
      // Analyze frequency
      var analyser = new AudioAnalyser(this.state.music, 64 );
      this.state.analyser = analyser;

      this.state.music.onEnded = () => {
          this.state.winRestart = true;
          console.log("this song has ended");
      }
    }

    generateRandom(min, max) {
        return (Math.random() * (max-min)) + min;
    }

    randomIndex(length) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * Math.floor(length));
    }

    resetPosition(instrument) {
        instrument.position.x = this.generateRandom(instrument.minX, instrument.maxX);
        instrument.position.y = this.generateRandom(instrument.minY, instrument.maxY);
    }

    chooseInstrument(instrumentsArray) {
        var index = this.randomIndex(instrumentsArray.length);
        return instrumentsArray[index];
    }

    checkInstrumentCollision(instrument) {
        if (instrument.boundingBox) {
        const iBound = instrument.boundingBox;
        iBound.min.z += 2;
        iBound.max.z += 2;
        const hBound = this.state.player.boundingBox;

        if (iBound.intersectsBox(hBound)) {

            this.state.loseEnd = true;
            //this.state.instrumentCollision = true;
            //instrument.tween.gotoAndPlay(0);
            //nstrument.handleCollision();
            //this.state.life -= 0.5;
            //this.state.lifeText.innerText = "life: " + this.state.life;
        }
    }
    }

    loom(instrument) {
        if (instrument.boundingBox) { //ensure bounding box has been created
            instrument.visible = true;
            this.checkInstrumentCollision(instrument); // check if player intersects instrument
            if (instrument.moving == false) { //ensure instrument is not already moving

            instrument.moveForward(() => {
                instrument.moving = false;

            });
            instrument.moving = true;

        }
        }
    }

    allStopped() {

        var stoppedCount = 0;
        var instruments = this.instruments;
        var total = instruments.length;
        if (instruments[total-1].boundingBox) { //ensure all bounding boxes have been created
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

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    play() {
      this.state.music.play();
    }

    pause() {
      this.state.music.pause();
    }

    addTube() {
      let depth = this.state.player.position.z;
      const rectangularTube = new RectangularTube(this, depth);
      this.state.tube = rectangularTube;
      this.add(rectangularTube);
    }

    addObstacles() {
      for (let y = 0; y < 4; y+=2) {
        for (let z = 20; z > -4; z-=2) {
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

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        //this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // get the average frequency of the sound
        var data = this.state.analyser.getFrequencyData();

        // Call update for each object in the updateList
        let i = 0;
        for (const obj of updateList) {
          //debugger;
            obj.update(timeStamp, data[i], this.state.player);
            i++;
        }

     this.allStopped();

     for (let i = 0; i < this.instruments.length; i++) {
        this.checkInstrumentCollision(this.instruments[i]);
     }

     /*if (this.state.instrumentCollision) {
       this.state.life -= 1;
       this.state.lifeText.innerText = "life: " + this.state.life;
       this.state.instrumentCollision = false;
     }*/
     if (this.state.obstacleCollision) {
       this.state.life -= 1;
       this.state.lifeText.innerText = "life: " + this.state.life;
       this.state.player.position.set(0,0,0);
       this.state.obstacleCollision = false;
     }

     if (this.state.life === 0) this.state.loseEnd = true;
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
