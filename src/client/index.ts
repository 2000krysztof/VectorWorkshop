import input from "./input";
import renderer from "./renderer";
import sceneManager from "./sceneManager";
import vectorBasicsScene from "./scenes/vectorBasicsScene";
const canvas : HTMLCanvasElement = document.getElementById("mainCanvas")! as HTMLCanvasElement;


renderer.setCanvas(canvas);
sceneManager.setScene(vectorBasicsScene);
input.setContext(canvas);

let previousTime = 0;
function mainLoop(time:number){
	renderer.clear();
	const deltaTime = time - previousTime;
	window.requestAnimationFrame(mainLoop);
	sceneManager.update(deltaTime);
	input.update();
	previousTime = time;
}


mainLoop(0);
