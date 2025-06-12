import Vector2 from "./utils/vector2";

class Renderer{
	canvas!: HTMLCanvasElement;	
	ctx!: CanvasRenderingContext2D;
	position:Vector2 = new Vector2(0,0);

	draw(callback: (ctx:CanvasRenderingContext2D)=>void):void{
		callback(this.ctx);
	}

	setCanvas(canvas: HTMLCanvasElement){
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d")!;
	}

	setView(position:Vector2){
		this.position = position;	
		this.ctx.reset();
		this.ctx.translate(this.position.x, this.position.y);
	}

	clear(){

		this.ctx.clearRect(-this.position.x, -this.position.y, this.canvas.width, this.canvas.height);
	}
}

const renderer = new Renderer();


export default renderer;
