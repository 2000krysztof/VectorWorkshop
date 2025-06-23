export default class Embedding{

	prompt:string;
	token!:number[];	
	isVisible:boolean = true;

	constructor(prompt: string){
		this.prompt = prompt;
	}


	async tokenize() {
		const response = await fetch("/api/embedding/embed", {
			method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ prompt: this.prompt })
		});

		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}

		const blob = await response.blob();
		const buffer = await blob.arrayBuffer();

		const floatArray = new Float32Array(buffer);
		this.token = Array.from(floatArray);
	}


	toTableRow(score:number): HTMLTableRowElement {
		const row = document.createElement("tr");

		const promptCell = document.createElement("td");
		promptCell.textContent = this.prompt;
		row.appendChild(promptCell);

		const scoreCell = document.createElement("td");
		scoreCell.textContent = score.toString();
		row.appendChild(scoreCell);
		return row;
	}

	static Dot(a:Embedding, b:Embedding): number{
		const tokenA = a.token;
		const tokenB = b.token;
		let sum = 0;
		for ( let i = 0; i<tokenA.length; i++){
			sum += tokenA[i]*tokenB[i];
		}
		return sum;
	}

}
