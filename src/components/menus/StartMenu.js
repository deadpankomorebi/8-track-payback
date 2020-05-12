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
		const instruct = document.createElement("div");
		instruct.className = "command";
		document.body.appendChild(instruct);

		const instructions1 = document.createElement("p");
		instructions1.id = "directions1";
		instructions1.innerText = "wasd/arrow keys to move";

		const instructions2 = document.createElement("p");
		instructions2.id = "directions2";
		instructions2.innerText = "escape to pause";

		const instructions3 = document.createElement("p");
		instructions3.id = "directions3";
		instructions3.innerText = "press play and avoid all obstacles";
		
		instruct.appendChild(instructions1);
		instruct.appendChild(instructions2);
		instruct.appendChild(instructions3);

		// button
		const button = document.createElement("button");
		button.id = "btn";
		button.onclick = function startPayback() {

			for (let i = 0; i < length; i++) {
				document.body.children[i].style.opacity = 1;
			}

			// remove start menu children
			document.body.removeChild(title);
			document.body.removeChild(names);
			document.body.removeChild(instruct);
			document.body.removeChild(button);

			// begin game after short delay
			/*scene.state.startBegin = false;

			setTimeout(() => {
				scene.state.gamePlay = true;
			}, 1000); // wait 1000 miliseconds before beginning game*/
			const selectMenu = new SelectMenu(scene);


		}
		button.className = "startButton";
		button.type = "button";
		button.innerText = "CLICK TO BEGIN THE ATTACK OF THE 8-TRACK";
		document.body.appendChild(button);

	}
}

export default StartMenu;
