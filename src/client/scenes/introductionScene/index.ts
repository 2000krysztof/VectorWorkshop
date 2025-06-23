import renderer from "../../renderer";
import { Scene } from "../../sceneManager";
import Axis from "../../utils/axis";
import Vector2 from "../../utils/vector2";
import VectorVisualizer from "../../utils/vectorVisualizer";

class Introduction extends Scene{

	previousButton : HTMLButtonElement = document.getElementById("previous")! as HTMLButtonElement;
	textBody: HTMLElement = document.getElementById("introduction")!;
	
	axis:Axis = new Axis(new Vector2(400,400),100);
	arrowA: VectorVisualizer = new VectorVisualizer(new Vector2(300,-200));
	positionA = new Vector2(-100,-100);
	positionB = new Vector2(200,100);
	timeOffset: number = 0;

	start(): void {
		this.previousButton.style.display = "none";
		renderer.setView(new Vector2(400,400));		
		this.textBody.style.display = "block";

	}

	update(deltaTime: number): void {
		renderer.draw(this.axis.draw.bind(this.axis));
		renderer.draw(this.arrowA.draw.bind(this.arrowA));
		this.arrowA.vector = Vector2.lerp(this.positionA, this.positionB, Math.cos(this.timeOffset)+0.3);
		this.timeOffset += deltaTime * 0.001;
		this.drawArrowCordinates();	
	}

	drawArrowCordinates(){
		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			const x = this.arrowA.vector.x;
			const y = this.arrowA.vector.y;

			ctx.font = '30px "Computer Modern Serif"'
			ctx.fillText(`(${(x/100).toPrecision(2)},${(-y/100).toPrecision(2)})`, x +30, y-30);
		});

	}

	exit(): void {
		this.textBody.style.display = "none";
		this.previousButton.style.display = "block";
	}

}

const introduction = new Introduction();
export default introduction;
