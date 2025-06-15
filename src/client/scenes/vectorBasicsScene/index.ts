import { Scene } from "../../sceneManager";
import renderer from "../../renderer";
import input from "../../input";
import VectorVisualizer from "../../utils/vectorVisualizer";
import Vector2 from "../../utils/vector2";
import type VecComparrison from "./vecComparrison";
import ManhattanDistance from "./manhattanDistance";
import EuclideanDistance from "./euclideanDistance";
import DotProduct from "./dotProduct";
import CosineSimilarity from "./cosineSimilarity";
import Axis from "../../utils/axis";

class VectorBasicsScene extends Scene{

	arrowA: VectorVisualizer = new VectorVisualizer(new Vector2(300,200));
	arrowB: VectorVisualizer = new VectorVisualizer(new Vector2(200,300));
	grabbedArrow!: VectorVisualizer|null;

	axis:Axis = new Axis(new Vector2(400,400),100);

	manhattanDistanceButton = document.getElementById("manhattanDist") as HTMLButtonElement;
	euclideanDistanceButton = document.getElementById("euclideanDist")as HTMLButtonElement;
	dotProductButton = document.getElementById("dotProd")as HTMLButtonElement;
	cosineSimilarityButton = document.getElementById("cosSim")as HTMLButtonElement;

	manhattanDistanceText = document.getElementById("MhDistance") as HTMLElement;
	euclideanDistanceText = document.getElementById("EcDistance")as HTMLElement;
	dotProductText = document.getElementById("DotProduct")as HTMLElement;
	cosineSimilarityText = document.getElementById("CosineSimilarity")as HTMLElement;

	vecComparrison: VecComparrison | null = null;
	manhattanDistance: ManhattanDistance = new ManhattanDistance(this.arrowA,this.arrowB);
	euclideanDistance: EuclideanDistance = new EuclideanDistance(this.arrowA,this.arrowB);
	dotProduct: DotProduct = new DotProduct(this.arrowA, this.arrowB);
	cosineSimilarity: CosineSimilarity = new CosineSimilarity(this.arrowA, this.arrowB);



	start(): void {
		renderer.setView(new Vector2(400,400));		
		
		this.manhattanDistanceButton?.addEventListener("click", ()=>{ this.vecComparrison = this.manhattanDistance; this.showTextFrom(this.manhattanDistanceText);});
		this.euclideanDistanceButton?.addEventListener("click", ()=>{ this.vecComparrison = this.euclideanDistance;this.showTextFrom(this.euclideanDistanceText);});
		this.dotProductButton?.addEventListener("click", ()=>{ this.vecComparrison = this.dotProduct;this.showTextFrom(this.dotProductText);});
		this.cosineSimilarityButton?.addEventListener("click", ()=>{ this.vecComparrison = this.cosineSimilarity;this.showTextFrom(this.cosineSimilarityText);});

	}

	update(deltaTime:number): void {
		renderer.draw(this.axis.draw.bind(this.axis));
		renderer.draw(this.arrowA.draw.bind(this.arrowA));
		renderer.draw(this.arrowB.draw.bind(this.arrowB));
		this.grabArrow();
		if(input.mouseDown && this.grabbedArrow){
			this.grabbedArrow.vector.x = input.mousePosition.x;
			this.grabbedArrow.vector.y = input.mousePosition.y;
		}

		if(this.vecComparrison){
			this.vecComparrison.draw();
		}
	}	


	showTextFrom(element:HTMLElement){
		this.manhattanDistanceText.style.display ="none";
		this.euclideanDistanceText.style.display ="none";
		this.dotProductText.style.display ="none";
		this.cosineSimilarityText.style.display ="none";
		element.style.display="block";
	}

	grabArrow(){
		const arrow = this.findColserArrow();
		if(!input.mousePressed){return;}
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
