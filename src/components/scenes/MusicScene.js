import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land } from 'objects';
import { BasicLights } from 'lights';
// YS - May 6 edit
import { Audio, AudioListener, AudioLoader } from 'three';
import MUSIC from './You Gotta Be.mp3';
//import { Music } from 'music';
import { CamListener } from 'camListener';

class MusicScene extends Scene {
    constructor(audioListener) { // audioListener reference passed via app.js
        super();

        this.state = {
            music: new Audio(audioListener), // Init music module
            updateList: [],
        };

        var audioLoader = new AudioLoader();
        audioLoader.load( MUSIC, function( buffer ) {
        this.state.music.setBuffer( buffer );
        this.state.music.setLoop( true );
        this.state.music.setVolume( 0.5 );
        // uncomment this line to play automatically
        //this.state.music.play();
      });

        const obstacle = new Obstacle(this.state.music);
        this.add(obstacle);
        /*const dancer = new Dancer(this.state.music);
        const dj = new DJ(this.state.music);
        const lights = new DiscoLights(this.state.music);
        this.add(d, dj, lights);*/
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        // Update the music state before updating anything else
        //this.state.music.update();

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}


export default MusicScene;
