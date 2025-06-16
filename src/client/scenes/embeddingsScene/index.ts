import { Scene } from "../../sceneManager";

class EmbeddingsScene extends Scene{

	textBody: HTMLElement = document.getElementById("embeddings")!;

	start(): void {
		this.textBody.style.display = "block";
	}

	update(deltaTime: number): void {
	    
	}

	exit(): void {
		
		this.textBody.style.display = "none";
	}
}


const embeddingsScene = new EmbeddingsScene()
export default embeddingsScene;
