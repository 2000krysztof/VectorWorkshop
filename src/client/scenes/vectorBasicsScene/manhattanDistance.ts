import renderer from "../../renderer";
import Vector2 from "../../utils/vector2";
import type VectorVisualizer from "../../utils/vectorVisualizer";
import type VecComparrison from "./vecComparrison";

export default class ManhattanDistance implements VecComparrison{
	arrowA: VectorVisualizer;
	arrowB: VectorVisualizer;

	constructor(a:VectorVisualizer,b:VectorVisualizer){
		this.arrowA = a;
		this.arrowB = b;
	}


	draw(): void{

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
			this.drawValue(ctx);
		});

	}

	drawValue(ctx:CanvasRenderingContext2D): void {
		ctx.font = '30px "Computer Modern Serif"'
		const midPoint = new Vector2(this.arrowA.vector.x,this.arrowB.vector.y);
		const midPointB = new Vector2(this.arrowA.vector.x,this.arrowB.vector.y);
		const midPointHorizontal = Vector2.lerp(this.arrowB.vector, midPointB.add(new Vector2(0,60)), 0.5);
		const midPointVertical = Vector2.lerp(this.arrowA.vector, midPoint.add(new Vector2(30,0)), 0.5);
		ctx.fillText("x", midPointHorizontal.x, midPointHorizontal.y);
		ctx.fillText("y", midPointVertical.x, midPointVertical.y);
		ctx.fillText(this.calculate().toPrecision(4), midPoint.x + 30, midPoint.y+30);
	}

	calculate(): number {
	    return (Math.abs(this.arrowA.vector.x - this.arrowB.vector.x) + 
			Math.abs(this.arrowA.vector.y - this.arrowB.vector.y))/100;
	}

}

