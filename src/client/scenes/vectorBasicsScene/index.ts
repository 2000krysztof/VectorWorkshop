import { Scene } from "../../sceneManager";
import renderer from "../../renderer";
import input from "../../input";
import VectorVisualizer from "../../utils/vectorVisualizer";
import Vector2 from "../../utils/vector2";

class VectorBasicsScene extends Scene{

	arrowA!: VectorVisualizer;
	arrowB!: VectorVisualizer;
	grabbedArrow!: VectorVisualizer|null;

	start(): void {
		this.arrowA = new VectorVisualizer(new Vector2(300,200));
		this.arrowB = new VectorVisualizer(new Vector2(200,300));
		renderer.setView(new Vector2(400,400));		
	}

	update(deltaTime:number): void {
		renderer.draw(this.arrowA.draw.bind(this.arrowA));
		renderer.draw(this.arrowB.draw.bind(this.arrowB));
		this.grabArrow();

		if(input.mouseDown && this.grabbedArrow){
			this.grabbedArrow.vector.x = input.mousePosition.x;
			this.grabbedArrow.vector.y = input.mousePosition.y;
		}
	}	


	grabArrow(){
		const arrow = this.findColserArrow();
		if(input.mousePosition.subtract(arrow.vector).magnitude()<100){
			this.grabbedArrow = arrow;	
		}else{
			this.grabbedArrow = null;
		}
	}

	findColserArrow(){
		if(input.mousePosition.subtract(this.arrowA.vector).magnitude() < input.mousePosition.subtract(this.arrowB.vector).magnitude()){
			return this.arrowA;
		}
		return this.arrowB;
	}



}
const vectorBasicsScene = new VectorBasicsScene();
export default vectorBasicsScene;
