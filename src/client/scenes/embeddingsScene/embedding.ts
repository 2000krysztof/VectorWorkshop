export default class Embedding{

	color:string;	
	prompt:string;
	token!:number[];	
	tokenReduced!:number[];
	isVisible:boolean = true;

	constructor(prompt: string){
		this.prompt = prompt;
		this.color = "black";
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
		this.reduceSize(5);
	}

	reduceSize(reductionFactor:number){

		this.tokenReduced = new Array() as number[];
		for (let i = 0; i< this.token.length; i+=reductionFactor){
			let sum = 0;
			for(let j =0;j<reductionFactor;j++){
				sum+= this.token[i+j];
			}
			this.tokenReduced.push(sum/reductionFactor);
		}
	}

	toTableRow(): HTMLTableRowElement {
		const row = document.createElement("tr");

		const promptCell = document.createElement("td");
		promptCell.textContent = this.prompt;
		row.appendChild(promptCell);

		const colorCell = document.createElement("td");

		const colorInput = document.createElement("input");
		colorInput.type = "color";
		colorCell.appendChild(colorInput);
		colorInput.onchange = ()=>{
			this.color = colorInput.value;
		}
		row.appendChild(colorCell);

		
		const setVisable = document.createElement("input");
		setVisable.type = "checkbox";
		setVisable.checked = true;
		setVisable.onchange= ()=>{
			this.isVisible = setVisable.checked;
		}

		row.appendChild(setVisable);
		return row;
	}

}
