import renderer from "../../renderer";
import { Scene } from "../../sceneManager";
import Embedding from "./embedding";

class EmbeddingsScene extends Scene{

	textBody: HTMLElement = document.getElementById("embeddings")!;
	inputPromptField: HTMLInputElement = document.getElementById("inputPrompt")! as HTMLInputElement;
	embeddingsTable: HTMLTableSectionElement = document.getElementById("embeddingsTable")! as HTMLTableSectionElement;

	embeddings: [Embedding] = Array() as [Embedding];
	
	start(): void {
		this.textBody.style.display = "block";
		this.inputPromptField.onkeydown = async(e)=>{
			if(e.key !== "Enter"){return;}
			e.preventDefault();
			const embedding = new Embedding(this.inputPromptField.value);	
			await embedding.tokenize();
			this.embeddings.push(embedding);
			const row = embedding.toTableRow();
			this.embeddingsTable.appendChild(row);
			this.inputPromptField.value = "";

		}
	}

	update(deltaTime: number): void {
		this.embeddings.forEach((embedding)=>{
			this.drawSpiderGraph(embedding); 
		})
	}

	exit(): void {
		this.textBody.style.display = "none";
	}


	drawWaveform(embedding: Embedding){
		if(!embedding.isVisible){return;}
		const token = embedding.token;
		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			ctx.strokeStyle = embedding.color;
			ctx.beginPath();
			const width = ctx.canvas.width;
			const factor = width/token.length;
			ctx.moveTo(-width/2,0);
			for(let i = 0; i<token.length; i++){
				ctx.lineTo(i*factor - width/2,token[i]*1000);
			}
			ctx.stroke();
		});
	}

	//todo make spider graph radial
	drawSpiderGraph(embedding: Embedding){
		if(!embedding.isVisible){return;}
		const token = embedding.token;
		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			ctx.strokeStyle = embedding.color;
			ctx.beginPath();
			const width = ctx.canvas.width;
			const factor = token.length;
			for(let i = 0; i<token.length; i++){
				const x = Math.cos(i/factor * Math.PI*2) * (token[i]+0.3) * 600;
				const y = Math.sin(i/factor * Math.PI*2) * (token[i]+0.3) * 600;
				ctx.lineTo(x,y);
			}
			ctx.stroke();
		});
	}
}


const embeddingsScene = new EmbeddingsScene()
export default embeddingsScene;
