import renderer from "../../renderer";
import { Scene } from "../../sceneManager";
import Embedding from "./embedding";

class EmbeddingsScene extends Scene{

	textBody: HTMLElement = document.getElementById("embeddings")!;
	inputPromptField: HTMLInputElement = document.getElementById("inputPrompt")! as HTMLInputElement;
	embeddingsTable: HTMLTableSectionElement = document.getElementById("embeddingsTable")! as HTMLTableSectionElement;

	embeddings: [Embedding] = Array() as [Embedding];

	overviewButton : HTMLButtonElement = document.getElementById("embeddingOverviewButton")! as HTMLButtonElement;
	playGroundButton : HTMLButtonElement = document.getElementById("embeddingPlayGroundButton")! as HTMLButtonElement;

	submitEmbeddingButton : HTMLButtonElement = document.getElementById("submitEmbeddingButton")! as HTMLButtonElement;

	toggleGraphTypeButton : HTMLButtonElement = document.getElementById("toggleGraphType")! as HTMLButtonElement;

	overviewPage: HTMLElement = document.getElementById("embeddingOverview")!;
	playgroundPage: HTMLElement = document.getElementById("embeddingPlayground")!;
	
	start(): void {
		this.textBody.style.display = "block";
		this.submitEmbeddingButton.onclick = async ()=>{
			const embedding = new Embedding(this.inputPromptField.value);	
			await embedding.tokenize();
			this.embeddings.push(embedding);
			const row = embedding.toTableRow();
			this.embeddingsTable.appendChild(row);
			this.inputPromptField.value = "";
		}


		this.playGroundButton.onclick = ()=>{
			this.overviewPage.style.display ="none";
			this.playgroundPage.style.display ="block";
		}

		this.overviewButton.onclick = ()=>{
			this.overviewPage.style.display ="block";
			this.playgroundPage.style.display ="none";
		}

		this.toggleGraphTypeButton.onclick = ()=>{
			if(this.displayMethod == this.drawWaveform){
				this.displayMethod = this.drawSpiderGraph;	
			}else{
				this.displayMethod = this.drawWaveform;	
			}

		}

	}

	update(deltaTime: number): void {
		this.embeddings.forEach((embedding)=>{
			this.displayMethod(embedding); 
		})
	}

	exit(): void {
		this.textBody.style.display = "none";
	}


	drawWaveform(embedding: Embedding){
		if(!embedding.isVisible){return;}
		const token = embedding.tokenReduced;
		renderer.draw((ctx:CanvasRenderingContext2D)=>{
			ctx.strokeStyle = embedding.color;
			ctx.beginPath();
			const width = ctx.canvas.width;
			const factor = width/token.length;
			ctx.moveTo(-width/2,0);
			for(let i = 0; i<token.length; i++){
				ctx.lineTo(i*factor - width/2,token[i]*1200);
			}
			ctx.stroke();
		});
	}

	drawSpiderGraph(embedding: Embedding){
		if(!embedding.isVisible){return;}
		const token = embedding.tokenReduced;
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

	displayMethod = this.drawWaveform;
}


const embeddingsScene = new EmbeddingsScene()
export default embeddingsScene;
