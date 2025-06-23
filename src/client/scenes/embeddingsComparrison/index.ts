
import renderer from "../../renderer";
import { Scene } from "../../sceneManager";
import Embedding from "./embedding";

class EmbeddingsComparrisonScene extends Scene{

	nextButton : HTMLButtonElement = document.getElementById("next")! as HTMLButtonElement;

	textBody: HTMLElement = document.getElementById("embeddingsComparrison")!;
	canvasContainer: HTMLElement = document.getElementById("canvasContainer")!;
	textContainer: HTMLElement = document.getElementById("textContainer")!;

	embeddingsTable: HTMLTableSectionElement = document.getElementById("embeddingComparrisonTable")! as HTMLTableSectionElement;
	input:HTMLInputElement = document.getElementById("promptInput")! as HTMLInputElement;
	addPromptButton:HTMLButtonElement = document.getElementById("addPrompt")! as HTMLButtonElement;
	searchSimilarityButton:HTMLButtonElement = document.getElementById("searchButton")! as HTMLButtonElement;


	overview: HTMLElement = document.getElementById("embeddingComparrisonOverview")!;
	playground: HTMLElement = document.getElementById("embeddingComparrisonPlayground")!;


	overviewButton : HTMLButtonElement = document.getElementById("embeddingComparrisonOverviewButton")! as HTMLButtonElement;
	playGroundButton : HTMLButtonElement = document.getElementById("embeddingComparrisonPlayGroundButton")! as HTMLButtonElement;


	embeddings : Embedding[] = Array() as Embedding[];
	scores : number[] = Array() as number[];

	start(): void {
		this.nextButton.style.display = "none";
		this.textBody.style.display = "block";
		renderer.canvas.style.display = "none";
		this.canvasContainer.style.display = "none";
		this.textContainer.className = "col-md-12";

		this.addPromptButton.onclick = async ()=>{
			const prompt = this.input.value;
			const embedding = new Embedding(prompt);
			await embedding.tokenize()
			this.embeddings.push(embedding);
			this.fillTable();
		}

		this.searchSimilarityButton.onclick = async ()=>{
			const prompt = this.input.value;
			const queryEmbedding = new Embedding(prompt); 
				await queryEmbedding.tokenize(); 

			const embeddingsWithScores = this.embeddings.map((existingEmbedding) => {
				const score = Embedding.Dot(existingEmbedding, queryEmbedding);
				return {
					embedding: existingEmbedding, 
					score: score                
				};
			});
			embeddingsWithScores.sort((a, b) => b.score - a.score);
			this.embeddings = embeddingsWithScores.map(item => item.embedding);
			this.fillTableWithScores(embeddingsWithScores);
		}

		this.overviewButton.onclick = ()=>{
			this.overview.style.display = "block";	
			this.playground.style.display = "none";
		}

		this.playGroundButton.onclick = ()=>{
			this.overview.style.display = "none";	
			this.playground.style.display = "block";
		}
	}

	update(deltaTime: number): void {

	}

	fillTable(){
		this.embeddingsTable.innerHTML = "";	

		this.embeddings.forEach((embedding:Embedding)=>{
			this.embeddingsTable.appendChild(embedding.toTableRow(0));
		});
	}

	fillTableWithScores(embeddingsWithScores: {embedding:Embedding, score:number}[]){
		this.embeddingsTable.innerHTML = "";	

		embeddingsWithScores.forEach((embeddingWithScore:{embedding:Embedding, score:number})=>{
			this.embeddingsTable.appendChild(embeddingWithScore.embedding.toTableRow(embeddingWithScore.score));
		});
	}

	exit(): void {
		this.textBody.style.display = "none";
		renderer.canvas.style.display = "block";
		this.canvasContainer.style.display = "block";
		this.textContainer.className = "col-md-7";

		this.nextButton.style.display = "block";
	}

}


const embedingsComparrisonScene = new EmbeddingsComparrisonScene()
export default embedingsComparrisonScene;
