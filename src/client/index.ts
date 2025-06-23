import input from "./input";
import renderer from "./renderer";
import sceneManager from "./sceneManager";
import embedingsComparrisonScene from "./scenes/embeddingsComparrison";
import embeddingsScene from "./scenes/embeddingsScene";
import introduction from "./scenes/introductionScene";
import vectorBasicsScene from "./scenes/vectorBasicsScene";
const canvas : HTMLCanvasElement = document.getElementById("mainCanvas")! as HTMLCanvasElement;


renderer.setCanvas(canvas);
sceneManager.setScene(introduction);
sceneManager.addScene(introduction);
sceneManager.addScene(vectorBasicsScene);
sceneManager.addScene(embeddingsScene);
sceneManager.addScene(embedingsComparrisonScene);
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
