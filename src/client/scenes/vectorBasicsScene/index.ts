import { Scene } from "../../sceneManager";
import renderer from "../../renderer";
import input from "../../input";
import VectorVisualizer from "../../utils/vectorVisualizer";
import Vector2 from "../../utils/vector2";

class VectorBasicsScene extends Scene{

	arrowA!: VectorVisualizer;
	arrowB!: VectorVisualizer;
	grabbedArrow!: VectorVisualizer|null;

	manhattanDistanceButton = document.getElementById("manhattanDist") as HTMLButtonElement;
	euclideanDistanceButton = document.getElementById("euclideanDist")as HTMLButtonElement;
	dotProductButton = document.getElementById("dotProd")as HTMLButtonElement;
	cosineSimilarityButton = document.getElementById("cosSim")as HTMLButtonElement;

	start(): void {
		this.arrowA = new VectorVisualizer(new Vector2(300,200));
		this.arrowB = new VectorVisualizer(new Vector2(200,300));
		renderer.setView(new Vector2(400,400));		

		this.manhattanDistanceButton?.addEventListener("click", ()=>{ this.displaySimilarity = this.manhattanDistance;});
		this.euclideanDistanceButton?.addEventListener("click", ()=>{ this.displaySimilarity = this.euclideanDistance;});
		this.dotProductButton?.addEventListener("click", ()=>{ this.displaySimilarity = this.dotProduct;});
		this.cosineSimilarityButton?.addEventListener("click", ()=>{ this.displaySimilarity = this.cosineSimilarity;});
	}

	update(deltaTime:number): void {
		renderer.draw(this.arrowA.draw.bind(this.arrowA));
		renderer.draw(this.arrowB.draw.bind(this.arrowB));
		this.grabArrow();
		if(input.mouseDown && this.grabbedArrow){
			this.grabbedArrow.vector.x = input.mousePosition.x;
			this.grabbedArrow.vector.y = input.mousePosition.y;
		}

		this.displaySimilarity();
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


	displaySimilarity(){}


	manhattanDistance(){
		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo(this.arrowA.vector.x,this.arrowA.vector.y);
			ctx.lineTo(this.arrowA.vector.x,this.arrowB.vector.y);
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "blue";
			ctx.moveTo(this.arrowA.vector.x,this.arrowB.vector.y);
			ctx.lineTo(this.arrowB.vector.x,this.arrowB.vector.y);
			ctx.stroke();
		});
	}

	euclideanDistance(){
		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo(this.arrowA.vector.x,this.arrowA.vector.y);
			ctx.lineTo(this.arrowB.vector.x,this.arrowB.vector.y);
			ctx.stroke();
		});
	}

	dotProduct(){
		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.arc(0,0,100,this.arrowA.vector.angle(), this.arrowB.vector.angle());
			ctx.stroke();
		});

	}

	cosineSimilarity(){
		const tempArrowA : VectorVisualizer = new VectorVisualizer(this.arrowA.vector.normalized().multiply(100));
		const tempArrowB : VectorVisualizer = new VectorVisualizer(this.arrowB.vector.normalized().multiply(100));
		tempArrowA.color = "red";
		tempArrowB.color = "blue";
		renderer.draw(tempArrowA.draw.bind(tempArrowA));
		renderer.draw(tempArrowB.draw.bind(tempArrowB));

		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.arc(0,0,100,this.arrowA.vector.angle(), this.arrowB.vector.angle());
			ctx.stroke();
		});
	}

}
const vectorBasicsScene = new VectorBasicsScene();
export default vectorBasicsScene;
