import renderer from "../../renderer";
import Vector2 from "../../utils/vector2";
import type VectorVisualizer from "../../utils/vectorVisualizer";
import type VecComparrison from "./vecComparrison";

export default class DotProduct implements VecComparrison{
	arrowA: VectorVisualizer;
	arrowB: VectorVisualizer;

	constructor(a:VectorVisualizer,b:VectorVisualizer){
		this.arrowA = a;
		this.arrowB = b;
	}


	draw(){

		let diff = this.arrowB.vector.angle() - this.arrowA.vector.angle();
		diff = (diff + Math.PI) % (2 * Math.PI) - Math.PI;
		const anticlockwise = diff < 0;
		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			const value = this.calculate();

			ctx.strokeStyle = "red";
			if(value < 0){
				ctx.strokeStyle = "blue";
			}
			ctx.beginPath();
			ctx.arc(0,0,Math.abs(value),this.arrowA.vector.angle(), this.arrowB.vector.angle(), anticlockwise);
			ctx.stroke();
		});


	}

	drawValue(ctx: CanvasRenderingContext2D): void {
	    
	}
	calculate(): number {
		return Vector2.dot(this.arrowA.vector, this.arrowB.vector)/100;
	}
}

