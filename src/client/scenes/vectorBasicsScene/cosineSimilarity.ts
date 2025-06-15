import renderer from "../../renderer";
import Vector2 from "../../utils/vector2";
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

		let diff = this.arrowB.vector.angle() - this.arrowA.vector.angle();
		diff = (diff + Math.PI) % (2 * Math.PI) - Math.PI;
		const anticlockwise = diff < 0;

		renderer.draw(tempArrowA.draw.bind(tempArrowA));
		renderer.draw(tempArrowB.draw.bind(tempArrowB));


		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			const value = this.calculate();
			ctx.strokeStyle = "red";
			if(value < 0){
				ctx.strokeStyle = "blue";
			}
			ctx.beginPath();
			ctx.arc(0,0,Math.abs(value*100),this.arrowA.vector.angle(), this.arrowB.vector.angle(), anticlockwise);
			ctx.stroke();
			this.drawValue(ctx);
		});



	}

	drawValue(ctx: CanvasRenderingContext2D): void {
		ctx.font = '30px "Computer Modern Serif"'
		const angleA = this.arrowA.vector.angle();
		const angleB = this.arrowB.vector.angle();

		let midAngle = (angleA + angleB) / 2;
		if (Math.abs(angleA - angleB) > Math.PI) {
			midAngle += Math.PI;
		}
		const midVec = Vector2.angleToVec(midAngle).multiply(110);
		ctx.fillText(this.calculate().toPrecision(4), midVec.x, midVec.y);
	}

	calculate(): number {
		const totalMagnitude = this.arrowA.vector.magnitude() * this.arrowB.vector.magnitude();
		return Vector2.dot(this.arrowA.vector, this.arrowB.vector) / totalMagnitude;	    
	}

}

