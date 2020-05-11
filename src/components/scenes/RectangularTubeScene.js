import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, RectangularTube, Headphones, Obstacle, Boombox } from 'objects';
import { AcousticGuitar, Piano, Violin } from 'instruments';
import { LoseMenu } from 'menus';
import { BasicLights } from 'lights';
// YS - May 7 edit
import { Audio, AudioListener, AudioLoader, AudioAnalyser } from 'three';
import MUSIC from './You Gotta Be.mp3';
import { Vector3 } from 'three';

class RectangularTubeScene extends Scene {
    constructor(audioListener, camera) {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 0,
            updateList: [],
            music: null,
            play: this.play.bind(this),
            pause: this.pause.bind(this),
            analyser: null,
            player: null,
            loseEnd: false,
            currentSpeed: 0.1,
            camera: camera,
            //test: 20,
            tube1: null,
            tube2: null,
            obstacles: [],
            //obstacles2: [],
            //group1: false,
            //life: 3,
        };

        // Set background to a nice color
        this.background = new Color(0x000000);

        // Add meshes to scene
        const land = new Land();
        const lights = new BasicLights();

                const boombox = new Boombox();

              //  this.add(lights, rectangularTube, boombox);

        // add player to scene
                  //this.player = new Headphones();
                  //this.add(this.player);

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

        //const rectangularTube = new RectangularTube(this);
        //this.state.tube = rectangularTube;
        const headphones = new Headphones(this);

        // YS May 9 edit
        this.state.player = headphones;
        //this.add(land, lights, rectangularTube, headphones);
        this.add(lights, headphones, boombox);
        this.addTube();
        this.addObstacles();

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
        this.state.gui.add(this.state, 'play');
        this.state.gui.add(this.state, 'pause');

        // create a global audio source
        var sound = new Audio(audioListener);

        // load a sound and set it as the Audio object's buffer
        var audioLoader = new AudioLoader();
        audioLoader.load( MUSIC, function( buffer ) {
          sound.setBuffer( buffer );
          sound.setLoop( true );
          sound.setVolume( 0.5 );
          // uncomment this line to play automatically
          //sound.play();
        });
        this.state.music = sound;
        // Analyze frequency
        var analyser = new AudioAnalyser(this.state.music, 64 );
        this.state.analyser = analyser;

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
        const hBound = this.state.player.boundingBox;

        if (iBound.intersectsBox(hBound) === true) {
            new LoseMenu();
        }
    }
    }

    loom(instrument) {
        if (instrument.boundingBox) { //ensure bounding box has been created
            instrument.visible = true;
            this.checkInstrumentCollision(instrument); // check if player intersects instrument
            if (instrument.moving == false) { //ensure instrument is not already moving

            instrument.moveForward(() => {
                console.log("loom move forward");
                //this.position.z = 0;
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
      const rectangularTube1 = new RectangularTube(this, depth);
      this.state.tube1 = rectangularTube1;
      const rectangularTube2 = new RectangularTube(this, depth + 100);
      this.state.tube2 = rectangularTube2;
      this.add(rectangularTube1, rectangularTube2);
    }

    addObstacles() {
      for (let y = 0; y < 4; y+=2) {
        for (let z = 0; z < 20; z+=2) {
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
        this.rotation.y = (rotationSpeed * timeStamp) / 10000;

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

     if (this.state.loseEnd) {
       this.pause();
     

    }
  }
}

export default RectangularTubeScene;
