class PauseMenu {
    constructor(scene) {
        this.name = 'pauseMenu';

        // don't bring up menu if lose menu is already there
        if (
            scene.state.loseEnd ||
            scene.state.startBegin ||
            scene.state.pauseMenuCreated ||
            scene.state.winRestart
        ) {
            return;
        }

        // put in pause state
        //scene.state.pauseMenuCreated = true;
        scene.state.paused = true;
        scene.state.gamePlay = false;
        scene.state.music.pause();

        // link to stylesheet
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        //link.href = "/src/components/menus/styles.css";
        link.media = 'screen';
        document.head.appendChild(link);

        // hide all other elements in body
        var length = document.body.children.length;
        for (let i = 0; i < length; i++) {
            document.body.children[i].style.opacity = 0.5;
        }

        // Creation of title
        const title = document.createElement('H1');
        title.id = 'menu';
        title.className = 'title';
        title.innerText = '8-Track Payback';
        document.body.appendChild(title);

        // Names
        const names = document.createElement('H2');
        names.id = 'name';
        names.className = 'author';
        names.innerText = 'by Yunzi Shi & Milan Eldridge';
        document.body.appendChild(names);

        // instructions
        const instructions = document.createElement('p');
        instructions.id = 'directions';
        instructions.className = 'instructions';
        instructions.innerText = '(Pause for Applause!)';
        document.body.appendChild(instructions);

        // button
        const button = document.createElement('button');
        button.id = 'pauseButton';
        button.onclick = function startPayback() {
            // time at which unpause button is clicked
            scene.state.unpauseTime = new Date().getTime();

            for (let i = 0; i < length; i++) {
                document.body.children[i].style.opacity = 1;
            }

            // remove start menu children
            document.body.removeChild(title);
            document.body.removeChild(names);
            document.body.removeChild(instructions);
            document.body.removeChild(button);

            // restart game from where it left off
            scene.state.paused = false;
            scene.state.gamePlay = true;
            scene.state.pauseMenuCreated = false;
            scene.state.music.play();

            //setTimeout(() => {
            //	scene.state.gamePlay = true;
            //}, 1000); // wait 1000 miliseconds before beginning game
        };
        button.className = 'pauseButton';
        button.type = 'button';
        button.innerText = '|R E S U M E|';
        document.body.appendChild(button);
    }
}

export default PauseMenu;
