//import { Group } from 'three';
import { Audio, AudioListener, AudioLoader } from 'three';
import MUSIC from './You Gotta Be.mp3';

//class Music extends Group {
class Music {
    constructor(audioListener) {
        // Invoke parent Group() constructor with our args
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
            //bob: true,
            //spin: this.spin.bind(this),
            //twirl: 0,
            sound: new Audio(audioListener);
        };

        var sound = new Audio(audioListener);
        // load a sound and set it as the Audio object's buffer
        var audioLoader = new AudioLoader();
        audioLoader.load( MUSIC, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        //sound.play();
      }
        /*const dir = new SpotLight(0xffffff, 1.6, 7, 0.8, 1, 1);
        const ambi = new AmbientLight(0x404040, 1.32);
        const hemi = new HemisphereLight(0xffffbb, 0x080820, 2.3);

        dir.position.set(5, 1, 2);
        dir.target.position.set(0, 0, 0);*/

        // create an AudioAnalyser, passing in the sound and desired fftSize
        var analyser = new AudioAnalyser( sound, 32 );

        // get the average frequency of the sound
        var data = analyser.getFrequencyData();
        this.add(audioLoader);
    }

    

}

export default Music;
