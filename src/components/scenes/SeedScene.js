import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Obstacle } from 'objects';
import { BasicLights } from 'lights';
// YS - May 6 edit
import { Audio, AudioListener, AudioLoader, AudioAnalyser } from 'three';
import MUSIC from './You Gotta Be.mp3';
//import { Music } from 'music';

class SeedScene extends Scene {
  constructor(audioListener) {
    // Call parent Scene() constructor
    super();

    // Init state
    this.state = {
      gui: new Dat.GUI(), // Create GUI for scene
      rotationSpeed: 1,
      updateList: [],
      music: null,
      play: this.play.bind(this),
      analyser: null,
    };

    // Set background to a nice color
    this.background = new Color(0x7ec0ee);

    // Add meshes to scene
    const land = new Land();
    const flower = new Flower(this);
    const lights = new BasicLights();
    this.add(land, flower, lights);

    // add an obstacle
    const obstacle = new Obstacle(this);
    this.add(obstacle);

    // Populate GUI
    this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    this.state.gui.add(this.state, 'play');

    // YS - May 6 edit: global audio!

    // create a global audio source
    var sound = new Audio(audioListener);

    /*const audioLoader = new Music(this);
    this.add(audioLoader);*/

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
    var analyser = new AudioAnalyser(this.state.music, 32 );
    this.state.analyser = analyser;
  }

  addToUpdateList(object) {
    this.state.updateList.push(object);
  }

  play() {
    this.state.music.play();
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
    for (const obj of updateList) {
      obj.update(timeStamp, data[10]);
    }
  }
}

export default SeedScene;
