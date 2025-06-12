import renderer from "./renderer";
import Vector2 from "./utils/vector2"

class Input{
	mousePosition:Vector2 = new Vector2(0,0);
	mouseDown : boolean = false;

	mousePressed = false;
	private _mouseWasDown = false;

	setContext(canvas: HTMLCanvasElement){
		canvas.onmousemove=((e)=>{
			let clientX = e.offsetX;
			let clientY = e.offsetY;

			const canvasRect = canvas.getBoundingClientRect();
			const cssWidth = canvasRect.width;
			const cssHeight = canvasRect.height;

			const htmlWidth = canvas.width;
			const htmlHeight = canvas.height;

			// Calculate the scaling factor
			const scaleX = htmlWidth / cssWidth;
			const scaleY = htmlHeight / cssHeight;

			// Apply the scaling factor to mouse coordinates
			clientX = clientX * scaleX;
			clientY = clientY * scaleY;
			
			this.mousePosition = new Vector2(clientX -renderer.position.x, clientY-renderer.position.y);
		});

		canvas.onmousedown = ((e) => {
			this.mouseDown = true;
			if (!this._mouseWasDown) {
				this.mousePressed = true;
			}	
			this._mouseWasDown = true;
		});

		canvas.onmouseup = ((e) => {
			this.mouseDown = false;
			this._mouseWasDown = false;
			this.mousePressed = false; 
		});

		canvas.onmouseleave = ((e) => {
			this.mouseDown = false;
			this._mouseWasDown = false; 
			this.mousePressed = false; 
		});
	}

	update(){
		if(this._mouseWasDown){
			this.mousePressed =false;	
		}

	}

}


const input = new Input();
export default input;
