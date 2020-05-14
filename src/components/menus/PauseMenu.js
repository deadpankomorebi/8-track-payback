class PauseMenu {
  constructor(scene) {
    this.name = "pauseMenu";

    // don't bring up menu if lose/pause/win/start menu is already there
    if (
      scene.state.loseEnd ||
      scene.state.startBegin ||
      scene.state.pauseMenuCreated ||
      scene.state.winRestart
    ) {
      return;
    }

    // put in pause state
    scene.state.paused = true;
    scene.state.gamePlay = false;
    scene.state.music.pause();

    // link to stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.media = "screen";
    document.head.appendChild(link);

    // decrease opacity of all other elements in body
    var length = document.body.children.length;
    for (let i = 0; i < length; i++) {
      document.body.children[i].style.opacity = 0.5;
    }

    // Creation of title
    const title = document.createElement("H1");
    title.id = "menu";
    title.className = "title";
    title.innerText = "8-Track Payback";
    document.body.appendChild(title);

    // Names
    const names = document.createElement("H2");
    names.id = "name";
    names.className = "author";
    names.innerText = "by Yunzi Shi & Milan Eldridge";
    document.body.appendChild(names);

    // instructions
    const instructions = document.createElement("p");
    instructions.id = "directions";
    instructions.className = "instructions";
    instructions.innerText = "(Pause for Applause!)";
    document.body.appendChild(instructions);

    // button
    const button = document.createElement("button");
    button.id = "pauseButton";
    button.onclick = function startPayback() {
      
      // time at which unpause button is clicked
      scene.state.unpauseTime = new Date().getTime();

      // increase opacity of previously decreased opacity elements
      for (let i = 0; i < length; i++) {
        document.body.children[i].style.opacity = 1;
      }

      // remove pause menu children
      document.body.removeChild(title);
      document.body.removeChild(names);
      document.body.removeChild(instructions);
      document.body.removeChild(button);

      // restart game from where it left off
      scene.state.paused = false;
      scene.state.gamePlay = true;
      scene.state.pauseMenuCreated = false;
      scene.state.music.play();

    };

    button.className = "pauseButton";
    button.type = "button";
    button.innerText = "|R E S U M E|";
    document.body.appendChild(button);
  }
}

export default PauseMenu;
