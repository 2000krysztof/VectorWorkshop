import renderer from "../../renderer";
import Vector2 from "../../utils/vector2";
import type VectorVisualizer from "../../utils/vectorVisualizer";
import type VecComparrison from "./vecComparrison";

export default class EuclideanDistance implements VecComparrison{
	arrowA: VectorVisualizer;
	arrowB: VectorVisualizer;

	constructor(a:VectorVisualizer,b:VectorVisualizer){
		this.arrowA = a;
		this.arrowB = b;
	}


	draw(){

		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo(this.arrowA.vector.x,this.arrowA.vector.y);
			ctx.lineTo(this.arrowB.vector.x,this.arrowB.vector.y);
			ctx.stroke();
			this.drawValue(ctx);

		});
	

	}

	drawValue(ctx: CanvasRenderingContext2D): void {

		ctx.font = '30px "Computer Modern Serif"'
	    const midPoint = Vector2.lerp(this.arrowA.vector, this.arrowB.vector, 0.5);
		ctx.fillText(this.calculate().toPrecision(4), midPoint.x+30, midPoint.y);
	}

	calculate(): number {
		return this.arrowA.vector.subtract(this.arrowB.vector).magnitude()/100;
	}
}

