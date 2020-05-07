import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Obstacle } from 'objects';
import { BasicLights } from 'lights';
// YS - May 6 edit
import { Audio, AudioListener, AudioLoader, AudioAnalyser } from 'three';
import MUSIC from './You Gotta Be.mp3';
//import { Music } from 'music';
import { Vector3 } from 'three';

class SeedScene extends Scene {
  constructor(audioListener) {
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
    };

    // Set background to a nice color
    //this.background = new Color(0x7ec0ee);
    this.background = new Color(0x000000);

    // Add meshes to scene
    const land = new Land();
    const flower = new Flower(this);
    const lights = new BasicLights();
    this.add(land, flower, lights);

    // add an obstacle
    /*let position = new Vector3(0, 5, 0);
    const obstacle = new Obstacle(this, position);
    this.add(obstacle);*/

    // add obstacles
    for (let y = -5; y < 5; y+=2) {
      for (let z = -5; z < 5; z+=2) {
        let position1 = new Vector3(-5, y, z);
        let obstacle1 = new Obstacle(this, position1);
        let position2 = new Vector3(5, y, z);
        let obstacle2 = new Obstacle(this, position2);
        //obstacle1.setPosition(position);
        this.add(obstacle1, obstacle2);
      }
    }

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
      //ound.play();
    });
    this.state.music = sound;
    // YS 5/6 Analyze frequency
    var analyser = new AudioAnalyser(this.state.music, 64 );
    this.state.analyser = analyser;
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

  update(timeStamp) {
    const { rotationSpeed, updateList } = this.state;
    this.rotation.y = (rotationSpeed * timeStamp) / 10000;

    // YS 5/6 Analyze frequency
    //var analyser = new AudioAnalyser(this.state.music, 32 );

    // get the average frequency of the sound
    var data = this.state.analyser.getFrequencyData();
    //console.log(data[10]);

    // Call update for each object in the updateList
    let i = 0;
    for (const obj of updateList) {
      obj.update(timeStamp, data[i]);
      i++;
    }
  }
}

export default SeedScene;
