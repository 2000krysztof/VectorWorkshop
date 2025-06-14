import type Vector2 from "./vector2";



export default class Axis{
	
	scale:number;
	offset:Vector2;
	constructor(offset:Vector2, scale: number){

		this.offset = offset;
		this.scale = scale;	
	}


	draw(ctx:CanvasRenderingContext2D){
		const width = ctx.canvas.width ;
		const height = ctx.canvas.height;

		ctx.strokeStyle = "rgba(1,1,1,0.2)"

		ctx.beginPath();

		ctx.moveTo(-width,height/2 - this.offset.y);
		ctx.lineTo(this.offset.x,height/2 - this.offset.y);
		ctx.moveTo(width/2-this.offset.x,-height);
		ctx.lineTo(width/2-this.offset.x,this.offset.y);
		this.drawIncriments(ctx);
		ctx.stroke();

	}


	drawIncriments(ctx:CanvasRenderingContext2D){
		const width = ctx.canvas.width ;
		const height = ctx.canvas.height;
		const factor = width/8;
		for (let i =0; i< 8; i++){
			ctx.moveTo(-width/2 + factor*i, height/2 -this.offset.y - 10);
			ctx.lineTo(-width/2 + factor*i, height/2 -this.offset.y + 10);
		}

		for (let i =0; i< 8; i++){
			ctx.moveTo(width/2 -this.offset.x - 10, -height/2 + factor*i);
			ctx.lineTo(-width/2 +this.offset.x + 10, -height/2 + factor*i);
		}

	}
}
