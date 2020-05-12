class WinMenu {
	constructor(scene) {

		this.name = 'winMenu';

		scene.state.winMenuCreated = true;
		scene.state.gamePlay = false;

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
			document.body.children[i].style.opacity = 1;
		}

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
		const instructions = document.createElement("p");
		instructions.id = "congrats";
		instructions.className = "congrats";
		instructions.innerText = "Congratulations! You won!";
		document.body.appendChild(instructions);


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
			document.body.removeChild(instructions);
			document.body.removeChild(button);

			setTimeout(() => {
				scene.state.gamePlay = true;
			}, 1000); // wait 1000 miliseconds before beginning game

			scene.state.winRestart = false;
			scene.state.winMenuCreated = false;
			

		}
		button.className = "winButton";
		button.type = "button";
		button.innerText = "~Play again~";
		document.body.appendChild(button);

	}
}

export default WinMenu;
