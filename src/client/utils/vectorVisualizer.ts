import Vector2 from "./vector2";

export default class VectorVisualizer{
	vector:Vector2;

	color = "black";
	constructor(vector: Vector2){
		this.vector = vector;
	}


	draw(ctx:CanvasRenderingContext2D){
		ctx.lineWidth = 4;
		ctx.lineCap = "round";
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(this.vector.x,this.vector.y);
		this.drawTip(ctx);
		ctx.stroke();
	}

	drawTip(ctx:CanvasRenderingContext2D){
		ctx.moveTo(this.vector.x,this.vector.y);
		const leftSide = Vector2.angleToVec(this.vector.angle()-2.5);
		const rightSide = Vector2.angleToVec(this.vector.angle()+2.5);
		leftSide.multiplyBy(20);
		rightSide.multiplyBy(20);
		leftSide.addTo(this.vector);
		rightSide.addTo(this.vector);
		ctx.lineTo(leftSide.x,leftSide.y);

		ctx.moveTo(this.vector.x,this.vector.y);
		ctx.lineTo(rightSide.x, rightSide.y);

	}

}
