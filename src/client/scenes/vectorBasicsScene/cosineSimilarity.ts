import renderer from "../../renderer";
import VectorVisualizer from "../../utils/vectorVisualizer";
import type VecComparrison from "./vecComparrison";

export default class CosineSimilarity implements VecComparrison{
	arrowA: VectorVisualizer;
	arrowB: VectorVisualizer;

	constructor(a:VectorVisualizer,b:VectorVisualizer){
		this.arrowA = a;
		this.arrowB = b;
	}


	draw(){
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

