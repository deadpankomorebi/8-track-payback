import { PerspectiveCamera, AudioListener } from 'three';

class CamListener extends PerspectiveCamera {
    constructor() {
        // Invoke parent Group() constructor with our args
        super();

        let listener = new AudioListener();
        this.add(listener);
        this.state = { listener };
    }

    getAudioListener() {
        return this.state.listener;
    }
}

export default CamListener;
