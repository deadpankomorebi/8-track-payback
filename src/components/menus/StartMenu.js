import { SelectMenu } from 'menus';

class StartMenu {
	constructor(scene) {

		this.name = 'startMenu';

		// link to stylesheet
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = "/src/components/menus/styles.css";
		link.media = "screen";
		document.head.appendChild(link);

		// hide all other elements in body
		var length = document.body.children.length;
		for (let i = 0; i < length; i++) {
			document.body.children[i].style.opacity = 0;
		}

		// add boombox gif as background
		document.body.style.backgroundImage = "url(/src/components/menus/Boombox.gif)";

		const titleScreen = document.createElement("div");
		titleScreen.className = "titleScreen";
		document.body.appendChild(titleScreen);

		// Creation of title
		const title = document.createElement("H1");
		title.id = "menu";
		title.className = "title";
		title.innerText = "8-Track Payback";
		titleScreen.appendChild(title);

		// Names
		const names = document.createElement("H2");
		names.id = "name";
		names.className = "author";
		names.innerText = "by Yunzi Shi & Milan Eldridge";
		titleScreen.appendChild(names);

		// instructions
		const instruct = document.createElement("div");
		instruct.className = "command";
		titleScreen.appendChild(instruct);

		const instructions1 = document.createElement("p");
		instructions1.id = "directions1";
		instructions1.innerText = "wasd/arrow keys to move";

		const instructions2 = document.createElement("p");
		instructions2.id = "directions2";
		instructions2.innerText = "escape to pause";

		const instructions3 = document.createElement("p");
		instructions3.id = "directions3";
		instructions3.innerText = "press play and avoid all obstacles";

		const instructions4 = document.createElement("p");
		instructions4.id = "directions4";
		instructions4.innerText = "touch a teal obstacle: lose a life";

		const instructions5 = document.createElement("p");
		instructions5.id = "directions5";
		instructions5.innerText = "touch an instrument: lose immediately";
		
		instruct.appendChild(instructions1);
		instruct.appendChild(instructions2);
		instruct.appendChild(instructions3);
		instruct.appendChild(instructions4);
		instruct.appendChild(instructions5);

		// button
		const button = document.createElement("button");
		button.id = "btn";
		button.onclick = function startPayback() {

			for (let i = 0; i < length; i++) {
				document.body.children[i].style.opacity = 1;
			}

			// remove start menu children
			/*document.body.removeChild(title);
			document.body.removeChild(names);
			document.body.removeChild(instruct);
			document.body.removeChild(button); */
			document.body.removeChild(titleScreen)

			// begin game after short delay
			/*scene.state.startBegin = false;

			setTimeout(() => {
				scene.state.gamePlay = true;
			}, 1000); // wait 1000 miliseconds before beginning game*/
			const selectMenu = new SelectMenu(scene);

			remove boombox background
			document.body.style.backgroundImage = null;


		}
		button.className = "startButton";
		button.type = "button";
		button.innerText = "CLICK TO BEGIN THE ATTACK OF THE 8-TRACK";
		titleScreen.appendChild(button);

	}
}

export default StartMenu;
