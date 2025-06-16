export abstract class Scene{
	abstract start():void;
	abstract update(deltaTime:number):void;
	abstract exit():void;
}


class SceneManager{
	
	activScene!:Scene;
	nextButton : HTMLButtonElement = document.getElementById("next")! as HTMLButtonElement;
	previousButton : HTMLButtonElement = document.getElementById("previous")! as HTMLButtonElement;

	sceneList!:SceneNode|null;

	constructor(){
		this.sceneList = null;
		this.nextButton.onclick = ()=>{this.setNextScene();}
		this.previousButton.onclick = ()=>{this.setPreviousScene();}

	}

	setScene(scene:Scene){
		scene.start();
		if(this.activScene){
			this.activScene.exit();
		}
		this.activScene = scene;
	}

	setNextScene(){
		if(this.sceneList && this.sceneList.next){
			this.sceneList = this.sceneList.next;	
			this.setScene(this.sceneList.scene);
		}
	}

	setPreviousScene(){

		if(this.sceneList && this.sceneList.previous){
			this.sceneList = this.sceneList.previous;	
			this.setScene(this.sceneList.scene);
		}
	}

	addScene(scene:Scene){
		if(!this.sceneList){
			this.sceneList = new SceneNode(scene);
			return;
		}
		let node = this.sceneList;
		while(node.next != null){
			node = node.next;
		}
		node.next = new SceneNode(scene);
		node.next.previous = node;
	}

	update(deltaTime:number){
		this.activScene.update(deltaTime);
	}
}


class SceneNode{
	scene:Scene;
	next!:SceneNode|null;
	previous!:SceneNode|null;

	constructor(scene:Scene){
		this.scene = scene;
		this.next = null;
		this.previous = null;
	}

	setNext(next : SceneNode){
		this.next = next;
	}
	setPrevious(previous:SceneNode){
		this.previous = previous;
	}
}

const sceneManager = new SceneManager();
export default sceneManager;
