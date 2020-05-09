class StartMenu {
	constructor() {

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
const instructions = document.createElement("p");
instructions.id = "directions";
instructions.className = "instructions";
instructions.innerText = "INSERT INSTRUCTIONS HERE";
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
} 
button.className = "button";
button.type = "button";
button.innerText = "CLICK TO BEGIN THE ATTACK OF THE 8-TRACK";
document.body.appendChild(button);

}
}

export default StartMenu;
