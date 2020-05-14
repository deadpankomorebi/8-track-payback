import { SelectMenu } from "menus";

class WinMenu {
  constructor(scene) {
    this.name = "winMenu";

    // set appropriate states after win
    scene.state.winMenuCreated = true;
    scene.state.gamePlay = false;

    // link to stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.media = "screen";
    document.head.appendChild(link);

    // Creation of title
    const title = document.createElement("H1");
    title.id = "menu";
    title.className = "title";
    title.innerText = "8-Track Payback";
    document.body.appendChild(title);

    // Names
    const names = document.createElement("H2");
    names.id = "names";
    names.className = "author";
    names.innerText = "by Yunzi Shi & Milan Eldridge";
    document.body.appendChild(names);

    // instructions
    const congrats = document.createElement("p");
    congrats.id = "congrats";
    congrats.className = "congrats";
    congrats.innerText = "Congratulations! You won!";
    document.body.appendChild(congrats);

    // button
    const button = document.createElement("button");
    button.id = "btn";
    button.onclick = function startPayback() {

      // remove win menu children
      document.body.removeChild(title);
      document.body.removeChild(names);
      document.body.removeChild(congrats);
      document.body.removeChild(button);

      // add delay before restarting game
      setTimeout(() => {
        scene.state.gamePlay = true;
      }, 1000); // wait 1000 miliseconds before beginning game

      // set appropriate states
      scene.state.winRestart = false;
      scene.state.winMenuCreated = false;
      scene.state.life = 3;

      // take player to song selection menu after button is clicked
      const selectMenu = new SelectMenu(scene);
    };

    button.className = "winButton";
    button.type = "button";
    button.innerText = "~Play again~";
    document.body.appendChild(button);
  }
}

export default WinMenu;
