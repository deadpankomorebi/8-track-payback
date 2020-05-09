class LoseMenu {
	constructor() {

		this.name = 'loseMenu';

// link to stylesheet
const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "/src/components/menus/styles.css";
link.media = "screen";
document.head.appendChild(link);

// decrease opacity all other elements in body
var length = document.body.children.length;
for (let i = 0; i < length; i++) {
	document.body.children[i].style.opacity = .5;
}

        // Lose wisecrack
        const wisecrack = document.createElement("H2");
        wisecrack.id = "wisecrack";
        wisecrack.className = "wisecrack";
        wisecrack.innerText = "Looks like the 8-track has made a comeback! ";
        document.body.appendChild(wisecrack);

       // Uh oh!
       const oh = document.createElement("H1");
       oh.id = "uh oh";
       oh.className = "oh";
       oh.innerText = "Uh Oh! :(";
       document.body.appendChild(oh);

// instructions
const jack = document.createElement("p");
jack.id = "jack";
jack.className = "jack";
jack.innerText = "There's been a setback in your playback, Jack. Without much flac., we'll get you back on the right (sound)track!";
document.body.appendChild(jack);


// button
const button = document.createElement("button");
button.id = "btn";
button.onclick = function startPayback() {

	for (let i = 0; i < length; i++) {
		document.body.children[i].style.opacity = 1;
	}

  // remove start menu children
  document.body.removeChild(wisecrack);
  document.body.removeChild(oh);
  document.body.removeChild(jack);
  document.body.removeChild(button);
}
button.className = "button";
button.type = "button";
button.innerText = "CLICK TO GET BACK TO THE ATTACK OF THE 8-TRACK";
document.body.appendChild(button);

}
}

export default LoseMenu;
